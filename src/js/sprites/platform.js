define([
  'src/js/classes/sprite'
], function( Sprite ) {

  var elem = document.querySelector('#platform'),
    frames, canvas, ctx;

  canvas = document.createElement('canvas');
  canvas.width = 400;
  canvas.height = 200;
  ctx = canvas.getContext('2d');
  ctx.drawImage( elem, 0, 0 );

  frames = {
    default: [
      canvas,
      0, 0, 400, 200,
      null, null, null, null
    ]
  };

 return new Sprite({ frames: frames });

});
