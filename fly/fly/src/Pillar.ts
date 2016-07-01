/**
 *
 * @author 
 *
 */
class Pillar extends BackGround{
    
	public constructor(name:string,isRoolScreen=false) {
    	super(name,isRoolScreen);
    	this.randomPosition();
	}
	
	private randomPosition():void{
    	for(var i:number=0;i<this.bpGroup.length;i++){
    	    this.bpGroup[i].anchorOffsetX=this.bpGroup[i].width/2;
    	    this.bpGroup[i].x=480;
    	}
    	this.bpGroup[0].y = Math.random() * 500 + 50;
      if(this.bpGroup[0].y<400){
          this.bpGroup[1].y = -9999;
      }
      else{
          this.bpGroup[1].y=Math.random()*(700-this.bpGroup[0].y-10)+10;
      }     
	}
}
