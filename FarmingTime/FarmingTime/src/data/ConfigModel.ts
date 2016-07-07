/**
 * 配置文件中配置，并且不可修改的数据
 * @author anj
 */
class ConfigModel {
    private static _instance: ConfigModel;
    private _seedList: Array<SeedVo> = [];//种子列表
    
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
        
        var key:string;
        var i:number;
        for(i = 0;i < data.pack.length;i++) {
            var packvo: PackVo = new PackVo();
            packvo.analytic(data.pack[i]);
            UserModel.instance.packList.push(packvo);
        }
        for(i = 0;i < data.item.length;i++) {
            var itemvo: ItemVo = new ItemVo();
            itemvo.analytic(data.item[i]);
            UserModel.instance.ownerList.push(itemvo);
        }
        for(i=0;i<data.seed.length;i++){
            var seedvo:SeedVo=new SeedVo();
            seedvo.analytic(data.seed[i]);
            this.seedList.push(seedvo);
        }
        for(i=0;i<data.earth.length;i++){
            var earthvo: EarthVo = new EarthVo();
            earthvo.analytic(data.earth[i]);
            UserModel.instance.earthList.push(earthvo);
        }
    }
    
    public get debug():boolean{
        return this._debug;
    }
    
    public get seedList(): Array<SeedVo> {
        return this._seedList;
    }
}
