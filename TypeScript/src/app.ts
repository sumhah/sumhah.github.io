import {loadAudioResource, loadImageResource} from "./loader";

var App = {
    load() {
        loadImageResource({
            sourceList: [
                'tank.png',
                'terr.png',
                'boom.png',
                'misc.png',
                'ui.png',
                'frag.png'
            ],
            onComplete() {
                App.complete();
            }
        })
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
                        src: 'shoot1.mp3',
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
                onComplete() {
                    App.complete();
                }
            }
        )
    },


    /**
     * loader 回调接口
     */
    complete() {
        Game.init()
        Scene.init()
        App.run()
    },


    run() {
        UIOpen.onEnter()
    },


    pause() {
        clearInterval(App.runTimer)
    },

}
