package com.player.core.data.model.sprite
{
	/**
	 * 精灵状态
	 */
	public class SpriteState
	{
		/**
		 * 空闲
		 */
		public static const IDLE:int=100;
		/**
		 * 巡逻
		 */
		public static const PATROL:int=101;
		/**
		 * 向敌
		 */
		public static const TO_ENEMY:int=200;
		/**
		 * 逃跑
		 */
		public static const TO_RUN:int=201;
		/**
		 * 攻击
		 */
		public static const ATTACK:int=300;
		/**
		 * 攻击_施法中
		 */
		public static const ATTACK_DOING:int=301;
		/**
		 * 被击
		 */
		public static const DEVASTATED:int=400;
		/**
		 * 被击_倒地
		 */
		public static const DEVASTATED_GROUND:int=401;
	}
}