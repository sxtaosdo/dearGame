package com.player.core.data.vo
{
	/**
	 * 玩家
	 * @author shixt
	 */
	public class UserVo extends BaseVo
	{
		/**
		 英雄
		 */
		public var hero:Array;
		/**
		 金币
		 */
		public var money:Number;
		/**
		 激活人物
		 */
		public var lastUse:uint;
		/**
		 值1
		 */
		public var value1:Number;
		/**
		 值2
		 */
		public var value2:Number;
		/**
		 密码
		 */
		public var password:String;
		
		public function UserVo()
		{
			super();
		}
	}
}