var StringUtils = (function () {
    function StringUtils() {
    }
    var d = __define,c=StringUtils,p=c.prototype;
    /**
     * 截取字符，中文算2格，英文算1格
     * @param   str
     * @param   length
     * @return
     */
    StringUtils.cutStr = function (str, length) {
        if (str === void 0) { str = ""; }
        if (length === void 0) { length = 6; }
        var res = "";
        var i = 0;
        var n = 0;
        var str_length = 0;
        while (i < str.length && n < length * 2) {
            if (str.charCodeAt(i) > 192) {
                n = n + 2;
            }
            else {
                n++;
            }
            res += str.charAt(i);
            i++;
        }
        if (res.length < str.length) {
            res += "...";
        }
        return res;
    };
    /**
     * 三位分节法   1,000
     * @param value
     * @return
     * Edit by aj
     */
    StringUtils.numSection = function (value) {
        if (value === void 0) { value = 0; }
        var numStr = value.toString(); //金额转换为字符格式
        var newStr = ""; //金额转换为加分隔符的字符格式
        for (var i = 0; i < numStr.length; i++) {
            if (((numStr.length - i) % 3 == 0) && i != 0) {
                newStr = newStr + ",";
            }
            newStr = newStr + numStr.charAt(i);
        }
        return newStr;
    };
    /**
     * 数字转换显示：13034555600 =》30亿3455万<br/>
     * 规则4：有亿则不显示个位数，   例：13034555600   规则：130亿3455万<br/>
     * 无亿则显示万和个位数，  例：1303455  规则：130万3455
     */
    StringUtils.getStrByUnits = function (money) {
        if (money <= 0)
            return "0";
        var yi = Math.floor(money / 100000000);
        var wan = Math.floor((money % 100000000) / 10000);
        var ge = Math.floor(money % 10000);
        var backStr = "";
        if (yi != 0)
            backStr = backStr + yi + "亿";
        if (wan != 0)
            backStr = backStr + wan + "万";
        if (yi == 0 && ge != 0)
            backStr = backStr + ge;
        return backStr;
    };
    return StringUtils;
}());
egret.registerClass(StringUtils,'StringUtils');
//# sourceMappingURL=StringUtils.js.map