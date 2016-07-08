/**
 * 土地基本类
 * @author anj
 */
class EarthItemRenderer extends egret.Sprite{
    protected startX:number=5;
    protected startY:number=200;
    protected gridWidth:number=100;
    protected gridHeight:number=100;
    protected gapX:number=10;
    protected gapY:number=10;
    
    protected gridColor:number=0xffffff;
    protected earthVo:EarthVo;
    
    public constructor(vo:EarthVo,color?:number) {
        super();
        this.earthVo=vo;
        this.x=this.startX+vo.position.x*(this.gridWidth+this.gapX);
        this.y=this.startY+vo.position.y*(this.gridHeight+this.gapY);
        if(color==null){
            color=this.gridColor;
        }
        this.drawBg(color);
    }
    
    protected drawBg(color:number):void{
        this.graphics.beginFill(color);
        this.graphics.drawRect(0,0,this.gridWidth,this.gridHeight);
        this.graphics.endFill();
    }
    
    public init(data?: any):void{
        
    }
    
    public onUpdate(data?: any): boolean {
        return false;
    }

    public onRemove(data?: any): void {
    }

    public destroy(data?: any): void {
        this.onRemove();
    }
}