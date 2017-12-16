/**
 * Created by m on 2016/3/27.
 */
/**
 * 爆炸特效
 */
var Boom = Class(Sprite, {
    lastTime: 0,
    isVisible: false,
    _big: false,
    _scoreSprite: null,


    Boom: function (big) {
        this.img = Loader.imgArr[2];
        this.width = 64;
        this.height = 64;
        this._big = big;
        this.frameSequence = big ? [0, 1, 2, 3, 4, 1] : [0, 1];
        this.frameLength = this.frameSequence.length;
        this._scoreSprite = new Score();
        Game.unit.push(this);
    },


    update: function () {
        if (!this.isVisible) {
            return;
        }
        this.draw();
        if (this._big) {
            if (this.currentFrame === 1) {
                Loader.soundArr[0].playbackRate = 1.2;
                Loader.soundArr[0].play();
            }
            if (this.lastTime > 0.02) {
                this.lastTime = 0;
            }
            else {
                this.lastTime += 1 / Const.FPS;
                return;
            }
        }

        if (this.frameIsEnd()) {
            this.hide();
            if (this.score >= 1) {
                this._scoreSprite.start(this.x, this.y, this.score);
            }
        }
        else {
            this.updateFrame();
        }
    },


    start: function (x, y, score) {
        this.reset();
        this.show();
        this.x = x;
        this.y = y;
        this.score = score;
    },


    reset: function () {
        this.currentFrame = 0;
    },


});

var Boot = Class(Sprite, {


    Boot: function () {
        this.img = Loader.imgArr[3];
        this.width = 32;
        this.height = 32;
        this.setFrameSequence([1, 2]);
    },


    update: function (x, y) {
        this.x = x;
        this.y = y;
        this.updateFrame();
        this.draw();
    },


});