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
    /**
     * 消耗背包中道具
     */
    p.consume = function (index) {
        var ownvo = this.packList[index - 1].ownItem;
        if (ownvo == null || !GameUtil.getItemById(ownvo.itemId).canConsume) {
            return false;
        }
        else {
            ownvo.counts--;
            if (ownvo.counts <= 0) {
                ownvo = null;
                UserModel.instance.clearOwnerList();
                GameModel.instance.ownItem = null;
            }
            this.packList[index - 1].ownItem = ownvo;
            return true;
        }
    };
    /**
     * 获得物品放入背包
     * @param index      放入背包位置
     * @param itemId     放入背包道具id
     * @param itemCounts 放入背包道具个数
     */
    p.gains = function (index, itemId, itemCounts) {
        var ownvo;
        if (this.packList[index - 1].ownItem != null && this.packList[index - 1].ownItem.itemId != itemId) {
            console.error("出错了，不同的物品不能放入背包同一格子");
            return false;
        }
        else if (this.packList[index - 1].ownItem != null && this.packList[index - 1].ownItem.itemId == itemId) {
            ownvo = this.packList[index - 1].ownItem;
            ownvo.counts += itemCounts;
            this.packList[index - 1].ownItem = ownvo;
            return true;
        }
        else if (this.packList[index - 1].ownItem == null) {
            ownvo = UserModel.instance.addOwnvo(itemId, itemCounts);
            this.packList[index - 1].ownItem = ownvo;
            if (index == GameModel.instance.packIndex) {
                GameModel.instance.ownItem = ownvo;
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
                if (UserModel.instance.ownerList[i] != null && vo.isOpen) {
                    pack.ownItem = UserModel.instance.ownerList[i];
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
//# sourceMappingURL=PackView.js.map