/**
 * 土地管理类
 * @author anj
 */
var EarthManager = (function () {
    function EarthManager() {
        this.earthList = [];
        TimerManager.instance.doLoop(1000, this.onUpdate, [this]);
    }
    var d = __define,c=EarthManager,p=c.prototype;
    d(EarthManager, "instance"
        ,function () {
            if (this._instance == null) {
                this._instance = new EarthManager();
            }
            return this._instance;
        }
    );
    p.onUpdate = function (target) {
        for (var i = 0; i < target.earthList.length; i++) {
            if (!target.earthList[i].onUpdate()) {
                target.removeTimer(target.earthList[i]);
            }
        }
    };
    p.addTimer = function (data) {
        for (var i = 0; i < this.earthList.length; i++) {
            if (this.earthList[i] == data) {
                return;
            }
        }
        this.earthList.push(data);
    };
    p.removeTimer = function (data) {
        for (var i = 0; i < this.earthList.length; i++) {
            if (this.earthList[i] == data) {
                this.earthList.splice(i, 1);
            }
        }
    };
    return EarthManager;
}());
egret.registerClass(EarthManager,'EarthManager');
//# sourceMappingURL=EarthManager.js.map