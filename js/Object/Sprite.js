/**
 * Created by m on 2016/3/26.
 */
var Sprite = Class(Layer, {
    nextX: 0,
    nextY: 0,
    frameLength: 0,
    currentFrame: 0,
    frameSequence: [],
    frameSeqDefault: [],
    speed: 2,


    Sprite: function () {
    },


    go: function () {
        this.x = this.nextX;
        this.y = this.nextY;
    },


    updateFrame: function () {
        if (this.currentFrame < this.frameLength - 1) {
            this.currentFrame++;
        }
        else {
            this.currentFrame = 0;
        }
        this.imgX = this.frameSequence[this.currentFrame] * this.width;
    },


    setFrameSequence: function (seq) {
        this.frameSequence = seq || this.frameSeqDefault;
        this.frameLength = this.frameSequence.length;
        this.currentFrame = 0;
    },


    frameIsEnd: function () {
        return this.currentFrame === this.frameLength - 1;
    },


    updateNext: function () {
        switch (this.angel) {
            /**
             * left up right down 不超出边界
             */
            case 270:
                this.nextX = this.x - this.speed;
                this.nextY = this.y;
                break;
            case 0:
                this.nextX = this.x;
                this.nextY = this.y - this.speed;
                break;
            case 90:
                this.nextX = this.x + this.speed;
                this.nextY = this.y;
                break;
            case 180:
                this.nextX = this.x;
                this.nextY = this.y + this.speed;
                break;
            default:
                break;
        }
    },


    nextStepIsBarrier: function () {
        var i, length;
        // 不在地图内
        if (!this.nextIsInMap()) {
            return true;
        }

        for (i = 0, length = Game.barrier.length; i < length; i++) {
            if (this.collidesWith(Game.barrier[i]) && Game.barrier[i] !== this._stickySprite) {
                return true;
            }
        }

        return false;
    },


    nextIsInMap: function () {
        return this.nextX > Const.MAP_LEFT_X - 3 &&
            this.nextX < Const.MAP_RIGHT_X - this.width &&
            this.nextY > Const.MAP_UP_Y - 3 &&
            this.nextY < Const.MAP_DOWN_Y - this.height;
    },


    revise: function () {
        var i;
        switch (this.angel) {
            case 270:
            case 90:
                for (i = 0; i < 26; i++) {
                    if (distance(this.y, 16 * i + Const.MAP_UP_Y) <= 8) {
                        this.nextY = 16 * i + Const.MAP_UP_Y;
                    }
                }
                break;
            case 180:
            case 0:
                for (i = 0; i < 26; i++) {
                    if (distance(this.x, 16 * i + Const.MAP_LEFT_X) <= 8) {
                        this.nextX = 16 * i + Const.MAP_LEFT_X;
                    }
                }
                break;
            default:
                break;
        }

    },


    collidesWith: function (s, w) {
        /**
         * 与自身碰撞忽略
         */
        if (this === s || s === null) {
            return false;
        }

        var x1, y1, w1, h1;
        var x2, y2, w2, h2;

        /*
         * 自身精灵坐标
         */
        x1 = this.nextX;
        y1 = this.nextY;

        if (w && this instanceof Bullet && s instanceof TileLayer) {
            switch (this.angel) {
                case 270:
                case 90:
                    w1 = this.width;
                    h1 = w;
                    break;
                case 180:
                case 0:
                    w1 = w;
                    h1 = this.height;
                    break;
                default:
                    break;
            }
        }
        else {
            w1 = this.width;
            h1 = this.height;
        }

        /*
         * 目标精灵
         */
        x2 = s.x;
        y2 = s.y;
        w2 = s.width;
        h2 = s.height;

        if (x1 >= x2 && x1 >= x2 + w2) {
            return false;
        } else if (x1 <= x2 && x1 + w1 <= x2) {
            return false;
        } else if (y1 >= y2 && y1 >= y2 + h2) {
            return false;
        } else if (y1 <= y2 && y1 + h1 <= y2) {
            return false;
        }
        return true;
    },


});