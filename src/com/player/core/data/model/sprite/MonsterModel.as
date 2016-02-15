package com.player.core.data.model.sprite
{
	import com.player.core.model.BaseModel;
	import com.player.core.model.BattleModel;
	import com.player.core.model.SkillModel;
	import com.player.core.data.model.helper.BuffHelp;
	import com.player.core.data.model.helper.SkillHelp;
	import com.player.core.data.vo.VocationalVo;
	import com.player.core.data.vo.sprite.MonsterVo;

	/**
	 * 怪物
	 * @author shixt
	 */
	public class MonsterModel extends BaseModel implements ISpriteModel
	{
		/**
		 * 当前所在地图id
		 */
		protected var _mapId:int=0;
		/**
		 * 职业
		 */
		protected var _vocationVo:VocationalModel;
		/**
		 * monster基本数据
		 */
		private var _vo:MonsterVo;
		/**
		 * 精灵类型
		 */
		protected var _type:String;

		protected var _exp_current:Number=0;
		protected var _hp_current:Number=0;
		protected var _mp_current:Number=0;
		protected var _level:int;
		protected var _attack_min:int;
		protected var _attack_max:int;
		protected var _skill:Vector.<SkillModel>;
		/**
		 * 坐标
		 */
		protected var _x:int;
		protected var _y:int;
		/**
		 * 当前状态
		 */
		protected var _state:int;
		/**
		 * 目标
		 */
		protected var _target:ISpriteModel;
		protected var _skillPlus:SkillHelp; //这个skill只做静态展示用
		protected var _buffPlus:BuffHelp;
		protected var _action:BattleModel;
		protected var _actionList:Array;

		public function MonsterModel()
		{
			super();
			_type=SpriteType.SPRITE_TYPE_MONSTER;
			_skillPlus=new SkillHelp(this);
			_buffPlus=new BuffHelp();
			_vocationVo=new VocationalModel();
		}

		public function init():void
		{
			_level=1;
			_hp_current=_vo.hp;
			_mp_current=_vo.mp;
		}

		/**
		 * 获取当前model 的data数据
		 */
		public function get data():*
		{
			return _vo;
		}

		/**
		 * 设置当前model的data，
		 */
		public function set data(vo:*):void
		{
			_vo=vo;
			if (_vo != null)
			{
				id=_vo.id;
				name=_vo.name;
				reset();
			}
		}

		/**
		 * 重置该model到初始状态
		 */
		public function reset():void
		{
			isDestroy=false;
			_exp_current=0;
			_hp_current=_vo.hp;
			_mp_current=_vo.mp;
			_level=1;
			_skillPlus.setData({all: _vo.skill, current: _vo.skill});
			_buffPlus.setData([]);
		}

		public function setVocationVo(data:VocationalVo):void
		{
//			_vocationVo.data={vo: data, level: level};
			_vocationVo.data=data;
			_vocationVo.data=level;
			if (data == null)
			{
				trace(this + "职业信息为空");
			}
		}

		public function setState(state:int):void
		{
			switch (state)
			{
				case SpriteState.IDLE:
					break;
				case SpriteState.PATROL:
					if (_target != null)
					{
						setState(SpriteState.ATTACK);
					}
					break;
				case SpriteState.ATTACK:
					_actionList=_skillPlus.getList(_target);
					setState(SpriteState.ATTACK_DOING);
					break;
				case SpriteState.ATTACK_DOING:
//					_action.push(_action); //如果没有中断攻击，则马上开始攻击动作
//					_action.action.push(_actionList);
					_action.action.concat(_actionList);
					break;
				case SpriteState.DEVASTATED:
					break;
				case SpriteState.DEVASTATED_GROUND:
					break;
				case SpriteState.TO_ENEMY:
					break;
				case SpriteState.TO_RUN:
					break;
			}
		}

		public function onStart(data:*=null):void
		{
			if ((data == null) && (data.target.length < 1))
			{
				onStop();
			}
			else
			{
				_target=data.target; //这里取第一个人
				_action=data.action;
				setState(SpriteState.PATROL);
			}
		}

		public function onStop(data:*=null):void
		{
			isDestroy=true;
			setState(SpriteState.IDLE);
		}

		public function getPropertyByName(name:String):Number
		{
			return _skillPlus.hasOwnProperty(name) ? _skillPlus[name] : 0 + _buffPlus.hasOwnProperty(name) ? _buffPlus[name] : 0 + this.hasOwnProperty(name) ? this[name] : 0 + getVocationalPropertyByName(name);
		}

		public function getVocationalPropertyByName(name:String):Number
		{
			return Math.floor(level * (vocationVo.hasOwnProperty(name) ? vocationVo[name] : 0));
		}

		public function updateItem(data:*):void
		{
			if (data is MonsterModel)
			{

			}
		}

		public function clearn():void
		{

		}

		/**
		 * 当前所在地图id
		 */
		public function get mapId():int
		{
			return _mapId;
		}

		/**
		 * @private
		 */
		public function set mapId(value:int):void
		{
			_mapId=value;
		}

		public function get level():int
		{
			return _level;
		}

		public function set level(value:int):void
		{
			_level=value;
		}

		public function get attack_min():int
		{
			return _attack_min;
		}

		public function get attack_max():int
		{
			return _attack_max;
		}

		public function get vocationVo():VocationalModel
		{
			return _vocationVo;
		}

		public function get exp_current():Number
		{
			return _exp_current;
		}

		public function set exp_current(value:Number):void
		{
			_exp_current=value;
			if (_exp_current >= data.exp)
			{
				_exp_current=0;
				level++;
				_vocationVo.data=level;
			}
		}

		public function get hp_current():Number
		{
			return _hp_current;
		}

		public function set hp_current(value:Number):void
		{
			_hp_current=value;
			if (_hp_current > hp)
			{
				_hp_current=hp;
			}
			if (_hp_current < 1)
			{
				onStop();
			}
		}

		public function get mp_current():Number
		{
			return _mp_current;
		}

		public function set mp_current(value:Number):void
		{
			_mp_current=value;
			if (_mp_current > mp)
			{
				_mp_current=mp;
			}
		}

		public function addItem(data:*):void
		{

		}

		//iproperty属性
		public function get hp():Number
		{
//			return _skillPlus.hp + _buffPlus.hp;
			return getPropertyByName("hp");
		}

		public function set hp(value:Number):void
		{
			_hp_current=value;
		}

		public function get mp():Number
		{
			return _skillPlus.mp + _buffPlus.mp;
		}

		public function set mp(value:Number):void
		{
			_mp_current=value;
		}

		public function get str():Number
		{
			return getPropertyByName("str");
		}

		public function set str(value:Number):void
		{
		}

		public function get agi():Number
		{
			return getPropertyByName("agi");
		}

		public function set agi(value:Number):void
		{
		}

		public function get inte():Number
		{
			return getPropertyByName("inte");
		}

		public function set inte(value:Number):void
		{
		}

		public function get spirit():Number
		{
			return getPropertyByName("spirit");
		}

		public function set spirit(value:Number):void
		{
		}

		public function get att():Number
		{
			return getPropertyByName("att");
		}

		public function set att(value:Number):void
		{
		}

		public function get phyDefense():Number
		{
			return getPropertyByName("phyDefense");
		}

		public function set phyDefense(value:Number):void
		{
		}

		public function get magDefense():Number
		{
			return getPropertyByName("magDefense");
		}

		public function set magDefense(value:Number):void
		{
		}

		public function get hit():Number
		{
			return getPropertyByName("hit");
		}

		public function set hit(value:Number):void
		{
		}

		public function get dodge():Number
		{
			return getPropertyByName("dodge");
		}

		public function set dodge(value:Number):void
		{
		}

		public function get crit():Number
		{
			return getPropertyByName("crit");
		}

		public function set crit(value:Number):void
		{
		}

		public function get meleeDamage():Number
		{
			return getPropertyByName("meleeDamage");
		}

		public function set meleeDamage(value:Number):void
		{
		}

		public function get rangedDamage():Number
		{
			return getPropertyByName("rangedDamage");
		}

		public function set rangedDamage(value:Number):void
		{
		}

		public function get meleeMagic():Number
		{
			return getPropertyByName("meleeMagic");
		}

		public function set meleeMagic(value:Number):void
		{
		}

		public function get rangedMagic():Number
		{
			return getPropertyByName("rangedMagic");
		}

		public function set rangedMagic(value:Number):void
		{
		}

		public function get goodsLuck():Number
		{
			return getPropertyByName("goodsLuck");
		}

		public function set goodsLuck(value:Number):void
		{
		}

		public function get goldLuck():Number
		{
			return getPropertyByName("goldLuck");
		}

		public function set goldLuck(value:Number):void
		{
		}

		public function get variation():Number
		{
			return getPropertyByName("variation");
		}

		public function set variation(value:Number):void
		{
		}

		public function get rp():Number
		{
			return getPropertyByName("rp");
		}

		public function set rp(value:Number):void
		{
		}

		public function get speed():int
		{
			return getPropertyByName("speed");
		}

		public function set speed(value:int):void
		{
		}

		public function get attSpeed():int
		{
			return getPropertyByName("attSpeed");
		}

		public function set attSpeed(value:int):void
		{
		}

		/**
		 * 精灵类型
		 */
		public function get type():String
		{
			return _type;
		}

		/**
		 * @private
		 */
		public function set type(value:String):void
		{
			_type=value;
		}

	}
}
