/**
 * 道具的数据结构
 * @author anj
 *
 */
var ItemVo = (function () {
    function ItemVo() {
    }
    var d = __define,c=ItemVo,p=c.prototype;
    p.analytic = function (data) {
        this.type = data.type;
        this.subType = data.subType;
        this.ownNum = data.ownNum;
        this.maxNum = data.maxNum;
        this.soldMoney = data.soldMoney;
    };
    return ItemVo;
}());
egret.registerClass(ItemVo,'ItemVo');
//# sourceMappingURL=ItemVo.js.map