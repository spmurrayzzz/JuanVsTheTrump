define([
  'src/js/classes/sprite'
], function( Sprite ) {

  var elem = document.querySelector('#cloud'),
    frames, canvas, ctx;

  canvas = document.createElement('canvas');
  canvas.width = 235;
  canvas.height = 178;
  ctx = canvas.getContext('2d');
  ctx.drawImage( elem, 0, 0 );

  frames = {
    default: [
      canvas,
      0, 0, 235, 178,
      null, null, null, null
    ]
  };

  return new Sprite({ frames: frames });

});
