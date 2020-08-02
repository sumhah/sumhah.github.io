/**
 * Created by m on 2016/3/21.
 */
import {MAP_HEIGHT, MAP_LEFT_X, MAP_UP_Y, MAP_WIDTH} from "./const";

/**
 * 绘制
 */
export const canvas: HTMLCanvasElement = document.getElementById('drawing') as HTMLCanvasElement;
export const renderer: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D

export function drawSprite({ sprite, ui }: any) {
    const {x, y, width, height, angel } = sprite;
    const { img, imgX, imgY } = ui;
    renderer.save();
    renderer.translate(x + width / 2, y + height / 2);
    renderer.rotate(angel * Math.PI / 180);
    renderer.translate(-(x + width / 2), -(y + height / 2));
    renderer.drawImage(img, imgX, imgY, width, height, x, y, width, height);
    renderer.restore();
}

export function drawBackground() {
    renderer.clearRect(0, 0, 1000, 1000);
    renderer.fillStyle = '#000';
    renderer.fillRect(MAP_LEFT_X, MAP_UP_Y, MAP_WIDTH, MAP_HEIGHT);
}
export function drawRightBar() {
    //待产坦克图标
    // for (let i = 0; i < Game.expectantEnemyNum; i++) {
    //     renderer.drawImage(imageResourceMap['misc.png'], 0, 16, 16, 16, MAP_RIGHT_X + 19 + (order - 1) * 16, MAP_UP_Y + 17 + (line - 1) * 16, 16, 16);
    //     if (order === 2) {
    //         order = 1;
    //         line++;
    //     } else {
    //         order++;
    //     }
    // }
    //
    // // IP 剩余生命
    // renderer.font = '22px Arial Black';
    // renderer.fillText('I P', MAP_RIGHT_X + 15, MAP_UP_Y + 258);
    // renderer.drawImage(imageResourceMap['misc.png'], 16, 16, 16, 16, MAP_RIGHT_X + 15, MAP_UP_Y + 262, 16, 16);
    // renderer.fillText(Game.life.toString(), MAP_RIGHT_X + 33, MAP_UP_Y + 278);
    //
    // // 旗帜 当前关数
    // renderer.drawImage(imageResourceMap['misc.png'], 128, 0, 32, 32, MAP_RIGHT_X + 15, MAP_UP_Y + 334, 32, 32);
    // renderer.fillText(Game.stage.toString(), MAP_RIGHT_X + 34, MAP_UP_Y + 386);
}

export function drawScene() {
    drawBackground()
    drawRightBar()
}
