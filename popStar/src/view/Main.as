package view
{
	import event.PopEvent;
	
	import flash.display.Bitmap;
	import flash.display.Shape;
	import flash.display.SimpleButton;
	import flash.display.Sprite;
	import flash.display.StageAlign;
	import flash.display.StageScaleMode;
	import flash.events.Event;
	import flash.events.MouseEvent;
	
	import mx.core.ButtonAsset;

	public class Main extends Sprite
	{
		private var logo:Bitmap;
		private var newButton:SimpleButton;
		public function Main()
		{
			logo=new Bitmap();
			logo.bitmapData=new logoTexture();
			logo.x=(768-logo.width)/2;
			logo.y=210;
			this.addChild(logo);
			
			newButton=new newGame();
			newButton.x=(768-newButton.width)/2;
			newButton.y=645;
			this.addChild(newButton);
			newButton.addEventListener(MouseEvent.CLICK,creatNewGame);
		}
		
		protected function creatNewGame(event:MouseEvent):void
		{
			this.dispatchEvent(new Event(PopEvent.START_NEW_GAME));
		}
	}
}