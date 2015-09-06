/**
 * Player entity module
 *
 * This module handles the player movement, rendering, and relevant event
 * delegation.
 */

define([

  'src/js/classes/entity',
  'src/js/lib/util',
  'src/js/lib/camera',
  'src/js/sprites/player',
  'src/js/lib/sound'

], function(

  Entity, _, camera, playerSprite, sound

) {


  var Player,
    gravity = 0.5;

  Player = Entity.extend({


    /**
     * Initializes the player entity
     * @return {self}
     */
    init: function() {
      Entity.prototype.init.apply( this, arguments );

      this.w = 45;
      this.h = 72;

      this.x = null;
      this.y = null;
      this.sprite = playerSprite;

      this.isJumping = false;
      this.jumpHeight = 16;
      this.jumpCount = 0;

      this.canvas = null;

      this.directionStr = 'right';

      this.velocity = {
        approach: {
          x: 0,
          y: 0
        },
        x: 0,
        y: 0
      };

      this.elem = document.querySelector('#player');
      this.bindEvents();
      return this;
    },


    /**
     * Binds event handlers to the global event emitter instanceof
     */
    bindEvents: function() {
      this.vent.on( 'tap', this.onTap.bind( this ) );
      this.vent.on( 'keydown', this.onLeftRightDown.bind( this ) );
      this.vent.on( 'keyup', this.onLeftRightUp.bind( this ) );
    },


    /**
     * Tap event handler, handles the player's jump/double jump ability
     */
    onTap: function() {
      if ( this.dead ) {
        return;
      }
      if ( !this.isJumping ) {
        this.startJump();
      } else if ( this.isJumping && this.jumpCount < 2 ) {
        this.startJump();
      }
    },


    /**
     * Handler for all directional events, left and right
     * @param  {String} dir - left|right
     */
    onLeftRightDown: function( dir ) {
      if ( this.lateral ) {
        return;
      }
      var modifier = dir === 'left' ? -1 : 1;
      this.direction = modifier;
      this.directionStr = dir;
      this.velocity.x = 5 * modifier;
      this.velocity.approach.x = 0;
      this.lateral = true;
    },


    /**
     * Handler for all directional event key releases
     * @param  {String} dir - left|right
     */
    onLeftRightUp: function( dir ) {
      this.velocity.x = 0;
      this.lateral = false;
    },


    /**
     * Attaches a Canvas instance to the Player
     * @param  {Canvas} canvas - instance of classes/canvas
     */
    setCanvas: function( canvas ) {
      this.canvas = canvas;
    },


    /**
     * Determines the Y coordinate for when a player is at the bottom of the
     * viewport.
     * @return {Number}
     */
    worldBounds: function() {
      return this.canvas.height - this.h;
    },


    /**
     * Renders the player sprite to the attached canvas
     * @param  {Object} ctx - HTMLCanvasElement 2d context object
     */
    render: function( ctx ) {
      var sprite;

      this.x = this.x === null ?
        ctx.canvas.width / 2 - this.w / 2 : this.x;
      this.y = this.y === null ?
        ctx.canvas.height - this.h - 10 : this.y;

      if ( this.dead ) {
        sprite = this.sprite.getFrame('dead');
      }
      else if ( !this.isJumping ) {
        sprite = this.sprite.getFrame( this.directionStr || 'right' );
      } else {
        sprite = this.sprite.getFrame( 'jump-' + this.directionStr );
      }

      ctx.drawImage.apply( ctx, sprite( this ) );
    },


    /**
     * Updates player positional coordinates, velocities, jumping state, and
     * world collisions.
     * @param  {Object} ctx - HTMLCanvasElement 2d context object
     */
    update: function( ctx ) {
      this.canvas || this.setCanvas( ctx.canvas );

      // If player is moving laterally
      if ( this.lateral ) {
        this.x += this.velocity.approach.x;

        // If player was last seen on a platform, and no longer is standing on
        // the platform, he should start falling
        if (
          this.currentPlatform &&
          !this.currentPlatform.collidesWithTop( this )
        ) {
          this.isJumping = true;
          this.currentPlatform = null;
        }



      }

      // If the player is on a platform, adjust his velocity to align with the
      // platform's velocity
      if ( this.currentPlatform ) {
        this.x += this.currentPlatform.velocity.x *
          this.currentPlatform.direction;
      }

      // If the player is jumping, adjust his Y velocity using gravity const
      if ( this.isJumping ) {
        this.velocity.y += gravity;
        this.y += this.velocity.y;
        this.isFalling = this.velocity.y > 0 ? true : false;

        // Adjust the camera offset if we cross the verrtical middle
        // of the canvas
        if ( this.y <= ( ctx.canvas.height / 2 ) - this.h ) {
          camera.offset += this.velocity.y;
          this.y = ( ctx.canvas.height / 2 ) - this.h;
        }
      }

      this.velocity.approach.x = _.approach(
        this.velocity.x,
        this.velocity.approach.x,
        0.3
      );

      // Lock player's horizontal movement bounds
      if ( this.x >= this.canvas.width - this.w ) {
        this.x = this.canvas.width - this.w;
      }
      if ( this.x < 0 ) {
        this.x = 0;
      }

      // If we collide with the bottom bounds, homeboy is dead
      if ( this.isJumping && this.y >= this.worldBounds() && !this.dead ) {
        this.die();
      }

      // After we die and fall off screen, let everyone else know
      if ( this.dead && this.y && this.y >= ctx.canvas.height ) {
        this.vent.emit( 'player-dead game-over', this );
      }
    },


    /**
     * Updates the player state for a death event
     */
    die: function () {
      this.dead = true;
      this.jumpHeight = 10;
      this.startJump();
      sound.die.play();
    },


    /**
     * Updates the player state to land on a given platform entity
     * @param  {Entity} entity - instance of classes/Entity
     */
    landOn: function( entity ) {
      this.endJump( entity.y - this.h );
      this.currentPlatform = entity || null;
      this.isJumping = false;
      this.isFalling = false;
    },

    /**
     * Starts the player's jumping state
     */
    startJump: function() {
      this.jumpCount++;
      this.currentPlatform = null;
      this.velocity.y = -( this.jumpHeight );
      this.isJumping = true;
      this.isFalling = false;
      sound.jump.play();
    },

    /**
     * Ends the player's jumping state at an optionally supplied Y coordinate
     * @param  {Number} posY - (optional)
     */
    endJump: function( posY ) {
      this.velocity.y = 0;
      this.y = posY || null;
      this.jumpCount = 0;
      this.isJumping = false;
      this.isFalling = false;
    }

  });

  return new Player();

});
