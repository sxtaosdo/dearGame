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
        if (this.goldTxt == null) {
            this.goldTxt = new egret.TextField();
            this.goldTxt.size = 14;
            this.goldTxt.textAlign = "left";
            this.goldTxt.textColor = 0xFFFF00;
            this.goldTxt.width = 160;
            this.goldTxt.height = 50;
            this.goldTxt.x = 5;
            this.goldTxt.y = 5;
            this.addChild(this.goldTxt);
            if (UserModel.instance.gold != null) {
                this.setGold(UserModel.instance.gold);
            }
        }
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
    p.setGold = function (gold) {
        if (this.goldTxt != null) {
            this.goldTxt.text = "拥有金币：" + gold.toString();
        }
    };
    p.onRemove = function (data) {
    };
    p.destroy = function (data) {
        this.onRemove();
    };
    return MainView;
}(egret.Sprite));
egret.registerClass(MainView,'MainView',["Ipanel"]);
