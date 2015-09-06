define([
  'src/js/classes/entity',
  'src/js/lib/camera',
  'src/js/lib/util',
  'src/js/sprites/platform',
  'src/js/sprites/spikeplatform'
], function( Entity, camera, _, platformSprite, spikePlatformSprite ) {

  var sprites = {
    default: platformSprite,
    spike: spikePlatformSprite
  };

  return Entity.extend({

    init: function( opts ) {
      Object.defineProperty( this, 'y', {
        get: function() {
          return this._y - camera.offset;
        },
        set: function( val ) {
          this._y = val;
        }
      });

      (function() {
        var type = opts.type || 'default';
        Object.defineProperty( this, 'type', {
          get: function() {
            return type;
          },
          set: function( val ) {
            type = val;
            this.sprite = sprites[ type ];
          }
        });
      }).call( this );

      this.type = opts.type || 'default';

      this.velocity = {
        x: _.random( 1, 4 )
      };
      this.direction = _.random( 1, 11 ) <= 5 ? 1 : -1;

      Entity.prototype.init.apply( this, arguments );

      this.w = _.random( 50, 200 );
      this.h = 50;
      this.destroyed = false;
    },

    recycle: function( newY ) {
      this.destroyed = false;
      this.y = newY;
      this.x = _.random( 0, this.canvas.width - this.w - 50 );

      this.velocity = {
        x: _.random( 1, 4 )
      };

      this.w = _.random( 50, 200 );
    },

    update: function( ctx ) {
      if ( this.x <= 0 || this.x >= ( ctx.canvas.width - this.w ) ) {
        this.direction = -( this.direction );
      }
      this.x += this.velocity.x * this.direction;

      if ( this.y > ctx.canvas.height ) {
        this.destroyed = true;
      }
    },

    render: function( ctx ) {
      ( this.canvas || ( this.canvas = ctx.canvas ) );

      if ( !this.isVisible() ) {
        return;
      }

      ctx.drawImage.apply( ctx, this.sprite.getFrame('default')( this ) );
    },

    collidesWithTop: function( entity ) {
      if ( !entity.isFalling ) {
        return false;
      }

      if (
        this.collidesWith( entity ) &&
        entity.y + entity.h <= this.y + 30
      ) {
        return true;
      }

      return false;
    },

    collidesWithBottom: function( entity ) {
      if ( !entity.isJumping ) {
        return false;
      }

      if (
        this.collidesWith( entity ) &&
        entity.y <= this.y + this.h - 50
      ) {
        return true;
      }

      return false;
    }

  });

});
