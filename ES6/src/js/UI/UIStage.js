import Game from '../Game';
import Timer from '../Util/Timer';
import Scene from '../Scene';
import Input from '../Input';
import Const from '../Const';
import UIGame from './UIGame';

export default class UIStage {
    static runTimer = null;
    static y = 0;

    static onEnter() {
        UIStage.y = 0;
        UIStage.runTimer = setInterval(() => {
            Timer.arr.forEach(t => t.update());
            UIStage.onUpdate();
        }, Const.FPS);
    }

    static onUpdate() {
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
            if (Input.isPressed(Const.KEY_CODE.ENTER)) {
                Input.keyRelease(Const.KEY_CODE.ENTER);
                UIStage.onLeave();
                UIGame.onEnter();
            }
        }
    }

    static onLeave() {
        clearInterval(UIStage.runTimer);
    }
}
