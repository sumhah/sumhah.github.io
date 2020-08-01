/**
 * Created by m on 2016/3/22.
 */
/**
 * 玩家坦克类
 */
var MyTank = Class(Tank, {
    speed: 4,
    _birthTime: 0,
    _birthDelay: 0,
    _stickySprite: null,


    MyTank: function () {
        this.Tank();
        this.team = 1;
        this.bullets = [];
        this._bootSprite = new Boot();
    },


    update: function () {
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

                    /**
                     * 检测是否有粘住坦克，如果有则允许移动，并且移动后不可在黏住
                     */
                    for (var j = 0, length = Game.barrier.length; j < length; j++) {
                        if (this.collidesWith(Game.barrier[j])) {
                            this._stickySprite = Game.barrier[j];
                            Game.barrier[j]._stickySprite = this;
                        }
                    }
                }
                else {
                    this._birthTime += Const.FRAME_TIME / 1000;
                }

                if (this._birthDelay > 0) {
                    this._birthDelay = 0;
                    this.updateFrame();
                }
                else {
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
    },
});


