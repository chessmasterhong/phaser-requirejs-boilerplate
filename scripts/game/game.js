define([
    'phaser'
], function(Phaser) {
    'use strict';

    function Game() {}

    Game.prototype = {
        constructor: Game,

        init: function() {
            new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');
        }
    };

    return Game;
});
