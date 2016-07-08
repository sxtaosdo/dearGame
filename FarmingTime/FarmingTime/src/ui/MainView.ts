/**
 * 主界面
 * @author anj
 */
class MainView extends egret.Sprite implements Ipanel {
    private static _instance: MainView;
    
    private goldTxt:egret.TextField;
    private farmLevelTxt:egret.TextField;
    private farmExpTxt: egret.TextField;
    private earthView:EarthView;//土地视图
    private packView:PackView;//背包视图
    public constructor() {
        super();
    }
    
    public static get instance(): MainView {
        if(this._instance == null) {
            this._instance = new MainView();
        }
        return this._instance;
    }  
    

    public onAdd(data?: any): void {
        if(this.goldTxt==null){
            this.goldTxt = new egret.TextField();
            this.goldTxt.size = 14;
            this.goldTxt.textAlign = "left";
            this.goldTxt.textColor = 0xFFFF00;
            this.goldTxt.width = 160;
            this.goldTxt.height = 50;
            this.goldTxt.x = 5;
            this.goldTxt.y = 5;
            this.addChild(this.goldTxt);
            if(UserModel.instance.gold!=null){
                this.setGold(UserModel.instance.gold);
            }
        }
        if(this.farmLevelTxt == null) {
            this.farmLevelTxt = new egret.TextField();
            this.farmLevelTxt.size = 14;
            this.farmLevelTxt.textAlign = "left";
            this.farmLevelTxt.textColor = 0x0000FF;
            this.farmLevelTxt.width = 160;
            this.farmLevelTxt.height = 50;
            this.farmLevelTxt.x = this.goldTxt.x+this.goldTxt.width;
            this.farmLevelTxt.y = 5;
            this.addChild(this.farmLevelTxt);
            if(UserModel.instance.farmlevel != null) {
                this.setFarmLevel(UserModel.instance.farmlevel);
            }
        }
        if(this.farmExpTxt == null) {
            this.farmExpTxt = new egret.TextField();
            this.farmExpTxt.size = 14;
            this.farmExpTxt.textAlign = "left";
            this.farmExpTxt.textColor = 0x006600;
            this.farmExpTxt.width = 160;
            this.farmExpTxt.height = 50;
            this.farmExpTxt.x = this.farmLevelTxt.x + this.farmLevelTxt.width;
            this.farmExpTxt.y = 5;
            this.addChild(this.farmExpTxt);
            if(UserModel.instance.farmCurrentExp != null && UserModel.instance.farmRequiredExp!=null) {
                this.setFarmExp(UserModel.instance.farmCurrentExp,UserModel.instance.farmRequiredExp);
            }
        }
        if(this.earthView==null){
            this.earthView=new EarthView();
        }
        this.addChild(this.earthView);
        this.earthView.onAdd();
        
        if(this.packView==null){
            this.packView=PackView.instance;
        }
        this.addChild(this.packView);
        this.packView.onAdd();
    }
    
    public setGold(gold:number):void{
        if(this.goldTxt!=null){
            this.goldTxt.text = "拥有金币：" + StringUtils.getStrByUnits(gold);
        }
    }
    
    public setFarmLevel(level: number): void {
        if(this.farmLevelTxt != null) {
            this.farmLevelTxt.text = "农业等级：" + level.toString();
        }
    }
    
    public setFarmExp(currentExp:number,requiredExp:number): void {
        if(this.farmExpTxt != null) {
            this.farmExpTxt.text = "农业经验：" + currentExp.toString()+"/"+requiredExp.toString();
        }
    }

    public onRemove(data?: any): void {
    }

    public destroy(data?: any): void {
        this.onRemove();
    }
}