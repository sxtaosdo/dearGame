/**
 * 随着游戏会变化的数据
* @author anj
*/
class UserModel {
    private static _instance: UserModel;
    
    private _gold:number;      //当前拥有金币
    private _farmlevel:number;     //玩家当前农业等级
    private _farmCurrentExp:number;//玩家当前农业经验
    private _farmRequiredExp:number;//玩家升级需要农业经验
    private _earthList: Array<EarthVo> = [];//当前土地开垦情况列表
    private _ownerList: Array<OwnVo> = [];//当前拥有物品列表
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
        MainView.instance.setGold(value);
        this._gold=value;
    }
    
    public get farmlevel(): number {
        return this._farmlevel;
    }

    public set farmlevel(value: number) {
        this._farmlevel = value;
        MainView.instance.setFarmLevel(value);
    }
    
    public setFarmExp(currentExp:number,requiredExp:number=0):void{
        this._farmCurrentExp=currentExp;
        if(requiredExp!=0){
            this._farmRequiredExp = requiredExp;
        }
        //升级控制
        if(this._farmCurrentExp>=this._farmRequiredExp){
            for(var i:number=this._farmlevel-1;i<ConfigModel.instance.farmLevelList.length;i++){
                if(this._farmlevel>ConfigModel.instance.farmLevelList[i]){
                    this._farmlevel-=ConfigModel.instance.farmLevelList[i];
                    continue;
                }
                else{
                    this.farmlevel=i+1;
                    this.setFarmExp(this._farmCurrentExp,ConfigModel.instance.farmLevelList[i]);
                    return;
                }
            }
        }
        MainView.instance.setFarmExp(this._farmCurrentExp,this._farmRequiredExp);
    }
    
    public get farmCurrentExp():number{
        return this._farmCurrentExp;
    }
    
    public get farmRequiredExp(): number {
        return this._farmRequiredExp;
    }
    
    public get earthList(): Array<EarthVo> {
        return this._earthList;
    }
    
    public get ownerList(): Array<OwnVo> {
        return this._ownerList;
    }
    
    public clearOwnerList():void{
        for(var i:number=0;i<this._ownerList.length;i++){
            if(this._ownerList[i].counts<=0){
                this._ownerList.splice(i);
                i--;
            }
        }
    }
    
    /**
     * 增加新的拥有道具
     * @param itemId
     * @param counts
     */
    public addOwnvo(itemId:number,counts:number): OwnVo {
        var ownvo:OwnVo=new OwnVo();
        ownvo.itemId=itemId;
        ownvo.counts=counts;
        
        //获取新物品的索引
        this._ownerList.sort(this.sortOwnerlistByIndex);
        var i:number;
        for(i= 0;i < this._ownerList.length;i++) {
            if(this._ownerList[i].index==i+1){
                continue;
            }
            else{
                ownvo.index=i+1;
            }
        }
        if(ownvo.index==null){
            ownvo.index=this._ownerList.length;
        }
        this._ownerList.push(ownvo);
        return ownvo;
    }
    
    private sortOwnerlistByIndex(a:OwnVo,b:OwnVo):number{
        if(a.index>b.index){
            return 1;
        }
        else{
            return 0;
        }
    }
    
    public get packList(): Array<PackVo> {
        return this._packList;
    }
}
    