define([
  'src/js/lib/canvases',
  'src/js/lib/vent'
], function( canvases, vent ) {

  var trump, juan;

  trump = document.querySelector('#trump');
  juan = document.querySelector('#player');

  var titleScreen = {

    init: function() {
      this.canvas = canvases.title;
      this.ctx = this.canvas.ctx;
      this.elem = this.canvas.elem;
      this.bindEvents();
      return this;
    },

    bindEvents: function() {
      var self = this;
      function touchHandler() {
        vent.emit('start');
        self.elem.remove();
      }
      this.elem.addEventListener( 'mousedown', touchHandler, false );
    },

    show: function() {
      this.ctx.fillStyle = '#f1f1f1';
      this.ctx.font = 'normal bold 80px sans-serif';
      this.ctx.textAlign = 'center';

      this.ctx.fillText(
        'Juan', this.elem.width / 2, this.elem.height / 2 - 226
      );
      this.ctx.fillText(
        'vs', this.elem.width / 2, this.elem.height / 2 - 150
      );
      this.ctx.fillText(
        'The Trump', this.elem.width / 2, this.elem.height / 2 - 70
      );

      this.ctx.font = 'normal bold 20px sans-serif';
      this.ctx.fillText(
        'spacebar jumps — left/right arrows move',
        this.elem.width / 2, this.elem.height / 2 - 10
      );
      this.ctx.fillText(
        'collect coins and watch out for the trump!',
        this.elem.width / 2, this.elem.height / 2 + 20
      );
      this.ctx.fillText(
        'click to start', this.elem.width / 2, this.elem.height / 2 + 80
      );

      this.ctx.drawImage( juan,
        0, 0, 15, 15,
        -100, this.canvas.elem.height - 300, 300, 300
      );
      this.ctx.drawImage( juan,
        0, 0, 15, 15,
        -100, this.elem.height - 300, 300, 300
      );
      this.ctx.drawImage( trump,
        this.elem.width - 220, this.elem.height - 345,
        325, 409
      );
    }


  };

  return titleScreen.init();
});
