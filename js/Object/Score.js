/**
 * Created by m on 2016/3/29.
 */
/**
 * 积分特效
 */
var Score = Class(Boom, {
    lastTime: 0,


    Score: function () {
        this.img = Loader.imgArr[0];
        this.width = 32;
        this.height = 32;
        this.frameSequence = [];

        Game.unit.push(this);
    },


    update: function () {
        if (!this.isVisible) {
            return;
        }
        this.updateFrame();
        this.draw();
        if (this.lastTime > 0.5) {
            this.hide();
            this.lastTime = 0;
        }
        else {
            this.lastTime += 1 / Const.FPS;
        }
    },


    start: function (x, y, scoreNum) {
        var scoreOrder = 115 + scoreNum;
        this.x = x + 25;
        this.y = y + 20;
        this.frameSequence = [scoreOrder];
        this.frameLength = this.frameSequence.length;
        this.show();
    },


    draw: function () {
        Scene.app.drawImage(this.img, this.imgX, this.imgY, this.width, this.height, this.x, this.y, 30, 30);
    },


});