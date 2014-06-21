define(function() {
    'use strict';

    function Game() {}

    Game.prototype = {
        create: function() {
            this.add.sprite(0, 0, 'img');
        },

        update: function() {},
    };

    return Game;
});
