package com.player.core.data.vo
{
	import com.player.core.data.vo.sprite.PropertyVo;

	/**
	 * 职业技能
	 * @author shixt
	 */
	public class VocationalVo extends PropertyVo implements IProperty
	{
		/**
		 种族
		 */
		public var phyle:uint;
		/**
		 技能
		 */
		public var skill:Array;
		/**
		 描述
		 */
		public var desc:String;
//		/**
//		 力量
//		 */
//		public var str:int;
//		/**
//		 敏捷
//		 */
//		public var agi:int;
//		/**
//		 智力
//		 */
//		public var intl:int;
//		/**
//		 精神
//		 */
//		public var spirit:Number;
		/**
		 主属性
		 */
		public var main:String;

		public function get hp():Number
		{
			return _hp;
		}

		public function set hp(value:Number):void
		{
			_hp=value;
		}

		public function get mp():Number
		{
			return _mp;
		}

		public function set mp(value:Number):void
		{
			_mp=value;
		}

		public function get str():Number
		{
			return _str;
		}

		public function set str(value:Number):void
		{
			_str=value;
		}

		public function get agi():Number
		{
			return _agi;
		}

		public function set agi(value:Number):void
		{
			_str=value;
		}

		public function get inte():Number
		{
			return _intl;
		}

		public function set inte(value:Number):void
		{
			_intl=value;
		}

		public function get spirit():Number
		{
			return _spirit;
		}

		public function set spirit(value:Number):void
		{
			_spirit=value;
		}

		public function get att():Number
		{
			return _att;
		}

		public function set att(value:Number):void
		{
			_att=value;
		}

		public function get phyDefense():Number
		{
			return _phyDefense;
		}

		public function set phyDefense(value:Number):void
		{
			_phyDefense=value;
		}

		public function get magDefense():Number
		{
			return _magDefense;
		}

		public function set magDefense(value:Number):void
		{
			_magDefense=value;
		}

		public function get hit():Number
		{
			return _hit;
		}

		public function set hit(value:Number):void
		{
			_hit=value;
		}

		public function get dodge():Number
		{
			return _dodge;
		}

		public function set dodge(value:Number):void
		{
			_dodge=value;
		}

		public function get crit():Number
		{
			return _crit;
		}

		public function set crit(value:Number):void
		{
			_crit=value;
		}

		public function get meleeDamage():Number
		{
			return _meleeDamage;
		}

		public function set meleeDamage(value:Number):void
		{
			_meleeDamage=value;
		}

		public function get rangedDamage():Number
		{
			return _rangedDamage;
		}

		public function set rangedDamage(value:Number):void
		{
			_rangedDamage=value;
		}

		public function get meleeMagic():Number
		{
			return _meleeMagic;
		}

		public function set meleeMagic(value:Number):void
		{
			_meleeMagic=value;
		}

		public function get rangedMagic():Number
		{
			return _rangedMagic;
		}

		public function set rangedMagic(value:Number):void
		{
			_rangedMagic=value;
		}

		public function get goodsLuck():Number
		{
			return _goodsLuck;
		}

		public function set goodsLuck(value:Number):void
		{
			_goodsLuck=value;
		}

		public function get goldLuck():Number
		{
			return _goldLuck;
		}

		public function set goldLuck(value:Number):void
		{
			_goldLuck=value;
		}

		public function get variation():Number
		{
			return _variation;
		}

		public function set variation(value:Number):void
		{
			_variation=value;
		}

		public function get rp():Number
		{
			return _rp;
		}

		public function set rp(value:Number):void
		{
			_rp=value;
		}

		public function get speed():int
		{
			return _speed;
		}

		public function set speed(value:int):void
		{
			_speed=value;
		}

		public function get attSpeed():int
		{
			return _attSpeed;
		}

		public function set attSpeed(value:int):void
		{
			_attSpeed=value;
		}
	}
}
