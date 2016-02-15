package com.player.core.data.model.sprite
{
	import com.player.core.model.BaseModel;
	import com.player.core.model.IModel;
	import com.player.core.data.vo.IProperty;
	import com.player.core.data.vo.VocationalVo;

	public class VocationalModel extends BaseModel implements IProperty, IModel
	{
		private var _level:Number=1;
		private var _data:VocationalVo;

		public function VocationalModel()
		{
			super();
		}

		public function get hp():Number
		{
			var temp:Number=str * 10;
			switch (_data.main)
			{
				case "str":
					temp+=str * 2.2;
					break;
				case "agi":
					temp+=str * 0.3;
					break;
				case "intl":
					temp+=str * 0.1;
					break;
				case "spirit":
					temp+=str * 0.5;
					break;
			}
			return temp;
		}

		public function set hp(value:Number):void
		{
		}

		public function get mp():Number
		{
			var temp:Number=inte * 10;
			switch (_data.main)
			{
				case "str":
					temp+=str * 0.1;
					break;
				case "agi":
					temp+=str * 0.5;
					break;
				case "intl":
					temp+=str * 2;
					break;
				case "spirit":
					temp+=str * 1;
					break;
			}
			return temp;
		}

		public function set mp(value:Number):void
		{
		}

		public function get str():Number
		{
			return _data.str;
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

		public function get data():*
		{
			return _data;
		}

		public function set data(vo:*):void
		{
			if (vo is VocationalVo)
			{
				_data=vo;
			}
			else
			{
				_level=vo;
			}
		}

		public function reset():void
		{
		}

		public function addItem(data:*):void
		{
		}

		public function updateItem(data:*):void
		{
		}

		public function clearn():void
		{
			_data=null;
			_level=0;
		}
	}
}
