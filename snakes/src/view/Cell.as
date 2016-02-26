package view
{
	import flash.display.Bitmap;
	import flash.display.Shape;
	import flash.display.Sprite;
	
	public class Cell extends Sprite
	{
		public var row:int;
		public var col:int;
		
		/**
		 * 0-身体
		 * 1-头 
		 * 2-蛋
		 */
		private var type:int;
		
		public var rotate:int;
		
		public function Cell()
		{
			
		}
		
		public function setType(value:int):void
		{
			type=value;
			while(this.numChildren>0)
			{
				this.removeChildAt(0);
			}
			
			var shp:Shape=new Shape();
			switch(value)
			{
				case 0:
					shp.graphics.beginFill(0x006600);
					shp.graphics.drawRect(0,0,10,10);
					shp.graphics.endFill();
					break;
				case 1:
					shp.graphics.beginFill(0x00FF00);
					shp.graphics.drawRect(0,0,10,10);
					shp.graphics.endFill();
					break;
				case 2:
					shp.graphics.beginFill(0x663399);
					shp.graphics.drawCircle(5,5,5);
					shp.graphics.endFill();
					break;
			}
			this.addChild(shp);
		}
	}
}