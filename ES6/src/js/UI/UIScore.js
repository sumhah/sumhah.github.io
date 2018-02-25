import Game from '../Game';
import Loader from '../Loader';
import Timer from '../Util/Timer';
import Scene from '../Scene';
import UIStage from './UIStage';

export default class UIScore {
    static runTimer = null;
    static Time = 0;
    static score = {
        small: 0,
        fast: 0,
        middle: 0,
        big: 0,
        total: 0,
    };
    static reviseX = {
        small: 0,
        fast: 0,
        middle: 0,
        big: 0,
    };

    static onEnter() {
        UIScore.Time = 0;
        UIScore.score = {
            small: 0,
            fast: 0,
            middle: 0,
            big: 0,
            total: 0,
        };

        UIScore.runTimer = setInterval(() => {
            Timer.arr.forEach(t => t.update());
            UIScore.onUpdate();
        }, 300);
    }

    static onUpdate() {
        /**
         * 清空画板，并绘制黑色背景
         */
        const app = Scene.app;
        app.clearRect(0, 0, 600, 600);
        app.fillStyle = '#000';
        app.fillRect(0, 0, 600, 600);
        app.font = '22px Arial Black';

        /**
         * 最高积分数
         * @type {string}
         */
        app.fillStyle = '#B53020';
        app.fillText('HI-SCORE     ', 131, 40);
        app.fillStyle = '#EB9F21';
        app.fillText(Game.scoreMax.toString(), 305, 40);

        /**
         * 关卡数
         * @type {string}
         */
        app.fillStyle = '#fff';
        app.fillText('STAGE  ' + Game.stage.toString(), 200, 72);

        /**
         * 玩家得分
         * @type {string}
         */
        app.fillStyle = '#B53020';
        app.fillText('I-PLAYER', 71, 104);
        app.fillStyle = '#EB9F21';
        app.fillText(Game.score.toString(), 170, 137);

        /**
         * 各坦克击杀得分
         * @type {string}
         */
        app.fillStyle = '#fff';
        let s, f, m, b;
        UIScore.reviseX.small = 15 * ((UIScore.score.small * 100).toString().length - 1);
        UIScore.reviseX.fast = 15 * ((UIScore.score.fast * 200).toString().length - 1);
        UIScore.reviseX.middle = 15 * ((UIScore.score.middle * 300).toString().length - 1);
        UIScore.reviseX.big = 15 * ((UIScore.score.big * 500).toString().length - 1);
        s = 15 * (UIScore.score.small.toString().length - 1);
        f = 15 * (UIScore.score.fast.toString().length - 1);
        m = 15 * (UIScore.score.middle.toString().length - 1);
        b = 15 * (UIScore.score.big.toString().length - 1);

        app.fillText((UIScore.score.small * 100).toString() + '    PTS', 94 - UIScore.reviseX.small, 184);
        app.fillText((UIScore.score.fast * 200).toString() + '    PTS', 94 - UIScore.reviseX.fast, 224);
        app.fillText((UIScore.score.middle * 300).toString() + '    PTS', 94 - UIScore.reviseX.middle, 264);
        app.fillText((UIScore.score.big * 500).toString() + '    PTS', 94 - UIScore.reviseX.big, 304);
        app.fillText(UIScore.score.small.toString(), 215 - s, 184);
        app.fillText(UIScore.score.fast.toString(), 215 - f, 224);
        app.fillText(UIScore.score.middle.toString(), 215 - m, 264);
        app.fillText(UIScore.score.big.toString(), 215 - b, 304);

        /**
         * 箭号和坦克图片
         */
        app.drawImage(Loader.imgArr[3], 96, 0, 32, 32, 235, 170, 32, 32);
        app.drawImage(Loader.imgArr[3], 96, 0, 32, 32, 235, 210, 32, 32);
        app.drawImage(Loader.imgArr[3], 96, 0, 32, 32, 235, 250, 32, 32);
        app.drawImage(Loader.imgArr[3], 96, 0, 32, 32, 235, 290, 32, 32);

        app.drawImage(Loader.imgArr[0], 32 * 4, 0, 32, 32, 255, 160, 32, 32);
        app.drawImage(Loader.imgArr[0], 32 * 6, 0, 32, 32, 255, 200, 32, 32);
        app.drawImage(Loader.imgArr[0], 32 * 8, 0, 32, 32, 255, 240, 32, 32);
        app.drawImage(Loader.imgArr[0], 32 * 10, 0, 32, 32, 255, 280, 32, 32);

        /**
         * 总分
         */
        app.fillText('——————', 184, 330);
        app.fillText('TOTAL    ' + UIScore.score.total.toString(), 98, 354);

        /**
         * 积分计算 动画控制
         */
        if (UIScore.score.small < Game.scoreTanksArr.small) {
            UIScore.score.small++;
            Loader.soundArr[6].play();
        } else if (UIScore.score.fast < Game.scoreTanksArr.fast) {
            UIScore.score.fast++;
            Loader.soundArr[6].play();
        } else if (UIScore.score.middle < Game.scoreTanksArr.middle) {
            UIScore.score.middle++;
            Loader.soundArr[6].play();
        } else if (UIScore.score.big < Game.scoreTanksArr.big) {
            UIScore.score.big++;
            Loader.soundArr[6].play();
        } else {
            UIScore.score.total = Game.scoreTanksArr.small * 100 + Game.scoreTanksArr.fast * 200 + Game.scoreTanksArr.middle * 300 + Game.scoreTanksArr.big * 500;
            if (UIScore.Time <= 300) {
                Loader.soundArr[6].play();
            }

            /**
             * 积分计算结束，进入下一关
             */
            UIScore.Time += 300;
            if (UIScore.Time >= 3000) {
                UIScore.onLeave();
                Game.stage++;
                UIStage.onEnter();
            }
        }
    }

    static onLeave() {
        clearInterval(UIScore.runTimer);
    }
}
