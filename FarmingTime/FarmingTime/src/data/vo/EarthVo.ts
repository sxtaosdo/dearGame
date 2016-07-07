/**
 * 土地的数据结构（单机本地存储，第一次游戏时进行初始化）
 * @author anj
 *
 */
class EarthVo {
    /**
     * 土地的唯一标识
     */
    public id:number;
    /**
     * 土地的位置
     */
    public position:egret.Point;
    /**
     * 0-基础土地 1-田地 2-机器
     */
    public type:number;
    /**
     * 0-未购买 1-空闲 2-正在种植中 3-种植完成 4-坏死(种植中植物可能被坏死，第一期没有)
     * 0-未购买 1-空闲 2-正在生产中 3-生产完成 4-机器坏死(生产中机器可能坏掉，第一期没有)
     */
    public state: number;
    /**
     * 种植物品id（对应itemid）
     */
    public targetId: number;   
    /**
     * 生长时间(毫秒)，不在生长中为0
     */
    public graduateTime: number;
    //基础价格(科技发展后会减少，后期实现，目前只有基础价格)
    public openPrice: number;
    
    /*********以下为预留部分*********/
    //土地开启种植等级条件（第二期，增加玩家种植技能等级时实现）
    public requiredFarmingLevel: number;
    //土地开启前置条件（0为无条件）（如npc好感度到达发生事件开启等，后期实现）
    public preCondition: number;
    /************************************/
    
	public constructor() {
	}
	
    public analytic(data: any): void {
        this.id = data.id;
        this.position=new egret.Point(data.position[0],data.position[1]);
        this.type = data.type;
        this.state = data.state;
        this.targetId = data.targetId;
        this.graduateTime = data.graduateTime;
        this.openPrice = data.openPrice;
    }
}
