define([
  'src/js/classes/base'
], function( BaseClass ) {

  var Sprite = BaseClass.extend({

    init: function( opts ) {
      if ( opts.frames ) {
        this.addFrames( opts.frames );
      }
    },

    getFrame: function( frame, ctx ) {
      return this.frames[ frame ];
    },

    addFrames: function( frames ) {
      var self = this;
      this.frames = {};
      Object.keys( frames ).forEach(function( key ) {
        var frame = frames[ key ];
        self.frames[ key ] = function( entity ) {
          // Math.floor() ensures we're using integers when we render for better
          // canvas performance
          frame[ 5 ] = Math.floor( entity.x );
          frame[ 6 ] = Math.floor( entity.y );
          frame[ 7 ] = Math.floor( entity.w );
          frame[ 8 ] = Math.floor( entity.h );
          return frame;
        };
      });
    }

  });

  return Sprite;

});
