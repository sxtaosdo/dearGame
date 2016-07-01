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
     * 0-基础土地 1-田地 2-机器
     */
    public type:number;
    /**
     * 0-未购买 1-空闲 2-正在种植中 3-种植完成 4-坏死(种植中植物可能被坏死，第一期没有)
     * 0-未购买 1-空闲 2-正在生产中 3-生产完成 4-机器坏死(生产中机器可能坏掉，第一期没有)
     */
    public state: number;
    /**
     * 种植植物类型，0为未种植
     * 机器种类，没有0状态
     */
    public currentType: number;
    
    /**
     * 植物生长/机器制造剩余时间(毫秒)，0为不在生长中
     */
    public lastTime: number;
    
	public constructor() {
	}
}
