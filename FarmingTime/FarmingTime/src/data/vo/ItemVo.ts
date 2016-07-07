/**
 * 道具的数据结构
 * @author anj
 *
 */
class ItemVo {
    //物品的唯一指向值
    public itemId:number;
    //道具类型：1-斧子(用于砍伐) 2-水壶(用于浇水，暂不开发) 3-种子
    public type: number;
    //子类型(type=3种子时有值)
    public subType:number;
    //当前拥有数量
    public ownNum:number;
    //背包一格可存储最大数量
    public maxNum:number;
    //出售价格(负数为不可出售物品)
    public soldMoney:number;
    
	public constructor() {
	}
	
	public analytic(data:any):void{
        this.itemId = data.itemId;
        this.type = data.type;
        this.subType = data.subType;
        this.ownNum = data.ownNum;
        this.maxNum = data.maxNum;
        this.soldMoney = data.soldMoney;
	}
}
