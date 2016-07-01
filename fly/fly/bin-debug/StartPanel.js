/**
 *
 * @author
 *
 */
var StartPanel = (function (_super) {
    __extends(StartPanel, _super);
    function StartPanel() {
        _super.call(this);
        this.skinName = "resource/StartSkin.exml";
        this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchToStart, this);
    }
    var d = __define,c=StartPanel,p=c.prototype;
    p.touchToStart = function (evt) {
        this.dispatchEvent(new egret.Event(FlyEvent.Start_Game_Event));
    };
    return StartPanel;
})(eui.Component);
egret.registerClass(StartPanel,'StartPanel');
//# sourceMappingURL=StartPanel.js.map