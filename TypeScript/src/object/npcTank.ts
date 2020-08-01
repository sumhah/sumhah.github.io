/**
 * Created by m on 2016/3/22.
 */
/**
 * 电脑坦克类
 */
var NpcTank = Class(Tank, {
    fireTime: 0,
    stayTime: 0,
    _birthTime: 0,
    _birthDelay: 0,
    _stickySprite: null,

    NpcTank: function () {
        this.Tank();
        this.team = 2;
        this.bullets = [];
    },


    update: function () {
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

                if (this._birthDelay > 1) {
                    this._birthDelay = 0;
                    this.updateFrame();
                }
                else {
                    this._birthDelay += 1;
                }
                break;
            case 'stay':
                this.stayTime = this.stayTime + Const.FRAME_TIME / 1000;
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
                }
                else {
                    this.fireTime += Const.FRAME_TIME / 1000;
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
                }
                else {
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
                }
                else {
                    this.fireTime += Const.FRAME_TIME / 1000;
                }
                break;
            default:
                break;
        }
        this.draw();
    },


    autoToTurn: function () {
        this.state = 'moving';
        this.setDir(Math.floor(Math.random() * 4));
    },


});

