/**
 * 拥有道具的数据结构
 * @author anj
 *
 */
class OwnVo {
    //拥有物品索引
    public index: number;
    //对应道具id
    public itemId:number;
    //拥有数量
    public counts:number;
    
	public constructor() {
	}
	
	public analytic(data:any):void{
        this.index = data.index;
        this.itemId = data.itemId;
        this.counts = data.counts;
	}
}
