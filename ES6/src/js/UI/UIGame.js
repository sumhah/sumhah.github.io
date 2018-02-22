import Game from '../Game';
import Loader from '../Loader';
import Timer from '../Util/Timer';
import Scene from '../Scene';

export default class UIGame {
    runTimer = null;
    y = 0;

    onEnter() {
        Game.reset();
        Loader.soundArr[5].play();

        UIGame.runTimer = setInterval(() => {
            Timer.arr.forEach(t => t.update());
            UIGame.onUpdate();
        }, Const.FPS);

        UIGame.y = 225;
    }

    onUpdate() {
        Scene.draw();
        Game.command();

        // and draw
        Game.update();
        UIGame.openAnimation();
    }

    openAnimation() {
        if (UIGame.y > 0) {
            UIGame.y -= 20;
            Scene.app.fillStyle = '#666';
            Scene.app.fillRect(0, 0, 450, UIGame.y);
            Scene.app.fillRect(0, 448 - UIGame.y, 450, UIGame.y);
        }
    }

    onLeave() {
        clearInterval(UIGame.runTimer);
    }
}
