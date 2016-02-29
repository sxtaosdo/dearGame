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
var CellItemrenderer = (function (_super) {
    __extends(CellItemrenderer, _super);
    function CellItemrenderer() {
        _super.call(this);
        this.tween = egret.Tween.get(this);
        this.touchEnabled = false;
        this.touchChildren = false;
    }
    var d = __define,c=CellItemrenderer,p=c.prototype;
    p.setInSelect = function (isSelect) {
        if (isSelect) {
            if (this.shp == null) {
                this.shp = new egret.Shape();
                this.shp.graphics.lineStyle(2, 0xFFFF00);
                this.shp.graphics.lineTo(75, 0);
                this.shp.graphics.lineTo(75, 75);
                this.shp.graphics.lineTo(0, 75);
                this.shp.graphics.lineTo(0, 0);
                this.shp.graphics.endFill;
            }
            this.addChild(this.shp);
            this.startTween();
        }
        else {
            this.endTween();
            if (this.shp != null && this.shp.parent != null) {
                this.shp.parent.removeChild(this.shp);
            }
        }
    };
    p.startTween = function () {
        //        this.tween.to({ scaleX: 0.5,scaleY: 0.5 },500).wait(100).to({scaleX:1,scaleY:1},500).wait(100).call(this.startTween,this);
        egret.Tween.get(this.cellBp).to({ scaleX: 1.1, scaleY: 1.1 }, 500).wait(100)
            .to({ scaleX: 1, scaleY: 1 }, 500).wait(100)
            .call(this.startTween, this);
    };
    p.endTween = function () {
        this.scaleX = 1;
        this.scaleY = 1;
        this.tween.pause();
    };
    p.setType = function (_type, _value) {
        if (this.cellType == _type && this.cellValue == _value) {
            return;
        }
        if (this.cellBp != null && this.cellBp.parent != null) {
            this.cellBp.parent.removeChild(this.cellBp);
        }
        this.cellType = _type;
        this.cellValue = _value;
        var nameStr = "";
        switch (this.cellType) {
            case 1:
                nameStr = "plant";
                break;
            case 2:
                nameStr = "animal";
                break;
            case 3:
                nameStr = "bianbian";
                break;
            case 4:
                nameStr = "moneyBag";
                break;
            case 5:
                nameStr = "potion";
                break;
        }
        switch (this.cellValue) {
            case 0:
                break;
            case 1:
                nameStr += "1";
                break;
            case 2:
                nameStr += "2";
                break;
            case 3:
                nameStr += "3";
                break;
            case 4:
                nameStr += "4";
                break;
            case 5:
                nameStr += "5";
                break;
            case 6:
                nameStr += "6";
                break;
        }
        nameStr += "_png";
        this.cellBp = this.createBitmapByName(nameStr);
        this.cellBp.x = 2.5;
        this.cellBp.y = 2.5;
        this.addChild(this.cellBp);
    };
    p.upGrade = function () {
        //原计划生成药水，暂时先做成生成最高等后不见
        if (this.cellType == 1 && this.cellValue == 3) {
            return null;
        }
        else if (this.cellType == 2 && this.cellValue == 6) {
            return null;
        }
        else {
            this.setType(this.cellType, this.cellValue + 1);
        }
        return this;
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
    return CellItemrenderer;
})(egret.DisplayObjectContainer);
egret.registerClass(CellItemrenderer,'CellItemrenderer');
//# sourceMappingURL=CellItemrenderer.js.map