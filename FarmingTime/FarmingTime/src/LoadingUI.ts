/**
 * 加载进度
 */ 
class LoadingUI extends eui.Component implements Ipanel {

    private progressText: eui.Label;
    private static assetsList: Array<string> = ["earth"];
    private static total: number = LoadingUI.assetsList.length;
    private current: number = 0;

    public constructor() {
        super();
        this.touchChildren = false;
        this.touchEnabled = false;
        this.addEventListener(eui.UIEvent.COMPLETE,this.onSkinComplete,this);
        this.skinName = "resource/skin/LoadSkin.exml"; 
    }

    protected createChildren() {
        super.createChildren();
    }
    
    private onSkinComplete(): void {       
        this.loadAssets(this);
    }
    
    /**
     * 统一加载所有的资源
     */
    private loadAssets(target:LoadingUI): void {
        
        if(LoadingUI.assetsList.length > 0) {
            var groupName: string = LoadingUI.assetsList.shift();
            console.log("开始加载资源:" + groupName);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onComplete,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onError,this);
            RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            RES.loadGroup(groupName);
            target.current++;
        } else {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onError,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            target.progressText.text = "100%";
            GameDispatcher.send(BaseEvent.ASSEST_LOAD_COMPLETE_EVENT);
        }
    }

    private onComplete(event: RES.ResourceEvent): void {
        this.loadAssets(this);
    }

    private onError(event: RES.ResourceEvent): void {
        console.error("加载资源遇到错误");
    }

    private onResourceProgress(event: RES.ResourceEvent): void {
        this.setProgress(event.itemsLoaded,event.itemsTotal);
    }

    public setProgress(current,total): void {
        var str: string = Math.floor((this.current - 1 + (current / total)) / LoadingUI.total * 100).toString() + "%";
        this.progressText.text = str;
    }

    public onAdd(data?: any): void {
    }

    public onRemove(data?: any): void {
        RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onComplete,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR,this.onError,this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
    }

    public destroy(): void {
        this.onRemove();
    }
}
