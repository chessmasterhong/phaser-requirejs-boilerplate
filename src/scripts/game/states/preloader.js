define(function() {
    'use strict';

    function Preloader() {
        this.asset = null;
        this.ready = false;
    }

    Preloader.prototype = {
        preload: function() {
            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

            this.load.image('img', 'media/tilesets/Phaser-Logo-Small.png');
        },

        create: function() {},

        update: function() {
            if(this.ready) {
                this.game.state.start('Game');
            }
        },

        onLoadComplete: function() {
            this.ready = true;
        }
    };

    return Preloader;
});
