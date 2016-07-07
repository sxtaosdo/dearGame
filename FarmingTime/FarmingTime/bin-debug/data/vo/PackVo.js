/**
 * 仓库的数据结构
 * @author anj
 *
 */
var PackVo = (function () {
    function PackVo() {
    }
    var d = __define,c=PackVo,p=c.prototype;
    p.analytic = function (data) {
        this.index = data.index;
        this.isOpen = data.isOpen;
        this.openPrice = data.openPrice;
    };
    return PackVo;
}());
egret.registerClass(PackVo,'PackVo');
//# sourceMappingURL=PackVo.js.map