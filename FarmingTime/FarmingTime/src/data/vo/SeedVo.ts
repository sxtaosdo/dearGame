/**
 * 种子的数据结构（配置文件中读取）
 * @author anj
 *
 */
class SeedVo {
    //种子类型：1-土豆 2-黄瓜 3-西红柿 4-大葱 5-香菜 6-茄子 7-黄豆 8-豆角
    public seedType: number;
    //生长时间(毫秒)
    public graduateTime: number;
    //生长变化时间点 0-种子 1-发芽 2-结果(暂定，可拓展)
    public graduateTimePoint: Array<number>;
    //基础价格(科技发展后会减少，后期实现，目前只有基础价格)
    public basePrice:number;
    
    //种子图片，做图像化的时候添加
    public pic:string;
    //种子开启种植等级条件（第二期，增加玩家种植技能等级时实现）
    public requiredFarmingLevel:number;
    //种子开启前置条件（0为无条件）（如npc好感度到达发生事件开启等，后期实现）
    public preCondition:number;
    
	public constructor() {
	}
	
	public analytic(data:any):void{
        this.seedType = data.seedType;
        this.graduateTime = data.graduateTime;
        this.basePrice = data.basePrice;
        this.graduateTimePoint = data.graduateTimePoint;
	}
}
