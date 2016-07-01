/**
 *
 * @author 
 *
 */
class BackGround extends egret.Sprite{
    private timer:egret.Timer;
    private speed:number;
    protected bpGroup:Array<egret.Bitmap>;
    private singleWidth:number;
    private isRollScreen:Boolean;
    
	public constructor(name:string,isRollScreen:Boolean=true) {
    	super();
    	
    	this.isRollScreen=isRollScreen;
    	
    	var bp1:egret.Bitmap=new egret.Bitmap();
    	bp1.bitmapData = RES.getRes(name);
        this.addChild(bp1);
    	this.singleWidth=bp1.width;
    	this.bpGroup = [];
    	this.bpGroup.push(bp1);
 
    	if(isRollScreen){
            var bp2: egret.Bitmap = new egret.Bitmap();
            bp2.bitmapData = RES.getRes(name);
            bp2.x = this.singleWidth;
            this.addChild(bp2);
            this.bpGroup.push(bp2);
    	} 
    	else
    	{
    	    var bp2:egret.Bitmap=new egret.Bitmap();
    	    bp2.bitmapData=RES.getRes(name);
    	    bp2.rotation=180;
    	    this.addChild(bp2);
    	    this.bpGroup.push(bp2)
    	}
    	
    	this.timer=new egret.Timer(40,-1);
	}
	
	private move(evt:egret.TimerEvent):void{
    	var arrLen:number=this.bpGroup.length;
        for(var i: number = 0;i<arrLen;i++){
	        this.bpGroup[i].x+=this.speed;
	    }
	    //向右超过界面
        if(this.speed >0 && this.bpGroup[arrLen-1].x>480){
            //滚屏模式
            if(this.isRollScreen){
                var bp1: egret.Bitmap = this.bpGroup.pop();
                bp1.x = this.bpGroup[0].x - this.singleWidth;
                this.bpGroup.unshift(bp1);
                this.addChild(bp1);
            }
            //非滚屏模式
            else{
                this.EndMove();
            }
	    }
	    //向左
        else if(this.speed < 0 && this.bpGroup[0].x < 0-this.singleWidth) {
            //滚屏模式
            if(this.isRollScreen){
                var bp2: egret.Bitmap = this.bpGroup.shift();
                bp2.x = this.bpGroup[arrLen - 2].x + this.singleWidth;
                this.bpGroup.push(bp2);
            }
            //非滚屏模式
            else{
                this.EndMove();
            }
        }
	}
	
	public BeginMove(_speed:number):void{
	    this.speed=_speed;
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.move,this);
	    this.timer.start();
	}
	
	public EndMove():void{
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.move,this);
        this.timer.stop();
        if(this.parent!=null)
        {
            this.parent.removeChild(this);
        }
	}
}
