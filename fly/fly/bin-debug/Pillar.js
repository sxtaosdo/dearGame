/**
 *
 * @author
 *
 */
var Pillar = (function (_super) {
    __extends(Pillar, _super);
    function Pillar(name, isRoolScreen) {
        if (isRoolScreen === void 0) { isRoolScreen = false; }
        _super.call(this, name, isRoolScreen);
        this.randomPosition();
    }
    var d = __define,c=Pillar,p=c.prototype;
    p.randomPosition = function () {
        for (var i = 0; i < this.bpGroup.length; i++) {
            this.bpGroup[i].anchorOffsetX = this.bpGroup[i].width / 2;
            this.bpGroup[i].x = 480;
        }
        this.bpGroup[0].y = Math.random() * 500 + 50;
        if (this.bpGroup[0].y < 400) {
            this.bpGroup[1].y = -9999;
        }
        else {
            this.bpGroup[1].y = Math.random() * (700 - this.bpGroup[0].y - 10) + 10;
        }
    };
    return Pillar;
})(BackGround);
egret.registerClass(Pillar,'Pillar');
//# sourceMappingURL=Pillar.js.map