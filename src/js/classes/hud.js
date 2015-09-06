define([
  'src/js/classes/canvas',
  'src/js/lib/util'
],

function(
  Canvas, _
) {

  var trump = document.querySelector('#trump');

  return Canvas.extend({

    init: function() {
      Canvas.prototype.init.apply( this, arguments );
      this.reverse = false;

      this.gameOverText = [
        this.ctx, 'Game Over',
        { x: this.elem.width / 2, y: this.elem.height / 2 - 25 },
        {
          fillStyle: '#f1f1f1',
          font: 'normal bold 80px sans-serif',
          textAlign: 'center'
        }
      ];

      this.replayText = [
        this.ctx, 'click to replay',
        { x: this.elem.width / 2, y: this.elem.height / 2 },
        {
          fillStyle: '#f1f1f1',
          font: 'normal bold 20px sans-serif',
          textAlign: 'center'
        }
      ];

      this.trumpText = [
        this.ctx, 'Trump!',
        { x: this.elem.width / 2, y: this.elem.height / 2 - 226 },
        {
          fillStyle: 'rgb( 51, 51, 51 )',
          font: 'normal bold 80px sans-serif',
          textAlign: 'center'
        }
      ];

      (function() {
        var val = true,
          last = _.now();
        Object.defineProperty( this, 'flicker', {
          get: function() {
            var now =  _.now();
            if ( now - last > 5 ) {
              last = now;
              return ( val = !val );
            } else {
              return val;
            }
          },
          set: function( value ) {
            val = value;
          }
        });
      }).call( this );

      this.vent.on( 'reverse', function() {
        this.reverse = true;
        this.alpha = 1;
      }.bind( this ) );

      this.on( 'render', this.onRender.bind( this ) );

      this.vent.on( 'game-over', function() {
        this.gameOver = true;
        this.vent.once( 'tap', function() {
          window.location = window.location;
        });
      }.bind( this ) );
    },

    beforeUpdate: function() {
      if ( this.reverse ) {
        this.alpha -= 0.01;
      }

      this.ctx.clearRect( 0, 0, this.elem.width, this.elem.height );

      if ( this.alpha <= 0 ) {
        this.reverse = false;
        this.alpha = 1;
      }
    },

    onRender: function() {
      if ( this.gameOver ) {
        this.ctx.globalAlpha = this.alpha = 1;
        _.renderText.apply( _, this.gameOverText );
        _.renderText.apply( _, this.replayText );
      } else if ( this.reverse ) {
        this.ctx.fillStyle = this.flicker ? '#8ABFDA' : '#f1f1f1';
        this.ctx.fillRect( 0, 0, this.elem.width, this.elem.height );

        _.renderText.apply( _, this.trumpText );

        this.ctx.globalAlpha = this.flicker ? this.alpha : 0;
        this.ctx.drawImage( trump,
          this.elem.width / 2 - 163, this.elem.height / 2 - 226,
          325, 409
        );
      }
    }

  });

});
