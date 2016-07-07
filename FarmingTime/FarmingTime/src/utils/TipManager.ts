class TipManager {
    private static _instance: TipManager;
    
    private tf:egret.TextField;
    private _tipTargets:Array<TipHandler> =[]; //Tip注册列表
    private backgroundalpha:number = 0.9; //背景透明度

    private backgroundcolor:number = 0x000000; //背景色
    private color:number = 0x593A04; //边框颜色值
    private font:string = "Times New Roman"; //Tip文字字体
    private fontColor: number = 0xFFFF00;//Tip文字颜色
    private isWordWarp: boolean = true;//是否自动换行
    private size:number=16; //Tip文字大小
    
    private tipUI:egret.Sprite;
    private _nowTip:egret.Sprite;//当前显示的tipUI
    private _displayStage:egret.DisplayObjectContainer;

    public constructor() {
        this.tf=new egret.TextField;
        this.tf.fontFamily = this.font;
        this.tf.textColor = this.fontColor;
        this.tf.size = this.size;
        this.tf.x=4;
        this.tf.y=4;
        this.tipUI=new egret.Sprite();
        this.tipUI.addChild(this.tf);
        this.tipUI.touchChildren=false;
        this.tipUI.touchEnabled=false;       
    }
    
    public static get instance(): TipManager {
        if(this._instance == null) {
            this._instance = new TipManager();
        }
        return this._instance;
    }
    
    public get displayStage():egret.DisplayObjectContainer{
        return this._displayStage;
    }
    
    public set displayStage(value:egret.DisplayObjectContainer){
        this._displayStage=value;
    }
    
    public cleanTip2(target: egret.DisplayObject): void {
        this.cleanNowTip();
        target.removeEventListener(mouse.MouseEvent.MOUSE_MOVE,this.targetUiMouseMoveHandler,this);
    }
    
    /**
     * 
     * @param targetUi  要添加Tip的组件
     * @param tip       Tip的默认内容，可以是字符串也可以是继承自Sprite的组件
     * @param wordWarp
     * @param fun
     */
    public registToolTip(targetUi:egret.DisplayObject,tip:Object = null,wordWarp:boolean = true,fun:Function = null):void{
        this.isWordWarp=wordWarp;
        var tipVo: TipHandler=new TipHandler();
        tipVo.tip=tip;
        tipVo.callbackFun=fun;
        tipVo.targetUi=targetUi;
		this._tipTargets.push(tipVo);
		targetUi.addEventListener(mouse.MouseEvent.ROLL_OVER, this.targetUiRollOverHandler,this);
        targetUi.addEventListener(mouse.MouseEvent.ROLL_OUT,this.targetUiRollOutHandler,this);
        targetUi.addEventListener(mouse.MouseEvent.MOUSE_MOVE,this.targetUiMouseMoveHandler,this);
    }
    
    /**
     * 解注册ToolTip和组件的关系
     * @param targetUi
     */
    public unRegistToolTip(targetUi:egret.DisplayObject):void{
        var index: number = 0;
        var inList: boolean = false;
        for(index = 0;index < this._tipTargets.length;index++) {
            if(this._tipTargets[index].targetUi == targetUi) {
                inList = true;
                break;
            }
        }
        if(!inList){
            return;
        }
        this._tipTargets.splice(index);
        targetUi.removeEventListener(mouse.MouseEvent.ROLL_OVER,this.targetUiRollOverHandler,this);
        targetUi.removeEventListener(mouse.MouseEvent.ROLL_OUT,this.targetUiRollOutHandler,this);
        targetUi.removeEventListener(mouse.MouseEvent.MOUSE_MOVE,this.targetUiMouseMoveHandler,this);
    }
    
    /**
     *  清理掉当前的ToolTip
     */
    private cleanNowTip(): void {
        if(this._nowTip) {
            if(this.displayStage && this.displayStage.contains(this._nowTip)) {
                this.displayStage.removeChild(this._nowTip)
            }
            this._nowTip = null;
        }
    }
    
    /**
     * 在目标上鼠标移动
     * @param mouseEvent
     */
    private targetUiMouseMoveHandler(evt: egret.TouchEvent): void {
//        console.log("滑动啦");
        if(this._nowTip && this.displayStage) {
            var point: egret.Point;
            point = this.displayStage.globalToLocal(evt.stageX,evt.stageY+5);
            this._nowTip.x = point.x+5;
            this._nowTip.y = point.y+10;

            try {
                if(this._nowTip.x + this._nowTip.width > this.displayStage.width) {
                    this._nowTip.x = this.displayStage.width - this._nowTip.width;
                }
                if(this._nowTip.y + this._nowTip.height > this.displayStage.height) {
                    this._nowTip.y = this.displayStage.height - this._nowTip.height;
                }
            }
            catch(err) {
                console.error(err);
            }
        }
    }
    
    /**
     * 鼠标滑过时要显示Tip
     * @param mouseEvent
     */
    private targetUiRollOverHandler(mouseEvent:egret.TouchEvent):void{
        this.showTip(mouseEvent);
//        console.log("进来啦");
    }
    
    /**
     * 鼠标离开时取消显示Tip
     * @param mouseEvent
     */
    private targetUiRollOutHandler(mouseEvent:egret.TouchEvent):void{
        this.cleanNowTip();
//        console.log("出去啦");
    }
    
    /**
     * 未注册的UI鼠标离开时
     * @param mouseEvent
     */
    private unRegistTargetUiRollOutHandler(mouseEvent:egret.TouchEvent):void{
        this.cleanNowTip();
        mouseEvent.target.removeEventListener(mouse.MouseEvent.ROLL_OUT,this.unRegistTargetUiRollOutHandler,this);
        mouseEvent.target.removeEventListener(mouse.MouseEvent.MOUSE_MOVE,this.targetUiMouseMoveHandler,this);
    }
    
    /**
     * 显示Tip公共方法
     * @param mouseEvent
     * @param tip
     * @param fun
     */
    public showTip(mouseEvent:egret.TouchEvent,tip:Object = null,fun:Function = null):void{
        var index:number=0;
        var target:any=mouseEvent.target;
        var inList:boolean=false;
        for(index=0;index<this._tipTargets.length;index++){
            if(this._tipTargets[index].targetUi==target){
                inList=true;
                if(tip == null && this._tipTargets[index].tip != null) {
                    tip = this._tipTargets[index].tip;
                }
                if(fun==null && this._tipTargets[index].callbackFun!=null){
                    fun = this._tipTargets[index].callbackFun;
                }
                break;
            }
        }
        if(!inList){
            target.addEventListener(mouse.MouseEvent.ROLL_OUT,this.unRegistTargetUiRollOutHandler,this);
            target.addEventListener(mouse.MouseEvent.MOUSE_MOVE,this.targetUiMouseMoveHandler,this);
        }
        this.cleanNowTip();
        if(tip!=null){
            if(typeof(tip)=="string"){
                this.tf.text=tip as string;
                this.tipUI.graphics.clear();
                this.tipUI.graphics.lineStyle(1,this.color,this.backgroundalpha);
                this.tipUI.graphics.beginFill(this.backgroundcolor,this.backgroundalpha);
                this.tipUI.graphics.drawRoundRect(0,0,this.tf.width + 15,this.tf.height + 5,6,6);
                this.tipUI.graphics.endFill();
                this._nowTip = this.tipUI;
            }
            else{
                this._nowTip=tip as egret.Sprite;
            }
        }
        else if(fun!=null){
            var funRetObj:Object=(fun as Function)(target);
            if(typeof(funRetObj)=="string"){
                this.tf.text=funRetObj as string;
                this.tf.wordWrap=true;
                this.tf.height=this.tf.textHeight;
                this.tipUI.graphics.clear();
                this.tipUI.graphics.lineStyle(1,this.color,this.backgroundalpha);
                this.tipUI.graphics.beginFill(this.backgroundcolor,this.backgroundalpha);
                this.tipUI.graphics.drawRoundRect(0, 0, this.tf.width + 15, this.tf.height, 6, 6); //tipUi.width,tipUi.height);带圆角的背景
                this.tipUI.graphics.endFill();
                this._nowTip = this.tipUI;
            }
            else{
                this._nowTip=funRetObj as egret.Sprite;
            }
        }
        if(this._nowTip) {
            if(this.displayStage!=null){
                var point: egret.Point;
                point = this.displayStage.globalToLocal(mouseEvent.stageX,mouseEvent.stageY+5);
                this._nowTip.x = point.x+5;
                this._nowTip.y = point.y+10;
                try {
                    if(this._nowTip.x + this._nowTip.width > this.displayStage.width) {
                        this._nowTip.x = this.displayStage.width - this._nowTip.width;
                    }
                    if(this._nowTip.y + this._nowTip.height > this.displayStage.height) {
                        this._nowTip.y = this.displayStage.height - this._nowTip.height;
                    }
                }
                catch(err) {
                    console.error(err);
                }
                this.displayStage.addChild(this._nowTip);
            }        
        }
    }
    
    public cleanAll(): void {
        for(var i:number=0;i<this._tipTargets.length;i++){
            this._tipTargets[i].targetUi.removeEventListener(mouse.MouseEvent.ROLL_OVER,this.targetUiRollOverHandler,this);
            this._tipTargets[i].targetUi.removeEventListener(mouse.MouseEvent.ROLL_OUT,this.targetUiRollOutHandler,this);
            this._tipTargets[i].targetUi.removeEventListener(mouse.MouseEvent.MOUSE_MOVE,this.targetUiMouseMoveHandler,this);
        }
    }
}
    
    
    
    

class TipHandler {
    /**要添加Tip的组件*/
    public targetUi: egret.DisplayObject;
    /**Tip的默认内容，可以是字符串也可以是继承自Sprite的组件*/
    public tip:Object;
    /**回调函数*/
    public callbackFun: Function;
    
    /**清理*/
    public clear(): void {
        this.targetUi = null;
        this.tip = null;
        this.callbackFun=null;
    }
}


