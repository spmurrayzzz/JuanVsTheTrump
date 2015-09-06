define([
  'src/js/classes/entity',
  'src/js/sprites/coin',
  'src/js/lib/util',
  'src/js/lib/camera',
  'src/js/lib/score',
  'src/js/lib/sound'
], function( Entity, coinSprite, _, camera, score, sound ) {

  return Entity.extend({

    init: function() {

      Object.defineProperty( this, 'y', {
        get: function() {
          return this._y - camera.offset;
        },
        set: function( val ) {
          this._y = val;
        }
      });

      Entity.prototype.init.apply( this, arguments );

      this.w = 36;
      this.h = 36;

      this.sprite = coinSprite;
      this.canvas = null;

      this.frameNums = [ 0, 1, 2, 3 ];
      this.frameIndex = 0;
      this.frameDelay = 100;
      this.lastFrameTime = null;

      this.consumed = false;
      this.destroyed = false;
      this.points = 1;
    },

    update: function( ctx ) {
      if ( this.y > ctx.canvas.height ) {
        this.destroyed = true;
      }
    },

    render: function( ctx ) {
      if ( this.consumed || this.destroyed ) {
        return;
      }

      var now = _.now();

      ( this.canvas || ( this.canvas = ctx.canvas ) );
      ( this.lastFrameTime || ( this.lastFrameTime = now ) );

      if ( now - this.lastFrameTime >= this.frameDelay ) {
        this.frameIndex = this.frameNums[ this.frameIndex + 1 ] || 0;
        this.lastFrameTime = now;
      }
      ctx.drawImage.apply(
        ctx, this.sprite.getFrame( this.frameIndex )( this )
      );
    },

    recycle: function( newY ) {
      this.destroyed = false;
      this.consumed = false;
      this.y = newY;
      this.x = _.random( 0, this.canvas.width - this.w );
    },

    consume: function() {
      this.consumed = true;
      this.destroyed = true;
      score.points += this.points;
      sound.coin.play();
    }

  });

});
