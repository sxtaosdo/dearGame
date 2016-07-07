/**
 * 土地基本类
 * @author anj
 */
var EarthItemRenderer = (function (_super) {
    __extends(EarthItemRenderer, _super);
    function EarthItemRenderer(vo, color) {
        _super.call(this);
        this.startX = 50;
        this.startY = 100;
        this.gridWidth = 100;
        this.gridHeight = 100;
        this.gapX = 10;
        this.gapY = 10;
        this.gridColor = 0xffffff;
        this.earthVo = vo;
        this.x = this.startX + vo.position.x * (this.gridWidth + this.gapX);
        this.y = this.startY + vo.position.y * (this.gridHeight + this.gapY);
        if (color == null) {
            color = this.gridColor;
        }
        this.drawBg(color);
    }
    var d = __define,c=EarthItemRenderer,p=c.prototype;
    p.drawBg = function (color) {
        this.graphics.beginFill(color);
        this.graphics.drawRect(0, 0, this.gridWidth, this.gridHeight);
        this.graphics.endFill();
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