import {loadImageResource, loadAudioResource} from "./loader";
import {drawScene} from "./scene";

export async function load() {
    await Promise.all([
        loadImageResource({
            sourceList: [
                'tank.png',
                'terr.png',
                'boom.png',
                'misc.png',
                'ui.png',
                'frag.png'
            ],
        }),
        loadAudioResource({
            sourceList: [
                {
                    src: 'explode.mp3',
                    volume: 1,
                },
                {
                    src: 'gameover.mp3',
                    volume: 1,
                },
                {
                    src: 'move1.mp3',
                    volume: 0.3,
                },
                {
                    src: 'move2.mp3',
                    volume: 0.3,
                },
                {
                    src: 'shoot.mp3',
                    volume: 0.3,
                },
                {
                    src: 'start-game.mp3',
                    volume: 1,
                },
                {
                    src: 'wall.mp3',
                    volume: 1,
                },
                {
                    src: 'attack.mp3',
                    volume: 1,
                },
                {
                    src: 'bonus-life.mp3',
                    volume: 1,
                },
                {
                    src: 'boom.mp3',
                    volume: 1,
                },
                {
                    src: 'eat.mp3',
                    volume: 1,
                },
            ],
        })
    ])
}

function loopRender() {
    drawScene()
    requestAnimationFrame(() => {
        drawScene()
    })
}

function start() {
    loopRender()
}

(async () => {
    await load();
    start();
})()





