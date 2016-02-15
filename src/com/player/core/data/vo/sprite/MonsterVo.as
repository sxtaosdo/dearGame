package com.player.core.data.vo.sprite
{

	public class MonsterVo extends SpriteVo
	{
		/**
		 血
		 */
		public var hp:uint;
		/**
		 蓝
		 */
		public var mp:uint;
		/**
		 等级
		 */
		public var level:uint;
		/**
		 技能
		 */
		public var skill:Array;
		/**
		 状态
		 */
		public var buff:uint;
		/**
		 主动
		 */
		public var active:Boolean;
		/**
		 智商
		 */
		public var ai:int;
		/**
		 * 职业
		 */
		public var vocationa:int;

		public function MonsterVo()
		{
			super();
		}

		/**
		 * 后缀称号id
		 */
		public function get title_secend_id():int
		{
//			return _title_secend_id;
			return 0;
		}

		/**
		 * @private
		 */
		public function set title_secend_id(value:int):void
		{
//			_title_secend_id=value;
		}

		/**
		 * 前缀称号id
		 */
		public function get title_first_id():int
		{
//			return _title_first_id;
			return 0;
		}

		/**
		 * @private
		 */
		public function set title_first_id(value:int):void
		{
//			_title_first_id=value;
		}

	}
}
