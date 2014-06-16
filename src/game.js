define([
    'game/main'
], function(main) {
    'use strict';

    var game = function(obj) {
        return obj;
    };

    game.init = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');

    return game;
});
