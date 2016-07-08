/**
 * 随着游戏会变化的数据
* @author anj
*/
var UserModel = (function () {
    function UserModel() {
        this._earthList = []; //当前土地开垦情况列表
        this._ownerList = []; //当前拥有物品列表
        this._packList = []; //背包列表
    }
    var d = __define,c=UserModel,p=c.prototype;
    d(UserModel, "instance"
        ,function () {
            if (this._instance == null) {
                this._instance = new UserModel();
            }
            return this._instance;
        }
    );
    d(p, "gold"
        ,function () {
            return this._gold;
        }
        ,function (value) {
            MainView.instance.setGold(value);
            this._gold = value;
        }
    );
    d(p, "farmlevel"
        ,function () {
            return this._farmlevel;
        }
        ,function (value) {
            this._farmlevel = value;
            MainView.instance.setFarmLevel(value);
        }
    );
    p.setFarmExp = function (currentExp, requiredExp) {
        if (requiredExp === void 0) { requiredExp = 0; }
        this._farmCurrentExp = currentExp;
        if (requiredExp != 0) {
            this._farmRequiredExp = requiredExp;
        }
        //升级控制
        if (this._farmCurrentExp >= this._farmRequiredExp) {
            for (var i = this._farmlevel - 1; i < ConfigModel.instance.farmLevelList.length; i++) {
                if (this._farmlevel > ConfigModel.instance.farmLevelList[i]) {
                    this._farmlevel -= ConfigModel.instance.farmLevelList[i];
                    continue;
                }
                else {
                    this.farmlevel = i + 1;
                    this.setFarmExp(this._farmCurrentExp, ConfigModel.instance.farmLevelList[i]);
                    return;
                }
            }
        }
        MainView.instance.setFarmExp(this._farmCurrentExp, this._farmRequiredExp);
    };
    d(p, "farmCurrentExp"
        ,function () {
            return this._farmCurrentExp;
        }
    );
    d(p, "farmRequiredExp"
        ,function () {
            return this._farmRequiredExp;
        }
    );
    d(p, "earthList"
        ,function () {
            return this._earthList;
        }
    );
    d(p, "ownerList"
        ,function () {
            return this._ownerList;
        }
    );
    p.clearOwnerList = function () {
        for (var i = 0; i < this._ownerList.length; i++) {
            if (this._ownerList[i].counts <= 0) {
                this._ownerList.splice(i);
                i--;
            }
        }
    };
    /**
     * 增加新的拥有道具
     * @param itemId
     * @param counts
     */
    p.addOwnvo = function (itemId, counts) {
        var ownvo = new OwnVo();
        ownvo.itemId = itemId;
        ownvo.counts = counts;
        //获取新物品的索引
        this._ownerList.sort(this.sortOwnerlistByIndex);
        var i;
        for (i = 0; i < this._ownerList.length; i++) {
            if (this._ownerList[i].index == i + 1) {
                continue;
            }
            else {
                ownvo.index = i + 1;
            }
        }
        if (ownvo.index == null) {
            ownvo.index = this._ownerList.length;
        }
        this._ownerList.push(ownvo);
        return ownvo;
    };
    p.sortOwnerlistByIndex = function (a, b) {
        if (a.index > b.index) {
            return 1;
        }
        else {
            return 0;
        }
    };
    d(p, "packList"
        ,function () {
            return this._packList;
        }
    );
    return UserModel;
}());
egret.registerClass(UserModel,'UserModel');
//# sourceMappingURL=UserModel.js.map