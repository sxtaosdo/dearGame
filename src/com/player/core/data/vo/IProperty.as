package com.player.core.data.vo
{
	public interface IProperty
	{
		
		/**
		 * hp
		 */
		function get hp():Number;
		
		/**
		 * @private
		 */
		function set hp(value:Number):void;
		
		/**
		 * mp
		 */
		function get mp():Number;
		
		/**
		 * @private
		 */
		function set mp(value:Number):void;
		
		/**
		 * 力量
		 */
		function get str():Number;
		
		/**
		 * @private
		 */
		function set str(value:Number):void;
		
		/**
		 * 敏捷
		 */
		function get agi():Number;
		
		/**
		 * @private
		 */
		function set agi(value:Number):void;
		
		/**
		 * 智力
		 */
		function get inte():Number;
		
		/**
		 * @private
		 */
		function set inte(value:Number):void;
		
		/**
		 * 精神
		 */
		function get spirit():Number;
		
		/**
		 * @private
		 */
		function set spirit(value:Number):void;
		
		/**
		 * 攻击
		 */
		function get att():Number;
		
		/**
		 * @private
		 */
		function set att(value:Number):void;
		
		/**
		 * 物理防御
		 */
		function get phyDefense():Number;
		
		/**
		 * @private
		 */
		function set phyDefense(value:Number):void;
		
		/**
		 * 魔法防御
		 */
		function get magDefense():Number;
		
		/**
		 * @private
		 */
		function set magDefense(value:Number):void;
		
		/**
		 * 命中
		 */
		function get hit():Number;
		
		/**
		 * @private
		 */
		function set hit(value:Number):void;
		
		/**
		 * 闪避
		 */
		function get dodge():Number;
		
		/**
		 * @private
		 */
		function set dodge(value:Number):void;
		
		/**
		 * 暴击
		 */
		function get crit():Number;
		
		/**
		 * @private
		 */
		function set crit(value:Number):void;
		
		/**
		 * 近战物理伤害
		 */
		function get meleeDamage():Number;
		
		/**
		 * @private
		 */
		function set meleeDamage(value:Number):void;
		
		/**
		 * 远程物理伤害
		 */
		function get rangedDamage():Number;
		
		/**
		 * @private
		 */
		function set rangedDamage(value:Number):void;
		
		/**
		 * 近战魔法伤害
		 */
		function get meleeMagic():Number;
		
		/**
		 * @private
		 */
		function set meleeMagic(value:Number):void;
		
		/**
		 * 远程魔法伤害
		 */
		function get rangedMagic():Number;
		
		/**
		 * @private
		 */
		function set rangedMagic(value:Number):void;
		
		/**
		 * 物品爆率
		 */
		function get goodsLuck():Number;
		
		/**
		 * @private
		 */
		function set goodsLuck(value:Number):void;
		
		/**
		 * 金币爆率
		 */
		function get goldLuck():Number;
		
		/**
		 * @private
		 */
		function set goldLuck(value:Number):void;
		
		/**
		 * 变异几率
		 */
		function get variation():Number;
		
		/**
		 * @private
		 */
		function set variation(value:Number):void;
		
		/**
		 * 人气
		 */
		function get rp():Number;
		
		/**
		 * @private
		 */
		function set rp(value:Number):void;
		
		/**
		 * 移动速度
		 */
		function get speed():int
		
		/**
		 * @private
		 */
		function set speed(value:int):void
		
		/**
		 * 攻击速度
		 */
		function get attSpeed():int
		
		/**
		 * @private
		 */
		function set attSpeed(value:int):void

	}
}