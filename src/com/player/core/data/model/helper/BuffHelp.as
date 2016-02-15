package com.player.core.data.model.helper
{
	import com.player.core.data.ConfigDef;
	import com.player.core.data.ConfigManager;
	import com.player.core.data.vo.IProperty;
	import com.player.core.data.vo.goods.EquipVo;

	/**
	 * 动态属性
	 * @author shixt
	 * 称号
	 * buff
	 * 光环
	 */
	public class BuffHelp implements IHelper, IProperty
	{
		private var _list:Array;

		public function BuffHelp()
		{
			_list=[];
		}

		public function setData(data:*):void
		{
			for each (var equipId:int in data)
			{
				var vo:EquipVo=ConfigManager.instance.getDataByName(ConfigDef.FILE_NAME_EQUIP)[equipId];
				var proto:Object=ConfigManager.instance.getProtoByName(ConfigDef.FILE_NAME_SKILL);
				for each (var key:String in proto)
				{
					if (this.hasOwnProperty("type"))
					{
						this[key]+=vo[key];
					}
				}
				_list.push(vo);
			}
		}
		
		public function getList(data:*=null):Array{
			return null;
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

		public function get speed():int
		{
			return 0;
		}

		public function set speed(value:int):void
		{
		}

		public function get attSpeed():int
		{
			return 0;
		}

		public function set attSpeed(value:int):void
		{
		}
	}
}
