package com.player.module
{
	

	public interface IPanel
	{
		/**
		 * 添加
		 */
		function onAdd(data:*=null):void;
		/**
		 * 移除
		 */
		function onRemove(data:*=null):void;
		/**
		 * 销毁
		 */
		function destroy():void;
	}
}
