//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-2015, Egret Technology Inc.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////

class GameView extends egret.DisplayObjectContainer {

    private gameContainer:egret.Sprite;
    private createContainer:egret.Sprite;
    private storeContainer:egret.Sprite;
    
    private walls: Array<Array<CellItemrenderer>>;
    private store:CellItemrenderer;
    private create:CellItemrenderer;
    private readyCell:CellItemrenderer;
    
    public constructor() {
        super();
        var bg: egret.Bitmap = this.createBitmapByName("bg_png");
        this.addChild(bg);
        
        this.createContainer=new egret.Sprite();
        this.createContainer.x=171;
        this.createContainer.y=148;
        this.addChild(this.createContainer);
        var createbg: egret.Bitmap = this.createBitmapByName("createPot_png");
        this.createContainer.addChild(createbg);
        
        this.gameContainer=new egret.Sprite();
        this.gameContainer.x=14.5;
        this.gameContainer.y=256;
        this.addChild(this.gameContainer);
        var cellbg: egret.Bitmap = this.createBitmapByName("cells_png");
        this.gameContainer.addChild(cellbg);
        this.gameContainer.touchEnabled=true;
        this.gameContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.addMap,this);
        
        this.storeContainer=new egret.Sprite();
        this.gameContainer.addChild(this.storeContainer);
        var storebottom: egret.Bitmap = this.createBitmapByName("bottom_png");
        storebottom.x=2;
        storebottom.y=33;
        this.storeContainer.addChild(storebottom);
        var storetop:egret.Bitmap=this.createBitmapByName("top_png");
        storetop.x=2;
        storetop.y=4;
        this.storeContainer.addChild(storetop);
//        this.storeContainer.touchEnabled=true;
//        this.storeContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.cashInStore,this);
        
