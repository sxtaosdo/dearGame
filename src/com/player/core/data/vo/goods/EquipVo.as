package com.player.core.data.vo.goods
{
	import com.player.core.data.vo.sprite.PropertyVo;

	public class EquipVo extends GoodsVo
	{
		/**
		 * 部位
		 */
		public var part:int;
		/**
		 * 售价
		 */
		public var price:Number;
		/**
		 * 品质
		 */
		public var quality:int;
		/**
		 * 属性数据
		 */
		public var property:PropertyVo;

		public function EquipVo()
		{
			super();
		}
	}
}
