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
		
		public function GameModel()
		{
		}

		public static function get instance():GameModel
		{
			if(_instance==null){
				_instance=new GameModel(new Key());
			}
			return _instance;
		}
		
		public function setGameState(state:String):void{
			GameDispatcher.send(BaseEvent.GAME_STATE_EVENT);
		}

	}
}

class Key{}