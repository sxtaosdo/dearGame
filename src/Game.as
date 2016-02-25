package
{
	import com.player.core.data.ConfigManager;
	import com.player.core.data.model.GameModel;
	import com.player.core.event.GameDispatcher;
	import com.player.module.LoadeView;
	
	import flash.display.Sprite;
	import flash.system.Security;
	
	public class Game extends Sprite
	{
		public function Game()
		{
			Security.allowDomain("*");
			startup();
		}
		
		private function startup():void
		{
			GameDispatcher.instance;//初始化
			GameModel.instance.readParams("");//去游戏的参数
			ConfigManager.instance.loadConfig();//加载配置文件
			LoadeView.instance.loade("com/player/module/MainView.swf",gameStart);
		}
		
		private function gameStart(value:*=null):void
		{
			
		}
	}
}