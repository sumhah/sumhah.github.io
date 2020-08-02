/**
 * @Author: sumhah
 * @Date: 2020/8/1
 */
import {FRAME_TIME} from "../const";

interface Timer {
    currentTime: number
    fn: Function
    endTime: number
}

let timerList: Timer[] = [];

export function wait(delay: number) {
    return new Promise((resolve) => {
        timerList.push({
            currentTime: 0,
            fn: resolve,
            endTime: delay,
        });
    });
}

export function updateTimers() {
    for (const timer of timerList) {
        timer.currentTime += FRAME_TIME;
        if (timer.currentTime > timer.endTime) {
            timer.fn();
            timerList = timerList.filter(item => item !== timer);
        }
    }
}
