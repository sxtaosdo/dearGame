/**
 * farmingTime
 */
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
        this.isThemeLoadEnd = false;
        this.isConfigLoadEnd = false;
    }
    var d = __define,c=Main,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //加载游戏配置文件
        this.loadGameConfig();
        //加载主题皮肤
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        mouse.enable(this.stage);
        TipManager.instance.displayStage = this.stage;
    };
    /**
     * 主题文件加载完成,开始预加载
     */
    p.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.createScene();
    };
    p.loadGameConfig = function () {
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onGameConfigComplete, this);
        RES.loadConfig("resource/resource.json", "resource/");
    };
    p.onGameConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onGameConfigComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * 资源组加载出错
     */
    p.onResourceLoadError = function (event) {
        console.warn("Group:" + event.groupName + " has failed to load");
    };
    /**
     * preload资源组加载完成
     */
    p.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            ConfigModel.instance.analytic(RES.getRes("gameConfig_json"));
            this.isConfigLoadEnd = true;
            this.createScene();
        }
    };
    p.createScene = function () {
        //主题及配置文件都加载完成后，进入可视化资源加载
        if (!this.isThemeLoadEnd || !this.isConfigLoadEnd) {
            return;
        }
        this.stage.dirtyRegionPolicy = egret.DirtyRegionPolicy.ON;
        GameDispatcher.instance.addEventListener(BaseEvent.ASSEST_LOAD_COMPLETE_EVENT, this.assestLoadComplete, this);
        this.load = new LoadingUI();
        this.load.visible = false; //for test
        this.addChild(this.load);
    };
    p.assestLoadComplete = function () {
        if (this.load != null) {
            this.load.onRemove();
            if (this.load.parent != null) {
                this.load.parent.removeChild(this.load);
            }
            this.load = null;
        }
        GameDispatcher.instance.removeEventListener(BaseEvent.ASSEST_LOAD_COMPLETE_EVENT, this.assestLoadComplete, this);
        if (this.mainView == null) {
            this.mainView = MainView.instance;
        }
        this.addChild(this.mainView);
        this.mainView.onAdd();
    };
    return Main;
}(eui.UILayer));
egret.registerClass(Main,'Main');
