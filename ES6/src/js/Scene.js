import Const from './Const';

export default class Scene {
    static appCanvas;
    static app;

    static init(canvas) {
        this.appCanvas = canvas;
        this.app = canvas.getContext('2d');
    }

    static draw() {
        Scene.backgroundDraw();
        Scene.rightBarDraw();
    }

    static backgroundDraw() {
        const app = Scene.app;
        app.clearRect(0, 0, 1000, 1000);
        app.fillStyle = '#000';
        app.fillRect(Const.MAP_LEFT_X, Const.MAP_UP_Y, Const.MAP_WIDTH, Const.MAP_HEIGHT);
    }

    // 右栏 数据栏绘制
    static rightBarDraw() {
        let line = 1, order = 1;
        const app = Scene.app;

        //待产坦克图标
        for (let i = 0; i < Game.expectantEnemyNum; i += 1) {
            app.drawImage(Loader.imgArr[3], 0, 16, 16, 16, Const.MAP_RIGHT_X + 19 + (order - 1) * 16, Const.MAP_UP_Y + 17 + (line - 1) * 16, 16, 16);
            if (order === 2) {
                order = 1;
                line += 1;
            } else {
                order += 1;
            }
        }

        // IP 剩余生命
        app.font = '22px Arial Black';
        app.fillText('I P', Const.MAP_RIGHT_X + 15, Const.MAP_UP_Y + 258);
        app.drawImage(Loader.imgArr[3], 16, 16, 16, 16, Const.MAP_RIGHT_X + 15, Const.MAP_UP_Y + 262, 16, 16);
        app.fillText(Game.life.toString(), Const.MAP_RIGHT_X + 33, Const.MAP_UP_Y + 278);

        // 旗帜 当前关数
        app.drawImage(Loader.imgArr[3], 128, 0, 32, 32, Const.MAP_RIGHT_X + 15, Const.MAP_UP_Y + 334, 32, 32);
        app.fillText(Game.stage.toString(), Const.MAP_RIGHT_X + 34, Const.MAP_UP_Y + 386);
    }
}
