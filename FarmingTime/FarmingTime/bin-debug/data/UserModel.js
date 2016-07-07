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
            this._gold = value;
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
    d(p, "packList"
        ,function () {
            return this._packList;
        }
    );
    return UserModel;
}());
egret.registerClass(UserModel,'UserModel');
//# sourceMappingURL=UserModel.js.map