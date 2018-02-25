import Game from '../Game';
import Loader from '../Loader';
import Timer from '../Util/Timer';
import Scene from '../Scene';
import Const from '../Const';

export default class UIGame {
    static runTimer = null;
    static y = 0;

    static onEnter() {
        Game.reset();
        Loader.soundArr[5].play();

        UIGame.runTimer = setInterval(() => {
            Timer.arr.forEach(t => t.update());
            UIGame.onUpdate();
        }, Const.FPS);

        UIGame.y = 225;
    }

    static onUpdate() {
        Scene.draw();
        Game.command();

        // and draw
        Game.update();
        UIGame.openAnimation();
    }

    static openAnimation() {
        if (UIGame.y > 0) {
            UIGame.y -= 20;
            Scene.app.fillStyle = '#666';
            Scene.app.fillRect(0, 0, 450, UIGame.y);
            Scene.app.fillRect(0, 448 - UIGame.y, 450, UIGame.y);
        }
    }

    static onLeave() {
        clearInterval(UIGame.runTimer);
    }
}
