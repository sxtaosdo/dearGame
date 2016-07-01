/**
 *
 * @author 
 *
 */
class GamePanel extends eui.Component{
    private gameLayer: egret.Sprite;
    private scoreText:egret.TextField;
    private score:number;
    private bird:Bird;
    
    private gameTimer:egret.Timer;
    
    public constructor() {
    	super();
    	
    	this.initView();
	}
	
	public initView():void{
        var bg1: BackGround = new BackGround("background_png");
        this.addChild(bg1);
        bg1.y=-100;
        bg1.BeginMove(-2);
        
        var bg2: BackGround = new BackGround("wall_png");
        this.addChild(bg2);
        bg2.y = 700;
        bg2.BeginMove(-8);
        
        var bg3: BackGround = new BackGround("cloud_png");
        bg3.alpha=0.6;
        this.addChild(bg3);
        bg3.BeginMove(-1);
        
        var gameMask:egret.Shape=new egret.Shape();
        gameMask.graphics.beginFill(0x000000);
        gameMask.graphics.drawRect(0,0,480,700);
        gameMask.graphics.endFill();
        this.gameLayer=new egret.Sprite();
        this.gameLayer.addChild(gameMask);
        this.gameLayer.mask = gameMask;
        this.addChild(this.gameLayer);       
        
        this.scoreText=new egret.TextField();
        this.scoreText.size=20;
        this.scoreText.textColor=0x000000;
        this.scoreText.text = "分数";
        this.addChild(this.scoreText);
        this.scoreText.x=350;
        this.scoreText.y=20;
        
        this.setScore(0);
        
        this.bird=new Bird();
        this.bird.x=50;
        this.bird.y=100;
        this.gameLayer.addChild(this.bird);
        this.bird.BeginMove();
        this.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bird.upControl,this.bird);
        
        this.gameTimer=new egret.Timer(2000,-1);
        this.gameTimer.addEventListener(egret.TimerEvent.TIMER,this.createPillar,this);
        this.createPillar();
        this.gameTimer.start();
	}
	
	private createPillar(evt:any=null):void{
        var pillar: Pillar = new Pillar("column_png");
        pillar.name = "mm";
        this.gameLayer.addChild(pillar);
        pillar.BeginMove(-8);
	}
	
	private setScore(score:number):void{
	    this.score=score;
	    this.scoreText.text="分数:"+score;
	}
}
