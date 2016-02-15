package com.player.core.model
{
	public interface IModel
	{
		/**
		 * 获取当前model 的data数据
		 */		
		function get data():*;
		/**
		 * 设置当前model的data，
		 */
		function set data(vo:*):void;
		/**
		 * 重置该model到初始状态
		 */
		function reset():void;
		/**
		 * 添加项 
		 */
		function addItem(data:*):void;
		/**
		 * 更新项
		 */
		function updateItem(data:*):void;
		/**
		 * 清理
		 */
		function clearn():void;
	}
}