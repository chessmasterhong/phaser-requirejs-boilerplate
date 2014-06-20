define([
    'game/states/boot',
    'game/states/game',
    'game/states/mainmenu',
    'game/states/preloader'
], function(boot, preloader, mainmenu, game) {
    'use strict';

    var phaserGame = new Phaser.Game(800, 600, Phaser.AUTO, 'gameContainer');

    phaserGame.state.add('Boot', boot);
    phaserGame.state.add('Preloader', preloader);
    phaserGame.state.add('MainMenu', mainmenu);
    phaserGame.state.add('Game', game);

    phaserGame.state.start('Boot');

    return phaserGame;
});
