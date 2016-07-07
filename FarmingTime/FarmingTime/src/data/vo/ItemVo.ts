/**
 * 道具的数据结构
 * @author anj
 *
 */
class ItemVo {
    //物品的唯一指向值
    public id:number;
    //道具类型：1-斧子(用于砍伐) 2-水壶(用于浇水，暂不开发) 3-种子
    public type: number;
    //子类型(type=3种子时有值)
    public subType:number;
    //道具名称
    public desc: string;
    //生产目标（0为生产中止）
    public targetId:number;
    //生产工具（0为生产中止，1-田地种植）
    public targetTool:number;
    //生产时间点(毫秒）
    public graduateTimePoint:Array<number>;
    //收获次数
    public harvestTimes:number;
    //收获倍数(最小）
    public gainMinTimes:number;
    //收获倍数（最大）
    public gainMaxTimes:number;
    //基础价格
    public basePrice: number;
    //背包单格可放置最大数量
    public maxNum: number;
    //是否可贩卖或丢弃
    public canSell: boolean;
    //是否可消耗
    public canConsume: boolean;
    
    /***********为未来预留部分**********/
    //图片，做图像化的时候添加
    public pic: string;
    //开启等级条件（第二期，增加玩家技能等级时实现）
    public requiredFarmingLevel: number;
    //开启前置条件（0为无条件）（如npc好感度到达发生事件开启等，后期实现）
    public preCondition: number;
    /*********************************/
    
    
	public constructor() {
	}
	
	public analytic(data:any):void{
        this.id = data.id;
        this.type = data.type;
        this.subType = data.subType;
        this.desc = data.desc;
        this.maxNum = data.maxNum;
        this.targetId = data.targetId;
        this.targetTool = data.targetTool;
        this.graduateTimePoint = data.graduateTimePoint;
        this.harvestTimes = data.harvestTimes;
        this.gainMinTimes = data.gainMinTimes;
        this.gainMaxTimes = data.gainMaxTimes;
        this.basePrice = data.basePrice;
        this.maxNum = data.maxNum;
        this.canSell = data.canSell;
        this.canConsume = data.canConsume;
	}
}
