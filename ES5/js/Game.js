/**
 * Created by m on 2016/3/21.
 */
/**
 * 游戏逻辑控制
 */
var Game = {
    /**
     * 单位组
     */
    unit: [],
    tanks: [],
    enemyTanks: [],
    enemyLiveArr: [],
    barrier: [],
    player: null,         // 玩家坦克
    curGrade: 0,          // 坦克当前等级

    stage: 1,              // 当前关数
    life: 2,               // 当前生命
    curTile: [],              // 当前关卡地形数组
    totalTile: [],            // 总关卡地形数组
    tilesObjArr: [],          // 地形对象数组
    enemyTanksSeq: [],        // 总关卡坦克生产序列数组
    curEnemyTanksSeq: [],     // 当前关卡坦克生产序列

    baseTile: [],             // 基地墙数组
    isUpGrade: false,         // 是否已经升级
    upGradeEnd: false,

    expectantEnemyNum: Const.TOTAL_ENEMY, // 待产坦克数
    enemyLeftNum: Const.TOTAL_ENEMY,

    score: 0,               // 当前得分
    scoreMax: 20000,        // 游戏最高分
    scoreBonus: 20000,      // 下一个奖命分数
    scoreTanksArr: {
        small: 15,
        fast: 16,
        middle: 10,
        big: 14,
    },

    _birthTime: 0,         // 坦克出生间隔
    _birthPos: [],         // 坦克出生地点
    // 出生序号 决定出生地点
    _birthCurrentNum: 0,
    isFreeze: false,       // 是否处于定时状态


    init: function () {
        Game._birthPos = [
            [193, 1],
            [384, 1],
            [1, 1],
        ];

        /**
         * 墙 为 51 52 53 54 55 水泥
         *       61 62 63 64 65 土
         *       1 代表四块全满
         *       2 上两块
         *       3 右两块
         *       4 下两块
         *       5 左两块
         *       6 左下
         *       7 右下
         * @type {*[]}
         */
        Game.totalTile = [
            [
                8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
                8, 61, 8, 61, 8, 61, 8, 61, 8, 61, 8, 61, 8,
                8, 61, 8, 61, 8, 61, 8, 61, 8, 61, 8, 61, 8,
                8, 61, 8, 61, 8, 61, 51, 61, 8, 61, 8, 61, 8,
                8, 61, 8, 61, 8, 62, 8, 62, 8, 61, 8, 61, 8,
                8, 62, 8, 62, 8, 64, 8, 64, 8, 62, 8, 62, 8,
                64, 8, 64, 64, 8, 62, 8, 62, 8, 64, 64, 8, 64,
                52, 8, 62, 62, 8, 64, 8, 64, 8, 62, 62, 8, 52,
                8, 64, 8, 64, 8, 61, 61, 61, 8, 64, 8, 64, 8,
                8, 61, 8, 61, 8, 61, 8, 61, 8, 61, 8, 61, 8,
                8, 61, 8, 61, 8, 62, 8, 62, 8, 61, 8, 61, 8,
                8, 61, 8, 61, 8, 67, 64, 66, 8, 61, 8, 61, 8,
                8, 8, 8, 8, 8, 63, 1, 65, 8, 8, 8, 8, 8,
            ],
            [
                8, 8, 8, 51, 8, 8, 8, 51, 8, 8, 8, 8, 8,
                8, 61, 8, 51, 8, 8, 8, 61, 8, 61, 8, 61, 8,
                8, 61, 8, 8, 8, 8, 61, 61, 8, 61, 51, 61, 8,
                8, 8, 8, 61, 8, 8, 8, 8, 8, 51, 8, 8, 8,
                0, 8, 8, 61, 8, 8, 51, 8, 8, 61, 0, 61, 51,
                0, 0, 8, 8, 8, 61, 8, 8, 51, 8, 0, 8, 8,
                8, 61, 61, 61, 0, 0, 0, 51, 8, 8, 0, 61, 8,
                8, 8, 8, 51, 0, 61, 8, 61, 8, 61, 8, 61, 8,
                51, 61, 8, 51, 8, 61, 8, 61, 8, 61, 51, 61, 8,
                8, 61, 8, 61, 8, 61, 61, 61, 8, 61, 51, 61, 8,
                8, 61, 8, 61, 8, 61, 61, 61, 8, 8, 8, 8, 8,
                8, 61, 8, 8, 8, 67, 64, 66, 8, 61, 8, 61, 8,
                8, 61, 8, 61, 8, 63, 1, 65, 8, 61, 61, 61, 8,
            ],
            [
                8, 8, 8, 8, 61, 8, 8, 8, 61, 8, 8, 8, 8,
                8, 0, 0, 0, 61, 8, 8, 8, 8, 8, 54, 54, 54,
                61, 0, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 8,
                0, 0, 0, 0, 8, 8, 8, 61, 8, 61, 61, 61, 65,
                0, 0, 0, 0, 61, 61, 61, 62, 8, 61, 8, 63, 8,
                0, 0, 0, 0, 8, 8, 61, 8, 8, 8, 8, 63, 8,
                8, 0, 8, 8, 8, 8, 51, 51, 51, 8, 8, 0, 8,
                8, 64, 8, 64, 8, 8, 8, 8, 8, 0, 0, 0, 0,
                61, 65, 63, 61, 65, 63, 62, 62, 62, 0, 0, 0, 0,
                8, 8, 8, 8, 8, 61, 8, 64, 64, 0, 0, 0, 0,
                61, 8, 8, 55, 8, 8, 8, 62, 62, 0, 0, 0, 8,
                61, 61, 8, 55, 8, 67, 64, 66, 8, 0, 0, 0, 8,
                51, 61, 61, 8, 8, 63, 1, 65, 8, 61, 8, 8, 8,
            ],
            [
                8, 0, 0, 8, 8, 8, 8, 8, 8, 8, 8, 0, 8,
                0, 0, 8, 8, 64, 61, 61, 64, 64, 8, 8, 8, 0,
                0, 8, 8, 63, 61, 61, 61, 61, 61, 61, 64, 8, 52,
                52, 8, 8, 61, 61, 61, 61, 61, 61, 61, 61, 65, 8,
                8, 8, 63, 62, 8, 8, 8, 62, 61, 61, 8, 65, 8,
                3, 8, 63, 8, 55, 8, 55, 8, 61, 65, 8, 8, 8,
                8, 8, 61, 8, 64, 64, 8, 8, 61, 65, 8, 3, 3,
                8, 8, 61, 61, 61, 61, 61, 61, 61, 61, 8, 8, 8,
                8, 63, 61, 61, 61, 61, 61, 61, 61, 61, 65, 8, 8,
                8, 62, 62, 61, 61, 61, 61, 61, 61, 62, 62, 8, 8,
                8, 61, 61, 64, 62, 61, 61, 62, 64, 61, 61, 8, 0,
                0, 8, 62, 62, 8, 67, 64, 66, 62, 62, 8, 0, 0,
                51, 0, 8, 8, 8, 63, 1, 65, 8, 8, 0, 0, 51,
            ],
            [
                8, 8, 8, 8, 61, 61, 8, 8, 8, 8, 8, 8, 8,
                54, 8, 64, 8, 61, 8, 8, 8, 52, 52, 51, 8, 8,
                51, 8, 61, 8, 8, 8, 61, 8, 8, 8, 8, 8, 8,
                61, 8, 61, 61, 61, 8, 61, 61, 8, 3, 3, 8, 3,
                62, 8, 8, 8, 62, 8, 8, 8, 8, 3, 8, 8, 8,
                8, 8, 64, 8, 3, 3, 8, 3, 3, 3, 8, 61, 61,
                61, 61, 8, 8, 3, 61, 8, 61, 65, 8, 8, 8, 8,
                8, 8, 8, 8, 3, 8, 8, 8, 8, 8, 53, 55, 8,
                3, 3, 3, 8, 3, 8, 51, 8, 61, 8, 53, 8, 8,
                8, 8, 8, 64, 64, 8, 8, 8, 8, 8, 53, 61, 61,
                8, 8, 8, 8, 61, 62, 62, 62, 61, 64, 8, 8, 8,
                61, 61, 62, 8, 8, 67, 64, 66, 8, 62, 61, 8, 8,
                62, 8, 8, 8, 8, 63, 1, 65, 8, 8, 8, 8, 8,
            ],
            [
                8, 8, 8, 8, 8, 63, 8, 65, 0, 0, 8, 8, 8,
                8, 65, 53, 8, 65, 8, 8, 8, 63, 0, 65, 63, 0,
                8, 65, 53, 8, 65, 8, 61, 8, 63, 0, 65, 63, 0,
                8, 61, 8, 8, 61, 8, 51, 8, 61, 0, 8, 61, 0,
                8, 8, 8, 63, 52, 8, 61, 8, 62, 55, 8, 0, 0,
                61, 61, 65, 8, 8, 0, 61, 0, 8, 8, 63, 61, 61,
                8, 8, 8, 8, 63, 0, 0, 0, 65, 8, 8, 8, 8,
                51, 61, 61, 8, 62, 0, 0, 0, 62, 63, 61, 61, 51,
                52, 52, 52, 8, 64, 8, 0, 8, 64, 8, 52, 52, 52,
                8, 61, 8, 8, 61, 8, 8, 8, 61, 8, 8, 8, 8,
                8, 61, 65, 8, 8, 62, 8, 62, 8, 8, 63, 61, 0,
                8, 8, 62, 8, 8, 67, 64, 66, 8, 8, 0, 0, 0,
                8, 8, 64, 8, 8, 63, 1, 65, 8, 8, 64, 0, 0,
            ],
            [
                8, 8, 8, 8, 8, 8, 8, 52, 52, 8, 8, 8, 8,
                8, 8, 51, 52, 52, 52, 8, 8, 8, 8, 51, 8, 8,
                8, 8, 51, 8, 8, 8, 0, 8, 52, 51, 51, 8, 8,
                8, 51, 8, 8, 8, 0, 51, 8, 8, 8, 51, 8, 8,
                8, 8, 8, 8, 0, 51, 51, 8, 8, 8, 52, 51, 8,
                8, 51, 8, 0, 51, 51, 51, 8, 51, 8, 8, 8, 8,
                8, 53, 8, 51, 51, 8, 8, 8, 51, 51, 8, 8, 8,
                55, 8, 8, 8, 51, 8, 51, 51, 51, 8, 8, 53, 8,
                8, 53, 51, 8, 8, 8, 51, 51, 0, 8, 8, 51, 8,
                8, 51, 8, 8, 8, 8, 51, 0, 8, 8, 51, 51, 8,
                8, 52, 52, 51, 8, 8, 0, 8, 8, 51, 8, 8, 8,
                8, 8, 8, 8, 8, 67, 64, 66, 8, 52, 8, 54, 51,
                54, 54, 8, 8, 8, 63, 1, 65, 8, 8, 8, 8, 8,
            ],
            [
                8, 8, 61, 8, 8, 61, 8, 64, 8, 61, 8, 8, 8,
                0, 61, 61, 61, 8, 61, 8, 54, 8, 61, 65, 8, 8,
                0, 0, 0, 8, 8, 62, 8, 61, 8, 62, 8, 63, 65,
                0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 8, 3,
                8, 61, 8, 8, 8, 8, 64, 64, 8, 8, 8, 8, 8,
                8, 8, 61, 8, 8, 63, 61, 61, 62, 61, 62, 52, 52,
                61, 61, 8, 61, 8, 63, 61, 61, 0, 61, 54, 54, 61,
                8, 8, 8, 51, 8, 54, 8, 0, 0, 0, 0, 8, 8,
                3, 3, 8, 3, 3, 3, 3, 3, 8, 3, 3, 3, 3,
                0, 0, 8, 63, 8, 8, 64, 64, 8, 8, 8, 8, 8,
                0, 0, 61, 8, 65, 8, 8, 63, 8, 54, 64, 61, 8,
                0, 54, 61, 8, 65, 67, 64, 66, 8, 62, 8, 61, 8,
                8, 8, 8, 8, 8, 63, 1, 65, 8, 64, 8, 62, 8,
            ],
            [
                8, 8, 8, 61, 8, 8, 8, 8, 8, 54, 0, 8, 8,
                61, 8, 8, 8, 8, 8, 54, 0, 53, 51, 55, 8, 61,
                8, 8, 8, 54, 0, 53, 51, 55, 8, 52, 0, 8, 8,
                8, 8, 53, 51, 55, 8, 52, 0, 8, 8, 8, 8, 8,
                8, 8, 8, 52, 0, 8, 8, 8, 8, 8, 8, 8, 8,
                8, 8, 8, 0, 54, 0, 8, 0, 54, 0, 8, 8, 8,
                51, 61, 8, 53, 51, 55, 8, 53, 51, 55, 8, 61, 51,
                8, 8, 8, 0, 52, 0, 8, 0, 52, 0, 8, 8, 8,
                8, 8, 8, 8, 54, 8, 8, 8, 54, 8, 8, 8, 8,
                61, 8, 8, 53, 51, 55, 8, 53, 51, 55, 8, 8, 61,
                61, 8, 8, 0, 52, 0, 8, 0, 52, 0, 8, 8, 61,
                8, 8, 64, 8, 8, 67, 64, 66, 8, 8, 64, 8, 8,
                8, 8, 61, 61, 8, 63, 1, 65, 8, 61, 61, 8, 8,
            ],
            [
                8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8,
                8, 63, 62, 61, 8, 8, 8, 8, 8, 8, 61, 62, 65,
                63, 62, 8, 8, 61, 8, 0, 0, 8, 61, 8, 8, 63,
                61, 8, 8, 8, 61, 0, 0, 0, 0, 61, 8, 8, 63,
                61, 8, 8, 63, 61, 0, 51, 51, 0, 61, 65, 8, 61,
                63, 64, 64, 61, 3, 3, 3, 3, 3, 3, 61, 61, 61,
                8, 61, 61, 61, 51, 51, 61, 51, 51, 61, 61, 61, 65,
                8, 8, 61, 61, 51, 8, 61, 8, 51, 61, 61, 65, 8,
                8, 8, 61, 61, 61, 61, 61, 61, 61, 61, 61, 65, 8,
                61, 0, 62, 62, 62, 51, 51, 62, 62, 62, 62, 0, 61,
                61, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 61,
                8, 8, 0, 0, 0, 67, 64, 66, 0, 0, 0, 0, 8,
                8, 8, 8, 65, 8, 63, 1, 65, 8, 8, 65, 8, 8,
            ],
        ];

        /**
         * 每一关的坦克类型 数组
         */
        Game.enemyTanksSeq = [
            [4, 4, 6, 8, 4, 6, 5, 6, 9, 5, 7, 8, 10, 6, 7, 8, 4, 5, 5, 4],
            [7, 7, 6, 8, 4, 6, 5, 8, 8, 7, 5, 6, 8, 6, 10, 6, 6, 7, 5, 9],
            [4, 7, 5, 8, 5, 5, 5, 9, 5, 10, 5, 7, 8, 7, 10, 5, 6, 5, 5, 9],
            [4, 4, 5, 8, 4, 9, 7, 7, 9, 7, 5, 6, 8, 6, 7, 6, 6, 7, 4, 7],
            [5, 6, 6, 10, 4, 6, 7, 9, 8, 7, 5, 6, 5, 6, 10, 6, 8, 7, 5, 6],
            [5, 6, 6, 10, 4, 6, 7, 9, 8, 7, 5, 6, 5, 6, 10, 6, 8, 7, 5, 6],
            [5, 6, 6, 10, 4, 6, 7, 9, 8, 7, 5, 6, 5, 6, 10, 6, 8, 7, 5, 6],
            [5, 6, 6, 10, 4, 6, 7, 9, 8, 7, 5, 6, 5, 6, 10, 6, 8, 7, 5, 6],
            [5, 6, 6, 10, 4, 6, 7, 9, 8, 7, 5, 6, 5, 6, 10, 6, 8, 7, 5, 6],
            [5, 6, 6, 10, 4, 6, 7, 9, 8, 7, 5, 6, 5, 6, 10, 6, 8, 7, 5, 6],
        ];
    },


    createTanks: function () {
        /**
         * 创建的同时绑定单位到各个单位组
         */
        Game.player = new MyTank();
        Game.player.setType(Game.curGrade);
        Game.tanks.push(Game.player);
        Game.birthPlayer();

        /**
         * 创建电脑坦克
         */
        var i, tank;
        for (i = 1; i < Const.MAX_TANK; i++) {
            tank = new NpcTank();
            Game.tanks.push(tank);
            Game.enemyTanks.push(tank);
        }
        Game.unit = Game.unit.concat(Game.tanks);
    },


    createTiles: function () {
        var i, length, row = 0, col = 0, tile, arr = Game.tilesObjArr, firstNum, secondNum;
        for (i = 0, length = Game.curTile.length; i < length; i++) {
            tile = Game.curTile[i];

            if ((row === 11 || row === 12) && (col === 5 || col === 6 || col === 7) && !(row === 12 && col === 6)) {
                arr = Game.baseTile;
            }
            /**
             * 墙分为四小块
             */
            if (tile > 50) {
                firstNum = Math.floor(tile / 10);
                secondNum = tile % 10;
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
            }
            else {
                arr.push(new TileLayer(tile, col * 32, row * 32));
            }

            if ((row === 11 || row === 12) && (col === 5 || col === 6 || col === 7)) {
                arr = Game.tilesObjArr;
            }

            if (++col === 13) {
                col = 0;
                row++;
            }
        }
    },


    autoBirth: function () {
        function birthEnemyTank(tank) {
            tank.setPos(Game._birthPos[Game._birthCurrentNum][0], Game._birthPos[Game._birthCurrentNum][1]);
            tank.setType(Game.curEnemyTanksSeq[Const.TOTAL_ENEMY - Game.expectantEnemyNum]);
            tank.birth();
            Game.expectantEnemyNum--;
            if (Game._birthCurrentNum === 2) {
                Game._birthCurrentNum = 0;
            }
            else {
                Game._birthCurrentNum++;
            }
        }

        if (Game.expectantEnemyNum >= 1) {
            /**
             * 找出死亡坦克 生产
             */
            new Timer(function () {
                var i, length, tank;
                for (i = 0, length = Game.enemyTanks.length; i < length; i++) {
                    tank = Game.enemyTanks[i];
                    if (tank.state === 'death') {
                        birthEnemyTank(tank);
                        break;
                    }
                }
            }, 2000);
        }
    },


    birthPlayer: function () {
        Game.player.setPos(128, 384);
        Game.player.birth();
        Game.player.setInvincible(11000);
    },


    over: function () {
        UIGame.onLeave();
        if (Game.player.state === 'moving') {
            Game.player.state = 'stay';
        }
        UIGameOver.onEnter();
    },


    update: function () {
        Game.autoBirth();
        Game.unit.forEach(function (unit) {
            unit.update();
        });

        /**
         * 电脑坦克全部摧毁，进入下一关
         */
        if (Game.expectantEnemyNum <= 0 && Game.enemyLeftNum <= 0) {
            Game.enemyLeftNum = 1000;
            new Timer(function () {
                UIGame.onLeave();
                UIScore.onEnter();
            }, 4000);
        }

        /**
         * 积分达到条件，奖励生命
         */
        if (Game.score >= Game.scoreBonus) {
            Game.scoreBonus += 20000;
            Game.life++;
        }
        if (Game.score >= Game.scoreMax) {
            Game.scoreMax = Game.score;
        }
    },


    command: function () {
        if (Game.player.state === 'death' || Game.player.state === 'birth') {
            return;
        }

        /**
         * 玩家按下方向键，改变玩家坦克方向
         */
        switch (true) {
            case input.isPressed(keyCode.LEFT):
                Game.player.setDir(3);
                break;
            case input.isPressed(keyCode.UP):
                Game.player.setDir(0);
                break;
            case input.isPressed(keyCode.RIGHT):
                Game.player.setDir(1);
                break;
            case input.isPressed(keyCode.DOWN):
                Game.player.setDir(2);
                break;
            default:
                break;
        }

        /**
         * 玩家按下方向键，坦克在移动
         */
        if (input.playerIsPressed()) {
            Game.player.state = 'moving';
        }
        else {
            Game.player.state = 'stay';
        }

        if (input.isPressed(keyCode.SPACE)) {
            Game.player.fire();
            input.keyRelease(keyCode.SPACE);
        }
    },


    tileUpGrade: function () {
        Game.upGradeEnd = false;
        Game.baseTile.forEach(function (tile) {
            tile.destroy();
            tile.setType(5);
        });
        Game.isUpGrade = true;
        new Timer(function () {
            Game.tileUpGradeEnd();
            new Timer(function () {
                Game.upGradeEnd = true;
            }, 5000);
        }, 20000);
    },


    tileUpGradeEnd: function () {
        new Timer(function () {
            Game.isUpGrade = !Game.isUpGrade;
            Game.baseTile.forEach(function (tile) {
                tile.destroy();
                tile.setType(Game.isUpGrade ? 6 : 5);
            });
            if (!Game.upGradeEnd) {
                Game.tileUpGradeEnd();
            }
            else {
                Game.baseTile.forEach(function (tile) {
                    tile.destroy();
                    tile.setType(6);
                });
            }
        }, 500);
    },


    reset: function () {
        Game.expectantEnemyNum = Const.TOTAL_ENEMY;
        Game.curTile = Game.totalTile[Game.stage - 1];
        Game.curEnemyTanksSeq = Game.enemyTanksSeq[Game.stage - 1];
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
        Game.enemyLeftNum = Const.TOTAL_ENEMY;
        Game.createTanks();
        Game.createTiles();
    },


};
