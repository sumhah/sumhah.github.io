/**
 * Created by m on 2016/3/26.
 */
var Layer = Class({
    x: 0,
    y: 0,
    width: 32,
    height: 32,
    img: null,
    imgX: 0,
    imgY: 0,
    angel: 0,
    isVisible: true,


    Layer: function () {
        this.img = Loader.imgArr[1];
    },


    setPos: function (x, y) {
        this.x = x + Const.MAP_LEFT_X;
        this.y = y + Const.MAP_UP_Y;
    },


    setSize: function (w, h) {
        this.width = w;
        this.height = h;
    },


    getX: function () {
        return this.x;
    },


    getY: function () {
        return this.y;
    },


    setDir: function (dir) {
        switch (dir) {
            /**
             *  up 0
             *  right 1
             *  down 2
             *  left 3
             */
            case 0:
                this.angel = 0;
                break;
            case 1:
                this.angel = 90;
                break;
            case 2:
                this.angel = 180;
                break;
            case 3:
                this.angel = 270;
                break;
            default:
                break;
        }
    },


    show: function () {
        this.isVisible = true;
    },


    hide: function () {
        this.isVisible = false;
    },


    draw: function () {
        Scene.app.save();
        Scene.app.translate(this.x + this.width / 2, this.y + this.height / 2);
        Scene.app.rotate(this.angel * Math.PI / 180);
        Scene.app.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
        Scene.app.drawImage(this.img, this.imgX, this.imgY, this.width, this.height, this.x, this.y, this.width, this.height);
        Scene.app.restore();
    },


});