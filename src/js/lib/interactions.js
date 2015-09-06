define([
  'src/js/lib/util',
  'src/js/lib/vent'
], function( _, vent ) {

  var keyMap;

  keyMap = {
    37: 'left',
    39: 'right'
  };

  vent.on( 'start', function() {
    window.setTimeout( init, 0 );
  });

  function init() {
    document.addEventListener( 'mousedown', function() {
      vent.emit('tap');
    }, false );

    document.addEventListener( 'keydown', function( ev ) {
      var dir;

      if ( keyMap.hasOwnProperty( ev.keyCode ) ) {
        dir = keyMap[ ev.keyCode ];
        vent.emit( 'keydown', dir );
      }
    }, false );

    document.addEventListener( 'keyup', function( ev ) {
      var dir;

      if ( keyMap.hasOwnProperty( ev.keyCode ) ) {
        dir = keyMap[ ev.keyCode ];
        vent.emit( 'keyup', dir );
      }

      if ( ev.keyCode === 32 ) {
        vent.emit('tap');
      }
    }, false );

  }

});
