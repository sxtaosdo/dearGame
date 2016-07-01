/**
 * 可种植田地
 * @author anj
 */
class FarmlandItemRenderer extends EarthItemRenderer{
    /**
     * 当前显示植物的图片
     */
    private pic:string;
    
    public constructor(vo:EarthVo) {
        super(vo,0xaaccff);
    }

    /**
     * 购买开启土地
     */
    public open(): void {
        console.log("消息提示：" + "开启新土地");
        this.setLandState(1);
    }
    
    /**
     * 种植植物
     * @param seedType
     */
    public plant(seedType:number): void {
        switch(this.earthVo.state) {
            //0-未购买
            case 0:
                console.log("弹出提示面板：" + "这块土地还不属于你，是否进行购买？");
                break;
            //1-空闲
            case 1:
                console.log("展示种植成功画面");
                console.log("稍后加入种子列表的配置文件，根据种子类型获取种子的剩余生长时间");
                this.setLandState(2);
                break;
            //2-种植中
            case 2:
                console.log("弹出提示面板：" + "植物还未成熟，请耐心等待");
                break;
            //3-种植完成
            case 3:
                console.log("弹出提示面板：" + "植物已经成熟，是否进行收割？");
                break;
        }
    }
    
    /**
     * 砍掉植物
     */
    public cut(): void {
        switch(this.earthVo.state) {
            //0-未购买
            case 0:
                console.log("弹出提示面板：" + "这块土地还不属于你，是否进行购买？");
                break;
            //1-空闲
            case 1:
                console.log("弹出提示面板：" + "这块土地正在长草中，快来播种吧");
                break;
            //2-种植中
            case 2:
            //3-种植完成
            case 3:
                this.setLandState(1);
                break;
        }
    }
    
    /**
     * 收获植物
     */
    public harvest():void{
        switch(this.earthVo.state){
            //0-未购买
            case 0:
                console.log("弹出提示面板：" + "这块土地还不属于你，是否进行购买？");
                break;
            //1-空闲
            case 1:
                console.log("弹出提示面板：" + "这块土地正在长草中，快来播种吧");
                break;
            //2-种植中
            case 2:
                console.log("弹出提示面板：" + "植物还未成熟，请耐心等待");
                break;
            //3-种植完成
            case 3:
                console.log("消息提示：" + "收获XXX");
                console.log("仓库中增加相应物品");
                this.setLandState(1);
                break;
        }
    }
    
    private setLandState(state:number,data?:any):void{
        this.earthVo.state=state;
        switch(state) {
            //0-未购买
            case 0:
                this.earthVo.currentType=0;
                this.earthVo.lastTime=0;
                break;
            //1-空闲
            case 1:
                this.earthVo.currentType = 0;
                this.earthVo.lastTime = 0;
                break;
            //2-种植中
            case 2:
                var vo:SeedVo=data as SeedVo;
                this.earthVo.currentType = vo.seedType;
                this.earthVo.lastTime = vo.graduateTime;
                console.log("稍后加入土地管理类，此处为添加土地管理类的倒计时");
                break;
            //3-种植完成
            case 3:
                this.earthVo.currentType;
                this.earthVo.lastTime = 0;
                break;
        }
    }
    
    /**
     * 每秒钟更新一次
     */
    public onUpdate():boolean{
        this.earthVo.lastTime-=1000;
        console.log("稍后加入不同时期的植物不同的图像");
        return true;
    }
    
    private showPlant():void{
        console.log("稍后做图像");
    }

    public onRemove(data?: any): void {
    }

    public destroy(data?: any): void {
        this.onRemove();
    }
}