/**
 * farmingTime
 */
class Main extends eui.UILayer{
    private isThemeLoadEnd: boolean = false;
    private isConfigLoadEnd: boolean = false;
    
    private load:LoadingUI;
    private mainView:MainView;

    protected createChildren(): void {
        super.createChildren();
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter",assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter",new ThemeAdapter());
        //加载游戏配置文件
        this.loadGameConfig();
        //加载主题皮肤
        var theme = new eui.Theme("resource/default.thm.json",this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE,this.onThemeLoadComplete,this);
        mouse.enable(this.stage);
        TipManager.instance.displayStage = this.stage;
    }

    /**
     * 主题文件加载完成,开始预加载
     */
    private onThemeLoadComplete(): void {
        this.isThemeLoadEnd = true;
        this.createScene();
    }

    private loadGameConfig(): void {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onGameConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
    }

    private onGameConfigComplete(event: RES.ResourceEvent): void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onGameConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
        RES.loadGroup("preload");
    }

    /**
     * 资源组加载出错
     */
    private onResourceLoadError(event: RES.ResourceEvent): void {
        console.warn("Group:" + event.groupName + " has failed to load");
    }
    
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event: RES.ResourceEvent): void {
        if(event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onResourceLoadError,this);
            ConfigModel.instance.analytic(RES.getRes("gameConfig_json"));
            this.isConfigLoadEnd = true;
            this.createScene();
        }
    }

    private createScene() {
        //主题及配置文件都加载完成后，进入可视化资源加载
        if(!this.isThemeLoadEnd || !this.isConfigLoadEnd) {
            return;
        }
        this.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.ON;
        GameDispatcher.instance.addEventListener(BaseEvent.ASSEST_LOAD_COMPLETE_EVENT,this.assestLoadComplete,this);
        this.load=new LoadingUI();
        this.load.visible=false;//for test
        this.addChild(this.load);
    }
    
    private assestLoadComplete():void{
        if(this.load!=null){
            this.load.onRemove();
            if(this.load.parent!=null){
                this.load.parent.removeChild(this.load);
            }
            this.load=null;
        }
        GameDispatcher.instance.removeEventListener(BaseEvent.ASSEST_LOAD_COMPLETE_EVENT,this.assestLoadComplete,this);
        if(this.mainView==null){
            this.mainView=new MainView();
        }
        this.addChild(this.mainView);
        this.mainView.onAdd();
    }
}