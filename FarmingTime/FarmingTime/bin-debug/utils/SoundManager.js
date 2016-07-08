/**
 *
 * @author anj
 */
var SoundManager = (function () {
    function SoundManager() {
        //当前音量
        this.vol = 1;
        //当前播放音乐列表
        this.soundChannelList = [];
    }
    var d = __define,c=SoundManager,p=c.prototype;
    d(SoundManager, "instance"
        ,function () {
            if (this._instance == null) {
                this._instance = new SoundManager();
            }
            return this._instance;
        }
    );
    /**
     * 设置静音
     * @param isTrue
     */
    p.setMute = function (isTrue) {
        if (isTrue) {
            this.vol = 0;
        }
        else {
            this.vol = 1;
        }
        for (var i = 0; i < this.soundChannelList.length; i++) {
            if (this.soundChannelList[i] == null || this.soundChannelList[i].soundChannel == null || this.soundChannelList[i].soundChannel["isStopped"]) {
                this.soundChannelList.splice(i, 1);
                i--;
                continue;
            }
            this.soundChannelList[i].soundChannel.volume = this.vol;
        }
    };
    /**
     * 播放音乐
     * @param musicName
     * @param repeatTimes
     */
    p.play = function (musicName, repeatTimes) {
        if (repeatTimes === void 0) { repeatTimes = 1; }
        var soundChannel;
        for (var i = 0; i < this.soundChannelList.length; i++) {
            if (this.soundChannelList[i] == null || this.soundChannelList[i].soundChannel == null || this.soundChannelList[i].soundChannel["isStopped"]) {
                this.soundChannelList.splice(i, 1);
                i--;
                continue;
            }
            if (this.soundChannelList[i].name == musicName) {
                soundChannel = this.soundChannelList[i].soundChannel;
            }
        }
        if (soundChannel == null) {
            var sound = RES.getRes(musicName);
            soundChannel = sound.play(0, repeatTimes);
            var vo = new SoundChannelVo();
            vo.soundChannel = soundChannel;
            vo.name = musicName;
            this.soundChannelList.push(vo);
        }
        else {
            soundChannel.position = 0;
        }
        soundChannel.volume = this.vol;
    };
    p.clearAllSound = function () {
        while (this.soundChannelList.length > 0) {
            if (this.soundChannelList[0] == null || this.soundChannelList[0].soundChannel == null || this.soundChannelList[0].soundChannel["isStopped"]) {
                this.soundChannelList.splice(0, 1);
            }
            else {
                this.soundChannelList[0].soundChannel.stop();
                this.soundChannelList.splice(0, 1);
            }
        }
        this.soundChannelList = [];
    };
    return SoundManager;
}());
egret.registerClass(SoundManager,'SoundManager');
var SoundChannelVo = (function () {
    function SoundChannelVo() {
    }
    var d = __define,c=SoundChannelVo,p=c.prototype;
    return SoundChannelVo;
}());
egret.registerClass(SoundChannelVo,'SoundChannelVo');
//# sourceMappingURL=SoundManager.js.map