/**
 *
 * @author sxt
 *
 */
var ButtonUtils = (function () {
    function ButtonUtils() {
    }
    var d = __define,c=ButtonUtils,p=c.prototype;
    /**
     * 模拟点击
     */
    ButtonUtils.simulateClick = function (btn) {
        if ((btn != null)) {
            btn.currentState = "down";
            TimerManager.instance.doOnce(100, function (btn, state) { btn.currentState = state; }, [btn, "up"], true);
        }
    };
    return ButtonUtils;
}());
egret.registerClass(ButtonUtils,'ButtonUtils');
