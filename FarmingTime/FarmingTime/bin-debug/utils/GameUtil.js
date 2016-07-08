/**
 * @author anj
 */
var GameUtil = (function () {
    function GameUtil() {
    }
    var d = __define,c=GameUtil,p=c.prototype;
    /**
    * 通过道具id获得道具
    */
    GameUtil.getItemById = function (id) {
        var i;
        for (i = 0; i < ConfigModel.instance.itemList.length; i++) {
            if (ConfigModel.instance.itemList[i].id == id) {
                return ConfigModel.instance.itemList[i];
            }
        }
        return null;
    };
    /**
     * 获取土地上植物当时生长状态(-1抛错0成熟正值为状态)
     * @param earthvo
     */
    GameUtil.getGraduateState = function (earthvo) {
        if (earthvo.state != 2) {
            return -1;
        }
        var seed = this.getItemById(earthvo.targetId);
        for (var i = 0; i < seed.graduateTimePoint.length; i++) {
            if (earthvo.graduateTime < seed.graduateTimePoint[i]) {
                return i + 1;
            }
        }
        return 0;
    };
    return GameUtil;
}());
egret.registerClass(GameUtil,'GameUtil');
//# sourceMappingURL=GameUtil.js.map