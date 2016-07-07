/**
 * 背包类
 * @author anj
 */
class PackItemRenderer extends egret.Sprite{
    protected startX:number=5;
    protected startY:number=5;
    protected gridWidth:number=45;
    protected gridHeight:number=45;
    protected gapX:number=10;
    protected gridColor:number=0xffffff;
    
    private bgLight:egret.Sprite;
    
    private packVo:PackVo;
    private _itemId:number;
    private itemVo:ItemVo;
    private isSelect:boolean=false;
    private itemTxt:egret.TextField;
    private numTxt:egret.TextField;
    
    public constructor(vo:PackVo,color?:number) {
        super();
        this.packVo=vo;
        this.x=this.startX+(vo.index-1)*(this.gridWidth+this.gapX);
        this.y=this.startY;
        if(color==null){
            color=this.gridColor;
        }
        this.drawBg(color);
        //之后会改成图像化
        this.itemTxt=new egret.TextField();
        this.itemTxt.size=16;
        this.itemTxt.width=this.gridWidth-10;
        this.itemTxt.height=50;
        this.itemTxt.x=5;
        this.itemTxt.y=10;
        this.addChild(this.itemTxt);
        
        this.numTxt = new egret.TextField();
        this.numTxt.size = 16;
        this.numTxt.width = 20;
        this.numTxt.height = 20;
        this.numTxt.x = this.gridWidth-this.numTxt.width;
        this.numTxt.y = this.gridHeight-this.numTxt.height;
        this.addChild(this.numTxt);
    }
    
    public get itemId():number{
        return this._itemId;
    }
    
    public set itemId(itemId:number){
        this._itemId = itemId;
        if(itemId==0){
            this.itemVo=null;
        }
        var isFind:boolean=false;
        for(var i:number=0;i<UserModel.instance.ownerList.length;i++){
            if(UserModel.instance.ownerList[i].itemId==this._itemId)
            {
                this.itemVo=UserModel.instance.ownerList[i];
                isFind=true;
                break;
            }
        }
        if(!isFind){
            console.error("没有找到相关背包物品");
            this._itemId=0;
            this.itemVo=null;
        }
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
            //如果原格子有物品且新格子无物品，则原格子物品移动到新格子
            if(this.itemId==0 && GameModel.instance.packIndex>0 && PackView.instance.packList[GameModel.instance.packIndex-1].itemId!=0){
                this.itemId=PackView.instance.packList[GameModel.instance.packIndex - 1].itemId;
                PackView.instance.packList[GameModel.instance.packIndex - 1].itemId=0;
            }
            GameModel.instance.packIndex = this.packVo.index;
        }
        else {
            GameModel.instance.packIndex = 0;           
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
    
    public onAdd(data?: any):void{
        console.log("稍后做背包购买开放功能");
        this.touchChildren=true;
        this.touchEnabled=true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickToSelect,this);
        this.setSelect(false);
    }

    public onRemove(data?: any): void {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.clickToSelect,this);
    }

    public destroy(data?: any): void {
        this.onRemove();
    }
}