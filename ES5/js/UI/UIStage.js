/**
 * Created by m on 2016/4/1.
 */
/**
 * 关卡显示界面
 */
var UIStage = {
    runTimer: null,
    y: 0,


    onEnter: function () {
        UIStage.y = 0;
        UIStage.update();
    },

    update: function () {
        this.runTimer = requestAnimationFrame(function () {
            UIStage.update();
            Timer.arr.forEach(function (t) {
                t.update();
            });
            UIStage.onUpdate();
        })
    },


    onUpdate: function () {
        console.log('UIStage')
        Scene.app.clearRect(0, 0, 600, 600);
        Scene.app.fillStyle = '#000';
        Scene.app.fillRect(0, 0, 512, 600);

        Scene.app.fillStyle = '#666';
        Scene.app.fillRect(0, 0, 512, UIStage.y);
        Scene.app.fillRect(0, 448 - UIStage.y, 512, UIStage.y);
        Scene.app.font = '22px Arial Black';

        if (UIStage.y < 240) {
            UIStage.y += 25;
        }
        else {
            Scene.app.fillStyle = '#000';
            Scene.app.fillText('STAGE    ' + Game.stage.toString(), 193, 234);
            if (Input.isPressed(keyCode.ENTER)) {
                Input.keyRelease(keyCode.ENTER);
                UIStage.onLeave();
                UIGame.onEnter();
            }
        }
    },


    onLeave: function () {
        cancelAnimationFrame(UIStage.runTimer);
    },


};