/**
 * Created by m on 2016/3/21.
 */

const BASE_URL = 'https://sumhah.github.io/ES5';

/**
 * loader
 */
var Loader = {
    imgArr: [],
    soundArr: [],
    loadedNum: 0,
    totalNum: 6,


    loadResource: function (type, arrSrc) {
        var i, length, source;

        for (i = 0, length = arrSrc.length; i < length; i++) {
            if (type === 'image') {
                source = new Image();
                source.src = BASE_URL + arrSrc[i];
                Loader.imgArr.push(source);
                source.addEventListener('load',
                    function () {
                        Loader.loadedNum++;
                        if (Loader.loadedNum >= Loader.totalNum) {
                            App.complete();
                        }
                    }, false);
            }
            else if (type === 'audio') {
                source = document.createElement('Audio');
                document.body.appendChild(source);
                source.src = BASE_URL + arrSrc[i];
                source.volume = 1;
                if (i === 2 || i === 3 || i === 4) {
                    source.volume = .3;
                }
                Loader.soundArr.push(source);
            }
            else {
                throw 'unexpected type on resource';
            }
        }
    },
};
