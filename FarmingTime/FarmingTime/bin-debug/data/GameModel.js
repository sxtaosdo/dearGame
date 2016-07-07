/**
 * 不做存储，只在游戏中作用的数据
* @author anj
*/
var GameModel = (function () {
    function GameModel() {
        this._packIndex = 0; //当前选择背包索引，0为未指向
    }
    var d = __define,c=GameModel,p=c.prototype;
    d(GameModel, "instance"
        ,function () {
            if (this._instance == null) {
                this._instance = new GameModel();
            }
            return this._instance;
        }
    );
    d(p, "packIndex"
        ,function () {
            return this._packIndex;
        }
        ,function (value) {
            if (value == this._packIndex) {
                return;
            }
            if (this._packIndex != 0) {
                PackView.instance.packList[this._packIndex - 1].setSelect(false);
            }
            this._packIndex = value;
            if (value != 0) {
                PackView.instance.packList[this._packIndex - 1].setSelect(true);
            }
        }
    );
    return GameModel;
}());
egret.registerClass(GameModel,'GameModel');
