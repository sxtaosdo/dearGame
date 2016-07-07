/**
 * 随着游戏会变化的数据
* @author anj
*/
class UserModel {
    private static _instance: UserModel;
    
    private _gold:number;      //当前拥有金币
    private _earthList: Array<EarthVo> = [];//当前土地开垦情况列表
    private _ownerList: Array<ItemVo> = [];//当前拥有物品列表
    private _packList: Array<PackVo> = [];//背包列表
    
    public constructor() {
    }

    public static get instance(): UserModel {
        if(this._instance == null) {
            this._instance = new UserModel();
        }
        return this._instance;
    }
    
    public get gold(): number {
        return this._gold;
    }
    
    public set gold(value:number){
        this._gold=value;
    }
    
    public get earthList(): Array<EarthVo> {
        return this._earthList;
    }
    
    public get ownerList(): Array<ItemVo> {
        return this._ownerList;
    }
    
    public get packList(): Array<PackVo> {
        return this._packList;
    }
}
    