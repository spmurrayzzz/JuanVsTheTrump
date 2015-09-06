define([
  'src/js/lib/vent',
  'src/js/lib/util',
  'src/js/classes/base',
  'src/js/lib/canvases'
], function( vent, _, BaseClass, canvases ) {

  var elem = document.querySelector('.score'),
    tmplStr = document.querySelector('#tmpl-score').innerHTML,
    Score, score;

  Score = BaseClass.extend({

    init: function() {
      (function() {
        var points = 0;

        Object.defineProperty( this, 'points', {
          get: function(){
            return points;
          },
          set: function( val ) {
            points = val;
            this.elem.innerHTML = _.template(
              tmplStr, { score: points }
            );
          }
        });

      }).call( this );


      this.elem = elem;
      this.config = canvases.main.config;
      this.elem.width = this.config.width;
      _.scale.call( this );
      this.elem.style.width =
        ( parseInt( this.elem.style.width ) + 1 ) + ' px';
      this.points = 0;
    }

  });

  score = new Score();

  vent.on( 'resize', function() {
    _.scale.call( score );
    score.elem.style.width =
      ( parseInt( score.elem.style.width ) + 1 ) + ' px';
  });

  return score;

});
