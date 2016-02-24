package view
{
	import event.PopEvent;
	
	import flash.display.Sprite;
	import flash.events.MouseEvent;
	import flash.events.PressAndTapGestureEvent;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.utils.setTimeout;
	
	import renderer.Cell;

	public class Game extends Sprite
	{
		private var gameContainer:Sprite;
		
		private var walls:Array;
		private var selectArray:Array=[];
		private var tempArray:Array=[];
		
		private var level:int;
		private var targetScore:int;
		private var currentScore:int;
		
		private var levelTf:TextField;
		private var targetTf:TextField;
		private var scoreTf:TextField;
		
		private var preView:PreView;
		
		public function Game()
		{
			gameContainer=new Sprite();
			gameContainer.y=1024-64*11;
			this.addChild(gameContainer);
			gameContainer.addEventListener(MouseEvent.CLICK,clickHandler);
			
			var textFt:TextFormat=new TextFormat();
			textFt.size=40;
			textFt.bold=true;
			textFt.color=0xFFFFFF;
			
			levelTf=new TextField();
			levelTf.width=214;
			levelTf.height=44;
			levelTf.x=0;
			levelTf.y=5;
			levelTf.defaultTextFormat=textFt;
			levelTf.text="关卡";
			this.addChild(levelTf);
			
			targetTf=new TextField();
			targetTf.width=352;
			targetTf.height=44;
			targetTf.x=214;
			targetTf.y=5;
			targetTf.defaultTextFormat=textFt;
			targetTf.text="目标";
			this.addChild(targetTf);
			
			scoreTf=new TextField();
			scoreTf.width=352;
			scoreTf.height=44;
			scoreTf.x=214;
			scoreTf.y=65;
			scoreTf.defaultTextFormat=textFt;
			scoreTf.text="得分";
			this.addChild(scoreTf);
			
			initView();
		}
		
		private function setLevel(level:int):void
		{
			this.level=level;
			levelTf.text="关卡："+String(level);
			if(level<5)
			{
				targetScore = (level-1)*2000+1000;
			}
			else if(level<10)
			{
				targetScore = (level-5)*3000+1000+8000;
			}
			else if(level<20)
			{
				targetScore = (level-10)*4000+1000+8000+12000;
			}
			else if(level<40)
			{
				targetScore = (level-20)*5000+1000+8000+12000+40000;
			}
			else
			{
				targetScore = (level-40)*6000+1000+8000+12000+40000+50000;
			}
			targetTf.text="目标："+String(targetScore);
		}
		
		private function setScore(score:int):void
		{
			currentScore=score;
			scoreTf.text="得分："+String(currentScore);
		}
		
		protected function clickHandler(e:MouseEvent):void
		{
			if(e.target is renderer.Cell)
			{
				var targetCell:Cell=e.target as Cell;
				var col:int=e.target.x/64;
				var row:int=Math.floor(e.target.y/64)-1;
				//已存在选中数组
				if(selectArray.length)
				{
					if(targetCell.state)
					{
						clearStar();
					}
					else
					{
						clearSelect();
						setSelect(col,row);
					}
				}
				//不存在选中数组
				else
				{
					setSelect(col,row);
				}
				
			}
		}
		
		private function checkSelect(col:int,row:int):Boolean
		{
			var clearable:Boolean=false;
			if(walls[col][row]!=null)
			{
				if(col>0 && walls[col-1][row]!=null && walls[col-1][row].color==walls[col][row].color)
				{
					clearable=true;
				}
				else if(col<11 && walls[col+1][row]!=null && walls[col+1][row].color==walls[col][row].color)
				{
					clearable=true;
				}
				else if(row>0 && walls[col][row-1]!=null && walls[col][row-1].color==walls[col][row].color)
				{
					clearable=true;
				}
				else if(row<9 && walls[col][row+1]!=null && walls[col][row+1].color==walls[col][row].color)
				{
					clearable=true;
				}
			}
			return clearable;
		}
		
		private function setSelect(col:int,row:int):void
		{
			//没有可消除色块
			if(!checkSelect(col,row))
			{
				return;
			}
			
			tempArray.push(walls[col][row]);
			while(tempArray.length>0){
				var cell:Cell=tempArray.pop();
				if(!cell.state)
				{
					cell.state=1;
					selectArray.push(cell);
				}
				if(cell.col>0 && walls[cell.col-1][cell.row]!=null && walls[cell.col-1][cell.row].color==cell.color && (!walls[cell.col-1][cell.row].state))
				{
					tempArray.push(walls[cell.col-1][cell.row]);
				}
				if(cell.col<11 && walls[cell.col+1][cell.row]!=null && walls[cell.col+1][cell.row].color==cell.color && (!walls[cell.col+1][cell.row].state))
				{
					tempArray.push(walls[cell.col+1][cell.row]);
				}
				if(cell.row>0 && walls[cell.col][cell.row-1]!=null && walls[cell.col][cell.row-1].color==cell.color && (!walls[cell.col][cell.row-1].state))
				{
					tempArray.push(walls[cell.col][cell.row-1]);
				}
				if(cell.row<9 && walls[cell.col][cell.row+1]!=null && walls[cell.col][cell.row+1].color==cell.color && (!walls[cell.col][cell.row+1].state))
				{
					tempArray.push(walls[cell.col][cell.row+1]);
				}
			}
		}
		
		private function clearSelect():void
		{
			for(var i:int=0;i<selectArray.length;i++)
			{
				(selectArray[i] as Cell).state=0;
			}
			selectArray=[];
		}
		
		private function clearStar():void
		{
			for(var i:int=0;i<selectArray.length;i++)
			{
				var targetCell:Cell=selectArray[i];
				if(walls[targetCell.col][targetCell.row]!=null && walls[targetCell.col][targetCell.row].parent!=null)
				{
					walls[targetCell.col][targetCell.row].parent.removeChild(walls[targetCell.col][targetCell.row]);
					walls[targetCell.col][targetCell.row]=null;
				}
			}
			trace(selectArray.length);
			setScore(currentScore+(selectArray.length-1)*5*selectArray.length);
			selectArray=[];
			
			//纵向下落
			for(var c:int=0;c<12;c++)
			{
				var targetRow:int=9;
				for(var r:int=9;r>=0;r--)
				{
					if(walls[c][r]!=null)
					{
						if(walls[c][r].row!=targetRow)
						{
							walls[c][r].row=targetRow;
							walls[c][r].y=(targetRow+1)*64;
							walls[c][targetRow]=walls[c][r];
							walls[c][r]=null;
						}						
						targetRow--;
					}
				}
			}
			
			var targetCol:int=0;
			//横向偏移
			for(var cc:int=0;cc<12;cc++)
			{
				var isEmpty:Boolean=true;
				for(var rr:int=0;rr<10;rr++)
				{
					if(walls[cc][rr]!=null)
					{
						isEmpty=false;
						break;
					}
				}
				if(!isEmpty)
				{
					for(var rrr:int=0;rrr<10;rrr++)
					{
						if(walls[cc][rrr]!=null && walls[cc][rrr].col!=targetCol)
						{
							walls[cc][rrr].col=targetCol;
							walls[cc][rrr].x=targetCol*64;
							walls[targetCol][rrr]=walls[cc][rrr];
							walls[cc][rrr]=null;
						}
					}
					targetCol++;
				}
			}
			
			var conAble:Boolean=false;
			for(var ii:int=0;ii<12;ii++)
			{
				for(var j:int=0;j<10;j++)
				{
					if(walls[ii][j]!=null && checkSelect(ii,j))
					{
						conAble=true;
						break;
					}
				}
				if(conAble)
				{
					break;
				}
			}
			if(!conAble)
			{
				if(targetScore>currentScore)
				{
					trace("闯关失败，请使用道具");
				}
				else
				{
					setLevel(level+1);
					showPreView();
				}
			}
		}
		
		public function initView():void
		{
			while(gameContainer.numChildren>0)
			{
				gameContainer.removeChildAt(0);
			}
			
			setScore(0);
			setLevel(1);
			
			showPreView();					
		}
		
		private function showPreView():void
		{
			if(preView==null)
			{
				preView=new PreView();
				preView.addEventListener(PopEvent.PREVIEW_END,refreshWalls);
			}
			this.addChild(preView);
			preView.showView(level,targetScore);
			if(gameContainer!=null)
			{
				gameContainer.visible=false;
			}
			preView.visible=true;
		}
		
		private function refreshWalls(evt:*=null):void
		{
			preView.visible=false;
			gameContainer.visible=true;
			while(gameContainer.numChildren>0)
			{
				gameContainer.removeChildAt(0);
			}
			
			if(walls==null)
			{
				walls=new Array();
				for(var i:int=0;i<12;i++)
				{
					walls.push([null,null,null,null,null,null,null,null,null,null]);
				}
			}

			for(var col:int=0;col<12;col++)
			{
				for(var row:int=0;row<10;row++)
				{
					walls[col][row]=Cell.createRandomCell();;
					walls[col][row].x=col*64;
					walls[col][row].y=(row+1)*64;
					walls[col][row].col=col;
					walls[col][row].row=row;
					gameContainer.addChild(walls[col][row]);
				}
			}		
		}
	}
}