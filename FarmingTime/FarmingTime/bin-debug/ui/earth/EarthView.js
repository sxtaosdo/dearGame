var EarthView = (function (_super) {
    __extends(EarthView, _super);
    function EarthView() {
        _super.call(this);
    }
    var d = __define,c=EarthView,p=c.prototype;
    p.onAdd = function (data) {
        if (UserModel.instance.earthList.length > 0) {
            for (var i = 0; i < UserModel.instance.earthList.length; i++) {
                var vo = UserModel.instance.earthList[i];
                if (vo.type == 1) {
                    var farmland = new FarmlandItemRenderer(vo);
                    this.addChild(farmland);
                }
            }
        }
    };
    p.onRemove = function (data) {
    };
    p.destroy = function (data) {
        this.onRemove();
    };
    return EarthView;
}(egret.Sprite));
egret.registerClass(EarthView,'EarthView',["Ipanel"]);
//# sourceMappingURL=EarthView.js.map