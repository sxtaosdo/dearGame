package view
{	
	import com.greensock.TweenLite;
	
	import event.PopEvent;
	
	import flash.display.Sprite;
	import flash.events.Event;
	import flash.text.TextField;
	import flash.text.TextFormat;
	import flash.text.TextFormatAlign;
	import flash.utils.setTimeout;

	public class PreView extends Sprite
	{
		private var levelTf:TextField;
		private var targetTf:TextField;
		
		private static var startX:Number=768;
		private static var middleX:Number=174;
		private static var endX:Number=-420;
		
		public function PreView()
		{
			var levelFt:TextFormat=new TextFormat();
			levelFt.size=50;
			levelFt.bold=true;
			levelFt.color=0xFFFFFF;
			levelFt.align=TextFormatAlign.CENTER;
			
			levelTf=new TextField();
			levelTf.width=420;
			levelTf.height=62;
			levelTf.defaultTextFormat=levelFt;
			levelTf.y=364;
			levelTf.text="关卡";
			this.addChild(levelTf);
			
			var targetFt:TextFormat=new TextFormat();
			targetFt.size=45;
			targetFt.bold=true;
			targetFt.color=0xFFFFFF;
			targetFt.align=TextFormatAlign.CENTER;
			
			targetTf=new TextField();
			targetTf.width=420;
			targetTf.height=62;
			targetTf.defaultTextFormat=levelFt;
			targetTf.y=466;
			targetTf.text="目标";
			this.addChild(targetTf);
		}
		
		public function showView(level:int,score:int):void
		{	
			levelTf.text ="关卡:"+String(level);
			levelTf.x=startX;
			targetTf.text="目标:"+String(score);
			targetTf.x=startX;
			
			TweenLite.to(levelTf,0.3,{x:middleX});
			setTimeout(targetStartMove,300);
		}
		
		private function targetStartMove():void
		{
			TweenLite.to(targetTf,0.3,{x:middleX,onComplete:middleComplete});
		}
		
		private function middleComplete():void
		{
			TweenLite.killTweensOf(levelTf);
			TweenLite.killTweensOf(targetTf);
			
			setTimeout(endMove,1000);
		}
		
		private function endMove():void
		{
			TweenLite.to(levelTf,0.3,{x:endX});
			setTimeout(targetEndMove,300);
		}
		
		private function targetEndMove():void
		{
			TweenLite.to(targetTf,0.3,{x:endX,onComplete:endComplete});
		}
		
		private function endComplete():void
		{
			TweenLite.killTweensOf(levelTf);
			TweenLite.killTweensOf(targetTf);
			this.dispatchEvent(new Event(PopEvent.PREVIEW_END));
		}
	}
}