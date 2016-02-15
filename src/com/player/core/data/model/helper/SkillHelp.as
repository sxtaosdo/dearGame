package com.player.core.data.model.helper
{
	import com.player.core.data.ConfigDef;
	import com.player.core.data.ConfigManager;
	import com.player.core.model.SkillModel;
	import com.player.core.data.model.fun.SkillFun;
	import com.player.core.data.model.sprite.ISpriteModel;
	import com.player.core.data.vo.IProperty;
	import com.player.core.data.vo.SkillVo;
	import com.player.core.data.vo.sprite.MonsterVo;
	import com.player.core.data.vo.sprite.PropertyVo;

	import flash.utils.Dictionary;
	import flash.utils.getTimer;

	/**
	 * 技能辅助器
	 * @author shixt
	 * <listing>
	 * 技能静态展示
	 * 技能属性
	 * 技能生成
	 * 技能CD
	 * </listing>
	 */
	public class SkillHelp extends PropertyVo implements IHelper, IProperty
	{
		/**
		 * 技能列表
		 */
		private var _list:Vector.<SkillVo>;
		private var _heroSkillList:Array;
		/**
		 * 技能CD表
		 */
		private var _cdMap:Dictionary;
		/**
		 * 战斗技能列表
		 */
		private var _battleList:Array;
		/**
		 * 所有者
		 */
		private var _owner:ISpriteModel;
		/**
		 * 技能的属性和
		 */
		private var _property:PropertyVo;

		public function SkillHelp(owner:ISpriteModel)
		{
			super();
			_owner=owner;
			_list=new Vector.<SkillVo>();
			_cdMap=new Dictionary;
			_property=new PropertyVo();
			_battleList=[];
		}

		/**
		 * 构建技能vo，技能id数据
		 */
		public function setData(data:*):void
		{
			if (data is Object)
			{
				var all:Array=data.all;
				var current:Array=data.current;
				for each (var skillId:String in all)
				{
					var vo:SkillVo=ConfigManager.instance.getDataByName(ConfigDef.FILE_NAME_SKILL)[skillId];
					var proto:Object=ConfigManager.instance.getProtoByName(ConfigDef.FILE_NAME_SKILL);
					if (current.indexOf(skillId) > -1) //自动叠加技能相同的属性部分(已学习的技能)
					{
						for each (var key:String in proto)
						{
							if (this.hasOwnProperty("type"))
							{
								this[key]+=vo[key];
							}
						}
					}
					_list.push(vo);
				}
			}
		}

		/**
		 * 获取技能列表
		 */
		public function getList(data:*=null):Array
		{
			clearnBattleList();
			for each (var skill:SkillVo in _list)
			{ //遍历所有技能，检查cd，并释放
				if (_cdMap[skill.id] != null)
				{ //不存在则说明没有cd
					if (getTimer() - _cdMap[skill.id] < skill.cd)
					{
						continue;
					}
				}
				_cdMap[skill.id]=getTimer();
				_battleList.push(creatSkillModel(skill,data));
			}
			return _battleList;
		}

		private function creatSkillModel(skillVo:SkillVo, target:ISpriteModel=null):SkillModel
		{
			var model:SkillModel=new SkillModel();
			model.data=skillVo;
			model.lastTime=getTimer();
			if ((skillVo.meleeDamage != null) && (skillVo.meleeDamage.length > 0))
			{
				model.setMagicPowerSeed(SkillFun.getSkillHurt(_owner, skillVo.meleeDamage));
			}
			if ((skillVo.meleeMagic != null) && (skillVo.meleeMagic.length > 0))
			{
				model.setDamagePowerSeed(SkillFun.getSkillHurt(_owner, skillVo.meleeMagic));
			}
			model.target=target;
			model.source=_owner;
			return model;
		}

		/**
		 * 根据精灵属性生成技能属性
		 * @param data
		 * @return
		 *
		 */
		private function getSeed(data:MonsterVo):Object
		{
//			for each()
			return null;
		}

		private function clearnBattleList():void
		{
			while (_battleList.length > 0)
			{
				_battleList.pop();
			}
		}

		public function get hp():Number
		{
			return _hp;
		}

		public function set hp(value:Number):void
		{
		}

		public function get mp():Number
		{
			return 0;
		}

		public function set mp(value:Number):void
		{
		}

		public function get str():Number
		{
			return _str;
		}

		public function set str(value:Number):void
		{
		}

		public function get agi():Number
		{
			return _agi;
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
			return _spirit;
		}

		public function set spirit(value:Number):void
		{
		}

		public function get att():Number
		{
			return _att;
		}

		public function set att(value:Number):void
		{
		}

		public function get phyDefense():Number
		{
			return _phyDefense;
		}

		public function set phyDefense(value:Number):void
		{
		}

		public function get magDefense():Number
		{
			return _magDefense;
		}

		public function set magDefense(value:Number):void
		{
		}

		public function get hit():Number
		{
			return _hit;
		}

		public function set hit(value:Number):void
		{
		}

		public function get dodge():Number
		{
			return _dodge;
		}

		public function set dodge(value:Number):void
		{
		}

		public function get crit():Number
		{
			return _crit;
		}

		public function set crit(value:Number):void
		{
		}

		public function get meleeDamage():Number
		{
			return _meleeDamage;
		}

		public function set meleeDamage(value:Number):void
		{
		}

		public function get rangedDamage():Number
		{
			return _rangedDamage;
		}

		public function set rangedDamage(value:Number):void
		{
		}

		public function get meleeMagic():Number
		{
			return _meleeMagic;
		}

		public function set meleeMagic(value:Number):void
		{
		}

		public function get rangedMagic():Number
		{
			return _rangedMagic;
		}

		public function set rangedMagic(value:Number):void
		{
		}

		public function get goodsLuck():Number
		{
			return _goodsLuck;
		}

		public function set goodsLuck(value:Number):void
		{
		}

		public function get goldLuck():Number
		{
			return _goldLuck;
		}

		public function set goldLuck(value:Number):void
		{
		}

		public function get variation():Number
		{
			return _variation;
		}

		public function set variation(value:Number):void
		{
		}

		public function get rp():Number
		{
			return _rp;
		}

		public function set rp(value:Number):void
		{
		}

		public function get speed():int
		{
			return _speed;
		}

		public function set speed(value:int):void
		{
		}

		public function get attSpeed():int
		{
			return _attSpeed;
		}

		public function set attSpeed(value:int):void
		{
		}
	}
}
