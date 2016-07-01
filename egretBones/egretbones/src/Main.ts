class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/default.res.json", "resource/");
    }
    
    private onConfigComplete(){
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.loadGroup("preload");
    }
    
    private onResourceLoadComplete(){
        var dragonbonesData = RES.getRes("Robot_json");
        var textureData = RES.getRes("texture_json");
        var texture = RES.getRes("texture_png");
        
        var dragonbonesFactory:dragonBones.EgretFactory=new dragonBones.EgretFactory();
        dragonbonesFactory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(dragonbonesData));
        dragonbonesFactory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture,textureData));
        
        var armature:dragonBones.Armature=dragonbonesFactory.buildArmature("robot");
        this.addChild(armature.display);
        armature.display.x=200;
        armature.display.y=300;
        armature.display.scaleX=0.5;
        armature.display.scaleY=0.5;
        
        dragonBones.WorldClock.clock.add(armature);
        armature.animation.gotoAndStop("Run",-1,-1,0);
        
        egret.Ticker.getInstance().register(function(frameTime:number){dragonBones.WorldClock.clock.advanceTime(0.01)},this);
        
    }
}