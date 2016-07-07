var TimerManager = (function () {
    function TimerManager() {
        this._shape = new egret.Shape();
        this._pool = new Array();
        this._handlers = new Object();
        this._currTimer = egret.getTimer();
        this._currFrame = 0;
        this._count = 0;
        this._index = 0;
        this._shape.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    }
    var d = __define,c=TimerManager,p=c.prototype;
    p.onEnterFrame = function (e) {
        this._currFrame++;
        this._currTimer = egret.getTimer();
        var k;
        for (k in this._handlers) {
            if (k != "undefined") {
                var handler = this._handlers[k];
                var t = handler.userFrame ? this._currFrame : this._currTimer;
                if (t >= handler.exeTime) {
                    var method = handler.method;
                    var args = handler.args;
                    if (handler.repeat) {
                        while (t >= handler.exeTime && k in this._handlers) {
                            handler.exeTime += handler.delay;
                            method.apply(null, args);
                        }
                    }
                    else {
                        this.clearTimer(k);
                        method.apply(null, args);
                    }
                }
            }
            else {
                //                egret.Logger.info(k);
                console.log(k);
            }
        }
    };
    p.create = function (useFrame, repeat, delay, method, args, cover) {
        if (args === void 0) { args = null; }
        if (cover === void 0) { cover = true; }
        var key;
        if (cover) {
            //先删除相同函数的计时
            this.clearTimer(method);
            key = method;
        }
        else {
            key = this._index++;
        }
        //如果执行时间小于1，直接执行
        if (delay < 1) {
            method.apply(null, args);
            return -1;
        }
        var handler = this._pool.length > 0 ? this._pool.pop() : new TimerHandler();
        handler.userFrame = useFrame;
        handler.repeat = repeat;
        handler.delay = delay;
        handler.method = method;
        handler.args = args;
        handler.exeTime = delay + (useFrame ? this._currFrame : this._currTimer);
        this._handlers[key] = handler;
        this._count++;
        return key;
    };
    /**定时执行一次
     * @param	delay  延迟时间(单位毫秒)
     * @param	method 结束时的回调方法
     * @param	args   回调参数
     * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
     * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
    p.doOnce = function (delay, method, args, cover) {
        if (args === void 0) { args = null; }
        if (cover === void 0) { cover = true; }
        return this.create(false, false, delay, method, args, cover);
    };
    /**定时重复执行
     * @param	delay  延迟时间(单位毫秒)
     * @param	method 结束时的回调方法
     * @param	args   回调参数
     * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
     * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
    p.doLoop = function (delay, method, args, cover) {
        if (args === void 0) { args = null; }
        if (cover === void 0) { cover = true; }
        return this.create(false, true, delay, method, args, cover);
    };
    /**定时执行一次(基于帧率)
     * @param	delay  延迟时间(单位为帧)
     * @param	method 结束时的回调方法
     * @param	args   回调参数
     * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
     * @return  cover=true时返回回调函数本身，cover=false时，返回唯一ID，均用来作为clearTimer的参数*/
    p.doFrameOnce = function (delay, method, args, cover) {
        if (args === void 0) { args = null; }
        if (cover === void 0) { cover = true; }
        return this.create(true, false, delay, method, args, cover);
    };
    /**定时重复执行(基于帧率)
     * @param	delay  延迟时间(单位为帧)
     * @param	method 结束时的回调方法
     * @param	args   回调参数
     * @param	cover  是否覆盖(true:同方法多次计时，后者覆盖前者。false:同方法多次计时，不相互覆盖)
     * @return  cover=true时返回回调函数本身，否则返回唯一ID，均用来作为clearTimer的参数*/
    p.doFrameLoop = function (delay, method, args, cover) {
        if (args === void 0) { args = null; }
        if (cover === void 0) { cover = true; }
        return this.create(true, true, delay, method, args, cover);
    };
    d(p, "count"
        /**定时器执行数量*/
        ,function () {
            return this._count;
        }
    );
    /**清理定时器
     * @param	method 创建时的cover=true时method为回调函数本身，否则method为返回的唯一ID
     */
    p.clearTimer = function (method) {
        var handler = this._handlers[method];
        if (handler != null) {
            delete this._handlers[method];
            handler.clear();
            this._pool.push(handler);
            this._count--;
        }
    };
    p.destroy = function () {
        this._shape.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame, this);
    };
    /**
     * 方法是否在定时器的队列中
     */
    p.running = function (method) {
        if (this._handlers[method] != null) {
            return true;
        }
        return false;
    };
    /**
     * 通过方法名删除定时器
     * @param fun
     */
    p.clearTimerByFun = function (fun) {
        this.clearTimer(fun);
        //			for each (var item:TimerHandler in _handlers)
        //			{
        //				if (item.method == fun)
        //				{
        //					delete _handlers[item.method];
        //					item.clear();
        //					_pool.push(item);
        //					_count--;
        //					return;
        //				}
        //			}
    };
    d(TimerManager, "instance"
        ,function () {
            if (TimerManager._instance == null) {
                TimerManager._instance = new TimerManager();
            }
            return TimerManager._instance;
        }
    );
    return TimerManager;
}());
egret.registerClass(TimerManager,'TimerManager');
var TimerHandler = (function () {
    function TimerHandler() {
        /**执行间隔*/
        this.delay = 0;
        /**执行时间*/
        this.exeTime = 0;
    }
    var d = __define,c=TimerHandler,p=c.prototype;
    /**清理*/
    p.clear = function () {
        this.method = null;
        this.args = null;
    };
    return TimerHandler;
}());
egret.registerClass(TimerHandler,'TimerHandler');
//# sourceMappingURL=TimerManager.js.map