/**
 * 配置文件中配置，并且不可修改的数据
 * @author anj
 */
var ConfigModel = (function () {
    function ConfigModel() {
        this._itemList = []; //道具列表
        this._farmLevelList = []; //农业经验升级列表
        this._debug = false;
    }
    var d = __define,c=ConfigModel,p=c.prototype;
    d(ConfigModel, "instance"
        ,function () {
            if (this._instance == null) {
                this._instance = new ConfigModel();
            }
            return this._instance;
        }
    );
    p.analytic = function (data) {
        if (data.debug) {
            this._debug = data.debug == "true" ? true : false;
            console.log("debug模式:" + this._debug);
        }
        //        var key:string;
        //        for(key in data.prompt){
        //            LoadingUI.instance.pushTip(data.prompt[Number(key)].content);
        //        }
        UserModel.instance.gold = data.gold;
        UserModel.instance.farmlevel = data.farmLevel;
        this._farmLevelList = data.farmLevelList;
        UserModel.instance.setFarmExp(data.farmExp, data.farmLevelList[data.farmLevel - 1]);
        var key;
        var i;
        //道具列表构建
        for (i = 0; i < data.item.length; i++) {
            var itemvo = new ItemVo();
            itemvo.analytic(data.item[i]);
            this._itemList.push(itemvo);
        }
        //背包列表构建
        for (i = 0; i < data.pack.length; i++) {
            var packvo = new PackVo();
            packvo.analytic(data.pack[i]);
            UserModel.instance.packList.push(packvo);
        }
        //土地列表构建
        for (i = 0; i < data.earth.length; i++) {
            var earthvo = new EarthVo();
            earthvo.analytic(data.earth[i]);
            UserModel.instance.earthList.push(earthvo);
        }
        //拥有物品列表构建
        for (i = 0; i < data.own.length; i++) {
            var ownvo = new OwnVo();
            ownvo.analytic(data.own[i]);
            UserModel.instance.ownerList.push(ownvo);
        }
        UserModel.instance.ownerList.sort(this.ownListCompare);
    };
    p.ownListCompare = function (a, b) {
        if (a.itemId > b.itemId) {
            return 1;
        }
        else if (a.itemId == b.itemId && a.counts >= b.counts) {
            return 1;
        }
        else {
            return 0;
        }
    };
    d(p, "debug"
        ,function () {
            return this._debug;
        }
    );
    d(p, "itemList"
        ,function () {
            return this._itemList;
        }
    );
    d(p, "farmLevelList"
        ,function () {
            return this._farmLevelList;
        }
    );
    return ConfigModel;
}());
egret.registerClass(ConfigModel,'ConfigModel');
//# sourceMappingURL=ConfigModel.js.map