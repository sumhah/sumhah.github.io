/**
 * Created by m on 2016/3/24.
 */
/**
 * 子弹
 */
var Bullet = Class(Sprite, {
    width: 8,
    height: 8,
    team: 0,
    power: 1,
    speed: 5,
    isIdle: true,
    _boom: null,


    Bullet: function (team, power, speed) {
        this.team = team;
        this.power = power;
        this.speed = speed;
        this.img = Loader.imgArr[3];
        this._boom = new Boom(false);
        Game.unit.push(this);
    },


    update: function () {
        if (this.isIdle) {
            return;
        }

        this.updateNext(); // 更新下一步的位置以便于计算碰撞

        var i, length, b, j, otherTile;
        // 不在地图内
        if (!this.nextIsInMap()) {
            this.idle();
        }

        /**
         * 对 接触到 并且 不为盟友 的单位执行动作
         */
        for (i = 0, length = Game.barrier.length; i < length; i++) {

            b = Game.barrier[i];
            if (b.team === 10 && (b.type === 3 || b.type === 2)) {
                continue; // 子弹可通过水和倒旗
            }
            if (this.collidesWith(b) && this.team !== b.team) {
                if (b instanceof Tank) {
                    b.damage();
                }
                if (b instanceof Bullet) {
                    b.idle();
                }
                if (b instanceof TileLayer) {
                    for (j = i + 1; j < length; j++) {
                        otherTile = Game.barrier[j];
                        if (otherTile instanceof TileLayer && this.collidesWith(otherTile, 20) && ( (otherTile.type === 6 || this.power >= 2) && otherTile.type !== 1)) {
                            otherTile.destroy();
                        }
                    }
                    if (b.type === 6 || this.power >= 2 || b.type === 1) {
                        b.destroy();
                    }
                }
                this.idle();
                return;
            }
        }

        this.go();
        this.draw();
    },


    shot: function (x, y, angel) {
        this.isIdle = false;

        /**
         * 调整子弹到坦克前方的位置 up right down left
         */
        switch (angel) {
            case 0:
                x += 12;
                y -= 8;
                break;
            case 90:
                x += 32;
                y += 12;
                break;
            case 180:
                x += 12;
                y += 32;
                break;
            case 270:
                x -= 8;
                y += 12;
                break;
            default:
                break;
        }
        this.x = x;
        this.y = y;
        this.angel = angel;
        Game.barrier.push(this);
    },


    idle: function () {
        this.hit();
        this.hide();
        this.isIdle = true;

        Game.barrier.remove(this);
    },


    hit: function () {
        if (!this._boom) {
            console.error(this);
        }
        else {
            this._boom.start(this.x - 28, this.y - 28);
        }
    },


});