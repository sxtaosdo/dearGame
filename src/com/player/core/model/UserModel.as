package com.player.core.model
{
	import com.player.core.data.model.sprite.HeroModel;
	import com.player.core.data.vo.BaseVo;
	import com.player.core.data.vo.UserVo;

	/**
	 * 用户
	 * @author shixt
	 * 一个用户对应多个英雄
	 */
	public class UserModel extends BaseVo implements IModel
	{
		private var _data:UserVo;
		private var _userName:String;
		/**
		 * 职业
		 */
		private var _occId:int;
		/**
		 * 金钱
		 */
		private var _money:Number;
		/**
		 * 当前使用的英雄
		 */
		private var _hero:HeroModel;


		public function UserModel(data:UserVo)
		{
			data=data;
		}

		public function get userName():String
		{
			return _userName; //目前这里就是英雄名
		}

		public function set userName(value:String):void
		{
			_userName=value;
		}

		public function get data():*
		{
			return _data;
		}

		public function set data(vo:*):void
		{
			_data=vo;
			reset();
		}

		public function reset():void
		{
		}

		public function addItem(data:*):void
		{

		}
		
		public function updateItem(data:*):void{
			
		}
		
		public function clearn():void{
			
		}

		/**
		 * 金钱
		 */
		public function get money():Number
		{
			return _data.money;
		}

		/**
		 * @private
		 */
		public function set money(value:Number):void
		{
			_money=value;
			_data.money=_money;
		}

		/**
		 * 当前使用的英雄
		 */
		public function get hero():HeroModel
		{
			return _hero;
		}


	}
}

class Key
{
}
