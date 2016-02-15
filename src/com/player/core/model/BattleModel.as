package com.player.core.model
{
	import com.player.core.data.model.sprite.ISpriteModel;

	/**
	 * 战斗脚本
	 */
	public class BattleModel extends BaseModel
	{
		/**
		 * 发生时间
		 */
		public var time:Number=0;
		/**
		 * 发起者
		 */
		public var source:ISpriteModel;
		/**
		 * 目标
		 */
		public var target:ISpriteModel
		/**
		 * 命令
		 */
		public var action:Array;
		/**
		 * 伤害
		 */
		public var hurtNumber:Number=0;

		public function BattleModel()
		{
			super();
//			target=new ISpriteModel
			clearn();
		}

		public function clearn():void
		{
			/*while (target.length > 0)
			{
				target.pop();
			}*/
			source=null;
			action=[];
			hurtNumber=0;
		}
	}
}
