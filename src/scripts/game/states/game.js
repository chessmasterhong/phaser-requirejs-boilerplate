define(function() {
    'use strict';

    var Game = function() {};

    Game.prototype = {
        preload: function() {
            this.load.image('img', 'media/tiles.png');
        },
        create: function() {
            this.add.sprite(0, 0, 'img');
        },
        update: function() {},
    };

    return Game;
});
