package com.player.core.data.vo
{
	/**
	 * 场景
	 */
	public class SceneVo extends BaseVo
	{
		/**
		 类型
		 */
		public var type:String;
		/**
		 爆率
		 */
		public var drop:uint;
		/**
		 怪物变异几率
		 */
		public var variation:uint;
		/**
		 怪物
		 */
		public var monster:Array;
		/**
		 怪物数量
		 */
		public var monsterNum:Number;
		/**
		 入口
		 */
		public var entrance:Array;
		/**
		 出口
		 */
		public var exit:Array;
		
		public function SceneVo()
		{
			super();
		}
	}
}