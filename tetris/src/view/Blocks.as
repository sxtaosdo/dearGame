package view
{
	public class Blocks
	{
		/**
		 * 旋转状态 
		 */
		public var states:Array;
		
		public var cells:Array;
		
		private var index:int=0;
		
		
		public function Blocks()
		{	
		}
		
		public static function createRandomBlocks():Blocks
		{
		    var typeArr:Array=["Z","T","S","O","L","J","I"]; 
			var randomNumber:int=Math.round(Math.random()*typeArr.length);
			randomNumber= randomNumber>=typeArr.length?0:randomNumber;
			var blc:Blocks;
			switch(randomNumber)
			{
				case 0:
					blc=new Z(); 
					break;
				case 1:
					blc=new T(); 
					break;
				case 2:
					blc=new S(); 
					break;
				case 3:
					blc=new O(); 
					break;
				case 4:
					blc=new L(); 
					break;
				case 5:
					blc=new J(); 
					break;
				case 6:
					blc=new I(); 
					break;
				default:
					blc=new Z();
					break;
			}
			return blc;
		}
		
		public function setBlock(isNext:Boolean):void
		{
			if(isNext)
			{
				for(var i:int=0;i<cells.length;i++)
				{
					cells[i].x-=80;
					cells[i].y+=85;
				}
			}
			else
			{
				for(var j:int=0;j<cells.length;j++)
				{
					cells[j].x+=80;
					cells[j].y-=85;
				}
			}
		}
		
		/**
		 * 顺时针变形移动 
		 * @return 是否可以移动
		 * 
		 */
		public function rotateClockwise():Boolean
		{
			var canRotate:Boolean=true;
			var state:State=states[index%states.length];
			for(var i:int=0;i<cells.length;i++)
			{
				var cell:Cell=cells[i];
				if((cells[0].col+state["col"+i.toString()])>=GameView.walls[0].length||(cells[0].col+state["col"+i.toString()])<0)
				{
					canRotate=false;
					break;
				}
				if((cells[0].row+state["row"+i.toString()])>=GameView.walls.length)
				{
					canRotate=false;
					break;
				}
			}
			if(canRotate)
			{
				index++;
				for(var j:int=0;j<cells.length;j++)
				{
					cells[j].col=cells[0].col+state["col"+j.toString()];
					cells[j].row=cells[0].row+state["row"+j.toString()];
					cells[j].x=cells[j].col*25;
					cells[j].y=cells[j].row*25;
				}
			}
			return canRotate;
		}
		
		/**
		 * 左右移动 
		 * @param direction true向左false向右
		 * @return 是否可以移动
		 * 
		 */
		public function move(direction:Boolean):Boolean
		{
			var canMove:Boolean=true;
			var targetCol:int=direction?-1:1;
			for(var i:int=0;i<cells.length;i++)
			{
				var cell:Cell=cells[i];
				if((cell.col+targetCol)>=GameView.walls[0].length||(cell.col+targetCol)<0)
				{
					canMove=false;
					break;
				}
				if(cell.row>=0 && GameView.walls[cell.row][cell.col+targetCol]!=null)
				{
					canMove=false;
					break;
				}
			}
			if(canMove)
			{
				for(var j:int=0;j<cells.length;j++)
				{
					cells[j].move(direction);
				}
			}
			return canMove;
		}
		
		/**
		 * 单步下移
		 * @return 
		 * 
		 */
		public function toDrop():Boolean
		{
			var canDown:Boolean=true;
			for(var i:int=0;i<cells.length;i++)
			{
				var cell:Cell=cells[i];
				if(cell.row>=GameView.walls.length-1)
				{
					canDown=false;
					break;
				}
				if(cell.row>=0&&GameView.walls[cell.row+1][cell.col]!=null)
				{
					canDown=false;
					break;
				}
			}
			if(canDown)
			{
				for(var j:int=0;j<cells.length;j++)
				{
					cells[j].drop();
				}
			}
			return canDown;
		}
		
		/**
		 *  直接落地
		 * 
		 */
		public function hardDrop():void
		{
			while(toDrop())
			{
			}
		}
		
		public function putToWall():void
		{
			for(var i:int=0;i<cells.length;i++)
			{
				var cell:Cell=cells[i];
				cell.setCellName("W");
			}
		}
	}
}

class State{
	public var row0:int;
	public var col0:int;
	public var row1:int;
	public var col1:int;
	public var row2:int;
	public var col2:int;
	public var row3:int;
	public var col3:int;
	
	public function State(col0:int,row0:int,col1:int,row1:int,col2:int,row2:int,col3:int,row3:int):void
	{
		this.row0=row0;
		this.col0=col0;
		this.row1=row1;
		this.col1=col1;
		this.row2=row2;
		this.col2=col2;
		this.row3=row3;
		this.col3=col3;
	}
}

import view.Blocks;
import view.Cell;

class Z extends Blocks
{
	public function Z(){
		super();
		this.cells=[new Cell(5,-1,"Z"),new Cell(4,-1,"Z"),new Cell(4,0,"Z"),new Cell(5,-2,"Z")];
		this.states=[new State(0,0,-1,0,0,1,1,1),new State(0,0,-1,0,-1,1,0,-1)];
	}
}

class T extends Blocks
{
	public function T(){
		super();
		this.cells=[new Cell(4,-1,"T"),new Cell(5,-1,"T"),new Cell(4,0,"T"),new Cell(4,-2,"T")];
		this.states=[new State(0,0,-1,0,1,0,0,1),new State(0,0,-1,0,0,1,0,-1),new State(0,0,-1,0,1,0,0,-1),new State(0,0,1,0,0,1,0,-1)];
	}
}

class S extends Blocks
{
	public function S(){
		super();
		this.cells=[new Cell(4,-1,"S"),new Cell(4,-2,"S"),new Cell(5,-1,"S"),new Cell(5,0,"S")];
		this.states=[new State(0,0,-1,1,0,1,1,0),new State(0,0,0,-1,1,0,1,1)];
	}
}

class O extends Blocks
{
	public function O(){
		super();
		this.cells=[new Cell(4,-1,"O"),new Cell(5,-1,"O"),new Cell(4,0,"O"),new Cell(5,0,"O")];
		this.states=[new State(0,0,1,0,0,1,1,1)];
	}
}

class L extends Blocks
{
	public function L(){
		super();
		this.cells=[new Cell(4,-1,"L"),new Cell(4,-2,"L"),new Cell(4,0,"L"),new Cell(5,0,"L")];
		this.states=[new State(0,0,-1,0,-1,1,1,0),new State(0,0,-1,-1,0,-1,0,1),new State(0,0,-1,0,1,0,1,-1),new State(0,0,0,-1,0,1,1,1)];
	}
}

class J extends Blocks
{
	public function J(){
		super();
		this.cells=[new Cell(4,-1,"J"),new Cell(4,-2,"J"),new Cell(5,-2,"J"),new Cell(4,0,"J")];
		this.states=[new State(0,0,-1,0,1,0,1,1),new State(0,0,0,-1,-1,1,0,1),new State(0,0,-1,-1,-1,0,1,0),new State(0,0,0,-1,1,-1,0,1)];
	}
}

class I extends Blocks
{
	public function I(){
		super();
		this.cells=[new Cell(4,-1,"I"),new Cell(4,-2,"I"),new Cell(4,-3,"I"),new Cell(4,0,"I")];
		this.states=[new State(0,0,-1,0,1,0,2,0),new State(0,0,0,-1,0,-2,0,1)];
	}
}