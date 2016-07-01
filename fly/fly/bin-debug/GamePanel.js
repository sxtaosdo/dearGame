/**
 *
 * @author
 *
 */
var GamePanel = (function (_super) {
    __extends(GamePanel, _super);
    function GamePanel() {
        _super.call(this);
        this.initView();
    }
    var d = __define,c=GamePanel,p=c.prototype;
    p.initView = function () {
        var bg1 = new BackGround("background_png");
        this.addChild(bg1);
        bg1.y = -100;
        bg1.BeginMove(-2);
        var bg2 = new BackGround("wall_png");
        this.addChild(bg2);
        bg2.y = 700;
        bg2.BeginMove(-8);
        var bg3 = new BackGround("cloud_png");
        bg3.alpha = 0.6;
        this.addChild(bg3);
        bg3.BeginMove(-1);
        var gameMask = new egret.Shape();
        gameMask.graphics.beginFill(0x000000);
        gameMask.graphics.drawRect(0, 0, 480, 700);
        gameMask.graphics.endFill();
        this.gameLayer = new egret.Sprite();
        this.gameLayer.addChild(gameMask);
        this.gameLayer.mask = gameMask;
        this.addChild(this.gameLayer);
        this.scoreText = new egret.TextField();
        this.scoreText.size = 20;
        this.scoreText.textColor = 0x000000;
        this.scoreText.text = "分数";
        this.addChild(this.scoreText);
        this.scoreText.x = 350;
        this.scoreText.y = 20;
        this.setScore(0);
        this.bird = new Bird();
        this.bird.x = 50;
        this.bird.y = 100;
        this.gameLayer.addChild(this.bird);
        this.bird.BeginMove();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bird.upControl, this.bird);
        this.gameTimer = new egret.Timer(2000, -1);
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER, this.createPillar, this);
        this.createPillar();
        this.gameTimer.start();
    };
    p.createPillar = function (evt) {
        if (evt === void 0) { evt = null; }
        var pillar = new Pillar("column_png");
        pillar.name = "mm";
        this.gameLayer.addChild(pillar);
        pillar.BeginMove(-8);
    };
    p.setScore = function (score) {
        this.score = score;
        this.scoreText.text = "分数:" + score;
    };
    return GamePanel;
})(eui.Component);
egret.registerClass(GamePanel,'GamePanel');
//# sourceMappingURL=GamePanel.js.map