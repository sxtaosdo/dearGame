/**
 * 土地的数据结构（单机本地存储，第一次游戏时进行初始化）
 * @author anj
 *
 */
var EarthVo = (function () {
    /************************************/
    function EarthVo() {
    }
    var d = __define,c=EarthVo,p=c.prototype;
    p.analytic = function (data) {
        this.id = data.id;
        this.position = new egret.Point(data.position[0], data.position[1]);
        this.type = data.type;
        this.state = data.state;
        this.targetId = data.targetId;
        this.graduateTime = data.graduateTime;
        this.harvestTimes = data.harvestTimes;
        this.openPrice = data.openPrice;
    };
    return EarthVo;
}());
egret.registerClass(EarthVo,'EarthVo');
//# sourceMappingURL=EarthVo.js.map