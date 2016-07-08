/**
 * pc端辅助功能--键盘监听
 * @author sxt
 */
var PcKeyBoardHelper = (function () {
    function PcKeyBoardHelper() {
        this.isListening = false;
        this.list = {};
    }
    var d = __define,c=PcKeyBoardHelper,p=c.prototype;
    d(PcKeyBoardHelper, "instance"
        ,function () {
            if (PcKeyBoardHelper._instance == null) {
                PcKeyBoardHelper._instance = new PcKeyBoardHelper();
            }
            return PcKeyBoardHelper._instance;
        }
    );
    p.add = function () {
        if (this.isListening == false) {
            this.isListening = true;
            document.addEventListener("keydown", PcKeyBoardHelper.instance.onKeyDown);
        }
    };
    p.onKeyDown = function (evt) {
        var target;
        for (target in PcKeyBoardHelper.instance.list) {
            var vo = PcKeyBoardHelper.instance.list[target];
            vo.callback.call(vo.target, evt);
        }
    };
    /**
     * 注册监听
     * @param callback 回调方法
     * @param target
     */
    p.addListener = function (callback, target) {
        var temp = egret.getQualifiedClassName(target);
        if (PcKeyBoardHelper._instance.list[temp] == null) {
            var vo = new KeyVo(temp, target, callback);
            PcKeyBoardHelper._instance.list[vo.name] = vo;
        }
        PcKeyBoardHelper._instance.add();
    };
    /**
     * 移出监听
     */
    p.removeListener = function (target) {
        var temp = egret.getQualifiedClassName(target);
        if (PcKeyBoardHelper._instance.list[temp] != null) {
            delete PcKeyBoardHelper._instance.list[temp];
        }
        this.checkCount();
    };
    p.checkCount = function () {
        for (var key in PcKeyBoardHelper._instance.list) {
            return;
        }
        document.removeEventListener("keydown", PcKeyBoardHelper.instance.onKeyDown);
        this.isListening = false;
    };
    return PcKeyBoardHelper;
}());
egret.registerClass(PcKeyBoardHelper,'PcKeyBoardHelper');
var KeyVo = (function () {
    function KeyVo(name, tar, call) {
        this.name = "";
        this.name = name;
        this.target = tar;
        this.callback = call;
    }
    var d = __define,c=KeyVo,p=c.prototype;
    return KeyVo;
}());
egret.registerClass(KeyVo,'KeyVo');
var PcMouseHelper = (function () {
    function PcMouseHelper() {
        this.isListening = false;
        this.list = new Array();
    }
    var d = __define,c=PcMouseHelper,p=c.prototype;
    p.add = function () {
        if (this.isListening == false) {
            this.isListening = true;
            this.canvas = document.getElementsByTagName("CANVAS")[0];
            this.canvas.addEventListener('mousemove', this.onMove);
        }
    };
    p.addListener = function (target) {
        this.add();
        this.list.push(target);
    };
    p.removeListener = function (target) {
        if (PcMouseHelper._instance.list.indexOf(target) > -1) {
            PcMouseHelper._instance.list.splice(PcMouseHelper._instance.list.indexOf(target), 1);
            this.checkCount();
        }
    };
    p.checkCount = function () {
        for (var key in PcMouseHelper._instance.list) {
            return;
        }
        PcMouseHelper._instance.canvas.style.cursor = "auto";
        this.canvas.removeEventListener('mousemove', this.onMove);
        this.isListening = false;
    };
    p.onMove = function (evt) {
        var len = PcMouseHelper._instance.list.length;
        var temp = PcMouseHelper._instance.getPoint(evt.currentTarget, evt.x, evt.y);
        for (var i = 0; i < len; i++) {
            var target;
            if (PcMouseHelper._instance.list[i].hitTestPoint(temp.x, temp.y)) {
                PcMouseHelper._instance.canvas.style.cursor = "pointer";
                return; //目前同一时间鼠标只能悬浮在一个对象上
            }
        }
        PcMouseHelper._instance.canvas.style.cursor = "auto";
    };
    /**
     * 获取canvas内的鼠标坐标
     * egret 3.0.2版本设置了 css width/height
     * @param canvas
     * @param x
     * @param y
     */
    p.getPoint = function (canvas, x, y) {
        var style = window.getComputedStyle(canvas, null);
        var rect = canvas.getBoundingClientRect();
        return {
            x: (x - rect.left) * (canvas.width / parseFloat(style["width"])),
            y: (y - rect.top) * (canvas.height / parseFloat(style["height"]))
        };
    };
    d(PcMouseHelper, "instance"
        ,function () {
            if (PcMouseHelper._instance == null) {
                PcMouseHelper._instance = new PcMouseHelper();
            }
            return PcMouseHelper._instance;
        }
    );
    return PcMouseHelper;
}());
egret.registerClass(PcMouseHelper,'PcMouseHelper');
//# sourceMappingURL=PcHelper.js.map