define([
  'src/js/classes/base'
],

function(
  BaseClass
) {

  return BaseClass.extend({

    init: function( opts ) {
      opts = opts || {};
      this.x = opts.x || 0;
      this.y = opts.y || 0;
      this.w = opts.w || 0;
      this.h = opts.h || 0;
      this.shape = opts.shape || 'rectangle';
    },

    isVisible: function() {
      if ( this.y + this.h < 0 ) {
        return false;
      }
      return true;
    },

    // This should be overriden by subclasses
    render: function( ctx ) {},

    // This should be overriden by subclasses
    update: function( ctx ) {},

    collidesWith: function( entity ) {
      if ( entity.shape !== this.shape ) {
        throw new Error('Entity shapes do not match for collision detect');
      }

      return this.collisionFuncs[ this.shape ].call( this, entity );
    },

    collisionFuncs: {
      rectangle: function( entity ) {
        if (
          this.x < entity.x + entity.w &&
          entity.x < this.x + this.w &&
          this.y < entity.y + entity.h &&
          entity.y < this.y + this.h
        ) {
          return true;
        }
        return false;
      }
    }

  });

});
