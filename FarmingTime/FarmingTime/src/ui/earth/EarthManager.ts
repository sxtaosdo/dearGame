/**
 * 土地管理类
 * @author anj
 */
class EarthManager{
    private static _instance: EarthManager;
    private earthList:Array<EarthItemRenderer>=[];
    
    public constructor() {
        TimerManager.instance.doLoop(1000,this.onUpdate,[this]);
    }
    
    public static get instance(): EarthManager {
        if(this._instance == null) {
            this._instance = new EarthManager();
        }
        return this._instance;
    }
    
    private onUpdate(target:EarthManager):void{
        for(var i:number=0;i<target.earthList.length;i++){
            if(!target.earthList[i].onUpdate()){
                target.removeTimer(target.earthList[i]);
            }
        }
    }

    public addTimer(data: EarthItemRenderer): void {
        for(var i: number = 0;i < this.earthList.length;i++) {
            if(this.earthList[i]==data) {
                return;
            }
        }
        this.earthList.push(data);
    }

    public removeTimer(data: EarthItemRenderer): void {
        for(var i: number = 0;i < this.earthList.length;i++) {
            if(this.earthList[i] == data) {
                this.earthList.splice(i,1);
            }
        }
    }
}