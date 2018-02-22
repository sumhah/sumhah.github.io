import Loader from '../Loader';
import Boom from './Boom';
import Scene from '../Scene';

export default class Score extends Boom {
    lastTime = 0;
    img = Loader.imgArr[0];
    width = 32;
    height = 32;
    frameSequence = [];

    constructor() {
        super();
        Game.unit.push(this);
    }

    update() {
        if (!this.isVisible) {
            return;
        }
        this.updateFrame();
        this.draw();
        if (this.lastTime > 0.5) {
            this.hide();
            this.lastTime = 0;
        } else {
            this.lastTime += 1 / Const.FPS;
        }
    }

    start(x, y, scoreNum) {
        this.x = x + 25;
        this.y = y + 20;
        this.frameSequence = [115 + scoreNum];
        this.frameLength = this.frameSequence.length;
        this.show();
    }

    draw() {
        Scene.app.drawImage(this.img, this.imgX, this.imgY, this.width, this.height, this.x, this.y, 30, 30);
    }
}
