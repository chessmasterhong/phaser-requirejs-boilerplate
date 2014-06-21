(function () {
    'use strict';

    requirejs.config({
        baseUrl: './scripts',
        paths: {
            almond: '../scripts/bower_components/almond/almond',
            phaser: '../scripts/bower_components/phaser/index'
        },
        shim: {
            phaser: { exports: 'Phaser' }
        }
    });

    require(['phaser', 'game/states/game'], function(Phaser) {
        var phaserGame = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');

        phaserGame.state.add('Game', require('./game/states/game'));

        phaserGame.state.start('Game');
    });
}());
