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
    
    protected gridPic: string ="baseEarthBg";
    protected earthVo:EarthVo;
    
    public constructor(vo:EarthVo,pic?:string) {
        super();
        this.earthVo=vo;
        this.x=this.startX+vo.position.x*(this.gridWidth+this.gapX);
        this.y=this.startY+vo.position.y*(this.gridHeight+this.gapY);
        if(pic==null || pic==""){
            pic=this.gridPic;
        }
        this.drawBg(pic);
    }
    
    protected drawBg(picUrl:string):void{
        var bp:egret.Bitmap=new egret.Bitmap();
        bp.texture=RES.getRes(picUrl+"_png");
        this.addChild(bp);
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