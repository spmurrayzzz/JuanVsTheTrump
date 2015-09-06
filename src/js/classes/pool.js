define([
  'src/js/classes/base'
], function( BaseClass ) {

  var Pool = BaseClass.extend({

    init: function( entities ) {
      this.entities = entities;
    },

    recycle: function() {
      return this.entities.filter(function( entity ) {
        return entity.destroyed === true;
      })[ 0 ];
    }

  });

  return Pool;

});
