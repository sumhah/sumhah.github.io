import Loader from '../Loader';
import '../Const';
import Scene from '../Scene';

export default class Layer {
    x = 0;
    y = 0;
    width = 32;
    height = 32;
    img = Loader.imgArr[1];
    imgX = 0;
    imgY = 0;
    angel = 0;
    isVisible = true;
    static keyCodeToAngle = {
        [KEY_CODE.UP]: 0,
        [KEY_CODE.RIGHT]: 90,
        [KEY_CODE.DOWN]: 180,
        [KEY_CODE.LEFT]: 270,
    };

    setPos(x, y) {
        this.x = x + Const.MAP_LEFT_X;
        this.y = y + Const.MAP_UP_Y;
    }

    setSize(w, h) {
        this.width = w;
        this.height = h;
    }

    setDir(keyCodeDir) {
        this.angel = Layer.keyCodeToAngle[keyCodeDir];
    }

    show() {
        this.isVisible = true;
    }

    hide() {
        this.isVisible = false;
    }

    draw() {
        const app = Scene.app;
        app.save();
        app.translate(this.x + this.width / 2, this.y + this.height / 2);
        app.rotate(this.angel * Math.PI / 180);
        app.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
        app.drawImage(this.img, this.imgX, this.imgY, this.width, this.height, this.x, this.y, this.width, this.height);
        app.restore();
    }
}
