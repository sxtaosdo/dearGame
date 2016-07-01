var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.call(this);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    var d = __define,c=Main,p=c.prototype;
    p.onConfigComplete = function () {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.loadGroup("preload");
    };
    p.onResourceLoadComplete = function () {
        var dragonbonesData = RES.getRes("Robot_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");
        var dragonbonesFactory = new dragonBones.EgretFactory();
        dragonbonesFactory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        var armature = dragonbonesFactory.buildArmature("robot");
        this.addChild(armature.display);
        armature.display.x = 200;
        armature.display.y = 300;
        armature.display.scaleX = 0.5;
        armature.display.scaleY = 0.5;
        dragonBones.WorldClock.clock.add(armature);
        armature.animation.gotoAndStop("Run", -1, -1, 0);
        egret.Ticker.getInstance().register(function (frameTime) { dragonBones.WorldClock.clock.advanceTime(0.01); }, this);
    };
    return Main;
})(egret.DisplayObjectContainer);
egret.registerClass(Main,'Main');
//# sourceMappingURL=Main.js.map