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
        if (this.farmLevelTxt == null) {
            this.farmLevelTxt = new egret.TextField();
            this.farmLevelTxt.size = 14;
            this.farmLevelTxt.textAlign = "left";
            this.farmLevelTxt.textColor = 0x0000FF;
            this.farmLevelTxt.width = 160;
            this.farmLevelTxt.height = 50;
            this.farmLevelTxt.x = this.goldTxt.x + this.goldTxt.width;
            this.farmLevelTxt.y = 5;
            this.addChild(this.farmLevelTxt);
            if (UserModel.instance.farmlevel != null) {
                this.setFarmLevel(UserModel.instance.farmlevel);
            }
        }
        if (this.farmExpTxt == null) {
            this.farmExpTxt = new egret.TextField();
            this.farmExpTxt.size = 14;
            this.farmExpTxt.textAlign = "left";
            this.farmExpTxt.textColor = 0x006600;
            this.farmExpTxt.width = 160;
            this.farmExpTxt.height = 50;
            this.farmExpTxt.x = this.farmLevelTxt.x + this.farmLevelTxt.width;
            this.farmExpTxt.y = 5;
            this.addChild(this.farmExpTxt);
            if (UserModel.instance.farmCurrentExp != null && UserModel.instance.farmRequiredExp != null) {
                this.setFarmExp(UserModel.instance.farmCurrentExp, UserModel.instance.farmRequiredExp);
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
            this.goldTxt.text = "拥有金币：" + StringUtils.getStrByUnits(gold);
        }
    };
    p.setFarmLevel = function (level) {
        if (this.farmLevelTxt != null) {
            this.farmLevelTxt.text = "农业等级：" + level.toString();
        }
    };
    p.setFarmExp = function (currentExp, requiredExp) {
        if (this.farmExpTxt != null) {
            this.farmExpTxt.text = "农业经验：" + currentExp.toString() + "/" + requiredExp.toString();
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
//# sourceMappingURL=MainView.js.map