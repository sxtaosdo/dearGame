package com.player.core.data.vo.sprite
{

	/**
	 * 英雄
	 * @author shixt
	 * 
	 */
	public class HeroVo extends MonsterVo
	{
		/**
		 职业
		 */
		public var vocational:int;
		/**
		 地点
		 */
		public var map:int;
		/**
		 背包
		 */
		public var backpack:Array;
		/**
		 装备
		 */
		public var equip:Array;
		/**
		 随从
		 */
		public var pet:Array;
		/**
		 经验
		 */
		public var exp:Number;
		

		public function HeroVo()
		{
			super();
		}
	}
}