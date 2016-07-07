
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/tween/tween.js",
	"libs/modules/res/res.js",
	"libs/modules/eui/eui.js",
	"libs/modules/socket/socket.js",
	"libs/mouse/mouse.min.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/data/ConfigModel.js",
	"bin-debug/data/GameModel.js",
	"bin-debug/data/UserModel.js",
	"bin-debug/data/vo/EarthVo.js",
	"bin-debug/data/vo/ItemVo.js",
	"bin-debug/data/vo/PackVo.js",
	"bin-debug/data/vo/SeedVo.js",
	"bin-debug/event/BaseEvent.js",
	"bin-debug/event/GameDispatcher.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/Main.js",
	"bin-debug/ThemeAdapter.js",
	"bin-debug/ui/earth/EarthItemRenderer.js",
	"bin-debug/ui/earth/EarthManager.js",
	"bin-debug/ui/earth/EarthView.js",
	"bin-debug/ui/earth/FarmlandItemRenderer.js",
	"bin-debug/ui/Ipanel.js",
	"bin-debug/ui/MainView.js",
	"bin-debug/ui/pack/PackItemRenderer.js",
	"bin-debug/ui/pack/PackView.js",
	"bin-debug/utils/BitMapUtil.js",
	"bin-debug/utils/ButtonUtils.js",
	"bin-debug/utils/CustomTimer.js",
	"bin-debug/utils/NumberBar.js",
	"bin-debug/utils/PcHelper.js",
	"bin-debug/utils/SoundManager.js",
	"bin-debug/utils/StringUtils.js",
	"bin-debug/utils/TimerManager.js",
	"bin-debug/utils/TipManager.js",
	//----auto game_file_list end----
];

var window = this;

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 680,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:12,textColor:0xffffff,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};