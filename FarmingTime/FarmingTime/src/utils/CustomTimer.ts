/**
 * 计时器
 * @author sxt
 */
class CustomTimer extends egret.Timer{
    private _data:Object=null;
    public constructor(delay:number,repeatCount:number = 0) {
        super(delay,repeatCount);
    }
    
    public get data():Object{
        return this._data;
    }
    
    public set data(value:Object){
        this._data=value;
    }
}