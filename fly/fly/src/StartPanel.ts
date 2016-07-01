/**
 *
 * @author 
 *
 */
class StartPanel extends eui.Component{
    private startBtn: eui.Button;
    
	public constructor() {
    	super();   	
    	this.skinName="resource/StartSkin.exml";
    	this.startBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchToStart,this)
	}
	
	private touchToStart(evt:egret.TouchEvent):void{
	    this.dispatchEvent(new egret.Event(FlyEvent.Start_Game_Event));
	}
}
