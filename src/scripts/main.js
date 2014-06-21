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

require([
    'phaser',
    'game/states/game',
    'game/states/preloader'
], function(Phaser, game, preloader) {
    var phaserGame = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');

    phaserGame.state.add('Game', game);
    phaserGame.state.add('Preloader', preloader);

    phaserGame.state.start('Preloader');

    return phaserGame;
});
