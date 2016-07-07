/**
 * 种子的数据结构（配置文件中读取）
 * @author anj
 *
 */
var SeedVo = (function () {
    function SeedVo() {
    }
    var d = __define,c=SeedVo,p=c.prototype;
    p.analytic = function (data) {
        this.seedType = data.seedType;
        this.graduateTime = data.graduateTime;
        this.basePrice = data.basePrice;
        this.graduateTimePoint = data.graduateTimePoint;
    };
    return SeedVo;
}());
egret.registerClass(SeedVo,'SeedVo');
//# sourceMappingURL=SeedVo.js.map