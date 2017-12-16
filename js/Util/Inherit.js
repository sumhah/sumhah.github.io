/**
 * Created by m on 2016/3/22.
 */
/**
 * 寄生组合式继承：   在组合继承上进一步优化性能，不需要实例化整个父类
 */
function inheritPrototype(subType, superType) {
    var prototype = Object(superType.prototype); //创建对象
    prototype.constructor = subType; //增强对象
    subType.prototype = prototype; //指定对象
};


/*
 * 类式继承
 * 规则：
 * 子类继承父类的方法   然后调用父类方法来修改数据
 * 如果子类构造函数里没有初始化变量，就会修改父类里的静态变量
 * 如果子类定义了静态变量，而构造函数里没有，则会修改子类上的静态变量
 */
var Class;
var run_flag = true;


function constructor(init) {
    return function () {
        if (run_flag) {
            init.apply(this, arguments);
        }
    };
}

function toString(str) {
    return function () {
        return str;
    };
}


Class = function (base, member) {
    if (!member) {
        member = base;
        base = null;
    }


    var S = member.Static;
    var proto = member;
    var F, k;


    if (base) {
        run_flag = false;
        proto = new base;
        run_flag = true;

        for (k in member) {
            if (member.hasOwnProperty(k)) {
                proto[k] = member[k];
            }
        }
    }

    //
    // 约定第一个function作为构造函数
    //
    for (k in member) {
        if (typeof member[k] === 'function') {
            break;
        }
    }

    F = constructor(member[k]);

    proto.constructor = F;
    F.prototype = proto;
    F.toString = toString('[class ' + k + ']');

    for (k in S) {
        if (S.hasOwnProperty(k)) {
            F[k] = S[k];
        }
    }

    return F;
};


/**
 * 数组删除指定元素
 * @param val
 * @returns {number}
 */
Array.prototype.indexOf = function (val) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] === val) {
            return i;
        }
    }
    return -1;
};
Array.prototype.remove = function (val) {
    var index = this.indexOf(val);
    if (index > -1) {
        this.splice(index, 1);
    }
};


/**
 * 计时器
 */
var Timer = Class({
    Static: {
        arr: [],
    },


    Timer: function (fn, t) {
        this.time = 0;
        this.fn = fn;
        this.endTime = t;
        Timer.arr.push(this);
    },


    update: function () {
        this.time += Const.FPS;
        if (this.time > this.endTime) {
            this.fn();
            Timer.arr.remove(this);
        }
    },


});

// 随机整数 n到m
var random = function (n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n);
};

var distance = function (n, m) {
    return Math.abs(n - m);
};