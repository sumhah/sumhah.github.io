/**
 * Created by m on 2016/3/26.
 */
import {MAP_LEFT_X, MAP_UP_Y} from "../const";
import {ArrowKeys, KeyCode} from "../input";
// import {Frame} from "./frame";
// import {renderer} from "../scene";

export const ARROW_TO_ANGLE = {
    [KeyCode.UP]: 0,
    [KeyCode.RIGHT]: 90,
    [KeyCode.DOWN]: 180,
    [KeyCode.LEFT]: 270,
}

export const ANGLE_TO_ARROW = {
    0: KeyCode.UP,
    90: KeyCode.RIGHT,
    180: KeyCode.DOWN,
    270: KeyCode.LEFT
}

export class Sprite {
    x: number = 0
    y: number = 0
    width: number = 32
    height: number = 32
    speed: number = 0
    angel: 0 | 90 | 180 | 270 = 0
    isVisible: boolean = true

    constructor() {
    }

    get nextX() {
        const arrow = ANGLE_TO_ARROW[this.angel]
        if (arrow === KeyCode.LEFT) {
            return this.x - this.speed
        }
        if (arrow === KeyCode.RIGHT) {
            return this.x + this.speed
        }
        return this.x
    }

    get nextY() {
        const arrow = ANGLE_TO_ARROW[this.angel]
        if (arrow === KeyCode.UP) {
            return this.y - this.speed
        }
        if (arrow === KeyCode.DOWN) {
            return this.y + this.speed
        }
        return this.y
    }

    setPos({x, y}: { x: number, y: number }) {
        this.x = x + MAP_LEFT_X;
        this.y = y + MAP_UP_Y;
    }

    setSize({width, height}: { width: number, height: number }) {
        this.width = width;
        this.height = height;
    }

    setDir(dir: ArrowKeys) {
        this.angel = ARROW_TO_ANGLE[dir] as 0 | 90 | 180 | 270
    }

    show() {
        this.isVisible = true;
    }

    hide() {
        this.isVisible = false;
    }
}
