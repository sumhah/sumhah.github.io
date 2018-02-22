import Game from '../Game';
import Timer from '../Util/Timer';
import Scene from '../Scene';
import Input from '../Input';

export default class UIStage {
    runTimer = null;
    y = 0;

    onEnter() {
        UIStage.y = 0;
        UIStage.runTimer = setInterval(() => {
            Timer.arr.forEach(t => t.update());
            UIStage.onUpdate();
        }, Const.FPS);
    }

    onUpdate() {
        const app = Scene.app;
        app.clearRect(0, 0, 600, 600);
        app.fillStyle = '#000';
        app.fillRect(0, 0, 512, 600);

        app.fillStyle = '#666';
        app.fillRect(0, 0, 512, UIStage.y);
        app.fillRect(0, 448 - UIStage.y, 512, UIStage.y);
        app.font = '22px Arial Black';

        if (UIStage.y < 240) {
            UIStage.y += 25;
        } else {
            app.fillStyle = '#000';
            app.fillText('STAGE    ' + Game.stage.toString(), 193, 234);
            if (Input.isPressed(keyCode.ENTER)) {
                Input.keyRelease(keyCode.ENTER);
                UIStage.onLeave();
                UIGame.onEnter();
            }
        }
    }

    onLeave() {
        clearInterval(UIStage.runTimer);
    }
}
