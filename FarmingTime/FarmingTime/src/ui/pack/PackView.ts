class PackView extends egret.Sprite implements Ipanel {
    private static _instance: PackView;
    protected startX: number = 50;
    protected startY: number = 100;
    protected gridWidth: number = 100;
    protected gridHeight: number = 100;
    protected gapX: number = 10;
    
    public packList:Array<PackItemRenderer>=[];
    
    public constructor() {
        super();
        console.log("稍后做卖出功能");
        console.log("稍后做把道具放入背包功能");
    }
    
    public static get instance(): PackView {
        if(this._instance == null) {
            this._instance = new PackView();
        }
        return this._instance;
    }

    public onAdd(data?: any): void {
        if(UserModel.instance.packList.length>0){
            for(var i: number = 0;i < UserModel.instance.packList.length;i++){
                var vo:PackVo=UserModel.instance.packList[i];
                var pack: PackItemRenderer = new PackItemRenderer(vo);
                this.addChild(pack);
                pack.onAdd();
                this.packList.push(pack);
            }
        }
    }

    public onRemove(data?: any): void {

    }

    public destroy(data?: any): void {
        this.onRemove();
    }
}