package view
{
    import flash.display.*;
    import flash.events.*;
    import flash.text.*;
    import flash.utils.*;

    public class GameView extends Sprite
    {
        private var scoreTf:TextField;
        private var highestTf:TextField;
        private var levelTf:TextField;
        public var score:Number;
        public var highest:Number = -1;
        public var level:Number;
        private var gameContainer:Sprite;
        private var nextContainer:Sprite;
        private var gameOverView:GameOverPanel;
        private var nextBlc:Blocks;
        private var currentBlc:Blocks;
        private var timer:Timer;
        static public var walls:Array;

        public function GameView()
        {
            this.addEventListener(Event.ADDED_TO_STAGE, this.addToStage);
            this.dataShow();
            this.initView();
            return;
        }

        private function addToStage(param1:Event) : void
        {
            this.removeEventListener(Event.ADDED_TO_STAGE, this.addToStage);
            stage.addEventListener(KeyboardEvent.KEY_DOWN, this.downHandler);
            return;
        }

        private function downHandler(param1:KeyboardEvent) : void
        {
            if (this.currentBlc == null)
            {
                return;
            }// end if
            var _loc_2:Boolean;
            var _loc_3:Boolean;
            switch(param1.keyCode)
            {
                case 38:
                {
                    _loc_2 = this.currentBlc.rotateClockwise();
                    break;
                }
                case 37:
                {
                    _loc_2 = this.currentBlc.move(true);
                    break;
                }
                case 39:
                {
                    _loc_2 = this.currentBlc.move(false);
                    break;
                }
                case 40:
                {
                    _loc_2 = this.currentBlc.toDrop();
                    _loc_3 = !_loc_2;
                    break;
                }
                case 32:
                {
                    this.currentBlc.hardDrop();
                    _loc_3 = true;
                    break;
                }
                default:
                {
                    break;
                }
            }
            if (_loc_2)
            {
                this.drawBlocks(this.currentBlc.cells, true);
            }// end if
            if (_loc_3)
            {
                this.putToWall();
            }// end if
            return;
        }

        private function drawBlocks(param1:Array, param2:Boolean, param3:Boolean = false) : void
        {
            var _loc_4:int;
            var _loc_5:int;
            if (param2)
            {
                _loc_4 = 0;
                while (_loc_4 < param1.length)
                {
                    // label
                    if (param3)
                    {
                        this.nextContainer.addChild(param1[_loc_4]);
                    }
                    else
                    {
                        this.gameContainer.addChild(param1[_loc_4]);
                    }// end else if
                    _loc_4++;
                }
            }
            else
            {
                _loc_5 = 0;
                while (_loc_5 < param1.length)
                {
                    // label
                    if (param1[_loc_5].parent != null)
                    {
                        param1[_loc_5].parent.removeChild(param1[_loc_5]);
                    }// end if
                    _loc_5++;
                }
            }// end else if
            return;
        }

        private function initView() : void
        {
            var _loc_1:int;
            var _loc_2:int;
            var _loc_3:int;
            var _loc_4:int;
            var _loc_5:Shape;
            var _loc_6:Shape;
            this.score = -1;
            this.level = -1;
            this.setScore(0);
            this.setLevel(1);
            if (walls != null)
            {
                _loc_1 = 0;
                while (_loc_1 < walls.length)
                {
                    // label
                    _loc_2 = 0;
                    while (_loc_2 < walls[0].length)
                    {
                        // label
                        if (walls[_loc_1][_loc_2] != null)
                        {
                            if (walls[_loc_1][_loc_2].parent != null)
                            {
                                walls[_loc_1][_loc_2].parent.removeChild(walls[_loc_1][_loc_2]);
                            }// end if
                            walls[_loc_1][_loc_2] = null;
                        }// end if
                        _loc_2++;
                    }
                    _loc_1++;
                }
            }
            else
            {
                walls = new Array();
                _loc_3 = 0;
                while (_loc_3 < 20)
                {
                    // label
                    walls.push(new Array());
                    _loc_4 = 0;
                    while (_loc_4 < 10)
                    {
                        // label
                        walls[_loc_3].push(null);
                        _loc_4++;
                    }
                    _loc_3++;
                }
            }// end else if
            if (this.gameContainer == null)
            {
                this.gameContainer = new Sprite();
                _loc_5 = new Shape();
                _loc_5.graphics.beginFill(0);
                _loc_5.graphics.drawRect(60, 97, 250, 500);
                _loc_5.graphics.endFill();
                this.gameContainer.mask = _loc_5;
                this.gameContainer.x = 60;
                this.gameContainer.y = 97;
            }
            else
            {
                while (this.gameContainer.numChildren > 0)
                {
                    // label
                    this.gameContainer.removeChildAt(0);
                }
            }// end else if
            if (this.nextContainer == null)
            {
                this.nextContainer = new Sprite();
                _loc_6 = new Shape();
                this.nextContainer.x = 353;
                this.nextContainer.y = 97;
                this.nextContainer.addChild(_loc_6);
            }
            else
            {
                while (this.nextContainer.numChildren > 1)
                {
                    // label
                    this.nextContainer.removeChildAt(1);
                }
            }// end else if
            this.addChild(this.gameContainer);
            this.addChild(this.nextContainer);
            this.createBlocks();
            return;
        }

        private function createBlocks() : void
        {
            if (!this.nextBlc)
            {
                this.nextBlc = Blocks.createRandomBlocks();
                this.nextBlc.setBlock(true);
                this.createBlocks();
            }
            else
            {
                this.drawBlocks(this.nextBlc.cells, false, true);
                this.currentBlc = this.nextBlc;
                this.currentBlc.setBlock(false);
                this.drawBlocks(this.currentBlc.cells, true);
                this.nextBlc = Blocks.createRandomBlocks();
                this.nextBlc.setBlock(true);
                this.drawBlocks(this.nextBlc.cells, true, true);
            }// end else if
            this.timer.start();
            return;
        }

        public function setScore(param1:int) : void
        {
            this.score = param1;
            this.scoreTf.text = "Score:" + String(param1);
            if (this.highest < param1)
            {
                this.highest = param1;
                this.highestTf.text = "HighScore:" + String(this.highest);
            }// end if
            if (param1 < 100)
            {
                this.setLevel(1);
            }
            else if (param1 < 300)
            {
                this.setLevel(2);
            }
            else if (param1 < 600)
            {
                this.setLevel(3);
            }
            else if (param1 < 1000)
            {
                this.setLevel(4);
            }
            else if (param1 < 1500)
            {
                this.setLevel(5);
            }
            else if (param1 < 2000)
            {
                this.setLevel(6);
            }
            else if (param1 < 3000)
            {
                this.setLevel(7);
            }
            else if (param1 < 4000)
            {
                this.setLevel(8);
            }
            else if (param1 < 5000)
            {
                this.setLevel(9);
            }
            else
            {
                this.setLevel(10);
            }// end else if
            return;
        }

        public function setLevel(param1:int) : void
        {
            if (this.level == param1)
            {
                return;
            }// end if
            this.level = param1;
            this.levelTf.text = "Level:" + String(param1);
            if (this.timer != null)
            {
                this.timer.removeEventListener(TimerEvent.TIMER, this.blockdrop);
                this.timer.stop();
            }// end if
            this.timer = new Timer((11 - param1) * 80);
            this.timer.addEventListener(TimerEvent.TIMER, this.blockdrop);
            return;
        }

        private function blockdrop(param1:TimerEvent) : void
        {
            if (this.currentBlc == null)
            {
                return;
            }
            var canDrop:Boolean = this.currentBlc.toDrop();
            if (!canDrop)
            {
                this.timer.stop();
                this.putToWall();
            }
            else
            {
                this.drawBlocks(this.currentBlc.cells, true);
            }
        }

        private function putToWall() : void
        {
            var isGameOver:Boolean=false;
			
			//将当前模块的纹理改为墙壁纹理
            this.currentBlc.putToWall();
			
			//将组块注入墙体，并检查是否游戏结束
            for (var count:int=0;count < currentBlc.cells.length;count++)
            {
				var targetCell:Cell=currentBlc.cells[count];
                if (targetCell.row <= 0)
                {
					isGameOver = true;
                    break;
                }
				walls[targetCell.row][targetCell.col]=targetCell;
            }
            this.currentBlc = null;
            if (isGameOver)
            {
                this.gameOver();
                return;
            }
			
            var cancelLine:int=0;
			//消除满行墙体并获取分数
            for (var r:int=19; r>=0; r--)
            {
                //行可消除标志
                var canCancel:Boolean = true;
                for (var c:int=0; c<walls[0].length; c++)
                {
                    if (walls[r][c] == null)
                    {
                        canCancel = false;
                        break;
                    }
                }
                if (canCancel)
                {
                    for(var c0:int=0; c0< walls[0].length; c0++)
                    {
                        if (walls[r][c0] != null && walls[r][c0].parent != null)
                        {
                            walls[r][c0].parent.removeChild(walls[r][c0]);
                        }
                    }
                    walls.splice(r, 1);
                    walls.unshift([null, null, null, null, null, null, null, null, null, null]);
                    cancelLine++;
					r++;
                }
            }
            if (cancelLine)
            {
                switch(cancelLine)
                {
                    case 1:
                    {
                        this.setScore(this.score + 10);
                        break;
                    }
                    case 2:
                    {
                        this.setScore(this.score + 30);
                        break;
                    }
                    case 3:
                    {
                        this.setScore(this.score + 60);
                        break;
                    }
                    case 4:
                    {
                        this.setScore(this.score + 100);
                        break;
                    }
                    default:
                    {
                        break;
                    }
                }
                for(var rr:int=0; rr< walls.length; rr++)
                {
                    for(var cc:int=0; cc<walls[0].length; cc++)
                    {
                        if (walls[rr][cc] != null)
                        {
                            walls[rr][cc].x = 25 * cc;
                            walls[rr][cc].y = 25 * rr;
                        }
                    }
                }
            }
            this.createBlocks();
        }

        private function gameOver() : void
        {
            this.timer.stop();
            if (this.gameOverView == null)
            {
                this.gameOverView = new GameOverPanel();
                this.gameOverView.x = (this.stage.stageWidth - this.gameOverView.width) / 2 - 140;
                this.gameOverView.y = (this.stage.stageHeight - this.gameOverView.height) / 2;
            }// end if
            this.gameOverView.score.text = "Score:" + String(this.score);
            this.gameOverView.highest.text = "HighestScore:" + String(this.highest);
            this.gameOverView.confirm.addEventListener(MouseEvent.CLICK, this.resetHandler);
            this.addChild(this.gameOverView);
            return;
        }

        private function resetHandler(param1:MouseEvent) : void
        {
            if (this.gameOverView != null && this.gameOverView.parent != null)
            {
                this.gameOverView.parent.removeChild(this.gameOverView);
            }// end if
            this.initView();
            return;
        }

        private function dataShow() : void
        {
            var _loc_1:* = new TextFormat();
            _loc_1.size = 23;
            _loc_1.bold = true;
            _loc_1.color = 3355443;
            this.scoreTf = new TextField();
            this.scoreTf.width = 154;
            this.scoreTf.height = 40;
            this.scoreTf.x = 320;
            this.scoreTf.y = 280;
            this.scoreTf.defaultTextFormat = _loc_1;
            this.scoreTf.text = "Score";
            this.addChild(this.scoreTf);
            this.highestTf = new TextField();
            this.highestTf.width = 154;
            this.highestTf.height = 40;
            this.highestTf.x = 320;
            this.highestTf.y = 315;
            this.highestTf.defaultTextFormat = _loc_1;
            this.highestTf.text = "Highest";
            this.addChild(this.highestTf);
            this.levelTf = new TextField();
            this.levelTf.width = 154;
            this.levelTf.height = 40;
            this.levelTf.x = 320;
            this.levelTf.y = 245;
            this.levelTf.defaultTextFormat = _loc_1;
            this.levelTf.text = "Level";
            this.addChild(this.levelTf);
            return;
        }
    }
}
