/**
 * 主界面
 * @author anj
 */
class MainView extends egret.Sprite implements Ipanel {
    private static _instance: MainView;
    
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

    public onRemove(data?: any): void {
    }

    public destroy(data?: any): void {
        this.onRemove();
    }
}