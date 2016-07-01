/**
 *
 * @author
 *
 */
var Bird = (function (_super) {
    __extends(Bird, _super);
    function Bird() {
        _super.call(this);
        this.a = 0.05;
        this.bird = new egret.Bitmap();
        this.bird.bitmapData = RES.getRes("fly_png");
        this.addChild(this.bird);
        this.timer = new egret.Timer(50, -1);
        this.speed = -10;
        this.t = 0;
    }
    var d = __define,c=Bird,p=c.prototype;
    p.move = function (evt) {
        this.t += 1;
        this.speed += this.a * this.t;
        this.y += this.speed;
    };
    p.upControl = function (evt) {
        this.t = 0;
        this.speed = -8;
    };
    p.BeginMove = function () {
        this.timer.addEventListener(egret.TimerEvent.TIMER, this.move, this);
        this.timer.start();
    };
    p.EndMove = function () {
        this.timer.removeEventListener(egret.TimerEvent.TIMER, this.move, this);
        this.timer.stop();
    };
    return Bird;
})(egret.Sprite);
egret.registerClass(Bird,'Bird');
//# sourceMappingURL=Bird.js.map