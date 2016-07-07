/**
 * 
 * @author anj
 */
class SoundManager {

    private static _instance: SoundManager;
    //当前音量
    private vol:number=1;
    //当前播放音乐列表
    private soundChannelList:Array<SoundChannelVo>=[];

    public constructor() {
        
    }

    public static get instance(): SoundManager {
        if(this._instance == null) {
            this._instance = new SoundManager();
        }
        return this._instance;
    }
    
    /**
     * 设置静音
     * @param isTrue
     */
    public setMute(isTrue:boolean):void{
        if(isTrue){
            this.vol=0;
        }
        else{
            this.vol=1;
        }
        for(var i:number=0;i<this.soundChannelList.length;i++){
            if(this.soundChannelList[i] == null || this.soundChannelList[i].soundChannel==null||this.soundChannelList[i].soundChannel["isStopped"]){
                this.soundChannelList.splice(i,1);
                i--;
                continue;
            }
            this.soundChannelList[i].soundChannel.volume=this.vol;
        }
    }
    
    /**
     * 播放音乐
     * @param musicName
     * @param repeatTimes
     */
    public play(musicName:string,repeatTimes:number=1):void{
        var soundChannel:egret.SoundChannel;
        for(var i: number = 0;i < this.soundChannelList.length;i++) {
            if(this.soundChannelList[i] == null || this.soundChannelList[i].soundChannel == null || this.soundChannelList[i].soundChannel["isStopped"]) {
                this.soundChannelList.splice(i,1);
                i--;
                continue;
            }
            if(this.soundChannelList[i].name==musicName){
                soundChannel=this.soundChannelList[i].soundChannel;
            }
        }
        if(soundChannel==null){
            var sound: egret.Sound = RES.getRes(musicName);
            soundChannel = sound.play(0,repeatTimes);
            var vo:SoundChannelVo=new SoundChannelVo();
            vo.soundChannel=soundChannel;
            vo.name=musicName;
            this.soundChannelList.push(vo);
        }
        else{
            soundChannel.position=0;
        }
        soundChannel.volume = this.vol;      
    }
    
    public clearAllSound():void{
        while(this.soundChannelList.length>0) {
            if(this.soundChannelList[0] == null || this.soundChannelList[0].soundChannel == null || this.soundChannelList[0].soundChannel["isStopped"]) {
                this.soundChannelList.splice(0,1);
            }
            else{
                this.soundChannelList[0].soundChannel.stop();
                this.soundChannelList.splice(0,1);
            }          
        }
        this.soundChannelList=[];
    }
}

class SoundChannelVo {
    public soundChannel: egret.SoundChannel;
    public name: string;
}
