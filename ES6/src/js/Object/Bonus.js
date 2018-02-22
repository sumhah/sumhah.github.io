import Sprite from 'Sprite';
import Timer from '../Util/Timer';

export default class Bonus extends Sprite {
    img = Loader.imgArr[0];
    type;
    x;
    y;
    width = 32;
    height = 32;
    fps = 1;

    constructor(type, x, y) {
        super();
        this.type = type;
        this.x = x;
        this.y = y;

        /**
         *  1 喇叭  临时升级基地墙
         *  2 星星  升级坦克
         *  3 坦克  奖励生命
         *  4 包裹  无敌
         *  5 炸弹  所有敌方坦克爆炸
         *  6 时钟  所有敌方坦克定时
         */
        this.setFrameSequence([this.type + 120]);
        this.updateFrame();

        Game.unit.push(this);
    }

    update() {
        this.fps += 1;
        switch (this.fps) {
            case 1:
            case 2:
            case 3:
            case 4:
            case 5:
            case 6:
                this.draw();
                break;
            case 12:
                this.fps = 0;
                break;
            default:
                break;
        }
        if (Game.player.collidesWith(this)) {
            Loader.soundArr[10].play();
            switch (this.type) {
                case 1:
                    // 临时升级基地墙
                    Game.tileUpGrade();
                    break;
                case 2:
                    Game.curGrade = Game.curGrade >= 3 ? 3 : Game.curGrade + 1;
                    Game.player.setType(Game.curGrade);
                    break;
                case 3:
                    Game.life += 1;
                    Loader.soundArr[8].play();
                    break;
                case 4:
                    Game.player.setInvincible(20000);
                    break;
                case 5:
                    Loader.soundArr[9].play();
                    try {
                        Game.enemyLiveArr.forEach(tank => tank.death());
                    } catch (e) {
                        throw e;
                    }
                    break;
                case 6:
                    Game.isFreeze = true;
                    new Timer(function () {
                        Game.isFreeze = false;
                    }, 16000);
                    break;
                default:
                    break;
            }
            Game.unit.remove(this);
        }
    }
}
