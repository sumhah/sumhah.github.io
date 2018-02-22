import Tank from './Tank';
import Loader from '../Loader';
import Const from '../Const';

export default class NpcTank extends Tank {
    fireTime = 0;
    stayTime = 0;
    _birthTime = 0;
    _birthDelay = 0;
    _stickySprite = null;

    constructor() {
        super();
        this.team = 2;
        this.bullets = [];
    }

    update() {
        switch (this.state) {
            case 'death':
                return;
            case 'birth':
                if (this._birthTime > 1.2) {
                    this.state = 'moving';
                    this.setFrameSequence(false);
                    Game.barrier.push(this);
                    Game.enemyLiveArr.push(this);
                    this.updateNext();
                    this.updateFrame();
                    // 检测是否有粘住坦克，如果有则允许移动，并且移动后不可在黏住
                    Game.barrier.filter(unit => this.collidesWith(unit)).forEach(unit => {
                        this._stickySprite = unit;
                        unit._stickySprite = this;
                    });
                } else {
                    this._birthTime += 1 / Const.FPS;
                }

                if (this._birthDelay > 1) {
                    this._birthDelay = 0;
                    this.updateFrame();
                } else {
                    this._birthDelay += 1;
                }
                break;
            case 'stay':
                this.stayTime = this.stayTime + (1 / Const.FPS);
                if (this.stayTime > 0.5 + Math.random() * 2) {
                    if (!Game.isFreeze) {
                        this.autoToTurn();
                    }
                    this.stayTime = 0;
                }
                if (this.type >= 8) {
                    this.updateFrame();  //红坦克停留时也闪烁
                }

                /**
                 * AI发射炮弹
                 */
                if (this.fireTime > 3 + Math.random() * 2) {
                    if (!Game.isFreeze) {
                        this.fire();
                    }
                    this.fireTime = 0;
                } else {
                    this.fireTime += 1 / Const.FPS;
                }
                break;
            case 'moving':
                if (Game.isFreeze) {
                    this.state = 'stay';
                    break;
                }
                Loader.soundArr[3].play();
                this.updateNext();
                this.updateFrame();
                this.smoothMove();
                if (!this.nextStepIsBarrier()) {
                    this.go();
                    if (this._stickySprite !== null && !this.collidesWith(this._stickySprite)) {
                        this._stickySprite = null;
                    }
                } else {
                    /**
                     * AI撞墙后停留一会儿，然后智能转向
                     */
                    this.state = 'stay';
                }

                /**
                 * AI发射炮弹
                 */
                if (this.fireTime > Math.random() * 2) {
                    this.fire();
                    this.fireTime = 0;
                } else {
                    this.fireTime += 1 / Const.FPS;
                }
                break;
            default:
                break;
        }
        this.draw();
    }

    autoToTurn() {
        this.state = 'moving';
        this.setDir(Math.floor(Math.random() * 4));
    }
}
