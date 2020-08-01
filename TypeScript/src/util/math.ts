/**
 * @Author: sumhah
 * @Date: 2020/8/1
 */

export function randomInt(n: number, m: number) {
    return Math.floor(Math.random() * (m - n + 1) + n);
}

export function distance(n: number, m: number) {
    return Math.abs(n - m);
}
