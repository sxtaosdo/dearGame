var GameDispatcher = (function (_super) {
    __extends(GameDispatcher, _super);
    function GameDispatcher() {
        _super.call(this, null);
    }
    var d = __define,c=GameDispatcher,p=c.prototype;
    d(GameDispatcher, "instance"
        ,function () {
            if (GameDispatcher._instance == null) {
                GameDispatcher._instance = new GameDispatcher();
            }
            return GameDispatcher._instance;
        }
    );
    GameDispatcher.send = function (event) {
        if (event instanceof egret.Event) {
            GameDispatcher.instance.dispatchEvent(event);
        }
        else {
            if (GameDispatcher.evtMap[event] == null) {
                GameDispatcher.evtMap[event] = new egret.Event(event);
            }
            GameDispatcher.instance.dispatchEvent(GameDispatcher.evtMap[event]);
        }
    };
    GameDispatcher.addEventListener = function (type, callback, self) {
        GameDispatcher.instance.addEventListener(type, callback, self);
    };
    GameDispatcher.evtMap = new Object(); //对象池
    return GameDispatcher;
}(egret.EventDispatcher));
egret.registerClass(GameDispatcher,'GameDispatcher');
