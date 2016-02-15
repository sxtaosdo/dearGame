package com.player.core.data.model.sprite
{
	import com.player.core.model.IModel;
	import com.player.core.data.vo.IProperty;
	import com.player.core.data.vo.VocationalVo;

	/**
	 * 精灵类接口
	 * @author shixt
	 */
	public interface ISpriteModel extends IModel, IProperty
	{
		/**
		 * 获取model中data的id属性
		 */
		function get id():int;
		/**
		 * 设置职业种族
		 */
		function setVocationVo(data:VocationalVo):void;
		/**
		 * 状态
		 */
		function setState(state:int):void;
		/**
		 * 启动
		 */
		function onStart(data:*=null):void;
		/**
		 * 停止
		 */
		function onStop(data:*=null):void;
		/**
		 * 获取属性
		 * @param name 属性名
		 */
		function getPropertyByName(name:String):Number;
		/**
		 * 获取职业的属性（原始属性）
		 */
		function getVocationalPropertyByName(name:String):Number;
		/**
		 * 是否已销毁
		 */
		function get isDestroy():Boolean;
		
		function get type():String;
		function set type(data:String):void;
		function get hp_current():Number;
		function set hp_current(value:Number):void;
		function get mp_current():Number;
		function set mp_current(value:Number):void;
		function get exp_current():Number;
		function set exp_current(value:Number):void;

	}
}
