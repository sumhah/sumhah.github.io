/**
 * Created by zj-db0758 on 17/12/24.
 */

import Const from './Const';
import Loader from './Loader';

class App {
    constructor(canvas) {
        this.start();
    }

    preload() {
        return Loader.load({
            image: [
                'images/Tank.png',
                'images/Terr.png',
                'images/Boom.png',
                'images/Misc.png',
                'images/UI.png',
                'images/Frag.png',
            ],
            audio: [
                'sound/explode1.mp3',
                'sound/gameover.mp3',
                'sound/move1.mp3',
                'sound/move2.mp3',
                'sound/shoot1.mp3',
                'sound/startgame.mp3',
                'sound/wall.mp3',
                'sound/attack.mp3',
                'sound/bonusLife.mp3',
                'sound/boom.mp3',
                'sound/eat.mp3',
            ],
        });
    }

    start() {
        this.preload().then(() => {
            Game.init();
            Scene.init();
            this.run();
        });
    }

    run() {

    }

    pause() {

    }
}
