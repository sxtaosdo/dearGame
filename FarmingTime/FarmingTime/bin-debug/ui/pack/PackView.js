var PackView = (function (_super) {
    __extends(PackView, _super);
    function PackView() {
        _super.call(this);
        this.packList = [];
        console.log("稍后做卖出功能");
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
    p.getItem = function (index) {
        if (index < 0 || index > this.packList.length - 1) {
            return null;
        }
        var item = this.packList[index - 1].itemVo;
        return item;
    };
    /**
     * 消耗背包中道具
     */
    p.consume = function (index) {
        if (index < 0 || index > this.packList.length - 1) {
            return false;
        }
        var item = this.packList[index - 1].itemVo;
        if (!item.canConsume) {
            return false;
        }
        else {
            item.ownNum--;
            if (item.ownNum <= 0) {
                this.packList[index - 1].itemId = 0;
                UserModel.instance.clearOwnerList();
            }
            return true;
        }
    };
    p.onAdd = function (data) {
        var i;
        if (UserModel.instance.packList.length > 0) {
            for (i = 0; i < UserModel.instance.packList.length; i++) {
                var vo = UserModel.instance.packList[i];
                var pack = new PackItemRenderer(vo);
                this.addChild(pack);
                pack.onAdd();
                this.packList.push(pack);
                if (UserModel.instance.ownerList[i] != null) {
                    pack.itemId = UserModel.instance.ownerList[i].itemId;
                }
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
