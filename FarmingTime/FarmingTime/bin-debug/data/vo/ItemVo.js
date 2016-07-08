/**
 * 道具的数据结构
 * @author anj
 *
 */
var ItemVo = (function () {
    /*********************************/
    function ItemVo() {
    }
    var d = __define,c=ItemVo,p=c.prototype;
    p.analytic = function (data) {
        this.id = data.id;
        this.type = data.type;
        this.subType = data.subType;
        this.desc = data.desc;
        this.maxNum = data.maxNum;
        this.targetId = data.targetId;
        this.targetTool = data.targetTool;
        this.graduateTimePoint = data.graduateTimePoint;
        this.harvestTimes = data.harvestTimes;
        this.gainMinTimes = data.gainMinTimes;
        this.gainMaxTimes = data.gainMaxTimes;
        this.basePrice = data.basePrice;
        this.maxNum = data.maxNum;
        this.gainExp = data.gainExp;
        this.canSell = data.canSell;
        this.canConsume = data.canConsume;
    };
    return ItemVo;
}());
egret.registerClass(ItemVo,'ItemVo');
//# sourceMappingURL=ItemVo.js.map