define([
  'src/js/classes/entity',
  'src/js/lib/camera',
  'src/js/lib/util',
  'src/js/sprites/cloud'
], function( Entity, camera, _, cloudSprite ) {

  return Entity.extend({

    init: function( opts ) {
      Object.defineProperty( this, 'y', {
        get: function() {
          return this._y - camera.offset / 8;
        },
        set: function( val ) {
          this._y = val;
        }
      });
      this.originalY = opts.y;
      this.velocity = {
        x: Math.random()
      };
      this.direction = _.random( 1, 11 ) <= 5 ? 1 : -1;

      Entity.prototype.init.apply( this, arguments );

      this.sprite = cloudSprite;
      this.alpha = 0.3 + Math.random() * ( 0.5 - 0.3 );
      this.w = 117;
      this.h = 89;
      this.destroyed = false;
    },

    recycle: function( newY ) {
      this.destroyed = false;
      this.y = newY;
    },

    update: function( ctx ) {
      if ( this.x <= 0 - this.w ) {
        this.x = ctx.canvas.width + this.w;
      } else if ( this.x >= ctx.canvas.width + this.w ) {
        this.x = -( this.w );
      }

      if ( this.y > ctx.canvas.height ) {
        this.destroyed = true;
      }

      this.x += this.velocity.x * this.direction;
    },

    render: function( ctx ) {
      ( this.canvas || ( this.canvas = ctx.canvas ) );

      ctx.globalAlpha = this.alpha;
      ctx.drawImage.apply( ctx, this.sprite.getFrame('default')( this ) );
      ctx.globalAlpha = 1;
    }

  });

});
