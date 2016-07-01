/**
 *
 * @author 
 *
 */
class Bird extends egret.Sprite{    
    private bird:egret.Bitmap;
    
    private timer: egret.Timer;
    private speed: number;
    private t:number;
    private a:number=0.05;
    
	public constructor() {
    	super();
        
        this.bird=new egret.Bitmap();
        this.bird.bitmapData=RES.getRes("fly_png");
        this.addChild(this.bird);
    	
    	this.timer=new egret.Timer(50,-1);
    	this.speed=-10;
    	this.t=0;
	}
	
	private move(evt:egret.TimerEvent):void{
    	this.t+=1;
    	this.speed+=this.a*this.t;
    	this.y+=this.speed;
	}
	
	public upControl(evt:any):void{
    	this.t=0;
	  this.speed=-8;
	}
	
	public BeginMove():void{
        this.timer.addEventListener(egret.TimerEvent.TIMER,this.move,this);
	    this.timer.start();
	}
	
	public EndMove():void{
        this.timer.removeEventListener(egret.TimerEvent.TIMER,this.move,this);
        this.timer.stop();
	}
}
