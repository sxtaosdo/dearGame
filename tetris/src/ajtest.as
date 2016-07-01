package
{
	import flash.display.Bitmap;
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.TimerEvent;
	import flash.geom.Point;
	import flash.utils.Timer;
	
	import org.osmf.events.TimeEvent;
	import org.osmf.metadata.TimelineMarker;
	
	import view.GameView;
	
	[SWF(frameRate="24", width="755", height="700", backgroundColor="0x135889")]
	public class ajtest extends Sprite
	{
		private var bgSp:Sprite;
		private var gameView:GameView;
		
		private var posArr:Array=[new Point(56,56),new Point(-57,56),new Point(-57,-57),new Point(56,-57)];
		private var shp:Shape;
		private var count:int=0;
		private var timer:Timer=new Timer(1000);
		public function ajtest()
		{
			this.addEventListener(Event.ADDED_TO_STAGE,onAddToStage);
//			shp=new Shape();
//			shp.x=50;
//			shp.y=100;
//			this.addChild(shp);
//			
//			shp.graphics.beginFill(0xFFFFFF);
//			timer.addEventListener(TimerEvent.TIMER,create);
//			timer.start();
			
			
		}
		
		private function create(evt:TimerEvent):void
		{
			if(count>=posArr.length)
			{
				shp.graphics.endFill();
				timer.removeEventListener(TimerEvent.TIMER,create);
				return;
			}
			
			if(!count){
				shp.graphics.moveTo(posArr[0].x,posArr[0].y);
			}
			shp.graphics.lineTo(posArr[count].x,posArr[count].y);
			count++;
		}
		
		protected function onAddToStage(event:Event):void
		{
			this.removeEventListener(Event.ADDED_TO_STAGE,onAddToStage);
			
			drawBg();
			
			createScene();
		}		
		
		private function drawBg():void
		{
			bgSp=new Sprite();
			bgSp.x=(stage.width-this.width)/2;
			bgSp.y=(stage.height-this.height)/2;
			this.addChild(bgSp);
			
			var bp:Bitmap=new Bitmap();
			bp.bitmapData=new Background();			
			bgSp.addChild(bp);
			
			var shp:Shape=new Shape();
			shp.graphics.beginFill(0xD1E3F7);
			shp.graphics.drawRect(60,97,250,500);
			shp.graphics.endFill();
			bgSp.addChild(shp);
			
			var line:Shape=new Shape();
			line.graphics.lineStyle(1,0x000000);
			for(var col:int=0;col<11;col++)
			{
				line.graphics.moveTo(col*25,0);
				line.graphics.lineTo(col*25,500);
			}
			for(var row:int=0;row<21;row++)
			{
				line.graphics.moveTo(0,row*25);
				line.graphics.lineTo(250,row*25);
			}
			line.x=60;
			line.y=97;
			bgSp.addChild(line);
		}

		private function createScene():void
		{
			gameView=new GameView();
			gameView.x=bgSp.x;
			gameView.y=bgSp.y;
			this.addChild(gameView);
			
//			var mazeView:MazeView=new MazeView();
//			this.addChild(mazeView);
		}
	}
}