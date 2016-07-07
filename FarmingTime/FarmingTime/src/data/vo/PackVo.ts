/**
 * 仓库的数据结构
 * @author anj
 *
 */
class PackVo {
    //背包格索引
    public index: number;
    //背包格是否开启(true:开启 false:未开启)
    public isOpen:boolean;
    //打开仓库花费
    public openPrice:number;
    //开启背包限制(暂不开通后期做，未达到限制条件的背包不可见，达到限制的背包格才可见)
    public openRestrict:number;
    
	public constructor() {
	}
	
	public analytic(data:any):void{
        this.index = data.index;
        this.isOpen = data.isOpen;
        this.openPrice = data.openPrice;
	}
}
