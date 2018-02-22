import Loader from '../Loader';
import Timer from '../Util/Timer';
import Scene from '../Scene';
import Const from '../Const';
import Sprite from '../Object/Sprite';
import Input from '../Input';

export default class UIOpen {
    runTimer = null;
    y = 378;
    Time = 0;
    tank = null;

    onEnter() {
        UIOpen.runTimer = setInterval(() => {
            Timer.arr.forEach(t => t.update());
            UIOpen.onUpdate();
        }, Const.FPS);

        const tank = new Sprite();
        tank.img = Loader.imgArr[0];
        tank.setFrameSequence([0, 0, 14, 14]);
        tank.x = 130;
        tank.y = 272;
        tank.angel = 90;
        UIOpen.tank = tank;
    }

    onUpdate() {
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
            if (Input.isPressed(keyCode.ENTER)) {
                UIOpen.y = 0;
                Input.keyRelease(keyCode.ENTER);
            }
        }
        else {
            UIOpen.y = 0;
            UIOpen.tank.updateFrame();
            UIOpen.tank.draw();

            if (Input.isPressed(keyCode.ENTER)) {
                UIOpen.onLeave();
                UIStage.onEnter();
            }
        }
        Scene.app.restore();
    }

    onLeave() {
        clearInterval(UIOpen.runTimer);
    }
}
