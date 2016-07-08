var NumberBar = (function (_super) {
    __extends(NumberBar, _super);
    function NumberBar(mc) {
        if (mc === void 0) { mc = null; }
        _super.call(this);
        this.centerPoint = 0;
        this.numWidth = 0; //数字长度
        this.sepHeight = 0; //分隔符高度
        this.commaWidth = 0; //间隔符长度
        this.retention = 0; //保留小数位
        this.prelen = 0; //上一数值的数字个数
        this.precommalen = 0; //上一数值的分隔符个数
        if (mc == null) {
            return;
        }
        this.setParams(mc);
    }
    var d = __define,c=NumberBar,p=c.prototype;
    /**
     *
     * @param mc 带有0~9的十帧动画
     * @param numWidth 宽度
     * @param sepHeight 分隔符高度
     * @param isCenter 是否居中
     * @param comma 逗号，不传则不显示
     * @param decim 小数点，不传则只显示整数位
     * @param retention 小数点后保留位，不传则默认为0
     *
     */
    p.setParams = function (mc, numWidth, sepHeight, isCenter, comma, decim, retention) {
        if (numWidth === void 0) { numWidth = 0; }
        if (sepHeight === void 0) { sepHeight = 0; }
        if (isCenter === void 0) { isCenter = false; }
        if (comma === void 0) { comma = null; }
        if (decim === void 0) { decim = null; }
        if (retention === void 0) { retention = 0; }
        this.cls = mc;
        this.isCenter = isCenter;
        if (numWidth != 0) {
            this.numWidth = numWidth;
        }
        else {
            this.numWidth = (new mc).width;
        }
        if (sepHeight != 0) {
            this.sepHeight = sepHeight;
        }
        else {
            this.sepHeight = (new mc).height;
        }
        this.commaWidth = numWidth / 2;
        if (comma == null) {
            this.isComma = false;
        }
        else {
            this.isComma = true;
            this.comma = comma;
        }
        if (decim == null || retention == 0) {
            this.isDecimal = false;
        }
        else {
            this.isDecimal = true;
            this.decim = decim;
            this.retention = retention;
        }
        this.initUI();
    };
    p.initUI = function () {
        this.list = [];
        this.commaList = [];
        this.decimList = [];
        if (this.isDecimal) {
            this.decimList[0] = new this.decim();
        }
        this.sp = new egret.DisplayObjectContainer();
        this.addChild(this.sp);
    };
    p.getNum = function () {
        return (this.strNum);
    };
    p.setNum = function (num) {
        var strInter; //新数值的整数部分
        var strDecim; //新数值的小数部分
        //将数值依据设置参数拆分为整数部分及小数部分，并重新获得数值
        this.strNum = num.toString();
        if (this.isDecimal == true && this.strNum.indexOf(".") >= 0) {
            strInter = this.strNum.substring(0, this.strNum.indexOf("."));
            strDecim = this.strNum.substr(this.strNum.indexOf(".") + 1, this.retention);
            num = (strInter + "." + strDecim);
        }
        else {
            var temp;
            if (this.strNum.indexOf(".") >= 0) {
                strInter = this.strNum.substring(0, this.strNum.indexOf("."));
            }
            else {
                strInter = this.strNum;
            }
            strDecim = "";
            num = strInter;
        }
        //如果数值与原来相等则直接返回，不必更新
        if (num == this.tempNum) {
            return;
        }
        this.tempNum = num;
        var len = strInter.length + strDecim.length;
        var commalen = 0;
        if (this.isComma) {
            commalen = (strInter.length - 1) / 3;
        }
        else {
            commalen = 0;
        }
        //如果原数组长度大于现有数组长度，则移除多余元素
        if (this.prelen > len) {
            for (var m = len; m < this.prelen; m++) {
                if (this.sp.contains(this.list[m])) {
                    this.sp.removeChild(this.list[m]);
                }
            }
        }
        this.prelen = len;
        //如果原小数点数组长度大于现有数组长度，则移除多余元素
        if (this.isDecimal && this.sp.contains(this.decimList[0]) && strDecim == "") {
            this.sp.removeChild(this.decimList[0]);
        }
        //如果原分隔符数组长度大于现有分隔符数组长度，则移除多余元素
        if (this.precommalen > commalen) {
            for (var n = commalen; n < this.precommalen; n++) {
                if ((this.commaList[n] != null) && (this.sp.contains(this.commaList[n]))) {
                    this.sp.removeChild(this.commaList[n]);
                }
            }
        }
        this.precommalen = commalen;
        var key;
        var countComma = 0; //间隔符计数器
        //整数部分构造
        for (var i = 0; i < strInter.length; i++) {
            key = parseInt(strInter.substr(i, 1));
            if (this.isComma) {
                if (((strInter.length - i) % 3 == 0) && (i != 0)) {
                    if (this.commaList[countComma] == null) {
                        this.commaList[countComma] = new this.comma();
                    }
                    if (!this.sp.contains(this.commaList[countComma])) {
                        this.sp.addChild(this.commaList[countComma]);
                    }
                    this.commaList[countComma].x = this.numWidth * i + countComma * this.commaWidth;
                    this.commaList[countComma].y = this.sepHeight;
                    countComma++;
                }
            }
            if (key != null) {
                if (this.list[i] == null) {
                    this.list[i] = new egret.MovieClip(this.cls);
                }
                if (!this.sp.contains(this.list[i])) {
                    this.sp.addChild(this.list[i]);
                }
                this.list[i].x = this.numWidth * i + countComma * this.commaWidth;
                this.list[i].gotoAndStop(key + 1);
            }
        }
        //小数部分构造
        if (strDecim != null && strDecim != "") {
            if (this.decimList[0] == null) {
                this.decimList[0] = new this.decim();
            }
            if (!this.sp.contains(this.decimList[0])) {
                this.sp.addChild(this.decimList[0]);
            }
            this.decimList[0].x = this.numWidth * i + this.commaWidth * commalen;
            this.decimList[0].y = this.sepHeight;
            for (var j = i; j < i + strDecim.length; j++) {
                key = parseInt(strDecim.substr(j - i, 1));
                if (key != null) {
                    if (this.list[j] == null) {
                        this.list[j] = new egret.MovieClip(this.cls);
                    }
                    if (!this.sp.contains(this.list[j])) {
                        this.sp.addChild(this.list[j]);
                    }
                    this.list[j].x = this.numWidth * j + this.commaWidth * (commalen + 1);
                    this.list[j].gotoAndStop(key + 1);
                }
            }
        }
        //居中处理
        if (this.isCenter) {
            this.sp.x = -((len * this.numWidth + commalen * this.commaWidth) / 2);
        }
    };
    p.setStr = function (strNum) {
        var strInter; //新数值的整数部分
        var strDecim; //新数值的小数部分
        var num;
        //将数值依据设置参数拆分为整数部分及小数部分，并重新获得数值
        //			strNum=String(num);
        if (this.isDecimal == true && strNum.indexOf(".") >= 0) {
            strInter = strNum.substring(0, strNum.indexOf("."));
            strDecim = strNum.substr(strNum.indexOf(".") + 1, this.retention);
            num = (strInter + "." + strDecim);
        }
        else {
            if (strNum.indexOf(".") >= 0) {
                strInter = strNum.substring(0, strNum.indexOf("."));
            }
            else {
                strInter = strNum;
            }
            strDecim = "";
            num = strInter;
        }
        //如果数值与原来相等则直接返回，不必更新
        if (num == this.tempNum) {
            return;
        }
        this.tempNum = num;
        var len = strInter.length + strDecim.length;
        var commalen = 0;
        if (this.isComma) {
            commalen = (strInter.length - 1) / 3;
        }
        else {
            commalen = 0;
        }
        //如果原数组长度大于现有数组长度，则移除多余元素
        if (this.prelen > len) {
            for (var m = len; m < this.prelen; m++) {
                if (this.sp.contains(this.list[m])) {
                    this.sp.removeChild(this.list[m]);
                }
            }
        }
        this.prelen = len;
        //如果原小数点数组长度大于现有数组长度，则移除多余元素
        if (this.isDecimal && this.sp.contains(this.decimList[0]) && strDecim == "") {
            this.sp.removeChild(this.decimList[0]);
        }
        //如果原分隔符数组长度大于现有分隔符数组长度，则移除多余元素
        if (this.precommalen > commalen) {
            for (var n = commalen; n < this.precommalen; n++) {
                if ((this.commaList[n] != null) && (this.sp.contains(this.commaList[n]))) {
                    this.sp.removeChild(this.commaList[n]);
                }
            }
        }
        this.precommalen = commalen;
        var key;
        var countComma = 0; //间隔符计数器
        //整数部分构造
        for (var i = 0; i < strInter.length; i++) {
            key = parseInt(strInter.substr(i, 1));
            if (this.isComma) {
                if (((strInter.length - i) % 3 == 0) && (i != 0)) {
                    if (this.commaList[countComma] == null) {
                        this.commaList[countComma] = new this.comma();
                    }
                    if (!this.sp.contains(this.commaList[countComma])) {
                        this.sp.addChild(this.commaList[countComma]);
                    }
                    this.commaList[countComma].x = this.numWidth * i + countComma * this.commaWidth;
                    this.commaList[countComma].y = this.sepHeight;
                    countComma++;
                }
            }
            if (key != null) {
                if (this.list[i] == null) {
                    this.list[i] = new egret.MovieClip(this.cls);
                }
                if (!this.sp.contains(this.list[i])) {
                    this.sp.addChild(this.list[i]);
                }
                this.list[i].x = this.numWidth * i + countComma * this.commaWidth;
                this.list[i].gotoAndStop(key + 1);
            }
        }
        //小数部分构造
        if (strDecim != null && strDecim != "") {
            if (this.decimList[0] == null) {
                this.decimList[0] = new this.decim();
            }
            if (!this.sp.contains(this.decimList[0])) {
                this.sp.addChild(this.decimList[0]);
            }
            this.decimList[0].x = this.numWidth * i + this.commaWidth * commalen;
            this.decimList[0].y = this.sepHeight;
            for (var j = i; j < i + strDecim.length; j++) {
                key = parseInt(strDecim.substr(j - i, 1));
                if (key != null) {
                    if (this.list[j] == null) {
                        this.list[j] = new egret.MovieClip(this.cls);
                    }
                    if (!this.sp.contains(this.list[j])) {
                        this.sp.addChild(this.list[j]);
                    }
                    this.list[j].x = this.numWidth * j + this.commaWidth * (commalen + 1);
                    this.list[j].gotoAndStop(key + 1);
                }
            }
        }
        //居中处理
        if (this.isCenter) {
            this.sp.x = -((len * this.numWidth + commalen * this.commaWidth) / 2);
        }
    };
    return NumberBar;
}(egret.DisplayObjectContainer));
egret.registerClass(NumberBar,'NumberBar');
//# sourceMappingURL=NumberBar.js.map