/**
 * 配置文件中配置，并且不可修改的数据
 * @author anj
 */
var ConfigModel = (function () {
    function ConfigModel() {
        this._seedList = []; //种子列表
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
        var key;
        var i;
        for (i = 0; i < data.pack.length; i++) {
            var packvo = new PackVo();
            packvo.analytic(data.pack[i]);
            UserModel.instance.packList.push(packvo);
        }
        for (i = 0; i < data.item.length; i++) {
            var itemvo = new ItemVo();
            itemvo.analytic(data.item[i]);
            UserModel.instance.ownerList.push(itemvo);
        }
        for (i = 0; i < data.seed.length; i++) {
            var seedvo = new SeedVo();
            seedvo.analytic(data.seed[i]);
            this.seedList.push(seedvo);
        }
        for (i = 0; i < data.earth.length; i++) {
            var earthvo = new EarthVo();
            earthvo.analytic(data.earth[i]);
            UserModel.instance.earthList.push(earthvo);
        }
    };
    d(p, "debug"
        ,function () {
            return this._debug;
        }
    );
    d(p, "seedList"
        ,function () {
            return this._seedList;
        }
    );
    return ConfigModel;
}());
egret.registerClass(ConfigModel,'ConfigModel');
//# sourceMappingURL=ConfigModel.js.map