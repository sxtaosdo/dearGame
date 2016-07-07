var PackView = (function (_super) {
    __extends(PackView, _super);
    function PackView() {
        _super.call(this);
        this.startX = 50;
        this.startY = 100;
        this.gridWidth = 100;
        this.gridHeight = 100;
        this.gapX = 10;
        this.packList = [];
        console.log("稍后做卖出功能");
        console.log("稍后做把道具放入背包功能");
    }
    var d = __define,c=PackView,p=c.prototype;
    d(PackView, "instance"
        ,function () {
            if (this._instance == null) {
                this._instance = new PackView();
            }
            return this._instance;
        }
    );
    p.onAdd = function (data) {
        if (UserModel.instance.packList.length > 0) {
            for (var i = 0; i < UserModel.instance.packList.length; i++) {
                var vo = UserModel.instance.packList[i];
                var pack = new PackItemRenderer(vo);
                this.addChild(pack);
                pack.onAdd();
                this.packList.push(pack);
            }
        }
    };
    p.onRemove = function (data) {
    };
    p.destroy = function (data) {
        this.onRemove();
    };
    return PackView;
}(egret.Sprite));
egret.registerClass(PackView,'PackView',["Ipanel"]);
//# sourceMappingURL=PackView.js.map