/**
 * @author anj
 */
class GameUtil {
	public constructor() {
	}
	
    /**
    * 通过道具id获得道具
    */
    public static getItemById(id:number):ItemVo {
        var i:number;
        for(i=0;i<ConfigModel.instance.itemList.length;i++){
            if(ConfigModel.instance.itemList[i].id==id){
                return ConfigModel.instance.itemList[i];
            }
        }
        return null;
    }
    
    /**
     * 获取土地上植物当时生长状态(-1抛错0成熟正值为状态)
     * @param earthvo
     */
    public static getGraduateState(earthvo:EarthVo):number{
        if(earthvo.state!=2){
            return -1;
        }
        var seed:ItemVo=this.getItemById(earthvo.targetId);
        for(var i:number=0;i<seed.graduateTimePoint.length;i++){
            if(earthvo.graduateTime<seed.graduateTimePoint[i]){
                return i+1;
            }
        }
        return 0;
    }
}
