import Loader from './Loader';
import Game from './Game';
import Scene from './Scene';
import Input from './Input';
import UIOpen from './UI/UIOpen';

export default class App {
    static init(canvas) {
        this.preload().then(() => {
            Scene.init(canvas);
            Input.initHandleEvent();
            this.run();
        });
    }

    static preload() {
        return Loader.load({
            image: [
                require('../images/Tank.png'),
                require('../images/Terr.png'),
                require('../images/Boom.png'),
                require('../images/Misc.png'),
                require('../images/UI.png'),
                require('../images/Frag.png'),
            ],
            audio: [
                require('../sound/explode1.mp3'),
                require('../sound/gameover.mp3'),
                require('../sound/move1.mp3'),
                require('../sound/move2.mp3'),
                require('../sound/shoot1.mp3'),
                require('../sound/startgame.mp3'),
                require('../sound/wall.mp3'),
                require('../sound/attack.mp3'),
                require('../sound/bonusLife.mp3'),
                require('../sound/boom.mp3'),
                require('../sound/eat.mp3'),
            ],
        });
    }

    static run() {
        UIOpen.enter();
    }

    static pause() {

    }
}
