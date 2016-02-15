package com.player.core.model
{
	import flash.utils.getTimer;

	public class BaseModel
	{
		private static var index:int;
		private var _name:String;
		private var _id:int;
		private var _sid:String;
		private var _isDestroy:Boolean=true;

		public function BaseModel()
		{
			_sid=getTimer() + "_" + (index++) + "_" + (Math.random() * 1000);
		}

		public function get sid():String
		{
			return _sid;
		}

		public function get id():int
		{
			return _id;
		}

		public function set id(value:int):void
		{
			_id=value;
		}

		public function get name():String
		{
			return _name;
		}

		public function set name(value:String):void
		{
			_name=value;
		}

		public function get isDestroy():Boolean
		{
			return _isDestroy;
		}

		public function set isDestroy(value:Boolean):void
		{
			_isDestroy = value;
		}

	}
}
