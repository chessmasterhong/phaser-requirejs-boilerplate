define([
    'game/states/main'
], function(main) {
    'use strict';

    //var game = function(obj) {
    //    return obj;
    //};

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'canvas');

    game.state.add('MainGame', main);

    game.state.start('MainGame');

    return game;
});
