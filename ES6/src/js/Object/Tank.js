import Sprite from './Sprite';
import Boom from './Boom';
import Bullet from './Bullet';
import Loader from '../Loader';
import Timer from '../Util/Timer';
import Game from '../Game';
import Const from '../Const';
import Bonus from './Bonus';
import Util from '../Util/util';
import TileLayer from './TileLayer';

export default class Tank extends Sprite {
    // 100 - 500  [116,117,118,119,120] SCORE

    /**
     *  0-3 为玩家坦克 小 中 大 超大型
     *
     *  4 小型坦克
     *  5 快速坦克
     *  6 中型坦克
     *  7 大型坦克 需4下才能摧毁 每打一下变一次色
     *
     *  奖励型坦克：
     *  8 小型红坦克
     *  9 快速红坦克
     *  10 中型红坦克
     */
    type = 0;
    team = 0;

    /**
     * 坦克动画帧序列
     * frame序列里的Id + 14 为对应的履带移动帧
     */

    HP = 1;
    isInvincible = false;
    score = 0;              // 被击毁的积分
    bullets = [];            // 子弹数组

    state = 'death';
    _isSet = false;
    _boom = null;
    _birthTime = 0;

    constructor() {
        super();
        this.img = Loader.imgArr[0];
        this.frameSequence = [];
        this._boom = new Boom(true);
    }

    /**
     * set type 的同时自动初始化动画帧序列
     * @param type
     */
    setType(type) {
        this.type = type;

        /**
         *  0-3 为玩家坦克 小 中 大 超大型
         *
         *  4 小型坦克
         *  5 快速坦克
         *  6 中型坦克
         *  7 大型坦克 需4下才能摧毁 每打一下变一次色
         *
         *  奖励型坦克：
         *  8 小型红坦克
         *  9 快速红坦克
         *  10 中型红坦克
         */
        switch (this.type) {
            case 0:
                this.frameSeqDefault = [0, 14];
                this.setBullets(1, 1, 5);
                break;
            case 1:
                this.frameSeqDefault = [1, 15];
                this.setBullets(1, 1, 10);
                break;
            case 2:
                this.frameSeqDefault = [2, 16];
                this.setBullets(2, 1, 10);
                break;
            case 3:
                this.frameSeqDefault = [3, 17];
                this.setBullets(3, 2, 10);
                break;
            case 4:
                this.score = 100;
                this.speed = 3;
                this.frameSeqDefault = [4, 18];
                this.setBullets(1, 1, 6);
                break;
            case 5:
                this.score = 200;
                this.speed = 5;
                this.frameSeqDefault = [6, 20];
                this.setBullets(1, 1, 8);
                break;
            case 6:
                this.score = 300;
                this.frameSeqDefault = [8, 22];
                this.setBullets(2, 1, 6);
                break;
            case 7:
                this.score = 500;
                this.speed = 1;
                this.HP = 4;
                this.frameSeqDefault = [12, 26];
                this.setBullets(2, 2, 6);
                break;
            case 8:
                this.score = 100;
                this.speed = 3;
                this.frameSeqDefault = [5, 19, 4, 18];
                this.setBullets(1, 1, 6);
                break;
            case 9:
                this.score = 200;
                this.speed = 5;
                this.frameSeqDefault = [7, 21, 6, 20];
                this.setBullets(1, 1, 8);
                break;
            case 10:
                this.score = 300;
                this.frameSeqDefault = [9, 23, 8, 22];
                this.setBullets(2, 1, 8);
                break;
            default:
                break;
        }
        this.setFrameSequence(false);
    }

    setBullets(bulletMax, power, speed) {
        if (this._isSet) {
            this.reset();
        } else {
            this._isSet = true;
        }
        // 子类没有bullets数组  并且没有初始化，会往有bullets数组的类上push子弹
        this.bullets = [...Array(bulletMax)].map(() => new Bullet(this.team, power, speed));
    }

    fire(hasSound) {
        // 找出空闲子弹并发射
        const bullet = this.bullets.find(bullet => bullet.isIdle);
        if (bullet) {
            bullet.shot(this.x, this.y, this.angel);

            if (hasSound) {
                Loader.soundArr[7].play();
            }
        }
    }

    damage() {
        if (this.isInvincible) {
            return;
        }
        this.HP -= 1;
        if (this.HP <= 0) {
            this.death();
            return;
        }
        if (this.type === 7) {
            switch (this.HP) {
                case 4:
                    this.setFrameSequence([12, 26]);
                    break;
                case 3:
                    this.setFrameSequence([11, 25]);
                    break;
                case 2:
                    this.setFrameSequence([13, 27]);
                    break;
                case 1:
                    this.setFrameSequence([10, 24]);
                    break;
                default:
                    break;
            }
            this.updateFrame();
        }
    }

    setInvincible(time) {
        this.isInvincible = true;
        new Timer(() => {
            this.isInvincible = false;
        }, time);
    }

    death() {
        if (this.type >= 8) {
            new Bonus(Util.random(1, 6), Util.random(Const.MAP_LEFT_X, Const.MAP_RIGHT_X - 32), Util.random(Const.MAP_UP_Y, Const.MAP_DOWN_Y - 32));
        }
        switch (this.score) {
            case 100:
                Game.scoreTanksArr.small += 1;
                break;
            case 200:
                Game.scoreTanksArr.fast += 1;
                break;
            case 300:
                Game.scoreTanksArr.middle += 1;
                break;
            case 500:
                Game.scoreTanksArr.big += 1;
                break;
            default:
                break;
        }
        Game.score += this.score;
        this._boom.start(this.x - 28, this.y - 28, this.score / 100);
        this.state = 'death';
        Game.barrier.remove(this);

        if (this === Game.player) {
            Game.curGrade = 0;
            this.setType(Game.curGrade);
            if (Game.life >= 1) {
                Game.life -= 1;
                Game.birthPlayer();
            } else {
                Game.over();
            }
        }
    }

    birth() {
        this.setFrameSequence([112, 113, 114, 115]);
        this.updateFrame();
        this.state = 'birth';
        this._birthTime = 0;
    }

    reset() {
        if (this.type !== 7) {
            this.HP = 1;
        } else {
            this.HP = 4;
        }
        this.bullets.forEach((b) => {
            Game.unit.remove(b._boom._scoreSprite);
            Game.unit.remove(b._boom);
            Game.unit.remove(b);
            Game.barrier.remove(b);
        });
        this.bullets = [];
    }

    smoothMove() {
        if (Game.barrier.some(b => b instanceof TileLayer && this.collidesWith(b))) {
            this.revise();
        }
    }
}
