define([
  'src/js/classes/sprite'
], function( Sprite ) {

  var elem = document.querySelector('#coin'),
    frames, canvas, ctx;

  canvas = document.createElement('canvas');
  canvas.width = 48;
  canvas.height = 12;
  ctx = canvas.getContext('2d');
  ctx.drawImage( elem, 0, 0 );

  frames = {
    0: [
      canvas,
      0, 0, 12, 12,
      null, null, null, null
    ],
    1: [
      canvas,
      12, 0, 12, 12,
      null, null, null, null
    ],
    2: [
      canvas,
      24, 0, 12, 12,
      null, null, null, null
    ],
    3: [
      canvas,
      36, 0, 12, 12,
      null, null, null, null
    ],
  };

  return new Sprite({ frames: frames });

});
