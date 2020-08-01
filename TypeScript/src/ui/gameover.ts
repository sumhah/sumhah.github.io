/**
 * Created by m on 2016/4/1.
 */
/**
 * 游戏结束界面
 */
var UIGameOver = {
    runTimer: null,
    y: 10,
    Time: 0,
    isplay: false,


    onEnter: function () {
        UIGameOver.update();
    },

    update: function () {
        this.runTimer = requestAnimationFrame(function () {
            UIGameOver.update();
            Timer.arr.forEach(function (t) {
                t.update();
            });
            UIGameOver.onUpdate();
        })
    },


    onUpdate: function () {
        UIGameOver.Time += Const.FRAME_TIME;
        Scene.draw();

        // and draw
        Game.update();

        Scene.app.font = '22px Arial Black';   // #B53120
        Scene.app.fillStyle = '#B53120';
        Scene.app.fillText('GAME', Const.MAP_LEFT_X + 179, Const.MAP_DOWN_Y - UIGameOver.y);
        Scene.app.fillText('OVER', Const.MAP_LEFT_X + 179, Const.MAP_DOWN_Y - UIGameOver.y + 32);
        if (UIGameOver.y < 220) {
            UIGameOver.y += 3;
        }

        if (UIGameOver.Time > 6000) {
            if (!UIGameOver.isplay) {
                UIGameOver.isplay = true;
                Loader.soundArr[1].play();
            }
            Scene.app.clearRect(0, 0, 1000, 1000);
            Scene.app.fillStyle = '#000';
            Scene.app.fillRect(0, 0, 512, 449);
            UIGameOver.showOverImg();
            if (UIGameOver.Time >= 10000) {
                location.reload(true);
            }
        }
    },


    onLeave: function () {
        cancelAnimationFrame(UIGameOver.runTimer);
    },


    showOverImg: function () {
        Scene.app.drawImage(Loader.imgArr[4], 0, 148, 376, 170, 132, 147, 376, 170);
    },


};