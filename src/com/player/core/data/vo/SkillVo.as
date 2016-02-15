package com.player.core.data.vo
{
	/**
	 * 技能
	 */
	public class SkillVo extends BaseVo
	{
		/**
		 技能类型
		 */
		public var type:int;
		/**
		 伤害类型
		 */
		public var hurt:int;
		/**
		 伤害个数
		 */
		public var hurtNum:Number;
		/**
		 范围（角度）
		 */
		public var range:int;
		/**
		 距离（像素）
		 */
		public var distance:int;
		/**
		 主动
		 */
		public var startType:Boolean;
		/**
		 前置技能
		 */
		public var front:Array;
		/**
		 前置等级
		 */
		public var frontLevel:Array;
		/**
		 图标
		 */
		public var icon:String;
		/**
		 动画
		 */
		public var mc:String;
		/**
		 冷却(毫秒)
		 */
		public var cd:Number;
		/**
		 描述
		 */
		public var explain:String;
		/**
		 近战物理伤害
		 */
		public var meleeDamage:String;
		/**
		 远程物理伤害
		 */
		public var rangedDamage:String;
		/**
		 近战魔法伤害
		 */
		public var meleeMagic:String;
		/**
		 远程魔法伤害
		 */
		public var rangedMagic:String;
		/**
		 * 附加属性
		 */
		public var buff:uint;


		public function SkillVo()
		{
			super();
		}
	}
}