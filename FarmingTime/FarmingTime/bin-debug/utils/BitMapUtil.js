/**
 *
 * @author
 *sxt
 */
var BitMapUtil = (function () {
    function BitMapUtil() {
    }
    var d = __define,c=BitMapUtil,p=c.prototype;
    /**
    * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
    * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
    */
    BitMapUtil.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    return BitMapUtil;
}());
egret.registerClass(BitMapUtil,'BitMapUtil');
//# sourceMappingURL=BitMapUtil.js.map