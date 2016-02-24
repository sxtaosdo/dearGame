package view
{
	import flash.display.Bitmap;

	public class Cell extends Bitmap
	{
		public var col:int;
		public var row:int;

		public function Cell(col:int,row:int,cellName:String)
		{	
			this.col=col;
			this.row=row;
			setCellName(cellName);
			
			this.x=col*25;
			this.y=row*25;
		}
		
		/**
		 * 左右移动 
		 * @param direction true:向左 false:向右
		 * 
		 */
		public function move(direction:Boolean):void
		{
			if(direction)
			{
				col--;
			}
			else
			{
				col++;
			}
			this.x=col*25;
		}
		
		public function drop():void
		{
			row++;
			this.y=row*25;
		}
		
		public function setCellName(cellName:String):void
		{
			switch(cellName)
			{
				case "Z":
					this.bitmapData=new Ztexture();
					break;
				case "T":
					this.bitmapData=new Ttexture();
					break;
				case "S":
					this.bitmapData=new Stexture();
					break;
				case "O":
					this.bitmapData=new Otexture();
					break;
				case "L":
					this.bitmapData=new Ltexture();
					break;
				case "J":
					this.bitmapData=new Jtexture();
					break;
				case "I":
					this.bitmapData=new Itexture();
					break;
				case "W":
					this.bitmapData=new Wtexture();
					break;
				default:
					trace("没有该类型方块");
			}
		}
	}
}