/**
 * Created by m on 2016/3/21.
 */

/**
 * input
 */
var keyCode = {
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    LEFT: 37,
    ENTER: 13,
    ESC: 27,
    SPACE: 32,
};
var input = {
    keyList: [],


    initHandleEvent: function () {
        document.onkeydown = function (e) {
            /**
             * 每当按下一个新的键，冻结其他键，保证只有一个方向键是激活状态
             */
            var i;
            e = e ? e : window.event;
            if (e.keyCode >= 37 && e.keyCode <= 40) {
                for (i = 37; i <= 40; i++) {
                    input.keyRelease(i);
                }
            }
            input.keyPress(e.keyCode);
        };


        /**
         * 松开键后 立即 冻结键
         * @param e
         */
        document.onkeyup = function (e) {
            e = e ? e : window.event;
            input.keyRelease(e.keyCode);
        };
    },


    keyPress: function (keyCode) {
        input.keyList[keyCode] = true;
    },


    keyRelease: function (keyCode) {
        input.keyList[keyCode] = false;
    },


    isPressed: function (keyCode) {
        return input.keyList[keyCode];
    },


    playerIsPressed: function () {
        return input.isPressed(keyCode.UP) || input.isPressed(keyCode.RIGHT) || input.isPressed(keyCode.DOWN) || input.isPressed(keyCode.LEFT);
    },


};

input.initHandleEvent();