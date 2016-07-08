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
    
    /**
     * 消耗背包中道具
     */
    public consume(index:number):boolean{
        var ownvo:OwnVo=this.packList[index-1].ownItem;
        if(ownvo==null||!GameUtil.getItemById(ownvo.itemId).canConsume){
            return false;
        }
        else{
            ownvo.counts--;
            if(ownvo.counts<=0){
                ownvo=null;
                UserModel.instance.clearOwnerList();
            }
            this.packList[index - 1].ownItem=ownvo;
            return true;
        }
    }
    
    /**
     * 获得物品放入背包
     * @param index      放入背包位置
     * @param itemId     放入背包道具id
     * @param itemCounts 放入背包道具个数
     */
    public gains(index: number,itemId:number,itemCounts:number): boolean {
        var ownvo: OwnVo;
        if(this.packList[index-1].ownItem!=null && this.packList[index-1].ownItem.itemId!=itemId){
            console.error("出错了，不同的物品不能放入背包同一格子");
            return false;
        }
        //背包中相同道具叠加
        else if(this.packList[index - 1].ownItem != null && this.packList[index - 1].ownItem.itemId == itemId){
             ownvo= this.packList[index - 1].ownItem;
             ownvo.counts+=itemCounts;
             this.packList[index-1].ownItem=ownvo;
             return true;
        }
        //背包格中无物品，则生成新道具
        else if(this.packList[index - 1].ownItem == null){
            ownvo = UserModel.instance.addOwnvo(itemId,itemCounts)
            this.packList[index - 1].ownItem = ownvo;
            if(index==GameModel.instance.packIndex){
                GameModel.instance.ownItem = ownvo;
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
                if(UserModel.instance.ownerList[i]!=null && vo.isOpen){
                    pack.ownItem=UserModel.instance.ownerList[i];
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