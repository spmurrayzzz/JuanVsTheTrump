define([
  'src/js/vendor/jsfxr'
], function( jsfxr ) {

  var AC = window.AudioContext || window.webkitAudioContext,
    audioEnabled = true,
    ctx = new AC();

  function createSoundEffect( sound ) {
    var buffer = jsfxr( sound, ctx );
    return {
      play: function() {
        if ( !audioEnabled ) {
          return false;
        }
        var src = ctx.createBufferSource();
        src.buffer = buffer;
        src.connect( ctx.destination );
        src.start( 0 );
      }
    };
  }

  return {
    jump: createSoundEffect( [ 0,,0.2129,,0.1594,0.3136,,0.1639,,,,,,0.5897,,,,,0.9573,,,0.2773,,0.33 ] ),
    die: createSoundEffect( [ 3,,0.19,0.28,0.48,0.75,,-0.4496,0.34,,,0.06,,,,0.63,,,0.73,0.04,0.01,0.01,,0.39 ] ),
    coin: createSoundEffect( [ 0,,0.0176,0.4936,0.2906,0.7508,,,,,,0.5357,0.5447,,,,,,1,,,,,0.33] ),
    reverse: createSoundEffect( [ 3,0.0005,0.9073,0.1861,0.1249,0.0026,,0.2186,-0.0006,-0.0001,-0.2998,0.8931,,,0.3423,,0.5833,0.4341,0.9996,0.0769,-0.5197,0.1644,0.1738,0.28 ] )
  };

});
