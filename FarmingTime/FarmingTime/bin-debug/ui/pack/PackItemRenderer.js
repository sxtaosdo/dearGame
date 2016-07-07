/**
 * 背包类
 * @author anj
 */
var PackItemRenderer = (function (_super) {
    __extends(PackItemRenderer, _super);
    function PackItemRenderer(vo, color) {
        _super.call(this);
        this.startX = 5;
        this.startY = 5;
        this.gridWidth = 45;
        this.gridHeight = 45;
        this.gapX = 10;
        this.gridColor = 0xffffff;
        this.isSelect = false;
        this.packVo = vo;
        this.x = this.startX + (vo.index - 1) * (this.gridWidth + this.gapX);
        this.y = this.startY;
        if (color == null) {
            color = this.gridColor;
        }
        this.drawBg(color);
    }
    var d = __define,c=PackItemRenderer,p=c.prototype;
    p.drawBg = function (color) {
        this.graphics.beginFill(color);
        this.graphics.drawRect(0, 0, this.gridWidth, this.gridHeight);
        this.graphics.endFill();
        if (this.bgLight == null) {
            this.bgLight = new egret.Sprite();
            this.bgLight.graphics.lineStyle(2, 0xFF0000, 1);
            this.bgLight.graphics.moveTo(0, 0);
            this.bgLight.graphics.lineTo(this.gridWidth, 0);
            this.bgLight.graphics.lineTo(this.gridWidth, this.gridHeight);
            this.bgLight.graphics.lineTo(0, this.gridHeight);
            this.bgLight.graphics.lineTo(0, 0);
            this.bgLight.graphics.endFill();
        }
        this.addChild(this.bgLight);
    };
    p.clickToSelect = function (e) {
        this.isSelect = !this.isSelect;
        if (this.isSelect) {
            GameModel.instance.packIndex = this.packVo.index;
            console.log("稍后做物品移动功能");
        }
        else {
            GameModel.instance.packIndex = 0;
        }
    };
    p.setSelect = function (isSelect) {
        this.isSelect = isSelect;
        if (this.isSelect) {
            this.bgLight.visible = true;
        }
        else {
            this.bgLight.visible = false;
        }
    };
    p.onAdd = function (data) {
        console.log("稍后做背包购买开放功能");
        this.touchChildren = true;
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickToSelect, this);
        this.setSelect(false);
    };
    p.onRemove = function (data) {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickToSelect, this);
    };
    p.destroy = function (data) {
        this.onRemove();
    };
    return PackItemRenderer;
}(egret.Sprite));
egret.registerClass(PackItemRenderer,'PackItemRenderer');
//# sourceMappingURL=PackItemRenderer.js.map