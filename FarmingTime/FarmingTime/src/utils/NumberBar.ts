class NumberBar extends egret.DisplayObjectContainer {
    private cls: egret.MovieClipData; //数字类
    private sp: egret.DisplayObjectContainer; //数值容器

    private centerPoint: number = 0;
    private isCenter: boolean; //是否居中
    private list: Array<any>; //数字数组
    private numWidth: number = 0; //数字长度
    private sepHeight: number = 0 //分隔符高度

    private comma: any; //间隔符类
    private isComma: boolean; //是否支持分隔符
    private commaList: Array<any>; //间隔符数组
    private commaWidth: number = 0; //间隔符长度

    private decim: any; //小数类
    private isDecimal: boolean; //是否支持小数
    private decimList: Array<any>; //小数点数组
    private retention: number = 0; //保留小数位

    private tempNum: number; //上一数值
    private prelen: number = 0; //上一数值的数字个数
    private precommalen: number = 0; //上一数值的分隔符个数
    private strNum: string;

    public constructor(mc: any = null) {
        super();
        if(mc == null) {
            return;
        }
        this.setParams(mc);
    }

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
    public setParams(mc: any,numWidth: number = 0,sepHeight: number = 0,isCenter: boolean = false,comma: any = null,decim: any = null,retention: number = 0): void {
        this.cls = mc;
        this.isCenter = isCenter;

        if(numWidth != 0) {
            this.numWidth = numWidth;
        }
        else {
            this.numWidth = (new mc).width;
        }
        if(sepHeight != 0) {
            this.sepHeight = sepHeight;
        }
        else {
            this.sepHeight = (new mc).height;
        }
        this.commaWidth = numWidth / 2;

        if(comma == null) {
            this.isComma = false;
        }
        else {
            this.isComma = true;
            this.comma = comma;
        }

        if(decim == null || retention == 0) {
            this.isDecimal = false;
        }
        else {
            this.isDecimal = true;
            this.decim = decim;
            this.retention = retention;
        }

        this.initUI();
    }

    private initUI(): void {
        this.list = [];
        this.commaList = [];
        this.decimList = [];

        if(this.isDecimal) {
            this.decimList[0] = new this.decim();
        }

        this.sp = new egret.DisplayObjectContainer();
        this.addChild(this.sp);
    }

    public getNum(): number {
        return <number><any> (this.strNum);
    }


    public setNum(num: number): void {
        var strInter: string; //新数值的整数部分
        var strDecim: string; //新数值的小数部分
        //将数值依据设置参数拆分为整数部分及小数部分，并重新获得数值
        this.strNum = num.toString();
        if(this.isDecimal == true && this.strNum.indexOf(".") >= 0) {
            strInter = this.strNum.substring(0,this.strNum.indexOf("."));
            strDecim = this.strNum.substr(this.strNum.indexOf(".") + 1,this.retention);
            num = <number><any> (strInter + "." + strDecim);
        }
        else {
            var temp: string;
            if(this.strNum.indexOf(".") >= 0) {
                strInter = this.strNum.substring(0,this.strNum.indexOf("."));
            }
            else {
                strInter = this.strNum;
            }

            strDecim = "";
            num = <number><any> strInter;
        }
			
        //如果数值与原来相等则直接返回，不必更新
        if(num == this.tempNum) {
            return;
        }
        this.tempNum = num;

        var len: number = strInter.length + strDecim.length;
        var commalen: number = 0;
        if(this.isComma) {
            commalen = (strInter.length - 1) / 3;
        }
        else {
            commalen = 0;
        }
			
        //如果原数组长度大于现有数组长度，则移除多余元素
        if(this.prelen > len) {
            for(var m: number = len;m < this.prelen;m++) {
                if(this.sp.contains(this.list[m])) {
                    this.sp.removeChild(this.list[m]);
                }
            }
        }
        this.prelen = len;
			
        //如果原小数点数组长度大于现有数组长度，则移除多余元素
        if(this.isDecimal && this.sp.contains(this.decimList[0]) && strDecim == "") {
            this.sp.removeChild(this.decimList[0]);
        }
			
        //如果原分隔符数组长度大于现有分隔符数组长度，则移除多余元素
        if(this.precommalen > commalen) {
            for(var n: number = commalen;n < this.precommalen;n++) {
                if((this.commaList[n] != null) && (this.sp.contains(this.commaList[n]))) {
                    this.sp.removeChild(this.commaList[n]);
                }
            }
        }
        this.precommalen = commalen;

        var key: any;
        var countComma: number = 0; //间隔符计数器
        //整数部分构造
        for(var i: number = 0;i < strInter.length;i++) {
            key = parseInt(strInter.substr(i,1));
            if(this.isComma) {
                if(((strInter.length - i) % 3 == 0) && (i != 0)) {
                    if(this.commaList[countComma] == null) {
                        this.commaList[countComma] = new this.comma();
                    }
                    if(!this.sp.contains(this.commaList[countComma])) {
                        this.sp.addChild(this.commaList[countComma]);
                    }

                    this.commaList[countComma].x = this.numWidth * i + countComma * this.commaWidth;
                    this.commaList[countComma].y = this.sepHeight;
                    countComma++;
                }
            }
            if(key != null) {
                if(this.list[i] == null) {
                    this.list[i] = new egret.MovieClip(this.cls);
                }

                if(!this.sp.contains(this.list[i])) {
                    this.sp.addChild(this.list[i]);
                }
                this.list[i].x = this.numWidth * i + countComma * this.commaWidth;
                this.list[i].gotoAndStop(key + 1);
            }
        }
        //小数部分构造
        if(strDecim != null && strDecim != "") {
            if(this.decimList[0] == null) {
                this.decimList[0] = new this.decim();
            }
            if(!this.sp.contains(this.decimList[0])) {
                this.sp.addChild(this.decimList[0]);
            }
            this.decimList[0].x = this.numWidth * i + this.commaWidth * commalen;
            this.decimList[0].y = this.sepHeight;

            for(var j: number = i;j < i + strDecim.length;j++) {
                key = parseInt(strDecim.substr(j - i,1));
                if(key != null) {
                    if(this.list[j] == null) {
                        this.list[j] = new egret.MovieClip(this.cls);
                    }

                    if(!this.sp.contains(this.list[j])) {
                        this.sp.addChild(this.list[j]);
                    }
                    this.list[j].x = this.numWidth * j + this.commaWidth * (commalen + 1);
                    this.list[j].gotoAndStop(key + 1);
                }
            }
        }
			
        //居中处理
        if(this.isCenter) {
            this.sp.x = -((len * this.numWidth + commalen * this.commaWidth) / 2);
        }
    }

    public setStr(strNum: string): void {
        var strInter: string; //新数值的整数部分
        var strDecim: string; //新数值的小数部分
        var num: number;
        //将数值依据设置参数拆分为整数部分及小数部分，并重新获得数值
        //			strNum=String(num);
        if(this.isDecimal == true && strNum.indexOf(".") >= 0) {
            strInter = strNum.substring(0,strNum.indexOf("."));
            strDecim = strNum.substr(strNum.indexOf(".") + 1,this.retention);
            num = <number><any> (strInter + "." + strDecim);
        }
        else {
            if(strNum.indexOf(".") >= 0) {
                strInter = strNum.substring(0,strNum.indexOf("."));
            }
            else {
                strInter = strNum;
            }

            strDecim = "";
            num = <number><any> strInter;
        }

        //如果数值与原来相等则直接返回，不必更新
        if(num == this.tempNum) {
            return;
        }
        this.tempNum = num;

        var len: number = strInter.length + strDecim.length;
        var commalen: number = 0;
        if(this.isComma) {
            commalen = (strInter.length - 1) / 3;
        }
        else {
            commalen = 0;
        }

        //如果原数组长度大于现有数组长度，则移除多余元素
        if(this.prelen > len) {
            for(var m: number = len;m < this.prelen;m++) {
                if(this.sp.contains(this.list[m])) {
                    this.sp.removeChild(this.list[m]);
                }
            }
        }
        this.prelen = len;

        //如果原小数点数组长度大于现有数组长度，则移除多余元素
        if(this.isDecimal && this.sp.contains(this.decimList[0]) && strDecim == "") {
            this.sp.removeChild(this.decimList[0]);
        }

        //如果原分隔符数组长度大于现有分隔符数组长度，则移除多余元素
        if(this.precommalen > commalen) {
            for(var n: number = commalen;n < this.precommalen;n++) {
                if((this.commaList[n] != null) && (this.sp.contains(this.commaList[n]))) {
                    this.sp.removeChild(this.commaList[n]);
                }
            }
        }
        this.precommalen = commalen;

        var key: any;
        var countComma: number = 0; //间隔符计数器
        //整数部分构造
        for(var i: number = 0;i < strInter.length;i++) {
            key = parseInt(strInter.substr(i,1));
            if(this.isComma) {
                if(((strInter.length - i) % 3 == 0) && (i != 0)) {
                    if(this.commaList[countComma] == null) {
                        this.commaList[countComma] = new this.comma();
                    }
                    if(!this.sp.contains(this.commaList[countComma])) {
                        this.sp.addChild(this.commaList[countComma]);
                    }

                    this.commaList[countComma].x = this.numWidth * i + countComma * this.commaWidth;
                    this.commaList[countComma].y = this.sepHeight;
                    countComma++;
                }
            }
            if(key != null) {
                if(this.list[i] == null) {
                    this.list[i] = new egret.MovieClip(this.cls);
                }

                if(!this.sp.contains(this.list[i])) {
                    this.sp.addChild(this.list[i]);
                }
                this.list[i].x = this.numWidth * i + countComma * this.commaWidth;
                this.list[i].gotoAndStop(key + 1);
            }
        }
        //小数部分构造
        if(strDecim != null && strDecim != "") {
            if(this.decimList[0] == null) {
                this.decimList[0] = new this.decim();
            }
            if(!this.sp.contains(this.decimList[0])) {
                this.sp.addChild(this.decimList[0]);
            }
            this.decimList[0].x = this.numWidth * i + this.commaWidth * commalen;
            this.decimList[0].y = this.sepHeight;

            for(var j: number = i;j < i + strDecim.length;j++) {
                key = parseInt(strDecim.substr(j - i,1));
                if(key != null) {
                    if(this.list[j] == null) {
                        this.list[j] = new egret.MovieClip(this.cls);
                    }

                    if(!this.sp.contains(this.list[j])) {
                        this.sp.addChild(this.list[j]);
                    }
                    this.list[j].x = this.numWidth * j + this.commaWidth * (commalen + 1);
                    this.list[j].gotoAndStop(key + 1);
                }
            }
        }

        //居中处理
        if(this.isCenter) {
            this.sp.x = -((len * this.numWidth + commalen * this.commaWidth) / 2);
        }
    }

}