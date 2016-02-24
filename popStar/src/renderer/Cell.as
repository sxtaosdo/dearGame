package renderer
{
	import flash.display.Bitmap;
	import flash.display.Sprite;

	public class Cell extends Sprite
	{
		private var _state:int;
		private var _color:String;
		private var colorBitmap:Bitmap;
		private var selectBitmap:Bitmap;
		
		public var col:int;
		public var row:int;
		
		public function Cell(color:String)
		{
			this.buttonMode=true;
			this.mouseChildren=false;
			this.color=color;
			this.state=0;
		}

		public static function createRandomCell():Cell
		{
			var colorArr:Array=["green","blue","orange","red","purple"];
			var randomNumber:int=Math.round(Math.random()*colorArr.length);
			if(randomNumber>=colorArr.length)
			{
				randomNumber=0;
			}
		    return new Cell(colorArr[randomNumber])
		}
		
		/**
		 * 0-未选中状态
		 * 1-选中状态 
		 */
		public function get state():int
		{
			return _state;
		}

		/**
		 * @private
		 */
		public function set state(value:int):void
		{
			if(_state==value)
			{
				return;
			}
			_state = value;
			if(selectBitmap==null)
			{
				selectBitmap=new Bitmap();
				selectBitmap.bitmapData=new selectCell();
				this.addChild(selectBitmap);
			}
			selectBitmap.visible=Boolean(_state);
		}

		public function get color():String
		{
			return _color;
		}

		public function set color(value:String):void
		{
			if(_color==value)
			{
				return;
			}
			_color = value;
			if(colorBitmap==null)
			{
				colorBitmap=new Bitmap();
				this.addChild(colorBitmap);
			}
			switch(_color)
			{
				case "green":
					colorBitmap.bitmapData=new cell_green();
					break;
				case "blue":
					colorBitmap.bitmapData=new cell_blue();
					break;
				case "orange":
					colorBitmap.bitmapData=new cell_orange();
					break;
				case "red":
					colorBitmap.bitmapData=new cell_red();
					break;
				case "purple":
					colorBitmap.bitmapData=new cell_purple();
					break;
			}
		}


	}
}