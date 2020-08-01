/**
 * Created by m on 2016/3/26.
 */
/**
 * 游戏界面
 */
var UIGame = {
    runTimer: null,
    y: 0,


    onEnter: function () {
        Game.reset();
        Loader.soundArr[5].play();
        UIGame.y = 225;
        UIGame.update();
    },

    update: function () {
        this.runTimer = requestAnimationFrame(function () {
            UIGame.update();
            Timer.arr.forEach(function (t) {
                t.update();
            });
            UIGame.onUpdate();
        })
    },

    onUpdate: function () {
        Scene.draw();
        Game.command();

        // and draw
        Game.update();
        UIGame.openAnimation();
    },


    openAnimation: function () {
        if (UIGame.y > 0) {
            UIGame.y -= 20;
            Scene.app.fillStyle = '#666';
            Scene.app.fillRect(0, 0, 450, UIGame.y);
            Scene.app.fillRect(0, 448 - UIGame.y, 450, UIGame.y);
        }
    },


    onLeave: function () {
        cancelAnimationFrame(UIGame.runTimer);
    },


};
