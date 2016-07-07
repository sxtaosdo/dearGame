class EarthView extends egret.Sprite implements Ipanel {
    
    public constructor() {
        super();
    }

    public onAdd(data?: any): void {
        if(UserModel.instance.earthList.length>0){
            for(var i:number=0;i<UserModel.instance.earthList.length;i++){
                var vo:EarthVo=UserModel.instance.earthList[i];
                if(vo.type==1){
                    var farmland:FarmlandItemRenderer=new FarmlandItemRenderer(vo);
                    this.addChild(farmland);
                }
            }
        }
    }

    public onRemove(data?: any): void {

    }

    public destroy(data?: any): void {
        this.onRemove();
    }
}