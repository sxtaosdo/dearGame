package com.player.core.data
{
	public class GameStateDef
	{
		/**
		 * 游戏正在初始化
		 */
		public static var STATE_GAME_INIT:String="stateGameInit";
		/**
		 * 游戏正在载入中
		 */
		public static var STATE_GAME_LOADING:String="stateGameLoading";
		/**
		 * 游戏正常运行
		 */
		public static var STATE_GAME_RUN:String="stateGameRun";
		/**
		 * 游戏暂停
		 */
		public static var STATE_GAME_PAUSE:String="stateGameRun";
		
		public function GameStateDef()
		{
		}
	}
}