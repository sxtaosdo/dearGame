var TipManager = (function () {
    function TipManager() {
        this._tipTargets = []; //Tip注册列表
        this.backgroundalpha = 0.9; //背景透明度
        this.backgroundcolor = 0x000000; //背景色
        this.color = 0x593A04; //边框颜色值
        this.font = "Times New Roman"; //Tip文字字体
        this.fontColor = 0xFFFF00; //Tip文字颜色
        this.isWordWarp = true; //是否自动换行
        this.size = 16; //Tip文字大小
        this.tf = new egret.TextField;
        this.tf.fontFamily = this.font;
        this.tf.textColor = this.fontColor;
        this.tf.size = this.size;
        this.tf.x = 4;
        this.tf.y = 4;
        this.tipUI = new egret.Sprite();
        this.tipUI.addChild(this.tf);
        this.tipUI.touchChildren = false;
        this.tipUI.touchEnabled = false;
    }
    var d = __define,c=TipManager,p=c.prototype;
    d(TipManager, "instance"
        ,function () {
            if (this._instance == null) {
                this._instance = new TipManager();
            }
            return this._instance;
        }
    );
    d(p, "displayStage"
        ,function () {
            return this._displayStage;
        }
        ,function (value) {
            this._displayStage = value;
        }
    );
    p.cleanTip2 = function (target) {
        this.cleanNowTip();
        target.removeEventListener(mouse.MouseEvent.MOUSE_MOVE, this.targetUiMouseMoveHandler, this);
    };
    /**
     *
     * @param targetUi  要添加Tip的组件
     * @param tip       Tip的默认内容，可以是字符串也可以是继承自Sprite的组件
     * @param wordWarp
     * @param fun
     */
    p.registToolTip = function (targetUi, tip, wordWarp, fun) {
        if (tip === void 0) { tip = null; }
        if (wordWarp === void 0) { wordWarp = true; }
        if (fun === void 0) { fun = null; }
        this.isWordWarp = wordWarp;
        var tipVo = new TipHandler();
        tipVo.tip = tip;
        tipVo.callbackFun = fun;
        tipVo.targetUi = targetUi;
        this._tipTargets.push(tipVo);
        targetUi.addEventListener(mouse.MouseEvent.ROLL_OVER, this.targetUiRollOverHandler, this);
        targetUi.addEventListener(mouse.MouseEvent.ROLL_OUT, this.targetUiRollOutHandler, this);
        targetUi.addEventListener(mouse.MouseEvent.MOUSE_MOVE, this.targetUiMouseMoveHandler, this);
    };
    /**
     * 解注册ToolTip和组件的关系
     * @param targetUi
     */
    p.unRegistToolTip = function (targetUi) {
        var index = 0;
        var inList = false;
        for (index = 0; index < this._tipTargets.length; index++) {
            if (this._tipTargets[index].targetUi == targetUi) {
                inList = true;
                break;
            }
        }
        if (!inList) {
            return;
        }
        this._tipTargets.splice(index);
        targetUi.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.targetUiRollOverHandler, this);
        targetUi.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.targetUiRollOutHandler, this);
        targetUi.removeEventListener(mouse.MouseEvent.MOUSE_MOVE, this.targetUiMouseMoveHandler, this);
    };
    /**
     *  清理掉当前的ToolTip
     */
    p.cleanNowTip = function () {
        if (this._nowTip) {
            if (this.displayStage && this.displayStage.contains(this._nowTip)) {
                this.displayStage.removeChild(this._nowTip);
            }
            this._nowTip = null;
        }
    };
    /**
     * 在目标上鼠标移动
     * @param mouseEvent
     */
    p.targetUiMouseMoveHandler = function (evt) {
        //        console.log("滑动啦");
        if (this._nowTip && this.displayStage) {
            var point;
            point = this.displayStage.globalToLocal(evt.stageX, evt.stageY + 5);
            this._nowTip.x = point.x + 5;
            this._nowTip.y = point.y + 10;
            try {
                if (this._nowTip.x + this._nowTip.width > this.displayStage.width) {
                    this._nowTip.x = this.displayStage.width - this._nowTip.width;
                }
                if (this._nowTip.y + this._nowTip.height > this.displayStage.height) {
                    this._nowTip.y = this.displayStage.height - this._nowTip.height;
                }
            }
            catch (err) {
                console.error(err);
            }
        }
    };
    /**
     * 鼠标滑过时要显示Tip
     * @param mouseEvent
     */
    p.targetUiRollOverHandler = function (mouseEvent) {
        this.showTip(mouseEvent);
        //        console.log("进来啦");
    };
    /**
     * 鼠标离开时取消显示Tip
     * @param mouseEvent
     */
    p.targetUiRollOutHandler = function (mouseEvent) {
        this.cleanNowTip();
        //        console.log("出去啦");
    };
    /**
     * 未注册的UI鼠标离开时
     * @param mouseEvent
     */
    p.unRegistTargetUiRollOutHandler = function (mouseEvent) {
        this.cleanNowTip();
        mouseEvent.target.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.unRegistTargetUiRollOutHandler, this);
        mouseEvent.target.removeEventListener(mouse.MouseEvent.MOUSE_MOVE, this.targetUiMouseMoveHandler, this);
    };
    /**
     * 显示Tip公共方法
     * @param mouseEvent
     * @param tip
     * @param fun
     */
    p.showTip = function (mouseEvent, tip, fun) {
        if (tip === void 0) { tip = null; }
        if (fun === void 0) { fun = null; }
        var index = 0;
        var target = mouseEvent.target;
        var inList = false;
        for (index = 0; index < this._tipTargets.length; index++) {
            if (this._tipTargets[index].targetUi == target) {
                inList = true;
                if (tip == null && this._tipTargets[index].tip != null) {
                    tip = this._tipTargets[index].tip;
                }
                if (fun == null && this._tipTargets[index].callbackFun != null) {
                    fun = this._tipTargets[index].callbackFun;
                }
                break;
            }
        }
        if (!inList) {
            target.addEventListener(mouse.MouseEvent.ROLL_OUT, this.unRegistTargetUiRollOutHandler, this);
            target.addEventListener(mouse.MouseEvent.MOUSE_MOVE, this.targetUiMouseMoveHandler, this);
        }
        this.cleanNowTip();
        if (tip != null) {
            if (typeof (tip) == "string") {
                this.tf.text = tip;
                this.tipUI.graphics.clear();
                this.tipUI.graphics.lineStyle(1, this.color, this.backgroundalpha);
                this.tipUI.graphics.beginFill(this.backgroundcolor, this.backgroundalpha);
                this.tipUI.graphics.drawRoundRect(0, 0, this.tf.width + 15, this.tf.height + 5, 6, 6);
                this.tipUI.graphics.endFill();
                this._nowTip = this.tipUI;
            }
            else {
                this._nowTip = tip;
            }
        }
        else if (fun != null) {
            var funRetObj = fun(target);
            if (typeof (funRetObj) == "string") {
                this.tf.text = funRetObj;
                this.tf.wordWrap = true;
                this.tf.height = this.tf.textHeight;
                this.tipUI.graphics.clear();
                this.tipUI.graphics.lineStyle(1, this.color, this.backgroundalpha);
                this.tipUI.graphics.beginFill(this.backgroundcolor, this.backgroundalpha);
                this.tipUI.graphics.drawRoundRect(0, 0, this.tf.width + 15, this.tf.height, 6, 6); //tipUi.width,tipUi.height);带圆角的背景
                this.tipUI.graphics.endFill();
                this._nowTip = this.tipUI;
            }
            else {
                this._nowTip = funRetObj;
            }
        }
        if (this._nowTip) {
            if (this.displayStage != null) {
                var point;
                point = this.displayStage.globalToLocal(mouseEvent.stageX, mouseEvent.stageY + 5);
                this._nowTip.x = point.x + 5;
                this._nowTip.y = point.y + 10;
                try {
                    if (this._nowTip.x + this._nowTip.width > this.displayStage.width) {
                        this._nowTip.x = this.displayStage.width - this._nowTip.width;
                    }
                    if (this._nowTip.y + this._nowTip.height > this.displayStage.height) {
                        this._nowTip.y = this.displayStage.height - this._nowTip.height;
                    }
                }
                catch (err) {
                    console.error(err);
                }
                this.displayStage.addChild(this._nowTip);
            }
        }
    };
    p.cleanAll = function () {
        for (var i = 0; i < this._tipTargets.length; i++) {
            this._tipTargets[i].targetUi.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.targetUiRollOverHandler, this);
            this._tipTargets[i].targetUi.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.targetUiRollOutHandler, this);
            this._tipTargets[i].targetUi.removeEventListener(mouse.MouseEvent.MOUSE_MOVE, this.targetUiMouseMoveHandler, this);
        }
    };
    return TipManager;
}());
egret.registerClass(TipManager,'TipManager');
var TipHandler = (function () {
    function TipHandler() {
    }
    var d = __define,c=TipHandler,p=c.prototype;
    /**清理*/
    p.clear = function () {
        this.targetUi = null;
        this.tip = null;
        this.callbackFun = null;
    };
    return TipHandler;
}());
egret.registerClass(TipHandler,'TipHandler');
//# sourceMappingURL=TipManager.js.map