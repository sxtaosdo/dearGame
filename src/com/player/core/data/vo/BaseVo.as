package com.player.core.data.vo
{
	import flash.utils.getTimer;

	public class BaseVo
	{
		private static var index:int;
		private var _name:String;
		private var _id:int;
		private var _sid:String;

		public function BaseVo()
		{
			_sid=getTimer() + "_" + (index++) + "_" + (Math.random() * 1000);
		}

		public function get name():String
		{
			return _name;
		}

		public function set name(value:String):void
		{
			_name=value;
		}

		public function get id():int
		{
			return _id;
		}

		public function set id(value:int):void
		{
			_id=value;
		}

		public function get sid():String
		{
			return _sid;
		}


	}
}
