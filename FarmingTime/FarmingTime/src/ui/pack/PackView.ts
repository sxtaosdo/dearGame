class PackView extends egret.Sprite implements Ipanel {
    private static _instance: PackView;
    
    public packList:Array<PackItemRenderer>=[];
    
    public constructor() {
        super();
        console.log("稍后做卖出功能");
    }
    
    public static get instance(): PackView {
        if(this._instance == null) {
            this._instance = new PackView();
        }
        return this._instance;
    }
    
    public getItem(index:number):ItemVo{
        if(index < 0 || index > this.packList.length - 1) {
            return null;
        }
        var item: ItemVo = this.packList[index - 1].itemVo;
        return item;
    }
    
    /**
     * 消耗背包中道具
     */
    public consume(index:number):boolean{
        if(index<0||index>this.packList.length-1){
            return false;
        }
        var item:ItemVo=this.packList[index-1].itemVo;
        if(!item.canConsume){
            return false;
        }
        else{
            item.ownNum--;
            if(item.ownNum<=0){
                this.packList[index-1].itemId=0;
                UserModel.instance.clearOwnerList();
            }
            return true;
        }
    }

    public onAdd(data?: any): void {
        var i:number;
        if(UserModel.instance.packList.length>0){
            for(i= 0;i < UserModel.instance.packList.length;i++){
                var vo:PackVo=UserModel.instance.packList[i];
                var pack: PackItemRenderer = new PackItemRenderer(vo);
                this.addChild(pack);
                pack.onAdd();
                this.packList.push(pack);
                if(UserModel.instance.ownerList[i]!=null){
                    pack.itemId=UserModel.instance.ownerList[i].itemId;
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