        this.initView();
    }
    
    private clearReady():void{
        if(this.readyCell==null){
            return;
        }
        if(this.readyCell!=null && this.readyCell.parent!=null)
        {
            this.readyCell.parent.removeChild(this.readyCell);
        }
        this.readyCell.setInSelect(false);
        this.readyCell=null;
    }
    
    private addMap(evt:egret.TouchEvent):void
    {
        var col:number=Math.floor(evt.localX/75);
        var row:number=Math.floor(evt.localY/75);
        if(col==0&&row==0)
        {
            this.cashInStore();
        }
        else if(this.walls[col][row]!=null)
        {
            if(this.readyCell != null && this.readyCell.col == col && this.readyCell.row == row) {
                this.clearReady();
                this.create.col = col;
                this.create.row = row;
                this.putToWall(this.create);
                this.tripleCancel(this.create);
                this.create = null;
                this.createNewCell();
            }
        }
        else
        {
            if(this.readyCell!=null)
            {
                this.walls[this.readyCell.col][this.readyCell.row]=null;
                this.readyCell.col=col;
                this.readyCell.row=row;
                this.putToWall(this.readyCell);
            }
            else
            {
                this.readyCell=new CellItemrenderer();
                this.readyCell.setType(this.create.cellType,this.create.cellValue);
                this.readyCell.col=col;
                this.readyCell.row=row;
                this.readyCell.setInSelect(true);
                this.putToWall(this.readyCell);
            }
        }
    }
    
    private cancelArr:Array<CellItemrenderer>=[];
    private tempArr:Array<CellItemrenderer>=[];
    private tripleCancel(cell:CellItemrenderer):void{
        this.cancelArr=[];
        this.tempArr=[];
        this.tempArr.push(cell);
        while(this.tempArr.length > 0) {
            var cell: CellItemrenderer = this.tempArr.shift();
            this.cancelArr.push(cell);
            //左侧
            if(cell.col - 1 >= 0 && this.walls[cell.col - 1][cell.row] != null && this.checkSame(cell,this.walls[cell.col - 1][cell.row]) && !this.checkInCancel(this.walls[cell.col - 1][cell.row]))
            {
                this.tempArr.push(this.walls[cell.col - 1][cell.row]);
            }
            //右侧
            if(cell.col + 1 < 6 && this.walls[cell.col + 1][cell.row] != null && this.checkSame(cell,this.walls[cell.col + 1][cell.row]) && !this.checkInCancel(this.walls[cell.col + 1][cell.row])) {
                this.tempArr.push(this.walls[cell.col + 1][cell.row]);
            }
            //上方
            if(cell.row - 1 >= 0 && this.walls[cell.col][cell.row - 1] != null && this.checkSame(cell,this.walls[cell.col][cell.row - 1]) && !this.checkInCancel(this.walls[cell.col][cell.row-1])) {
                this.tempArr.push(this.walls[cell.col][cell.row-1]);
            }
            //下方
            if(cell.row + 1 < 6 && this.walls[cell.col][cell.row + 1] != null && this.checkSame(cell,this.walls[cell.col][cell.row + 1]) && !this.checkInCancel(this.walls[cell.col][cell.row+1])) {
                this.tempArr.push(this.walls[cell.col][cell.row+1]);
            }
        }
        if(this.cancelArr.length<3)
        {
            this.cancelArr=[];
            return;
        }
        else
        {
            var targetCell:CellItemrenderer=this.cancelArr.shift();
            var col:number=targetCell.col;
            var row:number=targetCell.row;
            targetCell=targetCell.upGrade();
            if(targetCell == null && this.walls[col][row].parent!=null) 
            {
                this.walls[col][row].parent.removeChild(this.walls[col][row]);
            }
            this.walls[col][row]=targetCell;
            while(this.cancelArr.length>0)
            {
                var cancelCell:CellItemrenderer=this.cancelArr.shift();
                if(cancelCell.parent!=null)
                {
                    cancelCell.parent.removeChild(cancelCell);
                }
                this.walls[cancelCell.col][cancelCell.row]=null;
            }
            if(targetCell!=null)
            {
                this.tripleCancel(targetCell);
            }
        }
    }
    
    private checkSame(cell1:CellItemrenderer,cell2:CellItemrenderer):Boolean
    {
        if((cell2.row!=0||cell2.col!=0) && cell1.cellType==cell2.cellType && cell1.cellValue==cell2.cellValue)
        {
            return true;
        }
        else{
            return false;
        }
    }
    
    private checkInCancel(cell:CellItemrenderer):Boolean
    {
        for(var i:number=0;i<this.cancelArr.length;i++){
            if(cell==this.cancelArr[i])
            {
                return true;
            }
        }
        return false;
    }
    
    private createNewCell():void
    {
        if(this.create==null)
        {
            this.create = this.createRandomCell();
        }
        
        this.create.x = 30;
        this.create.y = -20;
        this.createContainer.addChild(this.create);
    }
    
    private cashInStore():void{
        this.clearReady();
        if(this.store==null)
        {
            this.store=this.create;
            this.create=null;
        }
        else
        {
            var tempCell:CellItemrenderer=this.store;
            this.store=this.create;
            this.create=tempCell;           
        }
        this.createNewCell();
        this.store.x=0;
        this.store.y=0;
        this.storeContainer.addChild(this.store);
    }
    
    private initView():void{
        
        this.walls=[];
        for(var i:number=0;i<6;i++){
            this.walls.push([null,null,null,null,null,null]);
        }
        
        this.createMap();
        
        this.createNewCell();
        
    }
    
    private putToWall(cell:CellItemrenderer):void{
        this.walls[cell.col][cell.row]=cell;
        cell.x=75*cell.col;
        cell.y=75*cell.row;
        if(cell.row!=0||cell.col!=0)
        {
            this.gameContainer.addChild(cell);
        }
    }
    
    private createMap():void{
        var randomLength:number=Math.round(Math.random()*8)+5;
        
        var postionArr:Array<number>=this.createPositionArr();
        
        for(var j:number=0;j<randomLength;j++){
            var cell: CellItemrenderer = this.createRandomCell();
            var randomPos:number=Math.round(Math.random()*postionArr.length);
            if(randomPos >= postionArr.length)
            {
                randomPos=0;
            }
            var count:number=postionArr.splice(randomPos,1)[0];
            cell.col=Math.floor(count/6);
            cell.row=count%6;
            this.putToWall(cell);
        }       
    }
    
    private createPositionArr():Array<number>
    {
        var posArr:Array<number>=[];
        for(var col:number=0;col<6;col++){
            for(var row:number=0; row<6; row++){
                if(this.walls[col][row]==null)
                {
                    if(col==0&&row==0)
                    {
                        continue;
                    }
                    posArr.push(col*6+row);
                }
            }
        }
        return posArr;
    }
    
    private createRandomCell():CellItemrenderer{
        var cell:CellItemrenderer=new CellItemrenderer;
        var cellType:number;
        var cellNumber:number;
        var randomTypeNumber:number=Math.round(Math.random()*20);
        if(randomTypeNumber%3)
        {
            cellType=1;
        }
        else
        {
            cellType=2;
        }
        
        var randomValueNumber: number = Math.round(Math.random() * 1000);
        randomValueNumber=randomValueNumber%100;
        if(randomValueNumber<70)
        {
            cellNumber=1;
        }
        else if(randomValueNumber<90)
        {
            cellNumber=2;
        }
        else
        {
            cellNumber=3;
        }
        cell.setType(cellType,cellNumber);
        return cell;
    }

    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name:string):egret.Bitmap {
        var result:egret.Bitmap = new egret.Bitmap();
        var texture:egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }
}


