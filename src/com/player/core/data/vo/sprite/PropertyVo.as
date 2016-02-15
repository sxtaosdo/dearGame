package com.player.core.data.vo.sprite
{
	import com.player.core.data.vo.BaseVo;
	
	/**
	 * 属性
	 */
	public class PropertyVo extends BaseVo
	{
		/**
		 血
		 */
		public var _hp:Number=0;
		/**
		 蓝
		 */
		public var _mp:Number=0;
		/**
		 等级
		 */
		public var _level:Number=0;
		/**
		 力量
		 */
		public var _str:Number=0;
		/**
		 敏捷
		 */
		public var _agi:Number=0;
		/**
		 智力
		 */
		public var _intl:Number=0;
		/**
		 精神
		 */
		public var _spirit:Number=0;
		/**
		 幸运
		 */
		public var _luck:Number=0;
		/**
		 攻击
		 */
		public var _att:Number=0;
		/**
		 物理防御
		 */
		public var _phyDefense:Number=0;
		/**
		 魔法防御
		 */
		public var _magDefense:Number=0;
		/**
		 命中
		 */
		public var _hit:Number=0;
		/**
		 闪避
		 */
		public var _dodge:Number=0;
		/**
		 暴击
		 */
		public var _crit:Number=0;
		/**
		 近战物理伤害
		 */
		public var _meleeDamage:Number=0;
		/**
		 远程物理伤害
		 */
		public var _rangedDamage:Number=0;
		/**
		 近战魔法伤害
		 */
		public var _meleeMagic:Number=0;
		/**
		 远程魔法伤害
		 */
		public var _rangedMagic:Number=0;
		/**
		 物品爆率
		 */
		public var _goodsLuck:Number=0;
		/**
		 金币爆率
		 */
		public var _goldLuck:Number=0;
		/**
		 变异几率
		 */
		public var _variation:Number=0;
		/**
		 人气
		 */
		public var _rp:Number=0;
		/**
		 移动速度
		 */
		public var _speed:int=0;
		/**
		 攻击速度
		 */
		public var _attSpeed:int=0;
		
		public function PropertyVo()
		{
		}

	}
}
