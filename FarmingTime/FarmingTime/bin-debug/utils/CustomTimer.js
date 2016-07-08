/**
 * 计时器
 * @author sxt
 */
var CustomTimer = (function (_super) {
    __extends(CustomTimer, _super);
    function CustomTimer(delay, repeatCount) {
        if (repeatCount === void 0) { repeatCount = 0; }
        _super.call(this, delay, repeatCount);
        this._data = null;
    }
    var d = __define,c=CustomTimer,p=c.prototype;
    d(p, "data"
        ,function () {
            return this._data;
        }
        ,function (value) {
            this._data = value;
        }
    );
    return CustomTimer;
}(egret.Timer));
egret.registerClass(CustomTimer,'CustomTimer');
//# sourceMappingURL=CustomTimer.js.map