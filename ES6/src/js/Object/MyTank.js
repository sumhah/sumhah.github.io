import Tank from './Tank';
import Boot from './Boot';
import Game from '../Game';
import Loader from '../Loader';
import Const from '../Const';

export default class MyTank extends Tank {
    speed = 4;
    _birthTime = 0;
    _birthDelay = 0;
    _stickySprite = null;

    constructor() {
        super();
        this.team = 1;
        this.bullets = [];
        this._bootSprite = new Boot();
    }

    update() {
        switch (this.state) {
            case 'death':
                return;
            case 'birth':
                if (this._birthTime > 1) {
                    this.state = 'stay';
                    this.setFrameSequence(false);
                    this.updateFrame();
                    Game.barrier.push(this);
                    this.updateNext();

                    // 检测是否有粘住坦克，如果有则允许移动，并且移动后不可在黏住
                    Game.barrier.filter(unit => this.collidesWith(unit)).forEach(unit => {
                        this._stickySprite = unit;
                        unit._stickySprite = this;
                    });
                } else {
                    this._birthTime += 1 / Const.FPS;
                }

                if (this._birthDelay > 0) {
                    this._birthDelay = 0;
                    this.updateFrame();
                } else {
                    this._birthDelay += 1;
                }
                this.draw();
                break;
            case 'stay':
                if (this.isInvincible) {
                    this._bootSprite.update(this.x, this.y);
                }
                this.draw();
                break;
            case 'moving':
                Loader.soundArr[2].play();
                this.updateNext();
                if (this.isInvincible) {
                    this._bootSprite.update(this.nextX, this.nextY);
                }
                this.updateFrame();
                this.smoothMove();
                if ((!this.nextStepIsBarrier())) {
                    this.go();
                    if (this._stickySprite !== null && !this.collidesWith(this._stickySprite)) {
                        this._stickySprite = null;
                    }
                }
                this.draw();
                break;
            default:
                break;
        }
    }

    fire() {
        super.fire(true);
    }
}



