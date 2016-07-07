/**
 * 可种植田地
 * @author anj
 */
class FarmlandItemRenderer extends EarthItemRenderer{
    /**
     * 当前种植物的种子数据(当无种植时为null)
     */
    private seedVo:SeedVo;
    private plantTxt:egret.TextField;
    
    public constructor(vo:EarthVo) {
        super(vo,0x663300);
        this.touchChildren=true;
        this.touchEnabled=true;
        this.onAdd();
    }

    /**
     * 购买开启土地
     */
    public open(e:Event): void {
        if(UserModel.instance.gold>=this.earthVo.basePrice){
            UserModel.instance.gold-=this.earthVo.basePrice;
            console.log("消息提示：" + "开启新土地");
            this.setLandState(1);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.open,this);
        }
        else{
            console.log("弹出提示面板：" + "金币不足，无法进行购买");
        }
    }
    
    /**
     * 种植植物
     * @param seedType
     */
    public plant(e:Event): void {
        var item: ItemVo = PackView.instance.getItem(GameModel.instance.packIndex);
        if(item==null||item.type!=3){
            return;
        }
        switch(this.earthVo.state) {
            //0-未购买
            case 0:
                console.log("弹出提示面板：" + "这块土地还不属于你，是否进行购买？");
                break;
            //1-空闲
            case 1:
                var seedType: number = item.subType;
                for(var i: number = 0;i < ConfigModel.instance.seedList.length;i++) {
                    if(seedType == ConfigModel.instance.seedList[i].seedType) {
                        this.seedVo = ConfigModel.instance.seedList[i];
                        if(!PackView.instance.consume(GameModel.instance.packIndex)){
                            console.log("弹出提示面板：" + "道具使用失败");
                            this.seedVo=null;
                        }
                        else{
                            this.earthVo.currentType=seedType;
                            console.log("消息提示：" + "种植"+seedType.toString()+"成功");
                        }
                        break;
                    }
                }
                if(this.seedVo!=null){
                    this.setLandState(2);
                    this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.plant,this);
                }
                else{
                    console.log("弹出提示面板：" + "没有找到该种子"+seedType.toString());
                }
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
                EarthManager.instance.removeTimer(this);
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
    
    private clickPlant(e:Event):void{
        switch(this.earthVo.state){
            //正在种植中，只能砍伐
            case 2:
                
                break;
            //已经成熟，只能收获
            case 3:
                break;
        }
    }
    
    private setLandState(state:number):void{
        this.earthVo.state=state;
        switch(state) {
            //0-未购买
            case 0:
                this.earthVo.currentType=0;
                this.earthVo.lastTime=0;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.open,this);
                break;
            //1-空闲
            case 1:
                this.earthVo.currentType = 0;
                this.earthVo.lastTime = 0;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.plant,this);
                break;
            //2-种植中
            case 2:
                if(this.seedVo==null){
                    console.error("当前种植种子为空");
                    this.setLandState(1);
                    return;
                }
                this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.clickPlant,this);
                this.earthVo.currentType = this.seedVo.seedType;
                this.earthVo.lastTime = this.seedVo.graduateTime;
                this.earthVo.graduateState=1;
                EarthManager.instance.addTimer(this);
                break;
            //3-种植完成
            case 3:
                if(this.seedVo == null) {
                    console.error("当前种植种子为空");
                    this.setLandState(1);
                    return;
                }
                this.earthVo.currentType=this.seedVo.seedType;
                this.earthVo.graduateState = 0;
                this.earthVo.lastTime = 0;
                break;
        }
        this.drawPlant();
    }
    
    /**
     * 每秒钟更新一次
     */
    public onUpdate():boolean{
        this.earthVo.lastTime-=1000;
        //种植完成
        if(this.earthVo.lastTime<=0){
            this.setLandState(3);
            return true;
        }
        //种植进入不同阶段
        for(var index:number=0;index<this.seedVo.graduateTimePoint.length;index++){
            if(this.seedVo.graduateTimePoint[index]<this.earthVo.lastTime)
            {
                if(this.earthVo.graduateState!=index+1){
                    this.earthVo.graduateState=index+1;
                    this.drawPlant();
                }
                break;
            }
        }
        return true;
    }
    
    private drawPlant():void{
        console.log("二期做图像，一期做成文字版本");
        if(this.plantTxt==null){
            this.plantTxt=new egret.TextField();
            this.plantTxt.width=100;
            this.plantTxt.height=100;
            this.plantTxt.size=14;
            this.addChild(this.plantTxt);
        }
        switch(this.earthVo.state) {
            //0-未购买
            case 0:
                this.plantTxt.text=this.earthVo.basePrice.toString()+"金币解锁";
                break;
            //1-空闲
            case 1:
                this.plantTxt.text = "空闲";
                break;
            //2-种植中
            case 2:
                this.plantTxt.text = "植物"+this.seedVo.descriName.toString()+"生长阶段"+this.earthVo.graduateState.toString();
                break;
            //3-种植完成
            case 3:
                this.plantTxt.text = "植物" + this.earthVo.currentType.toString()+"成熟";
                break;
        }
    }
    
    public onAdd(data?: any): void {
        if(this.earthVo.currentType != 0) {
            for(var i: number = 0;i < ConfigModel.instance.seedList.length;i++){
                if(this.earthVo.currentType == ConfigModel.instance.seedList[i].seedType){
                    this.seedVo = ConfigModel.instance.seedList[i];
                    break;
                }
            }
        }
        this.setLandState(this.earthVo.state);
    }

    public onRemove(data?: any): void {
    }

    public destroy(data?: any): void {
        this.onRemove();
    }
}