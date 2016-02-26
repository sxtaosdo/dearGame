package com.player.core.data
{
	import com.greensock.loading.core.LoaderCore;
	import com.ourgame.utils.loader.GameLoader;
	import com.player.core.data.vo.BaseVo;
	import com.player.core.data.vo.FunVo;
	import com.player.core.data.vo.SceneVo;
	import com.player.core.data.vo.SkillVo;
	import com.player.core.data.vo.UserVo;
	import com.player.core.data.vo.VocationalVo;
	import com.player.core.data.vo.goods.EquipVo;
	import com.player.core.data.vo.goods.GoodsVo;
	import com.player.core.data.vo.sprite.HeroVo;
	import com.player.core.data.vo.sprite.MonsterVo;
	import com.player.core.data.vo.sprite.PropertyVo;
	import com.player.core.event.BaseEvent;
	import com.player.core.event.GameDispatcher;

	import flash.utils.Dictionary;

	public class ConfigManager
	{
//		private static var CONFIG_LIST:Array=[ConfigDef.FILE_NAME_VOCATIONAL, ConfigDef.FILE_NAME_MONSTER, ConfigDef.FILE_NAME_BUFF, ConfigDef.FILE_NAME_MAP, ConfigDef.FILE_NAME_SKILL, ConfigDef.FILE_NAME_USER_TEMP, ConfigDef.FILE_NAME_HERO, ConfigDef.FILE_NAME_GOODS, ConfigDef.FILE_NAME_EQUIP, ConfigDef.FILE_NAME_FUN];
		private static var CONFIG_LIST:Array=[];
		private static var CONFIG_URL:String="config/";
		private static var _instance:ConfigManager;
		/**
		 *配置文件列表
		 */
		private var configList:Dictionary;
		/**
		 * 存属性名的地方
		 */
		private var protoList:Dictionary;
		/**
		 * 是否加载完毕
		 */
		private var isLoaded:Boolean=false;

		public function ConfigManager(key:Key)
		{
			configList=new Dictionary();
			protoList=new Dictionary();
		}

		public function loadConfig():void
		{
			if (!isLoaded)
			{
				loadAllBaseConfig();
			}
		}

		private function loadAllBaseConfig():void
		{
			if (CONFIG_LIST.length > 0)
			{
				var configName:String=CONFIG_LIST.shift();
				GameLoader.instance.load(CONFIG_URL + configName + ".txt", onComplete, onError);
			}
			else
			{
				isLoaded=true;
				GameDispatcher.send(BaseEvent.CONFIG_BASE_COMPLETE_EVENT);
			}
		}

		public function getDataByName(name:String):*
		{
			return configList[name];
		}

		public function getProtoByName(name:String):*
		{
			return protoList[name];
		}

		public function getDataArrayByName(name:String):Array
		{
			var arr:Array=[];
			var dic:Dictionary=configList[name];
			if (dic != null)
			{
				for each (var data:BaseVo in dic)
				{
					arr[data.id]=data;
				}
			}
			return arr;
		}

		private function onError(data:*):void
		{
			trace(this + data);
		}

		private function onComplete(data:LoaderCore):void
		{
			if (configList[data.vars.fileName] == null)
			{
				initConfig(data.vars.fileName, data.content);
			}
			loadAllBaseConfig();
		}

		private function initConfig(name:String, content:String):void
		{
			var cls:Class=getClass(content);
			if (cls == null)
			{
				trace(this + "未取到对应的VO" + content.substring(0, content.indexOf("\r")));
				return;
			}
			var dic:Dictionary=new Dictionary();
			var arr:Array=content.split("\n");
			arr.shift();
			arr[0]=String(arr[0]).replace("\r", "");
			var na:Array=arr.shift().split("\t");
			var len:int=na.length;
			if (protoList[name] == null)
			{
				protoList[name]={};
			}

			for each (var key:String in arr)
			{
				var isProperty:Boolean=false;
				var arr2:Array=key.split("\t");
				if (cls != null)
				{
					var tmp:Object=new cls();
					for (var i:int=0; i < len; i++)
					{ //这里的第二重循环应该写到单独的一个方法里面
						if (i == (len - 1))
						{
							deleteLastString(arr2);
						}
						protoList[name][i]=getName(na[i]);
						if ((isProperty == false) && (protoList[name][i] == "property")) //poperty以后的属性都是元了
						{
							isProperty=true;
							continue;
						}
						if (isProperty)
						{
							if (tmp.hasOwnProperty("property") && (tmp["property"] == null))
							{
								tmp["property"]=new PropertyVo();
							}
							autoSetValue(tmp["property"], na[i], arr2[i]);
						}
						else
						{
							autoSetValue(tmp, na[i], arr2[i]);
						}
					}
					dic[tmp["id"]]=tmp;
				}
			}
			if (false)
			{
				creatClassText(na, content.substring(0, content.indexOf("\r")).split("\t"), name);
			}
			configList[name]=dic;
		}

		/**
		 * 生成类文本
		 */
		private function creatClassText(obj:Array, desc:Array, className:String):void
		{
			var temp:String="";
			var key:String;
			var value:String;
			obj.shift();
			obj.shift();
			desc.shift();
			desc.shift();
			trace(this + className + "\n");
			for each (var str:String in obj)
			{
				key=str.substring(0, str.indexOf("#"));
				value=str.substr(str.indexOf("#") + 1);
				temp+="/**\n" + desc.shift() + "\n*/\n"
				temp+="public var " + key + ":" + value + ";\n";
			}
			trace(temp);
		}

		private function getClass(content:String):Class
		{
			var name:String=content.substr(0, 2);
			var cls:Class;
			if (name == "vo")
			{
				name=content.substring(3, content.indexOf("\t"));
//				cls=getDefinitionByName("com.player.core.data.vo.sprite." + name) as Class;
				switch (name)
				{
					case "MonsterVo":
						cls=MonsterVo;
						break;
					case "VocationalVo":
						cls=VocationalVo;
						break;
					case "SkillVo":
						cls=SkillVo;
						break;
					case "BuffVo":
						cls=PropertyVo;
						break;
					case "map":
					case "SceneVo":
						cls=SceneVo;
						break;
					case "UserVo":
						cls=UserVo;
						break;
					case "HeroVo":
						cls=HeroVo;
						break;
					case "GoodsVo":
						cls=GoodsVo;
						break;
					case "EquipVo":
						cls=EquipVo;
						break;
					case "FunVo":
						cls=FunVo;
						break;
				}
			}
			return cls;
		}

		/**
		 * 删除末尾的多余字符
		 */
		private function deleteLastString(arr:Array):void
		{
			var index:int=arr[arr.length - 1].indexOf("\r");
			if (index > -1)
			{
				arr[arr.length - 1]=String(arr[arr.length - 1]).slice(0, index);
			}
		}

		/**
		 *自动赋值
		 * @param obj vo
		 * @param key
		 * @param value
		 */
		private function autoSetValue(vo:Object, key:String, value:String):void
		{
			try
			{
				var name:String=getName(key);
				if (key.indexOf("Array") > -1)
				{ //数组类型
					vo[name]=getArray(value);
				}
				else
				{ //普通类型
					if (vo.hasOwnProperty(name))
					{
						vo[name]=value;
					}
					else if (vo.hasOwnProperty("_" + name))
					{
						vo["_" + name]=value;
					}
				}
			}
			catch (e:Error)
			{
				trace(this + "没有找到对应的属性：" + name);
			}
		}

		private function getName(key:String):String
		{
			return key.substr(0, key.indexOf("#"));
		}

		/**
		 *自动判断并生成数组
		 * @param value
		 * @return
		 */
		private function getArray(value:String):Array
		{
			/*if (value.indexOf(",") > -1)
			{
				return value.split(",");
			}
			else
			{
				return [value];
			}*/
			return value.split("#");
		}

		public static function get instance():ConfigManager
		{
			if (_instance == null)
			{
				_instance=new ConfigManager(new Key);
			}
			return _instance;
		}

	}
}

class Key
{
}
