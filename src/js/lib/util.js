define( [], function() {

  var util;

  return util = {

    now: function() {
      return ( new Date() ).getTime();
    },

    isFunction: function( arg ) {
      return typeof arg === 'function';
    },

    random: function( min, max ) {
      return min + Math.floor( Math.random() * ( max - min ) );
    },

    approach: function( targetX, currentX, deltaT ) {
      var diff = targetX - currentX;

      if ( diff > deltaT ) {
        return currentX + deltaT;
      } else if ( diff < -deltaT ) {
        return currentX - deltaT;
      } else {
        return targetX;
      }
    },

    scale: function() {
      var ratio = this.config.height / this.config.width,
        height, width;

      if ( this.config.height > window.innerHeight ) {
        height = window.innerHeight;
        width = height / ratio;

        this.elem.style.width = width + 'px';
        this.elem.style.height = height + 'px';

        this.elem.style.marginLeft = '-' + width / 2 + 'px';
      }
    },

    template: (function() {
      var _cache = {};
      return function( str, obj ) {
        Object.keys( obj ).forEach(function( key ) {
          var re, reStr = '\{\{ ' + key + ' \}\}';

          re = _cache[ reStr ] ||
            ( _cache[ reStr ] = new RegExp( '\{\{ ' + key + ' \}\}' ) );

          str = str.replace( re, obj[ key ], 'g' );
        });

        return str;
      };
    })(),

    stackTrace: function() {
      return ( new Error() ).stack;
    },

    extend: function( target ) {
      var args = Array.prototype.slice.call( arguments, 1 );
      args.forEach(function( arg ) {
        Object.keys( arg ).forEach(function( key ) {
          target[ key ] = arg[ key ];
        });
      });
      return target;
    },

    renderText: function( ctx, msg, pos, ctxOpts ) {
      util.extend( ctx, ctxOpts );
      ctx.fillText( msg, pos.x, pos.y );
    }

  };

});
