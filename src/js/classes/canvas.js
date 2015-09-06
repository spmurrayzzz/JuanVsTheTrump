define([
  'src/js/classes/base',
  'src/js/lib/util'
],

function(
  BaseClass,
  _
) {

  return BaseClass.extend({

    init: function( opts ) {
      this.config = opts || {};
      this.elem = document.createElement('canvas');
      this.ctx = this.elem.getContext('2d');
      this.entities = [];
      _.scale.call( this );
      this.setDimensions( opts.width, opts.height );
      if ( opts.bgColor ) {
        this.elem.style.backgroundColor = opts.bgColor;
      }
      this.bindEvents();
    },

    attachTo: function( elem ) {
      return elem.appendChild( this.elem );
    },

    addEntity: function( entity ) {
      return this.entities.push( entity );
    },

    addPlayer: function( player ) {
      this.player = player;
      return this.addEntity( player );
    },

    setDimensions: function( width, height ) {
      this.elem.width = width;
      this.elem.height = height;
    },

    bindEvents: function() {
      var self = this;

      this.vent.on( 'before-update', function() {
        self.beforeUpdate();
        self.emit('before-update');
      });

      this.vent.on( 'update', function() {
        self.update();
        self.emit('update');
      });

      this.vent.on( 'render', function() {
        self.render();
        self.emit('render');
      });

      this.vent.on( 'resize', function() {
        _.scale.call( this );
      }.bind( this ) );
    },

    beforeUpdate: function() {
      this.clearDirty();
    },

    clearAll: function() {
      this.ctx.clearRect( 0, 0, this.elem.width, this.elem.height );
    },

    clearDirty: function() {
      var ctx = this.ctx;
      this.entities.forEach(function( entity ) {
        if ( !entity.isVisible() ) {
          return;
        }
        ctx.clearRect(
          entity.x - 5, entity.y - 5, entity.w + 5, entity.h + 5
        );
      });
    },

    update: function() {
      var self = this;
      this.entities.forEach(function( entity ) {
        if ( _.isFunction( entity.render ) ) {
          entity.update( self.ctx );
        }
      });
    },

    render: function() {
      var self = this;
      this.entities.forEach(function( entity ) {
        if ( _.isFunction( entity.render ) ) {
          entity.render( self.ctx );
        }
      });
    }

  });

});
