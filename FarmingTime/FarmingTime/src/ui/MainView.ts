/**
 * 主界面
 * @author anj
 */
class MainView extends egret.Sprite implements Ipanel {
    private static _instance: MainView;
    
    private goldTxt:egret.TextField;
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
            this.goldTxt.text = "拥有金币：" + gold.toString();
        }
    }

    public onRemove(data?: any): void {
    }

    public destroy(data?: any): void {
        this.onRemove();
    }
}