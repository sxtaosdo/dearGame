package com.player.core.event
{
	import flash.events.Event;
	import flash.events.EventDispatcher;
	import flash.utils.Dictionary;

	/**
	 * @author shixt
	 */
	public class GameDispatcher extends EventDispatcher
	{
		private static var _instance:GameDispatcher;
		private static var evtMap:Dictionary; //不用对象池至少增加30M的内存开销

		public function GameDispatcher(key:Key)
		{
			super(null);
			evtMap=new Dictionary(true);
		}

		public static function get instance():GameDispatcher
		{
			if (_instance == null)
			{
				_instance=new GameDispatcher(new Key)
			}
			return _instance;
		}

		public static function send(event:*):void
		{
			if (event is Event)
			{
				GameDispatcher.instance.dispatchEvent(event);
			}
			else
			{
				if (evtMap[event] == null)
				{
					evtMap[event]=new Event(event);
				}
				GameDispatcher.instance.dispatchEvent(evtMap[event]);
			}
		}

		public static function remove(event:*, fun:Function):void
		{
			if (event is Event)
			{
				GameDispatcher.instance.removeEventListener(event, fun);
			}
			else
			{
				GameDispatcher.instance.removeEventListener(evtMap[event], fun);
			}
		}

		public static function addEventListener(type:String, callback:Function, useCapture:Boolean=false, priority:int=0, useWeakReference:Boolean=false):void
		{
			GameDispatcher.instance.addEventListener(type, callback, useCapture, priority, useWeakReference);
		}
	}
}

class Key
{
}
