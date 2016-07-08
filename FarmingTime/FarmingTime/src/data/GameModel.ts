/**
 * 不做存储，只在游戏中作用的数据
* @author anj
*/
class GameModel {
    private static _instance: GameModel;
    
    private _packIndex:number=0;      //当前选择背包索引，0为未指向
    private _ownItem:OwnVo;           //当前选择背包物品，null为无物品
    
    public constructor() {
    }

    public static get instance(): GameModel {
        if(this._instance == null) {
            this._instance = new GameModel();
        }
        return this._instance;
    }
    
    public get packIndex(): number {
        return this._packIndex;
    }
    
    public set packIndex(value:number){
        if(value==this._packIndex){
            return;
        }
        if(this._packIndex!=0){
            PackView.instance.packList[this._packIndex-1].setSelect(false);
            this.ownItem=null;
        }
        this._packIndex=value;
        if(value!=0){
            PackView.instance.packList[this._packIndex - 1].setSelect(true);
            this.ownItem = PackView.instance.packList[this._packIndex - 1].ownItem;
        }
    }
    
    public set ownItem(value:OwnVo){
        this._ownItem=value;
    }
    
    public get ownItem():OwnVo{
        return this._ownItem;
    }
}
    