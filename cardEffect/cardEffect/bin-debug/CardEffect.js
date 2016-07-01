var CardEffect = (function (_super) {
    __extends(CardEffect, _super);
    function CardEffect() {
        _super.call(this);
        //总帧数
        this.totalFra = 10;
        this.touchEnabled = true;
        this.touchChildren = true;
    }
    var d = __define,c=CardEffect,p=c.prototype;
    /**
     * 设置花色，牌值
     * @param color  牌色 1-红桃 2-方块 3-黑桃 4-梅花
     * @param value  牌值 1-13
     */
    p.createCard = function (color, value) {
        var cardName = "";
        switch (color) {
            case 1:
                cardName = "hongtao";
                break;
            case 2:
                cardName = "fangkuai";
                break;
            case 3:
                cardName = "heitao";
                break;
            default:
                cardName = "meihua";
                break;
        }
        cardName = cardName + "_" + value + "0000";
        console.log(cardName);
        this.cardFront = this.createBitmapByName(cardName);
        this.cardFront.width = 160;
        this.cardFront.height = 200;
        this.cardFront.anchorOffsetX = this.cardFront.width / 2;
        this.cardFront.anchorOffsetY = this.cardFront.height / 2;
        this.frontMask = new egret.Shape();
        this.frontMask.graphics.beginFill(0x000000);
        this.frontMask.graphics.drawRect(0, 0, this.cardFront.width, this.cardFront.height);
        this.frontMask.graphics.endFill();
        this.frontMask.anchorOffsetX = this.cardFront.width / 2;
        this.frontMask.anchorOffsetY = this.cardFront.height / 2;
        this.addChild(this.frontMask);
        this.cardFront.mask = this.frontMask;
        //牌背资源
        this.cardBack = this.createBitmapByName("pai00010000");
        this.cardBack.width = 155;
        this.cardBack.height = 200;
        this.cardBack.anchorOffsetX = this.cardBack.width / 2;
        this.cardBack.anchorOffsetY = this.cardBack.height / 2;
        this.backMask = new egret.Shape();
        this.backMask.graphics.beginFill(0x000000);
        this.backMask.graphics.drawRect(0, 0, this.cardBack.width, this.cardBack.height);
        this.backMask.graphics.endFill();
        this.backMask.anchorOffsetX = this.backMask.width / 2;
        this.backMask.anchorOffsetY = this.backMask.height / 2;
        this.addChild(this.backMask);
        this.cardBack.mask = this.backMask;
        //开始翻牌资源
        this.flipSp = new egret.Sprite();
        var shp1 = new egret.Shape();
        shp1.graphics.beginFill(0xFFCC00, 0.5);
        shp1.graphics.drawRect(0, 0, 145, 20);
        shp1.graphics.endFill();
        shp1.name = "1";
        shp1.x = 107;
        shp1.y = 363;
        var shp2 = new egret.Shape();
        shp2.graphics.beginFill(0xFFCC00, 0.5);
        shp2.graphics.drawRect(0, 0, 200, 20);
        shp2.graphics.endFill();
        shp2.name = "2";
        shp2.x = 78;
        shp2.y = 347;
        this.flipSp.addChild(shp1);
        this.flipSp.addChild(shp2);
        this.flipSp.touchEnabled = true;
        this.flipSp.touchChildren = true;
        this.addChild(this.cardBack);
        this.addChild(this.cardFront);
        this.addChild(this.flipSp);
        this.cardTransform = -1;
        this.setTransform();
        this.cardBack.touchEnabled = true;
        this.cardBack.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.setTransform, this);
        this.cardFront.touchEnabled = true;
    };
    p.setTransform = function (evt) {
        if (evt === void 0) { evt = null; }
        if (this.cardFront == null) {
            return;
        }
        this.cardTransform += 1;
        if (this.cardTransform > 1) {
            this.cardTransform = 0;
        }
        this.setFrame(1);
    };
    p.startFlip = function (evt) {
        this.flipEnable(1);
        this.setFrame(2);
    };
    p.flipBegin = function (evt) {
        this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.flipBegin, this);
        this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.flipProgress, this);
        this.addEventListener(egret.TouchEvent.TOUCH_END, this.flipEnd, this);
        this.touchY = evt.stageY;
    };
    p.flipProgress = function (evt) {
        var distY = evt.stageY - this.touchY;
        if (!this.cardTransform) {
            var fram = Math.round(distY * this.totalFra / 100);
            if (fram != 0) {
                this.touchY = this.touchY + fram * 100 / this.totalFra;
                this.setFrame(this.currentFra - fram);
            }
        }
        else {
            var fram1 = Math.round(distY * this.totalFra / 77);
            if (fram1 != 0) {
                this.touchY = this.touchY + fram1 * 77 / this.totalFra;
                this.setFrame(this.currentFra - fram1);
            }
        }
    };
    p.flipEnd = function (evt) {
        if (evt === void 0) { evt = null; }
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.flipBegin, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.flipProgress, this);
        this.removeEventListener(egret.TouchEvent.TOUCH_END, this.flipEnd, this);
    };
    /**
     * 是否正在翻牌
     * @param openType 0-翻牌之前 1-正在翻牌 2-翻牌结束
     */
    p.flipEnable = function (openType) {
        if (openType == 0) {
            this.flipSp.visible = true;
            this.flipSp.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startFlip, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.flipBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.flipProgress, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.flipEnd, this);
            var shp1 = this.flipSp.getChildAt(0);
            var shp2 = this.flipSp.getChildAt(1);
            //横向
            if (this.cardTransform) {
                shp1.visible = false;
                shp2.visible = true;
            }
            else {
                shp1.visible = true;
                shp2.visible = false;
            }
        }
        else if (openType == 1) {
            this.flipSp.visible = false;
            this.flipSp.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startFlip, this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.flipBegin, this);
        }
        else {
            this.flipSp.visible = false;
            this.flipSp.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startFlip, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.flipBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.flipProgress, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.flipEnd, this);
        }
    };
    p.setFrame = function (currentFra) {
        this.currentFra = currentFra;
        //翻牌完成
        if (this.currentFra >= this.totalFra) {
            if (this.cardTransform) {
                this.currentFra = this.totalFra;
                this.flipEnable(2);
                this.cardFront.x = 184;
                this.cardFront.y = 290;
                this.cardBack.x = 184;
                this.cardBack.y = 290;
            }
            else {
                this.cardFront.x = 178;
                this.cardFront.y = 290;
                this.cardBack.x = 178;
                this.cardBack.y = 290;
            }
        }
        else if (this.currentFra <= 1) {
            this.currentFra = 1;
            this.flipEnable(0);
            if (this.cardTransform) {
                this.cardFront.x = 178;
                this.cardFront.y = 445;
                this.cardFront.rotation = -90;
                this.cardBack.x = 178;
                this.cardBack.y = 290;
                this.cardBack.rotation = -90;
                this.backMask.x = this.cardBack.x;
                this.backMask.y = this.cardBack.y;
                this.backMask.rotation = this.cardBack.rotation;
                this.frontMask.x = this.cardBack.x;
                this.frontMask.y = this.cardBack.y;
                this.frontMask.rotation = this.cardBack.rotation;
            }
            else {
                this.cardBack.x = 178;
                this.cardBack.y = 290;
                this.cardBack.rotation = 0;
                this.backMask.x = this.cardBack.x;
                this.backMask.y = this.cardBack.y;
                this.backMask.rotation = this.cardBack.rotation;
                this.cardFront.x = 184;
                this.cardFront.y = 490;
                this.cardFront.rotation = 0;
                this.frontMask.x = this.cardBack.x;
                this.frontMask.y = this.cardBack.y;
                this.frontMask.rotation = this.cardBack.rotation;
            }
        }
        else {
            if (this.cardTransform) {
                this.cardBack.y = 290 + this.currentFra * (77 / this.totalFra);
                this.cardFront.y = 445 - this.currentFra * (77 / this.totalFra);
            }
            else {
                this.cardBack.y = 290 + this.currentFra * (100 / this.totalFra);
                this.cardFront.y = 490 - this.currentFra * (100 / this.totalFra);
            }
        }
    };
    p.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return CardEffect;
})(egret.Sprite);
egret.registerClass(CardEffect,'CardEffect');
//# sourceMappingURL=CardEffect.js.map