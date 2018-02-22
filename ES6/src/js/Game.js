import 'Const';
import Input from 'Input';

export default class Game {
    unit = [];
    tanks = [];
    enemyTanks = [];
    enemyLiveArr = [];
    barrier = [];
    player = null;         // 玩家坦克
    curGrade = 0;          // 坦克当前等级

    stage = 1;              // 当前关数
    life = 2;               // 当前生命
    curTile = [];              // 当前关卡地形数组
    tilesObjArr = [];          // 地形对象数组
    curEnemyTanksSeq = [];     // 当前关卡坦克生产序列

    baseTile = [];             // 基地墙数组
    isUpGrade = false;         // 是否已经升级
    upGradeEnd = false;

    expectantEnemyNum = TOTAL_ENEMY; // 待产坦克数
    enemyLeftNum = TOTAL_ENEMY;

    score = 0;               // 当前得分
    scoreMax = 20000;        // 游戏最高分
    scoreBonus = 20000;      // 下一个奖命分数
    scoreTanksArr = {
        small: 15,
        fast: 16,
        middle: 10,
        big: 14,
    };
    _birthPos = [
        [193, 1],
        [384, 1],
        [1, 1],
    ];         // 坦克出生地点
    // 出生序号 决定出生地点
    _birthCurrentNum = 0;
    isFreeze = false;       // 是否处于定时状态

    init() {}

    createTanks() {
        // 创建的同时绑定单位到各个单位组
        Game.player = new MyTank();
        Game.player.setType(Game.curGrade);
        Game.tanks.push(Game.player);
        Game.birthPlayer();

        // 创建电脑坦克
        Game.enemyTanks = [...Array(MAX_TANK - 1)].map(() => new NpcTank());
        Game.tanks.push(...Game.enemyTanks);
        Game.unit.push(...Game.tanks);
    }

    createTiles() {
        let row = 0, col = 0;
        let arr = Game.tilesObjArr;

        Game.curTile.forEach((tile) => {
            if (
                (row === 11 || row === 12) &&
                (col === 5 || col === 6 || col === 7) &&
                !(row === 12 && col === 6)
            ) {
                arr = Game.baseTile;
            }
            /**
             * 墙分为四小块
             */
            if (tile > 50) {
                const firstNum = Math.floor(tile / 10);
                const secondNum = tile % 10;
                switch (secondNum) {
                    case 1:
                        arr.push(new TileLayer(firstNum, col * 32, row * 32));
                        arr.push(new TileLayer(firstNum, col * 32 + 16, row * 32));
                        arr.push(new TileLayer(firstNum, col * 32, row * 32 + 16));
                        arr.push(new TileLayer(firstNum, col * 32 + 16, row * 32 + 16));
                        break;
                    case 2:
                        arr.push(new TileLayer(firstNum, col * 32, row * 32));
                        arr.push(new TileLayer(firstNum, col * 32 + 16, row * 32));
                        break;
                    case 3:
                        arr.push(new TileLayer(firstNum, col * 32 + 16, row * 32));
                        arr.push(new TileLayer(firstNum, col * 32 + 16, row * 32 + 16));
                        break;
                    case 4:
                        arr.push(new TileLayer(firstNum, col * 32, row * 32 + 16));
                        arr.push(new TileLayer(firstNum, col * 32 + 16, row * 32 + 16));
                        break;
                    case 5:
                        arr.push(new TileLayer(firstNum, col * 32, row * 32));
                        arr.push(new TileLayer(firstNum, col * 32, row * 32 + 16));
                        break;
                    case 6:
                        arr.push(new TileLayer(firstNum, col * 32, row * 32 + 16));
                        break;
                    case 7:
                        arr.push(new TileLayer(firstNum, col * 32 + 16, row * 32 + 16));
                        break;
                    default:
                        break;
                }
            } else {
                arr.push(new TileLayer(tile, col * 32, row * 32));
            }

            if ((row === 11 || row === 12) && (col === 5 || col === 6 || col === 7)) {
                arr = Game.tilesObjArr;
            }

            col += 1;
            if (col === 13) {
                col = 0;
                row += 1;
            }
        });
    }

