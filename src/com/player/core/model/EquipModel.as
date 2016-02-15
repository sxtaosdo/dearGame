package com.player.core.model
{
	import com.player.core.data.vo.IProperty;

	public class EquipModel extends BaseModel implements IProperty, IModel
	{
		private var proteList:Array;
		/**
		 * 前缀
		 */
		private var _title_first_id:int;
		/**
		 * 后缀
		 */
		private var _title_second_id:int;

		public function EquipModel()
		{
			super();
		}

		public function addItem(data:*):void
		{

		}

		public function get hp():Number
		{
			return 0;
		}

		public function set hp(value:Number):void
		{
		}

		public function get mp():Number
		{
			return 0;
		}

		public function set mp(value:Number):void
		{
		}

		public function get str():Number
		{
			return 0;
		}

		public function set str(value:Number):void
		{
		}

		public function get agi():Number
		{
			return 0;
		}

		public function set agi(value:Number):void
		{
		}

		public function get inte():Number
		{
			return 0;
		}

		public function set inte(value:Number):void
		{
		}

		public function get spirit():Number
		{
			return 0;
		}

		public function set spirit(value:Number):void
		{
		}

		public function get att():Number
		{
			return 0;
		}

		public function set att(value:Number):void
		{
		}

		public function get phyDefense():Number
		{
			return 0;
		}

		public function set phyDefense(value:Number):void
		{
		}

		public function get magDefense():Number
		{
			return 0;
		}

		public function set magDefense(value:Number):void
		{
		}

		public function get hit():Number
		{
			return 0;
		}

		public function set hit(value:Number):void
		{
		}

		public function get dodge():Number
		{
			return 0;
		}

		public function set dodge(value:Number):void
		{
		}

		public function get crit():Number
		{
			return 0;
		}

		public function set crit(value:Number):void
		{
		}

		public function get meleeDamage():Number
		{
			return 0;
		}

		public function set meleeDamage(value:Number):void
		{
		}

		public function get rangedDamage():Number
		{
			return 0;
		}

		public function set rangedDamage(value:Number):void
		{
		}

		public function get meleeMagic():Number
		{
			return 0;
		}

		public function set meleeMagic(value:Number):void
		{
		}

		public function get rangedMagic():Number
		{
			return 0;
		}

		public function set rangedMagic(value:Number):void
		{
		}

		public function get goodsLuck():Number
		{
			return 0;
		}

		public function set goodsLuck(value:Number):void
		{
		}

		public function get goldLuck():Number
		{
			return 0;
		}

		public function set goldLuck(value:Number):void
		{
		}

		public function get variation():Number
		{
			return 0;
		}

		public function set variation(value:Number):void
		{
		}

		public function get rp():Number
		{
			return 0;
		}

		public function set rp(value:Number):void
		{
		}

		public function get data():*
		{
			return null;
		}

		public function set data(vo:*):void
		{
		}

		public function reset():void
		{
		}

		/**
		 * 移动速度
		 */
		public function get speed():int
		{
			return null;
		}

		/**
		 * @private
		 */
		public function set speed(value:int):void
		{

		}

		/**
		 * 攻击速度
		 */
		public function get attSpeed():int
		{
			return null;
		}

		/**
		 * @private
		 */
		public function set attSpeed(value:int):void
		{

		}
	}
}
