import Sprite from './Sprite';

export default class Boot extends Sprite {

    constructor() {
        super();
        this.img = Loader.imgArr[3];
        this.width = 32;
        this.height = 32;
        this.setFrameSequence([1, 2]);
    }

    update(x, y) {
        this.x = x;
        this.y = y;
        this.updateFrame();
        this.draw();
    }
}