    autoBirth() {
        const birthEnemyTank = (tank) => {
            if (!tank) {
                return;
            }

            tank.setPos(Game._birthPos[Game._birthCurrentNum][0], Game._birthPos[Game._birthCurrentNum][1]);
            tank.setType(Game.curEnemyTanksSeq[TOTAL_ENEMY - Game.expectantEnemyNum]);
            tank.birth();
            Game.expectantEnemyNum -= 1;
            Game._birthCurrentNum = Game._birthCurrentNum + 1 % 3;
        };

        if (Game.expectantEnemyNum >= 1) {
            // 找出死亡坦克 生产
            new Timer(() => {
                birthEnemyTank(Game.enemyTanks.find(tank => tank.state === 'death'));
            }, 2000);
        }
    }

    birthPlayer() {
        Game.player.setPos(128, 384);
        Game.player.birth();
        Game.player.setInvincible(11000);
    }

    over() {
        UIGame.onLeave();
        const player = Game.player;
        if (player.state === 'moving') {
            player.state = 'stay';
        }
        UIGameOver.onEnter();
    }

    update() {
        Game.autoBirth();
        Game.unit.forEach((unit) => {
            unit.update();
        });

        // 电脑坦克全部摧毁，进入下一关
        if (Game.expectantEnemyNum <= 0 && Game.enemyLeftNum <= 0) {
            Game.enemyLeftNum = 1000;
            new Timer(() => {
                UIGame.onLeave();
                UIScore.onEnter();
            }, 4000);
        }

        // 积分达到条件，奖励生命
        if (Game.score >= Game.scoreBonus) {
            Game.scoreBonus += 20000;
            Game.life += 1;
        }
        if (Game.score >= Game.scoreMax) {
            Game.scoreMax = Game.score;
        }
    }

    command() {
        if (Game.player.state === 'death' || Game.player.state === 'birth') {
            return;
        }

        // 玩家按下方向键，改变玩家坦克方向
        switch (true) {
            case Input.isPressed(KEY_CODE.LEFT):
                Game.player.setDir(3);
                break;
            case Input.isPressed(KEY_CODE.UP):
                Game.player.setDir(0);
                break;
            case Input.isPressed(KEY_CODE.RIGHT):
                Game.player.setDir(1);
                break;
            case Input.isPressed(KEY_CODE.DOWN):
                Game.player.setDir(2);
                break;
            default:
                break;
        }

        // 玩家按下方向键，坦克在移动
        Game.player.state = Input.playerIsPressed() ? 'moving' : 'stay';

        if (Input.isPressed(KEY_CODE.SPACE)) {
            Game.player.fire();
            Input.keyRelease(KEY_CODE.SPACE);
        }
    }

    tileUpGrade() {
        Game.upGradeEnd = false;
        Game.baseTile.forEach((tile) => {
            tile.destroy();
            tile.setType(5);
        });
        Game.isUpGrade = true;
        new Timer(() => {
            Game.tileUpGradeEnd();
            new Timer(() => {
                Game.upGradeEnd = true;
            }, 5000);
        }, 20000);
    }

    tileUpGradeEnd() {
        new Timer(() => {
            Game.isUpGrade = !Game.isUpGrade;
            Game.baseTile.forEach((tile) => {
                tile.destroy();
                tile.setType(Game.isUpGrade ? 6 : 5);
            });
            if (!Game.upGradeEnd) {
                Game.tileUpGradeEnd();
            } else {
                Game.baseTile.forEach((tile) => {
                    tile.destroy();
                    tile.setType(6);
                });
            }
        }, 500);
    }

    reset() {
        Game.expectantEnemyNum = TOTAL_ENEMY;
        Game.curTile = MAP_TERRAIN[Game.stage - 1];
        Game.curEnemyTanksSeq = ENEMY_TANK_SEQUENCE[Game.stage - 1];
        Game.tilesObjArr = [];
        Game.baseTile = [];
        Game.unit = [];
        Game.tanks = [];
        Game.enemyTanks = [];
        Game.enemyLiveArr = [];
        Game.barrier = [];
        Game.scoreTanksArr = {
            small: 0,
            fast: 0,
            middle: 0,
            big: 0,
        };
        Game.enemyLeftNum = TOTAL_ENEMY;
        Game.createTanks();
        Game.createTiles();
    }
}
