define([
  'src/js/lib/canvases',
  'src/js/lib/gameloop',
  'src/js/lib/interactions',
  'src/js/lib/vent',
  'src/js/lib/titlescreen',
  'src/js/lib/engine',
  'src/js/lib/score'
],

function(
  canvases, gameLoop, interactions, vent, titleScreen
) {

  document.addEventListener( 'DOMContentLoaded', function() {
    titleScreen.show();
  }, false );

});
