export enum KeyCode {
    UP = 'ArrowUp',
    RIGHT = 'ArrowRight',
    DOWN = 'ArrowDown',
    LEFT = 'ArrowLeft',
    ENTER = 'Enter',
    ESC = 'Escape',
    SPACE = 'Space',
}

export type ArrowKeys = KeyCode.UP | KeyCode.RIGHT | KeyCode.DOWN | KeyCode.LEFT

export const ArrowKeys = [KeyCode.UP, KeyCode.RIGHT, KeyCode.DOWN, KeyCode.LEFT]
const inputPressMap: { [key: string]: boolean } = {}

export function isPressed(keyCode: string) {
    return inputPressMap[keyCode];
}

export function keyPress(keyCode: string) {
    inputPressMap[keyCode] = true
}

export function keyRelease(keyCode: string) {
    inputPressMap[keyCode] = false
}

export function playerIsPressed() {
    return ArrowKeys.some(key => isPressed(key))
}

function initHandleEvent() {
    document.onkeydown = (e) => {
        // 每当按下一个新的键，冻结其他键，保证只有一个方向键是激活状态
        ArrowKeys.forEach(key => keyRelease(key))
        keyPress(e.code);
    };

    // 松开键后 立即 冻结键
    document.onkeyup = (e) => keyRelease(e.code);
}

initHandleEvent()
