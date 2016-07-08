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
    p.open = function (e) {
        if (UserModel.instance.gold >= this.earthVo.openPrice) {
            UserModel.instance.gold -= this.earthVo.openPrice;
            console.log("消息提示：" + "开启新土地");
            this.setLandState(1);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.open, this);
        }
        else {
            console.log("弹出提示面板：" + "金币不足，无法进行购买");
        }
    };
    /**
     * 种植植物
     * @param seedType
     */
    p.plant = function (e) {
        //当前所选物品必须为种子方能种植
        var item;
        if (GameModel.instance.ownItem != null) {
            item = GameUtil.getItemById(GameModel.instance.ownItem.itemId);
        }
        if (item == null || item.type != 3) {
            return;
        }
        switch (this.earthVo.state) {
            //0-未购买
            case 0:
                console.log("弹出提示面板：" + "这块土地还不属于你，是否进行购买？");
                break;
            //1-空闲
            case 1:
                var i;
                if (PackView.instance.consume(GameModel.instance.packIndex)) {
                    this.earthVo.targetId = item.id;
                    this.item = item;
                    console.log("消息提示：" + "种植" + GameUtil.getItemById(item.targetId).desc + "成功");
                }
                else {
                    console.log("弹出提示面板：" + "道具使用失败");
                    this.item = null;
                }
                if (this.item != null) {
                    this.setLandState(2);
                    this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.plant, this);
                }
                else {
                    console.log("弹出提示面板：" + "没有找到该种子" + item.desc.toString());
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
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPlant, this);
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
                var counts = this.item.gainMinTimes + Math.floor(Math.random() * (this.item.gainMaxTimes - this.item.gainMinTimes));
                if (!PackView.instance.gains(GameModel.instance.packIndex, this.item.targetId, counts)) {
                    console.log("弹出提示面板：" + "系统混乱，收获失败");
                    this.setLandState(1);
                    return;
                }
                console.log("消息提示：" + "收获XXX");
                UserModel.instance.setFarmExp(UserModel.instance.farmCurrentExp + this.item.gainExp);
                this.earthVo.harvestTimes++;
                //如果当前种植的植物收获次数大于或等于最大收获次数，则不能再次土地置空
                if (this.earthVo.harvestTimes >= this.item.harvestTimes) {
                    this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPlant, this);
                    this.setLandState(1);
                }
                else {
                    this.earthVo.graduateTime = this.item.graduateTimePoint[this.item.graduateTimePoint.length - 2];
                    this.setLandState(2);
                }
                break;
        }
    };
    p.clickPlant = function (e) {
        switch (this.earthVo.state) {
            //正在种植中，只能砍伐
            case 2:
                if (GameModel.instance.ownItem != null && GameUtil.getItemById(GameModel.instance.ownItem.itemId).type == 1) {
                    this.cut();
                }
                break;
            //已经成熟，砍伐或者收获
            case 3:
                if (GameModel.instance.ownItem != null && GameUtil.getItemById(GameModel.instance.ownItem.itemId).type == 1) {
                    this.cut();
                }
                else if (GameModel.instance.packIndex != 0 && (GameModel.instance.ownItem == null || GameModel.instance.ownItem.itemId == this.item.targetId)) {
                    this.harvest();
                }
                else {
                    console.log("弹出提示面板：" + "请选择背包空余位置进行收获");
                }
                break;
        }
    };
    p.setLandState = function (state) {
        this.earthVo.state = state;
        switch (state) {
            //0-未购买
            case 0:
                this.earthVo.targetId = 0;
                this.earthVo.graduateTime = 0;
                this.earthVo.harvestTimes = 0;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.open, this);
                break;
            //1-空闲
            case 1:
                this.earthVo.targetId = 0;
                this.earthVo.graduateTime = 0;
                this.earthVo.harvestTimes = 0;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.plant, this);
                break;
            //2-种植中
            case 2:
                if (this.item == null) {
                    console.error("当前种植种子为空");
                    this.setLandState(1);
                    return;
                }
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPlant, this);
                this.earthVo.targetId = this.item.id;
                this.earthVo.graduateTime = this.earthVo.graduateTime;
                this.earthVo.harvestTimes = this.earthVo.harvestTimes;
                EarthManager.instance.addTimer(this);
                break;
            //3-种植完成
            case 3:
                if (this.item == null) {
                    console.error("当前种植种子为空");
                    this.setLandState(1);
                    return;
                }
                this.earthVo.targetId = this.item.id;
                this.earthVo.graduateTime = 0;
                this.earthVo.harvestTimes = this.earthVo.harvestTimes;
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickPlant, this);
                break;
        }
        this.drawPlant();
    };
    /**
     * 每秒钟更新一次
     */
    p.onUpdate = function () {
        this.earthVo.graduateTime += 1000;
        var state = GameUtil.getGraduateState(this.earthVo);
        //不在种植状态的抛错
        if (state < 0) {
            console.error("土壤不在种植状态");
            return false;
        }
        else if (state == 0) {
            this.setLandState(3);
            return false;
        }
        else if (state != this.currentPlantState) {
            this.drawPlant();
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
                this.plantTxt.text = StringUtils.getStrByUnits(this.earthVo.openPrice) + "金币解锁";
                break;
            //1-空闲
            case 1:
                this.plantTxt.text = "空闲";
                break;
            //2-种植中
            case 2:
                this.currentPlantState = GameUtil.getGraduateState(this.earthVo);
                this.plantTxt.text = "植物" + this.item.desc.toString() + "生长阶段" + this.currentPlantState.toString();
                break;
            //3-种植完成
            case 3:
                this.plantTxt.text = "植物" + GameUtil.getItemById(this.item.targetId).desc + "成熟";
                break;
        }
    };
    p.onAdd = function (data) {
        if (this.earthVo.targetId != 0) {
            this.item = GameUtil.getItemById(this.earthVo.targetId);
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