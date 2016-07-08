/**
 * 背包类
 * @author anj
 */
class PackItemRenderer extends egret.Sprite{
    protected startX:number=5;
    protected startY:number=20;
    protected gridWidth:number=45;
    protected gridHeight:number=45;
    protected gapX:number=10;
    protected gapY:number=10;
    protected gridColor:number=0xffffff;
    
    private bgLight:egret.Sprite;
    
    private packVo:PackVo;
    private _ownItem:OwnVo;
    private isSelect:boolean=false;
    private itemTxt:egret.TextField;
    private numTxt:egret.TextField;
    
    public constructor(vo:PackVo,color?:number) {
        super();
        this.packVo=vo;
        this.x=this.startX+((vo.index-1)%10)*(this.gridWidth+this.gapX);
        this.y=this.startY+Math.floor((vo.index-1)/10)*(this.gridHeight+this.gapY);
        if(color==null){
            color=this.gridColor;
        }
        this.drawBg(color);
        //之后会改成图像化
        this.itemTxt=new egret.TextField();
        this.itemTxt.size=10;
        this.itemTxt.textAlign="center";
        this.itemTxt.textColor=0x000000;
        this.itemTxt.width=this.gridWidth-10;
        this.itemTxt.height=50;
        this.itemTxt.x=5;
        this.itemTxt.y=5;
        this.addChild(this.itemTxt);
        
        this.numTxt = new egret.TextField();
        this.numTxt.size = 10;
        this.numTxt.width = 20;
        this.numTxt.height = 10;
        this.numTxt.textColor=0x000000;
        this.numTxt.textAlign="right";
        this.numTxt.x = this.gridWidth-this.numTxt.width;
        this.numTxt.y = this.gridHeight-this.numTxt.height;
        this.addChild(this.numTxt);
    }
    
    public set ownItem(value:OwnVo){
        this._ownItem = value;
        
        if(this._ownItem!=null){
            this.itemTxt.text = GameUtil.getItemById(this._ownItem.itemId).desc;
            this.numTxt.text=this._ownItem.counts.toString();
        }
        else{
            this.itemTxt.text="";
            this.numTxt.text="";
        }
    }
    
    public get ownItem():OwnVo{
        return this._ownItem;
    }
    
    protected drawBg(color:number):void{
        this.graphics.beginFill(color);
        this.graphics.drawRect(0,0,this.gridWidth,this.gridHeight);
        this.graphics.endFill();
        if(this.bgLight==null){
            this.bgLight=new egret.Sprite();
            this.bgLight.graphics.lineStyle(2,0xFF0000,1);
            this.bgLight.graphics.moveTo(0,0);
            this.bgLight.graphics.lineTo(this.gridWidth,0);
            this.bgLight.graphics.lineTo(this.gridWidth,this.gridHeight);
            this.bgLight.graphics.lineTo(0,this.gridHeight);
            this.bgLight.graphics.lineTo(0,0);
            this.bgLight.graphics.endFill();
        }
        this.addChild(this.bgLight);
    }
    
    private clickToSelect(e:Event):void{
        this.isSelect=!this.isSelect;
        if(this.isSelect) {
//            //如果原格子有物品且新格子无物品，则原格子物品移动到新格子
//            if(GameModel.instance.packIndex > 0 &&this.ownItem==null &&GameModel.instance.ownItem!=null){
//                this.ownItem = GameModel.instance.ownItem;
//                PackView.instance.packList[GameModel.instance.packIndex - 1].ownItem=null;
//            }
            //如果原格子有物品且新格子有物品且物品相同则合并到新格子
            if(GameModel.instance.packIndex>0 && this.ownItem!=null && GameModel.instance.ownItem!=null && this.ownItem.itemId==GameModel.instance.ownItem.itemId)
            {
                var ownItem=this.ownItem;
                ownItem.counts += GameModel.instance.ownItem.counts;
                this.ownItem=ownItem;
                GameModel.instance.ownItem.counts=0;
                PackView.instance.packList[GameModel.instance.packIndex-1].ownItem=null;
                UserModel.instance.clearOwnerList();
            }
            GameModel.instance.packIndex = this.packVo.index;
        }
        else {
            GameModel.instance.packIndex = 0;           
        }
    }
    
    private clickToOpen(e: Event): void {
        if(UserModel.instance.gold>=this.packVo.openPrice){
            console.log("消息提示：" + "开启新背包");
            UserModel.instance.gold=UserModel.instance.gold-this.packVo.openPrice;
            this.setOpen(true);
        }
        else{
            console.log("弹出提示面板：" + "金币不足，无法购买");
        }
    }
    
    public setSelect(isSelect:boolean):void{
        this.isSelect=isSelect;
        if(this.isSelect){
            this.bgLight.visible = true;
        }
        else{
            this.bgLight.visible = false;
        }
    }
    
    public setOpen(isOpen:boolean):void{
        this.packVo.isOpen=isOpen;
        if(isOpen){
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickToOpen,this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickToSelect,this);
            this.itemTxt.text="";
            this.numTxt.text="";
        }
        else{
            this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickToOpen,this);
            this.itemTxt.text=StringUtils.getStrByUnits(this.packVo.openPrice)+"金币开启";
            this.numTxt.text="";
        }
    }
    
    public onAdd(data?: any):void{
        console.log("稍后做背包购买开放功能");
        this.touchChildren=true;
        this.touchEnabled=true;
        this.setOpen(this.packVo.isOpen);      
        this.setSelect(false);
    }

    public onRemove(data?: any): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickToSelect,this);
    }

    public destroy(data?: any): void {
        this.onRemove();
    }
}