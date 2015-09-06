define([
  'src/js/classes/canvas',
  'src/js/classes/hud',
  'src/js/lib/util'
],

function(
  Canvas, HUD, _
) {

  var dims = { width: 640, height: 960 },
    main = document.getElementById('main'),
    mainCanvas = new Canvas( dims ),
    worldCanvas = new Canvas( dims ),
    itemsCanvas = new Canvas( dims ),
    hud = new HUD( dims ),
    title = new Canvas( dims ),
    bgCanvas = new Canvas( dims );

  bgCanvas.attachTo( main );
  worldCanvas.attachTo( main );
  itemsCanvas.attachTo( main );
  mainCanvas.attachTo( main );
  hud.attachTo( main );
  title.attachTo( main );

  return {
    main: mainCanvas,
    world: worldCanvas,
    items: itemsCanvas,
    bg: bgCanvas,
    hud: hud,
    title: title
  };
});
