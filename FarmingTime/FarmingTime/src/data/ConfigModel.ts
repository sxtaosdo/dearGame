/**
 * 配置文件中配置，并且不可修改的数据
 * @author anj
 */
class ConfigModel {
    private static _instance: ConfigModel;
    private _itemList: Dictionary = [];//道具列表
    
    private _debug:boolean=false;
    
	public constructor() {
	}
	
    public static get instance():ConfigModel{
        if(this._instance==null){
            this._instance = new ConfigModel();
        }
        return this._instance;
    }
    
    public analytic(data:any):void{
        if(data.debug){
            this._debug = data.debug=="true"?true:false;
            console.log("debug模式:" + this._debug);
        }
//        var key:string;
//        for(key in data.prompt){
//            LoadingUI.instance.pushTip(data.prompt[Number(key)].content);
//        }
        UserModel.instance.gold=data.gold;
        var key:string;
        var i:number;
        //道具列表构建
        for(i = 0;i < data.item.length;i++) {
            var itemvo: ItemVo = new ItemVo();
            itemvo.analytic(data.item[i]);
            this._itemList[itemvo.id.toString()]=itemvo;
        }
        //背包列表构建
        for(i = 0;i < data.pack.length;i++) {
            var packvo: PackVo = new PackVo();
            packvo.analytic(data.pack[i]);
            UserModel.instance.packList.push(packvo);
        }
        //土地列表构建
        for(i = 0;i < data.earth.length;i++) {
            var earthvo: EarthVo = new EarthVo();
            earthvo.analytic(data.earth[i]);
            UserModel.instance.earthList.push(earthvo);
        }
        //拥有物品列表构建
        for(i = 0;i < data.own.length;i++) {
            var ownvo: OwnVo = new OwnVo();
            ownvo.analytic(data.own[i]);
            UserModel.instance.ownerList.push(ownvo);
        }
        UserModel.instance.ownerList.sort(this.ownListCompare);
    }
    
    private ownListCompare(a:OwnVo,b:OwnVo):number{
        if(a.itemId>b.itemId){
            return 1;
        }
        else if(a.itemId == b.itemId && a.counts>=b.counts){
            return 1;
        }
        else{
            return 0;
        }
    }
    
    public get debug():boolean{
        return this._debug;
    }
    
    public get itemList(): Dictionary {
        return this._itemList;
    }
}
