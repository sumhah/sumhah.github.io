import Loader from './Loader';
import Game from './Game';
import Scene from './Scene';
import Input from './Input';

console.log(-2);

export default class App {
    static init(canvas) {
        console.log(-1);
        this.preload().then(() => {
            console.log(0);
            // Game.init();
            console.log(1);
            Scene.init(canvas);
            console.log(2);
            Input.initHandleEvent();
            console.log(3);
            this.run();
        });
    }

    static preload() {
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

    static run() {

    }

    static pause() {

    }
}
