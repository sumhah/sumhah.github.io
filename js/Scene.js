/**
 * Created by m on 2016/3/21.
 */
/**
 * 绘制
 */
var Scene = {
    appCanvas: null,
    app: null,


    init: function () {
        Scene.appCanvas = document.getElementById('drawing');
        Scene.app = Scene.appCanvas.getContext('2d');
    },


    draw: function () {
        Scene.backgroundDraw();
        Scene.rightBarDraw();
    },


    backgroundDraw: function () {
        Scene.app.clearRect(0, 0, 1000, 1000);
        Scene.app.fillStyle = '#000';

        /**
         * map width = 416  height = 416
         */
        Scene.app.fillRect(Const.MAP_LEFT_X, Const.MAP_UP_Y, Const.MAP_WIDTH, Const.MAP_HEIGHT);
    },


    /**
     * 右栏 数据栏绘制
     */
    rightBarDraw: function () {
        var i, line = 1, order = 1;

        //待产坦克图标
        for (i = 0; i < Game.expectantEnemyNum; i++) {
            Scene.app.drawImage(Loader.imgArr[3], 0, 16, 16, 16, Const.MAP_RIGHT_X + 19 + (order - 1) * 16, Const.MAP_UP_Y + 17 + (line - 1) * 16, 16, 16);
            if (order === 2) {
                order = 1;
                line++;
            }
            else {
                order++;
            }
        }

        // IP 剩余生命
        Scene.app.font = '22px Arial Black';
        Scene.app.fillText('I P', Const.MAP_RIGHT_X + 15, Const.MAP_UP_Y + 258);
        Scene.app.drawImage(Loader.imgArr[3], 16, 16, 16, 16, Const.MAP_RIGHT_X + 15, Const.MAP_UP_Y + 262, 16, 16);
        Scene.app.fillText(Game.life.toString(), Const.MAP_RIGHT_X + 33, Const.MAP_UP_Y + 278);

        // 旗帜 当前关数
        Scene.app.drawImage(Loader.imgArr[3], 128, 0, 32, 32, Const.MAP_RIGHT_X + 15, Const.MAP_UP_Y + 334, 32, 32);
        Scene.app.fillText(Game.stage.toString(), Const.MAP_RIGHT_X + 34, Const.MAP_UP_Y + 386);
    },


};
