/**
 * @Author: sumhah
 * @Date: 2020/8/1
 */

const arr = [];

export 
var Timer = Class({
    Static: {
        arr: [],
    },


    Timer: function (fn, t) {
        this.time = 0;
        this.fn = fn;
        this.endTime = t;
        Timer.arr.push(this);
    },


    update: function () {
        this.time += Const.FRAME_TIME;
        if (this.time > this.endTime) {
            this.fn();
            Timer.arr.remove(this);
        }
    },


});
