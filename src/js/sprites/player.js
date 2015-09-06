define([
  'src/js/classes/sprite'
], function( Sprite ) {

  var elem = document.querySelector('#player'),
    frames, canvas, ctx, scale = 3;


  // We're going to pre-scale the sprite to an offscreen canvas
  // so that we're not doing it on the fly with ctx.drawImage()
  canvas = document.createElement('canvas');
  ctx = canvas.getContext('2d');
  canvas.width = 80 * scale;
  canvas.height = 72 * scale;
  ctx.drawImage( elem, 0, 0, 80 * scale, 72 * scale );

  frames = {
    right: [
      canvas,
      0, 0, 15 * scale, 24 * scale,
      null, null, null, null
    ],
    left: [
      canvas,
      0, 24.5 * scale, 16 * scale, 23.25 * scale,
      null, null, null, null
    ],
    dead: [
      canvas,
      0, 48.5 * scale, 15 * scale, 24 * scale,
      null, null, null, null
    ],
    'jump-left': [
      canvas,
      65 * scale, 25 * scale, 15 * scale, 24 * scale,
      null, null, null, null
    ],
    'jump-right': [
      canvas,
      65 * scale, 0, 15 * scale, 24 * scale,
      null, null, null, null
    ]
  };

  return new Sprite({ frames: frames });

});
