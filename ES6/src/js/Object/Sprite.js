import Layer from 'Layer';
import '../Util/util';

export default class Sprite extends Layer {
    nextX = 0;
    nextY = 0;
    frameLength = 0;
    currentFrame = 0;
    frameSequence = [];
    frameSeqDefault = [];
    speed = 2;

    constructor() {
        super();
    }

    go() {
        this.x = this.nextX;
        this.y = this.nextY;
    }

    updateFrame() {
        if (this.currentFrame < this.frameLength - 1) {
            this.currentFrame += 1;
        } else {
            this.currentFrame = 0;
        }
        this.imgX = this.frameSequence[this.currentFrame] * this.width;
    }

    setFrameSequence(seq) {
        this.frameSequence = seq || this.frameSeqDefault;
        this.frameLength = this.frameSequence.length;
        this.currentFrame = 0;
    }

    frameIsEnd() {
        return this.currentFrame === this.frameLength - 1;
    }

    updateNext() {
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
    }

    nextStepIsBarrier() {
        // 不在地图内
        if (!this.nextIsInMap()) {
            return true;
        }

        return Game.barrier.some(barrier => this.collidesWith(barrier) && barrier !== this._stickySprite);
    }

    nextIsInMap() {
        return this.nextX > Const.MAP_LEFT_X - 3 &&
            this.nextX < Const.MAP_RIGHT_X - this.width &&
            this.nextY > Const.MAP_UP_Y - 3 &&
            this.nextY < Const.MAP_DOWN_Y - this.height;
    }

    revise() {
        switch (this.angel) {
            case 270:
            case 90:
                for (let i = 0; i < 26; i += 1) {
                    if (distance(this.y, 16 * i + Const.MAP_UP_Y) <= 8) {
                        this.nextY = 16 * i + Const.MAP_UP_Y;
                    }
                }
                break;
            case 180:
            case 0:
                for (let i = 0; i < 26; i += 1) {
                    if (distance(this.x, 16 * i + Const.MAP_LEFT_X) <= 8) {
                        this.nextX = 16 * i + Const.MAP_LEFT_X;
                    }
                }
                break;
            default:
                break;
        }
    }

    collidesWith(targetSprite, width) {
        // 与自身碰撞忽略
        if (this === targetSprite || targetSprite === null) {
            return false;
        }

        let x1, y1, w1, h1;
        let x2, y2, w2, h2;

        // 自身精灵坐标
        x1 = this.nextX;
        y1 = this.nextY;

        if (width && this instanceof Bullet && targetSprite instanceof TileLayer) {
            switch (this.angel) {
                case 270:
                case 90:
                    w1 = this.width;
                    h1 = width;
                    break;
                case 180:
                case 0:
                    w1 = width;
                    h1 = this.height;
                    break;
                default:
                    break;
            }
        } else {
            w1 = this.width;
            h1 = this.height;
        }

        // 目标精灵
        x2 = targetSprite.x;
        y2 = targetSprite.y;
        w2 = targetSprite.width;
        h2 = targetSprite.height;

        if (x1 >= x2 && x1 >= x2 + w2) {
            return false;
        }
        if (x1 <= x2 && x1 + w1 <= x2) {
            return false;
        }
        if (y1 >= y2 && y1 >= y2 + h2) {
            return false;
        }
        return !(y1 <= y2 && y1 + h1 <= y2);
    }
}
