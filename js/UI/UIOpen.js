/**
 * Created by m on 2016/4/1.
 */
/**
 * 开场界面
 */
var UIOpen = {
    runTimer: null,
    y: 378,
    Time: 0,
    tank: null,


    onEnter: function () {
        UIOpen.runTimer = setInterval(function () {
            Timer.arr.forEach(function (t) {
                t.update();
            });
            UIOpen.onUpdate();
        }, Const.FPS);

        UIOpen.tank = new Sprite();
        UIOpen.tank.img = Loader.imgArr[0];
        UIOpen.tank.setFrameSequence([0, 0, 14, 14]);
        UIOpen.tank.x = 130;
        UIOpen.tank.y = 272;
        UIOpen.tank.angel = 90;
    },


    onUpdate: function () {
        UIOpen.Time += Const.FPS;
        Scene.app.clearRect(0, 0, 600, 600);
        Scene.app.fillStyle = '#000';
        Scene.app.fillRect(0, 0, 512, 449);
        Scene.app.save();
        Scene.app.translate(0, UIOpen.y);
        Scene.app.font = '22px Arial Black';
        Scene.app.fillStyle = 'white';
        Scene.app.fillText('I-         00  HI- 20000', 36, 72);
        Scene.app.drawImage(Loader.imgArr[4], 0, 0, 376, 138, 56, 96, 376, 138);

        Scene.app.fillText('1  PLAYER', 178, 296);
        Scene.app.fillText('2  PLAYERS', 178, 327);
        Scene.app.fillText('CONSTRUCTION', 178, 358);

        if (UIOpen.y > 0) {
            UIOpen.y -= 4;
            if (input.isPressed(keyCode.ENTER)) {
                UIOpen.y = 0;
                input.keyRelease(keyCode.ENTER);
            }
        }
        else {
            UIOpen.y = 0;
            UIOpen.tank.updateFrame();
            UIOpen.tank.draw();

            if (input.isPressed(keyCode.ENTER)) {
                UIOpen.onLeave();
                UIStage.onEnter();
            }
        }
        Scene.app.restore();
    },


    onLeave: function () {
        clearInterval(UIOpen.runTimer);
    },


};