package com.player.core.data.model.helper
{
	import com.player.core.data.ConfigDef;
	import com.player.core.data.ConfigManager;
	import com.player.core.data.vo.IProperty;
	import com.player.core.data.vo.goods.EquipVo;
	import com.player.core.data.vo.sprite.PropertyVo;

	import flash.utils.Dictionary;

	public class EquipHelp implements IHelper, IProperty
	{
		private static var config:ConfigManager=ConfigManager.instance;
		/**
		 * 身上的装备，部位索引
		 */
		private var _list:Dictionary;
		/**
		 * 装备的属性和
		 */
		private var _property:PropertyVo;

		public function EquipHelp()
		{
			_list=new Dictionary();
			_property=new PropertyVo();
		}

		public function setData(data:*):void //遍历所有属性相加
		{
			var proto:Object=config.getProtoByName(ConfigDef.FILE_NAME_EQUIP);
			for each (var equipId:int in data)
			{
				var vo:EquipVo=config.getDataByName(ConfigDef.FILE_NAME_EQUIP)[equipId];
				if (vo != null)
				{
					autoAddValue(vo, proto);
					_list[vo.part]=vo;
				}
				else
				{
					trace(this + "未取到装备信息,ID为：" + equipId);
				}
			}
		}
		
		public function getList(data:*=null):Array{
			return null;
		}

		/**
		 * 自动设置属性<br>
		 * 正常+=，带%号的乘
		 */
		private function autoAddValue(vo:EquipVo, proto:Object):void
		{
			for each (var key:String in proto)
			{
				if (this.hasOwnProperty(key) && vo.property.hasOwnProperty("_" + key))
				{
					this._property["_" + key]+=vo.property["_" + key];
				}
				else
				{
//					trace(this + "错误");
				}
			}
		}

		public function get hp():Number
		{
			return _property._hp;
		}

		public function set hp(value:Number):void
		{
		}

		public function get mp():Number
		{
			return _property._mp;
		}

		public function set mp(value:Number):void
		{
		}

		public function get str():Number
		{
			return _property._str;
		}

		public function set str(value:Number):void
		{
		}

		public function get agi():Number
		{
			return _property._agi;
		}

		public function set agi(value:Number):void
		{
		}

		public function get inte():Number
		{
			return _property._intl
		}

		public function set inte(value:Number):void
		{
		}

		public function get spirit():Number
		{
			return _property._spirit;
		}

		public function set spirit(value:Number):void
		{
		}

		public function get att():Number
		{
			return _property._att;
		}

		public function set att(value:Number):void
		{
		}

		public function get phyDefense():Number
		{
			return _property._phyDefense;
		}

		public function set phyDefense(value:Number):void
		{
		}

		public function get magDefense():Number
		{
			return _property._magDefense;
		}

		public function set magDefense(value:Number):void
		{
		}

		public function get hit():Number
		{
			return _property._hit;
		}

		public function set hit(value:Number):void
		{
		}

		public function get dodge():Number
		{
			return _property._dodge;
		}

		public function set dodge(value:Number):void
		{
		}

		public function get crit():Number
		{
			return _property._crit;
		}

		public function set crit(value:Number):void
		{
		}

		public function get meleeDamage():Number
		{
			return _property._meleeDamage
		}

		public function set meleeDamage(value:Number):void
		{
		}

		public function get rangedDamage():Number
		{
			return _property._rangedDamage
		}

		public function set rangedDamage(value:Number):void
		{
		}

		public function get meleeMagic():Number
		{
			return _property._meleeMagic;
		}

		public function set meleeMagic(value:Number):void
		{
		}

		public function get rangedMagic():Number
		{
			return _property._rangedMagic;
		}

		public function set rangedMagic(value:Number):void
		{
		}

		public function get goodsLuck():Number
		{
			return _property._goodsLuck;
		}

		public function set goodsLuck(value:Number):void
		{
		}

		public function get goldLuck():Number
		{
			return _property._goldLuck;
		}

		public function set goldLuck(value:Number):void
		{
		}

		public function get variation():Number
		{
			return _property._variation;
		}

		public function set variation(value:Number):void
		{
		}

		public function get rp():Number
		{
			return _property._rp;
		}

		public function set rp(value:Number):void
		{
		}

		public function get speed():int
		{
			return _property._speed;
		}

		public function set speed(value:int):void
		{
		}

		public function get attSpeed():int
		{
			return _property._attSpeed;
		}

		public function set attSpeed(value:int):void
		{
		}
	}
}
