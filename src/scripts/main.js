'use strict';

requirejs.config({
    baseUrl: './scripts',
    paths: {
        almond: '../scripts/bower_components/almond/almond',
        Phaser: '../scripts/bower_components/phaser/index',

        game: 'game/states/game',
        preloader: 'game/states/preloader'
    },
});

require([
    'require',
    'Phaser',
    'game',
    'preloader'
], function(require) {
    var Phaser = require('Phaser'),
        game = require('game'),
        preloader = require('preloader');

    var phaserGame = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');

    phaserGame.state.add('Game', game);
    phaserGame.state.add('Preloader', preloader);

    phaserGame.state.start('Preloader');

    return phaserGame;
});
