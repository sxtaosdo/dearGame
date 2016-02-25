package
{
	import event.PopEvent;
	
	import flash.display.Bitmap;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	
	import renderer.Cell;
	
	import view.Game;
	import view.Main;

	[SWF(framerate="24",width="768",height="1024")]
	public class popStar extends Sprite
	{
		private var layer:Sprite;
		private var mainView:Main;
		private var gameView:Game;
		public function popStar()
		{
			this.addEventListener(Event.ADDED_TO_STAGE,addToStage);
		}
		
		protected function addToStage(event:Event):void
		{
			this.removeEventListener(Event.ADDED_TO_STAGE,addToStage);
			this.stage.scaleMode=StageScaleMode.NO_SCALE;
			this.stage.align=StageAlign.TOP_LEFT;
			layer=new Sprite();
			layer.scaleX=0.9;
			layer.scaleY=0.9;
			this.addChild(layer);
			
			//背景层
			var bg:Bitmap=new Bitmap();
			bg.bitmapData=new backTexture();
			layer.addChild(bg);
			
			mainView=new Main();
			layer.addChild(mainView);
			mainView.addEventListener(PopEvent.START_NEW_GAME,startNewGame);
			
			gameView=new Game();
		}
		
		protected function startNewGame(event:Event):void
		{
			if(mainView.parent!=null)
			{
				mainView.parent.removeChild(mainView);
			}
			
			layer.addChild(gameView);
		}
	}
}