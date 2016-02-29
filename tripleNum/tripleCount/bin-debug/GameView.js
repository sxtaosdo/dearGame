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
var GameView = (function (_super) {
    __extends(GameView, _super);
    function GameView() {
        _super.call(this);
        this.cancelArr = [];
        this.tempArr = [];
        var bg = this.createBitmapByName("bg_png");
        this.addChild(bg);
        this.createContainer = new egret.Sprite();
        this.createContainer.x = 171;
        this.createContainer.y = 148;
        this.addChild(this.createContainer);
        var createbg = this.createBitmapByName("createPot_png");
        this.createContainer.addChild(createbg);
        this.gameContainer = new egret.Sprite();
        this.gameContainer.x = 14.5;
        this.gameContainer.y = 256;
        this.addChild(this.gameContainer);
        var cellbg = this.createBitmapByName("cells_png");
        this.gameContainer.addChild(cellbg);
        this.gameContainer.touchEnabled = true;
        this.gameContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.addMap, this);
        this.storeContainer = new egret.Sprite();
        this.gameContainer.addChild(this.storeContainer);
        var storebottom = this.createBitmapByName("bottom_png");
        storebottom.x = 2;
        storebottom.y = 33;
        this.storeContainer.addChild(storebottom);
        var storetop = this.createBitmapByName("top_png");
        storetop.x = 2;
        storetop.y = 4;
        this.storeContainer.addChild(storetop);
        //        this.storeContainer.touchEnabled=true;
        //        this.storeContainer.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.cashInStore,this);
        this.initView();
    }
    var d = __define,c=GameView,p=c.prototype;
    p.clearReady = function () {
        if (this.readyCell == null) {
            return;
        }
        if (this.readyCell != null && this.readyCell.parent != null) {
            this.readyCell.parent.removeChild(this.readyCell);
        }
        this.readyCell.setInSelect(false);
        this.readyCell = null;
    };
    p.addMap = function (evt) {
        var col = Math.floor(evt.localX / 75);
        var row = Math.floor(evt.localY / 75);
        if (col == 0 && row == 0) {
            this.cashInStore();
        }
        else if (this.walls[col][row] != null) {
            if (this.readyCell != null && this.readyCell.col == col && this.readyCell.row == row) {
                this.clearReady();
                this.create.col = col;
                this.create.row = row;
                this.putToWall(this.create);
                this.tripleCancel(this.create);
                this.create = null;
                this.createNewCell();
            }
        }
        else {
            if (this.readyCell != null) {
                this.walls[this.readyCell.col][this.readyCell.row] = null;
                this.readyCell.col = col;
                this.readyCell.row = row;
                this.putToWall(this.readyCell);
            }
            else {
                this.readyCell = new CellItemrenderer();
                this.readyCell.setType(this.create.cellType, this.create.cellValue);
                this.readyCell.col = col;
                this.readyCell.row = row;
                this.readyCell.setInSelect(true);
                this.putToWall(this.readyCell);
            }
        }
    };
    p.tripleCancel = function (cell) {
        this.cancelArr = [];
        this.tempArr = [];
        this.tempArr.push(cell);
        while (this.tempArr.length > 0) {
            var cell = this.tempArr.shift();
            this.cancelArr.push(cell);
            //左侧
            if (cell.col - 1 >= 0 && this.walls[cell.col - 1][cell.row] != null && this.checkSame(cell, this.walls[cell.col - 1][cell.row]) && !this.checkInCancel(this.walls[cell.col - 1][cell.row])) {
                this.tempArr.push(this.walls[cell.col - 1][cell.row]);
            }
            //右侧
            if (cell.col + 1 < 6 && this.walls[cell.col + 1][cell.row] != null && this.checkSame(cell, this.walls[cell.col + 1][cell.row]) && !this.checkInCancel(this.walls[cell.col + 1][cell.row])) {
                this.tempArr.push(this.walls[cell.col + 1][cell.row]);
            }
            //上方
            if (cell.row - 1 >= 0 && this.walls[cell.col][cell.row - 1] != null && this.checkSame(cell, this.walls[cell.col][cell.row - 1]) && !this.checkInCancel(this.walls[cell.col][cell.row - 1])) {
                this.tempArr.push(this.walls[cell.col][cell.row - 1]);
            }
            //下方
            if (cell.row + 1 < 6 && this.walls[cell.col][cell.row + 1] != null && this.checkSame(cell, this.walls[cell.col][cell.row + 1]) && !this.checkInCancel(this.walls[cell.col][cell.row + 1])) {
                this.tempArr.push(this.walls[cell.col][cell.row + 1]);
            }
        }
        if (this.cancelArr.length < 3) {
            this.cancelArr = [];
            return;
        }
        else {
            var targetCell = this.cancelArr.shift();
            var col = targetCell.col;
            var row = targetCell.row;
            targetCell = targetCell.upGrade();
            if (targetCell == null && this.walls[col][row].parent != null) {
                this.walls[col][row].parent.removeChild(this.walls[col][row]);
            }
            this.walls[col][row] = targetCell;
            while (this.cancelArr.length > 0) {
                var cancelCell = this.cancelArr.shift();
                if (cancelCell.parent != null) {
                    cancelCell.parent.removeChild(cancelCell);
                }
                this.walls[cancelCell.col][cancelCell.row] = null;
            }
            if (targetCell != null) {
                this.tripleCancel(targetCell);
            }
        }
    };
    p.checkSame = function (cell1, cell2) {
        if ((cell2.row != 0 || cell2.col != 0) && cell1.cellType == cell2.cellType && cell1.cellValue == cell2.cellValue) {
            return true;
        }
        else {
            return false;
        }
    };
    p.checkInCancel = function (cell) {
        for (var i = 0; i < this.cancelArr.length; i++) {
            if (cell == this.cancelArr[i]) {
                return true;
            }
        }
        return false;
    };
    p.createNewCell = function () {
        if (this.create == null) {
            this.create = this.createRandomCell();
        }
        this.create.x = 30;
        this.create.y = -20;
        this.createContainer.addChild(this.create);
    };
    p.cashInStore = function () {
        this.clearReady();
        if (this.store == null) {
            this.store = this.create;
            this.create = null;
        }
        else {
            var tempCell = this.store;
            this.store = this.create;
            this.create = tempCell;
        }
        this.createNewCell();
        this.store.x = 0;
        this.store.y = 0;
        this.storeContainer.addChild(this.store);
    };
    p.initView = function () {
        this.walls = [];
        for (var i = 0; i < 6; i++) {
            this.walls.push([null, null, null, null, null, null]);
        }
        this.createMap();
        this.createNewCell();
    };
    p.putToWall = function (cell) {
        this.walls[cell.col][cell.row] = cell;
        cell.x = 75 * cell.col;
        cell.y = 75 * cell.row;
        if (cell.row != 0 || cell.col != 0) {
            this.gameContainer.addChild(cell);
        }
    };
    p.createMap = function () {
        var randomLength = Math.round(Math.random() * 8) + 5;
        var postionArr = this.createPositionArr();
        for (var j = 0; j < randomLength; j++) {
            var cell = this.createRandomCell();
            var randomPos = Math.round(Math.random() * postionArr.length);
            if (randomPos >= postionArr.length) {
                randomPos = 0;
            }
            var count = postionArr.splice(randomPos, 1)[0];
            cell.col = Math.floor(count / 6);
            cell.row = count % 6;
            this.putToWall(cell);
        }
    };
    p.createPositionArr = function () {
        var posArr = [];
        for (var col = 0; col < 6; col++) {
            for (var row = 0; row < 6; row++) {
                if (this.walls[col][row] == null) {
                    if (col == 0 && row == 0) {
                        continue;
                    }
                    posArr.push(col * 6 + row);
                }
            }
        }
        return posArr;
    };
    p.createRandomCell = function () {
        var cell = new CellItemrenderer;
        var cellType;
        var cellNumber;
        var randomTypeNumber = Math.round(Math.random() * 20);
        if (randomTypeNumber % 3) {
            cellType = 1;
        }
        else {
            cellType = 2;
        }
        var randomValueNumber = Math.round(Math.random() * 1000);
        randomValueNumber = randomValueNumber % 100;
        if (randomValueNumber < 70) {
            cellNumber = 1;
        }
        else if (randomValueNumber < 90) {
            cellNumber = 2;
        }
        else {
            cellNumber = 3;
        }
        cell.setType(cellType, cellNumber);
        return cell;
    };
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return GameView;
})(egret.DisplayObjectContainer);
egret.registerClass(GameView,'GameView');
//# sourceMappingURL=GameView.js.map