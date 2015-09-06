define([
  'src/js/lib/canvases',
  'src/js/entities/platform',
  'src/js/entities/player',
  'src/js/entities/cloud',
  'src/js/lib/vent',
  'src/js/lib/util',
  'src/js/classes/pool',
  'src/js/lib/camera',
  'src/js/entities/coin',
  'src/js/lib/sound'
], function(
  canvases, Platform, player, Cloud, vent, _, Pool, camera, Coin, sound
) {

  var bg = canvases.bg,
    world = canvases.world,
    items = canvases.items,
    main = canvases.main,
    lastReverseCheck = null,
    engine,
    checkReverse,
    difficultyCounter;


  difficultyCounter = (function() {
    var count = 10;
    return function() {
      if ( count === 80 ) {
        return count;
      }
      return count += 1;
    };
  })();

  function checkCollisions() {
    if ( player.dead ) {
      return;
    }

    world.entities.forEach(function( entity ) {

      if ( entity instanceof Platform ) {

        if ( entity.collidesWithTop( player ) ) {
          player.landOn( entity );
        }

        if ( entity.type === 'spike' && entity.collidesWithBottom( player ) ) {
          player.die();
        }

      }
    });

    items.entities.forEach(function( entity ) {

      if ( entity.collidesWith( player ) && !entity.consumed ) {
        entity.consume();
      }

    });
  }

  checkReverse = (function() {
    var lastFired = null;

    return function() {
      var now = _.now(),
        num;

      lastFired = lastFired !== null ? lastFired : now;
      lastReverseCheck = lastReverseCheck !== null ? lastReverseCheck : now;

      if ( now - lastReverseCheck >= 10000 ) {
        num = _.random( 0, 100 );

        if ( num <= 20 || now - lastFired >= 30000 ) {
          world.entities.forEach(function( entity ) {
            entity.direction = -( entity.direction );
          });
          sound.reverse.play();
          vent.emit('reverse');
          lastFired = now;
        }

        lastReverseCheck = now;
      }
    };
  })();

  engine = {

    init: function() {
      this.createClouds();
      this.createPlatforms();
      this.createCoins();
      this.setPlayer();
      this.bindEvents();
    },

    bindEvents: function() {
      vent.on( 'update', checkCollisions );
      vent.on( 'update', checkReverse );
      vent.on( 'update', this.recycleSprite.bind( this ) );
    },

    createClouds: function() {
      var i, modifier = 0;

      for ( i = 0; i < 8; i++ ) {
        bg.addEntity(
          new Cloud({
            x: _.random( 0, 440 ),
            y: _.random( modifier, modifier + 200 )
          })
        );
        modifier += 100;
      }

      this.clouds = new Pool( bg.entities );
    },

    createPlatforms: function() {
      var i;

      this.lastY = 750;

      for ( i = 0; i < 15; i++ ) {
        world.addEntity(
         new Platform({ x: _.random( 0, 440 ), y: this.lastY })
       );
       this.lastY -= 200;
      }

      this.platforms = new Pool( world.entities );
    },

    createCoins: function() {
      var i;

      for ( i = 0; i < 5; i++ ) {
        items.addEntity(
         new Coin({
           x: _.random( 0, 440 ),
           y: _.random( 0, 440 )
         })
       );
      }

      this.items = new Pool( items.entities );
    },

    setPlayer: function() {
      main.addPlayer( player );
      var first = world.entities[ 0 ];
      player.x = first.x + first.w / 2 - player.w / 2;
      player.landOn( first );
    },

    recycleSprite: function() {
      var entity;

      while ( entity = this.platforms.recycle() ) {
        entity.recycle( this.lastY );
        this.lastY -= _.random( 100, 400 );
        if ( _.random( 1, 100 ) <= difficultyCounter() ) {
          entity.type = 'spike';
        } else if ( entity.type = 'spike' ) {
          entity.type = 'default';
        }
      }

      while ( entity = this.items.recycle() ) {
        entity.recycle( camera.offset - _.random( 100, 300 ) );
      }

      while ( entity = this.clouds.recycle() ) {
        entity.recycle( camera.offset / 8 - _.random( 300, 500 ) );
      }
    }
  };

  engine.init();
});
