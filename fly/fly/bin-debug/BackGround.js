/**
 *
 * @author
 *
 */
var BackGround = (function (_super) {
    __extends(BackGround, _super);
    function BackGround(name, isRollScreen) {
        if (isRollScreen === void 0) { isRollScreen = true; }
        _super.call(this);
        this.isRollScreen = isRollScreen;
        var bp1 = new egret.Bitmap();
        bp1.bitmapData = RES.getRes(name);
        this.addChild(bp1);
        this.singleWidth = bp1.width;
        this.bpGroup = [];
        this.bpGroup.push(bp1);
        if (isRollScreen) {
            var bp2 = new egret.Bitmap();
            bp2.bitmapData = RES.getRes(name);
            bp2.x = this.singleWidth;
            this.addChild(bp2);
            this.bpGroup.push(bp2);
        }
        else {
            var bp2 = new egret.Bitmap();
            bp2.bitmapData = RES.getRes(name);
            bp2.rotation = 180;
            this.addChild(bp2);
            this.bpGroup.push(bp2);
        }
        this.timer = new egret.Timer(40, -1);
    }
    var d = __define,c=BackGround,p=c.prototype;
    p.move = function (evt) {
        var arrLen = this.bpGroup.length;
        for (var i = 0; i < arrLen; i++) {
            this.bpGroup[i].x += this.speed;
        }
        //向右超过界面
        if (this.speed > 0 && this.bpGroup[arrLen - 1].x > 480) {
            //滚屏模式
            if (this.isRollScreen) {
                var bp1 = this.bpGroup.pop();
                bp1.x = this.bpGroup[0].x - this.singleWidth;
                this.bpGroup.unshift(bp1);
                this.addChild(bp1);
            }
            else {
                this.EndMove();
            }
        }
        else if (this.speed < 0 && this.bpGroup[0].x < 0 - this.singleWidth) {
            //滚屏模式
            if (this.isRollScreen) {
                var bp2 = this.bpGroup.shift();
                bp2.x = this.bpGroup[arrLen - 2].x + this.singleWidth;
                this.bpGroup.push(bp2);
            }
            else {
                this.EndMove();
            }
        }
    };
    p.BeginMove = function (_speed) {
        this.speed = _speed;
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.move, this);
        this.timer.start();
    };
    p.EndMove = function () {
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.move, this);
        this.timer.stop();
        if (this.parent != null) {
            this.parent.removeChild(this);
        }
    };
    return BackGround;
})(egret.Sprite);
egret.registerClass(BackGround,'BackGround');
//# sourceMappingURL=BackGround.js.map