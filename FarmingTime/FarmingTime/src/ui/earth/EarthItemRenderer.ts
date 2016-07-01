/**
 * 土地基本类
 * @author anj
 */
class EarthItemRenderer extends egret.Sprite{
    protected gridWidth:number=20;
    protected gridHeight:number=20;
    protected gridColor:number=0xffffff;
    protected earthVo:EarthVo;
    
    public constructor(vo:EarthVo,color?:number) {
        super();
        this.earthVo=vo;
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
    
    public onUpdate(data?: any): boolean {
        return false;
    }

    public onRemove(data?: any): void {
    }

    public destroy(data?: any): void {
        this.onRemove();
    }
}