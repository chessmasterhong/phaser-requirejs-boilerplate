(function() {
    'use strict';

    requirejs.config({
        baseUrl: 'scripts/',
        paths: {
            phaser: [
                'lib/phaser/phaser',
                '//cdnjs.cloudflare.com/ajax/libs/phaser/2.0.4/phaser.min.js'
            ]
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
