package com.player.core.data.model.helper
{
	public interface IHelper
	{
		/**
		 * 设置初始属性
		 */
		function setData(data:*):void;
		/**
		 * 
		 * 获得加工后的属性
		 */
		function getList(data:*=null):Array;
	}
}