import '../Const';
import 'expand';

export default class Timer {
    static arr = [];

    constructor(fn, t) {
        this.time = 0;
        this.fn = fn;
        this.endTime = t;
        Timer.arr.push(this);
    }

    update() {
        this.time += FPS;
        if (this.time > this.endTime) {
            this.fn();
            Timer.arr.remove(this);
        }
    }
}
