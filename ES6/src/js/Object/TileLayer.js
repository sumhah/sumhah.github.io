import Sprite from './Sprite';
import Game from '../Game';
import Loader from '../Loader';

export default class TileLayer extends Sprite {
    constructor(type, x, y) {
        super();
        if (type !== 8) {
            this.img = Loader.imgArr[1];
            this.type = type;
            this.team = 10;
            this.setSize(32, 32);
            this.setPos(x, y);

            /**
             *  0 草地   坦克 子弹 可通过
             *  1 老鹰   不可通过    barrier
             *  2 倒旗
             *  3 水     坦克不可通过 子弹可通过 barrier
             *  4 雪地   坦克速度加速
             *  5 水泥墙   坦克 子弹 不可通过  强力子弹可摧毁 barrier
             *  6 土墙   坦克 子弹 不可通过  普通子弹可摧毁 barrier
             */
            switch (this.type) {
                case 0:
                    this.frameSeqDefault = [0];
                    break;
                case 1:
                    this.frameSeqDefault = [1];
                    Game.barrier.push(this);
                    break;
                case 2:
                    this.frameSeqDefault = [2];
                    break;
                case 3:
                    this.frameSeqDefault = [3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
                    Game.barrier.push(this);
                    break;
                case 4:
                    this.frameSeqDefault = [5];
                    break;
                case 5:
                    this.setSize(16, 16);
                    this.frameSeqDefault = [12];
                    Game.barrier.push(this);
                    break;
                case 6:
                    this.setSize(16, 16);
                    this.frameSeqDefault = [42];
                    Game.barrier.push(this);
                    break;
                default:
                    break;
            }
            this.setFrameSequence();
            Game.unit.push(this);
            this.show();
        }
    }

    setType(type) {
        this.type = type;

        switch (this.type) {
            case 0:
                this.frameSeqDefault = [0];
                break;
            case 1:
                this.frameSeqDefault = [1];
                Game.barrier.push(this);
                break;
            case 2:
                this.frameSeqDefault = [2];
                break;
            case 3:
                this.frameSeqDefault = [3, 3, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 4, 4];
                Game.barrier.push(this);
                break;
            case 4:
                this.frameSeqDefault = [5];
                break;
            case 5:
                this.setSize(16, 16);
                this.frameSeqDefault = [12];
                Game.barrier.push(this);
                break;
            case 6:
                this.setSize(16, 16);
                this.frameSeqDefault = [42];
                Game.barrier.push(this);
                break;
            default:
                break;
        }
        this.setFrameSequence();
        this.show();
    }

    update() {
        if (this.isVisible) {
            this.updateFrame();
            this.draw();
        }
    }

    destroy() {
        // 老鹰击毁，游戏结束
        if (this.type === 1) {
            this.type = 2;
            this.setFrameSequence([2]);
            Loader.soundArr[0].playbackRate = 1.5;
            Loader.soundArr[0].play();
            Game.over();
        } else {
            Game.barrier.remove(this);
            this.hide();
        }
    }
}
