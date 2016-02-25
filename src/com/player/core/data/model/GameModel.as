package com.player.core.data.model
{
	import com.player.core.event.BaseEvent;
	import com.player.core.event.GameDispatcher;

	/**
	 * 数据存放
	 */
	public class GameModel
	{
		private static var _instance:GameModel;
		private var _state:String;
		
		public function GameModel(key:Key)
		{
		}

		public function get state():String
		{
			return _state;
		}

		public static function get instance():GameModel
		{
			if(_instance==null){
				_instance=new GameModel(new Key());
			}
			return _instance;
		}
		
		/**
		 * 解析浏览器参数
		 * @param url
		 */
		public function readParams(url:String):void{
			
		}
		
		/**
		 * 更改当前的游戏状态
		 */
		public function setGameState(state:String):void{
			GameDispatcher.send(BaseEvent.GAME_STATE_EVENT);
		}

	}
}

class Key{}