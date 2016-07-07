/**
 * 主界面
 * @author anj
 */
var MainView = (function (_super) {
    __extends(MainView, _super);
    function MainView() {
        _super.call(this);
    }
    var d = __define,c=MainView,p=c.prototype;
    d(MainView, "instance"
        ,function () {
            if (this._instance == null) {
                this._instance = new MainView();
            }
            return this._instance;
        }
    );
    p.onAdd = function (data) {
        if (this.earthView == null) {
            this.earthView = new EarthView();
        }
        this.addChild(this.earthView);
        this.earthView.onAdd();
        if (this.packView == null) {
            this.packView = PackView.instance;
        }
        this.addChild(this.packView);
        this.packView.onAdd();
    };
    p.onRemove = function (data) {
    };
    p.destroy = function (data) {
        this.onRemove();
    };
    return MainView;
}(egret.Sprite));
egret.registerClass(MainView,'MainView',["Ipanel"]);
//# sourceMappingURL=MainView.js.map