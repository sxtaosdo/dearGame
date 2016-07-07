/**
 * 可种植田地
 * @author anj
 */
var FarmlandItemRenderer = (function (_super) {
    __extends(FarmlandItemRenderer, _super);
    function FarmlandItemRenderer(vo) {
        _super.call(this, vo, 0x663300);
        this.touchChildren = true;
        this.touchEnabled = true;
        this.onAdd();
    }
    var d = __define,c=FarmlandItemRenderer,p=c.prototype;
    /**
     * 购买开启土地
     */
    p.open = function () {
        console.log("消息提示：" + "开启新土地");
        this.setLandState(1);
    };
    /**
     * 种植植物
     * @param seedType
     */
    p.plant = function (seedType) {
        switch (this.earthVo.state) {
            //0-未购买
            case 0:
                console.log("弹出提示面板：" + "这块土地还不属于你，是否进行购买？");
                break;
            //1-空闲
            case 1:
                console.log("展示种植成功画面");
                for (var i = 0; i < ConfigModel.instance.seedList.length; i++) {
                    if (seedType == ConfigModel.instance.seedList[i].seedType) {
                        this.seedVo = ConfigModel.instance.seedList[i];
                        break;
                    }
                }
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
    };
    /**
     * 砍掉植物
     */
    p.cut = function () {
        switch (this.earthVo.state) {
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
    };
    /**
     * 收获植物
     */
    p.harvest = function () {
        switch (this.earthVo.state) {
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
    };
    p.setLandState = function (state) {
        this.earthVo.state = state;
        switch (state) {
            //0-未购买
            case 0:
                this.earthVo.currentType = 0;
                this.earthVo.lastTime = 0;
                break;
            //1-空闲
            case 1:
                this.earthVo.currentType = 0;
                this.earthVo.lastTime = 0;
                break;
            //2-种植中
            case 2:
                if (this.seedVo == null) {
                    console.error("当前种植种子为空");
                    this.setLandState(1);
                    return;
                }
                this.earthVo.currentType = this.seedVo.seedType;
                this.earthVo.lastTime = this.seedVo.graduateTime;
                this.earthVo.graduateState = 1;
                EarthManager.instance.addTimer(this);
                break;
            //3-种植完成
            case 3:
                if (this.seedVo == null) {
                    console.error("当前种植种子为空");
                    this.setLandState(1);
                    return;
                }
                this.earthVo.currentType = this.seedVo.seedType;
                this.earthVo.graduateState = 0;
                this.earthVo.lastTime = 0;
                break;
        }
        this.drawPlant();
    };
    /**
     * 每秒钟更新一次
     */
    p.onUpdate = function () {
        this.earthVo.lastTime -= 1000;
        //种植完成
        if (this.earthVo.lastTime <= 0) {
            this.setLandState(3);
            return true;
        }
        //种植进入不同阶段
        for (var index = 0; index < this.seedVo.graduateTimePoint.length; index++) {
            if (this.seedVo.graduateTimePoint[index] < this.earthVo.lastTime) {
                if (this.earthVo.graduateState != index + 1) {
                    this.earthVo.graduateState = index + 1;
                    this.drawPlant();
                }
                break;
            }
        }
        return true;
    };
    p.drawPlant = function () {
        console.log("二期做图像，一期做成文字版本");
        if (this.plantTxt == null) {
            this.plantTxt = new egret.TextField();
            this.plantTxt.width = 100;
            this.plantTxt.height = 100;
            this.plantTxt.size = 14;
            this.addChild(this.plantTxt);
        }
        switch (this.earthVo.state) {
            //0-未购买
            case 0:
                console.log("稍后加入购买功能，及解锁田地的条件");
                this.plantTxt.text = "请点击进行解锁";
                break;
            //1-空闲
            case 1:
                this.plantTxt.text = "空闲";
                break;
            //2-种植中
            case 2:
                this.plantTxt.text = "植物" + this.earthVo.currentType.toString() + "生长阶段" + this.earthVo.graduateState.toString();
                break;
            //3-种植完成
            case 3:
                this.plantTxt.text = "植物" + this.earthVo.currentType.toString() + "成熟";
                break;
        }
    };
    p.onAdd = function (data) {
        if (this.earthVo.currentType != 0) {
            for (var i = 0; i < ConfigModel.instance.seedList.length; i++) {
                if (this.earthVo.currentType == ConfigModel.instance.seedList[i].seedType) {
                    this.seedVo = ConfigModel.instance.seedList[i];
                    break;
                }
            }
        }
        this.setLandState(this.earthVo.state);
    };
    p.onRemove = function (data) {
    };
    p.destroy = function (data) {
        this.onRemove();
    };
    return FarmlandItemRenderer;
}(EarthItemRenderer));
egret.registerClass(FarmlandItemRenderer,'FarmlandItemRenderer');
//# sourceMappingURL=FarmlandItemRenderer.js.map