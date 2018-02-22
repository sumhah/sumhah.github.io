import Const from './Const';

export default class Input {
    static keyList = [];
    static directionKeyCodes = [Const.KEY_CODE.UP, Const.KEY_CODE.RIGHT, Const.KEY_CODE.DOWN, Const.KEY_CODE.LEFT];

    static initHandleEvent() {
        document.onkeydown = (e) => {
            // 每当按下一个新的方向键，冻结其他方向键，保证只有一个方向键是激活状态
            if (this.directionKeyCodes.some(code => code === e.keyCode)) {
                this.directionKeyCodes.forEach(code => this.keyRelease(code));
            }
            this.keyPress(e.keyCode);
        };

        // 松开键后 立即 冻结键
        document.onkeyup = (e) => {
            this.keyRelease(e.keyCode);
        };
    }

    static keyPress(keyCode) {
        this.keyList[keyCode] = true;
    }

    static keyRelease(keyCode) {
        this.keyList[keyCode] = false;
    }

    static isPressed(keyCode) {
        return this.keyList[keyCode];
    }

    static isAnyDirPressed() {
        return this.directionKeyCodes.some(code => this.isPressed(code));
    }
}
