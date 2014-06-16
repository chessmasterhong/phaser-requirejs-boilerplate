define([
    'game/states/boot',
    'game/states/game',
    'game/states/mainmenu',
    'game/states/preloader'
], function(boot, preloader, mainmenu, game) {
    'use strict';

    //var game = function(obj) {
    //    return obj;
    //};

    var game = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');

    game.state.add('Boot', boot);
    game.state.add('Preloader', preloader);
    game.state.add('MainMenu', mainmenu);
    game.state.add('Game', game);

    game.state.start('Boot');

    return game;
});
