package
{
	import flash.display.Shape;
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.events.KeyboardEvent;
	import flash.events.TimerEvent;
	import flash.utils.Timer;
	
	import flashx.textLayout.elements.BreakElement;
	
	import view.Cell;
	
	public class Snakes extends Sprite
	{
		private var walls:Array;
		private var snakeArr:Array;
		private var egg:Cell;
		private var timer:Timer;
		
		public function Snakes()
		{
			this.addEventListener(Event.ADDED_TO_STAGE,addToStage);
		}
		
		protected function addToStage(event:Event):void
		{
			this.removeEventListener(Event.ADDED_TO_STAGE,addToStage);
			
			stage.addEventListener(KeyboardEvent.KEY_DOWN, this.downHandler);
			
			drawBg();
			
			initData();
			
		}
		
		private function downHandler(evt:KeyboardEvent) : void
		{
			if(snakeArr==null||snakeArr.length<1)
			{
				trace("没有贪吃蛇");
				return;
			}
			switch(evt.keyCode)
			{
				//向上
				case 38:
					snakeArr[0].rotate=0;
					break;
				//向下
				case 40:
					snakeArr[0].rotate=180;
					break;
				//向左
				case 37:
					snakeArr[0].rotate=270;
					break;
				//向右
				case 39:
					snakeArr[0].rotate=90;
					break;
				default:
					trace("只能进行上、下、左、右操作");
					break;
			}
		}
		
		private function initData():void
		{
			walls=[];
			for(var i:int=0;i<20;i++)
			{
				walls.push(new Array());
				for(var j:int=0;j<20;j++)
				{
					walls[i].push(null);
				}
			}
			//创建贪吃蛇
			createSnake();
			//创建随机蛋
			createRandomEgg();
			//创建计时器
			if(timer==null)
			{
				timer=new Timer(200,0);
			}
			timer.addEventListener(TimerEvent.TIMER,snakeMove);
			timer.start();
		}
		
		protected function snakeMove(event:TimerEvent):void
		{
			if(snakeArr==null||snakeArr.length<1)
			{
				trace("没有贪吃蛇");
				return;
			}
			
			//获取下一位置
			var nextCol:int;
			var nextRow:int;
			switch(snakeArr[0].rotate)
			{
				//向上
				case 0:
					nextCol=snakeArr[0].col;
					nextRow=snakeArr[0].row-1;
					break;
				//向右
				case 90:
					nextCol=snakeArr[0].col+1;
					nextRow=snakeArr[0].row;
					break;
				//向下
				case 180:
					nextCol=snakeArr[0].col;
					nextRow=snakeArr[0].row+1;
					break;
				//向左
				case 270:
					nextCol=snakeArr[0].col-1;
					nextRow=snakeArr[0].row;
					break;
				default:
					trace("贪吃蛇方向不对哟！！");
					break;
			}
			
			//判断是否吃蛋
			if(egg.col==nextCol && egg.row==nextRow)
			{
				egg.setType(0);
				egg.col=snakeArr[0].col;
				egg.row=snakeArr[0].row;
				egg.x=egg.col*10;
				egg.y=egg.row*10;
				snakeArr[0].col=nextCol;
				snakeArr[0].row=nextRow;
				snakeArr[0].x=snakeArr[0].col*10;
				snakeArr[0].y=snakeArr[0].row*10;
				walls[egg.col][egg.row]=egg;
				walls[nextCol][nextRow]=snakeArr[0];
				snakeArr.splice(1,0,egg);
				egg=null;
				createRandomEgg()
			}
			else
			{
				var cell:Cell=snakeArr.pop();
				walls[cell.col][cell.row]=null;
				cell.col=snakeArr[0].col;
				cell.row=snakeArr[0].row;
				cell.x=cell.col*10;
				cell.y=cell.row*10;
				snakeArr[0].col=nextCol;
				snakeArr[0].row=nextRow;
				snakeArr[0].x=snakeArr[0].col*10;
				snakeArr[0].y=snakeArr[0].row*10;
				walls[nextCol][nextRow]=snakeArr[0];
				snakeArr.splice(1,0,cell);
			}
			
			//检查是否自撞或者撞墙
			if(checkOverLap())
			{
				gameOver();
			}
		}
		
		private function checkOverLap():Boolean
		{
			for(var i:int=0;i<snakeArr.length;i++)
			{
				if(snakeArr[i].col<0||snakeArr[i].col>=20||snakeArr[i].row<0||snakeArr[i].row>=20)
				{
					return true;
				}
				for(var j:int=i+1;j<snakeArr.length;j++)
				{
					if(snakeArr[i].col==snakeArr[j].col && snakeArr[i].row==snakeArr[j].row)
					{
						return true;
					}
				}
			}			
			return false;
		}
		
		private function gameOver():void
		{
			timer.stop();
			trace("game over!!");
		}
		
		private function createRandomEgg():void
		{
			var length:int=20*20-snakeArr.length;
			var randomNum:int=Math.round((length+1)*Math.random());
			if(randomNum>length||randomNum<1)
			{
				randomNum=1;
			}
			var count:int=0;
			var eggCol:int;
			var eggRow:int;
			for(var col:int=0;col<20;col++)
			{
				for(var row:int=0;row<20;row++)
				{
					if(walls[col][row]==null)
					{
						if(count==randomNum)
						{
							eggCol=col;
							eggRow=row;
							break;
						}
						count++;
					}
				}
				if(count==randomNum)
				{
					break;
				}
			}
			if(count==randomNum)
			{
				egg=new Cell();
				egg.setType(2);
				this.addChild(egg);

				egg.col=eggCol;
				egg.row=eggRow;
				egg.x=egg.col*10;
				egg.y=egg.row*10;
			}
			else
			{
				trace("没有位置可以放置蛋了~~");
			}
		}
		
		private function createSnake():void
		{
			snakeArr=[];
			
			var snakeHead:Cell=new Cell();
			snakeHead.setType(1);
			snakeHead.col=2;
			snakeHead.row=0;
			snakeHead.rotate=90;
			snakeHead.x=snakeHead.col*10;
			snakeHead.y=snakeHead.row*10;
			this.addChild(snakeHead);
			snakeArr.push(snakeHead);
			
			var snakeBody:Cell=new Cell();
			snakeBody.setType(0);
			snakeBody.col=1;
			snakeBody.row=0;
			snakeBody.x=snakeBody.col*10;
			snakeBody.y=snakeBody.row*10;
			this.addChild(snakeBody);
			snakeArr.push(snakeBody);
			
			var snakeTail:Cell=new Cell();
			snakeTail.setType(0);
			snakeTail.col=0;
			snakeTail.row=0;
			snakeTail.x=snakeTail.col*10;
			snakeTail.y=snakeTail.row*10;
			this.addChild(snakeTail);
			snakeArr.push(snakeTail);
		}
		
		private function drawBg():void
		{
			var shp:Shape=new Shape();
			shp.graphics.beginFill(0xD1E3F7);
			shp.graphics.drawRect(0,0,20*10,20*10);
			shp.graphics.endFill();
			
			var line:Shape=new Shape();
			line.graphics.lineStyle(0.1,0x000000);
			
			//画横线
			for(var i:int=0;i<20;i++)
			{
				line.graphics.moveTo(0,i*10);
				line.graphics.lineTo(20*10,i*10);
			}
			//画竖线
			for(var j:int=0;j<20;j++)
			{
				line.graphics.moveTo(j*10,0);
				line.graphics.lineTo(j*10,20*10);
			}
			
			this.addChild(shp);
			this.addChild(line);
		}
	}
}