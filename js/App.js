/**
 * Created by m on 2016/3/22.
 */
/**
 * 各模块控制
 */
var App = {
    load: function () {
        Loader.loadResource('image', ['images/Tank.png', 'images/Terr.png', 'images/Boom.png', 'images/Misc.png', 'images/UI.png', 'images/Frag.png']);
        Loader.loadResource('audio',
            ['sound/explode1.mp3',
                'sound/gameover.mp3',
                'sound/move1.mp3', 'sound/move2.mp3', 'sound/shoot1.mp3', 'sound/startgame.mp3', 'sound/wall.mp3', 'sound/attack.mp3', 'sound/bonusLife.mp3', 'sound/boom.mp3', 'sound/eat.mp3']);
    },


    /**
     * loader 回调接口
     */
    complete: function () {
        Game.init();
        Scene.init();
        App.run();
    },


    run: function () {
        UIOpen.onEnter();
    },


    pause: function () {
        clearInterval(App.runTimer);
    },

};