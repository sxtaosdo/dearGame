/**
 * 拥有道具的数据结构
 * @author anj
 *
 */
var OwnVo = (function () {
    function OwnVo() {
    }
    var d = __define,c=OwnVo,p=c.prototype;
    p.analytic = function (data) {
        this.index = data.index;
        this.itemId = data.itemId;
        this.counts = data.counts;
    };
    return OwnVo;
}());
egret.registerClass(OwnVo,'OwnVo');
//# sourceMappingURL=OwnVo.js.map