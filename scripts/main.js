(function() {
    'use strict';

    requirejs.config({
        baseUrl: 'scripts/',
        paths: {
            phaser: 'lib/phaser/phaser'
        },
        shim: {
            phaser : {
                exports: 'Phaser'
            }
        }
    });

    require(['phaser', 'game/game'], function(Phaser, Game) {
        new Game().init();
    });
}());
