package
{
	import flash.display.Bitmap;
	import flash.display.BitmapData;
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.text.TextField;
	import flash.text.TextFormat;
	
	import newGuide.contentMask;
	
	public class test extends Sprite
	{
		private var plotText:TextField;
		private var plotSp:Sprite;
		private var textSp:Sprite;
		
		public function test()
		{
			var bg:Sprite=new Sprite();
			this.addChild(bg);
			
			bg.graphics.beginFill(0x000000,1);
			bg.graphics.drawRect(0,0,1500,168);
			bg.graphics.drawRect(50,50,100,100);
			bg.graphics.endFill();
			this.stage.addEventListener(MouseEvent.CLICK,clickHandler);
		
		}
		
		protected function clickHandler(event:MouseEvent):void
		{
			// TODO Auto-generated method stub
			trace(event.target);
		}
	}
}