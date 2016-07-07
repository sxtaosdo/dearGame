/**
 * 加载进度
 */
var LoadingUI = (function (_super) {
    __extends(LoadingUI, _super);
    function LoadingUI() {
        _super.call(this);
        this.current = 0;
        this.touchChildren = false;
        this.touchEnabled = false;
        this.addEventListener(eui.UIEvent.COMPLETE, this.onSkinComplete, this);
        this.skinName = "resource/skin/LoadSkin.exml";
    }
    var d = __define,c=LoadingUI,p=c.prototype;
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    p.onSkinComplete = function () {
        this.loadAssets(this);
    };
    /**
     * 统一加载所有的资源
     */
    p.loadAssets = function (target) {
        if (LoadingUI.assetsList.length > 0) {
            var groupName = LoadingUI.assetsList.shift();
            console.log("开始加载资源:" + groupName);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.loadGroup(groupName);
            target.current++;
        }
        else {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            target.progressText.text = "100%";
            GameDispatcher.send(BaseEvent.ASSEST_LOAD_COMPLETE_EVENT);
        }
    };
    p.onComplete = function (event) {
        this.loadAssets(this);
    };
    p.onError = function (event) {
        console.error("加载资源遇到错误");
    };
    p.onResourceProgress = function (event) {
        this.setProgress(event.itemsLoaded, event.itemsTotal);
    };
    p.setProgress = function (current, total) {
        var str = Math.floor((this.current - 1 + (current / total)) / LoadingUI.total * 100).toString() + "%";
        this.progressText.text = str;
    };
    p.onAdd = function (data) {
    };
    p.onRemove = function (data) {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onError, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
    };
    p.destroy = function () {
        this.onRemove();
    };
    LoadingUI.assetsList = ["earth"];
    LoadingUI.total = LoadingUI.assetsList.length;
    return LoadingUI;
}(eui.Component));
egret.registerClass(LoadingUI,'LoadingUI',["Ipanel"]);
//# sourceMappingURL=LoadingUI.js.map