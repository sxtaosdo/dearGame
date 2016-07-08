/**
 * 土地基本类
 * @author anj
 */
var EarthItemRenderer = (function (_super) {
    __extends(EarthItemRenderer, _super);
    function EarthItemRenderer(vo, pic) {
        _super.call(this);
        this.startX = 5;
        this.startY = 200;
        this.gridWidth = 100;
        this.gridHeight = 100;
        this.gapX = 10;
        this.gapY = 10;
        this.gridPic = "baseEarthBg";
        this.earthVo = vo;
        this.x = this.startX + vo.position.x * (this.gridWidth + this.gapX);
        this.y = this.startY + vo.position.y * (this.gridHeight + this.gapY);
        if (pic == null || pic == "") {
            pic = this.gridPic;
        }
        this.drawBg(pic);
    }
    var d = __define,c=EarthItemRenderer,p=c.prototype;
    p.drawBg = function (picUrl) {
        var bp = new egret.Bitmap();
        bp.texture = RES.getRes(picUrl + "_png");
        this.addChild(bp);
    };
    p.init = function (data) {
    };
    p.onUpdate = function (data) {
        return false;
    };
    p.onRemove = function (data) {
    };
    p.destroy = function (data) {
        this.onRemove();
    };
    return EarthItemRenderer;
}(egret.Sprite));
egret.registerClass(EarthItemRenderer,'EarthItemRenderer');
//# sourceMappingURL=EarthItemRenderer.js.map