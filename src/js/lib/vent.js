define([
  'src/js/vendor/eventemitter'
],

function(
  EventEmitter
) {

  var vent = new EventEmitter();

  window.addEventListener( 'resize', function() {
    vent.emit('resize');
  });

  return vent;

});
