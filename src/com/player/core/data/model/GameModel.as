package com.player.core.data.model
{
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

	}
}

class Key{}