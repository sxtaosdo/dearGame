package com.player.core.data.model.sprite
{
	import com.player.core.data.ConfigDef;
	import com.player.core.data.ConfigManager;
	import com.player.core.data.model.helper.EquipHelp;
	import com.player.core.data.vo.VocationalVo;
	import com.player.core.data.vo.sprite.HeroVo;

	/**
	 * 玩家的英雄
	 * @author shixt<br>
	 * 比怪物多了
	 * <listing>
	 * 装备
	 * 子精灵
	 * </listing>
	 */
	public class HeroModel extends MonsterModel implements ISpriteModel
	{
		private var _data:HeroVo;
		private var _equipPlus:EquipHelp;

		public function HeroModel(vo:HeroVo=null)
		{
			super();
			_type=SpriteType.SPRITE_TYPE_HERO;
			_equipPlus=new EquipHelp();
			data=vo;
		}

		override public function set data(vo:*):void
		{
			if (vo != null)
			{
				id=vo.id;
				name=vo.name;
				_data=vo;
				reset();
			}
		}

		override public function get data():*
		{
			return _data;
		}

		override public function reset():void
		{
			isDestroy=false;
			_exp_current=0;
			_level=1;
			_equipPlus.setData(_data.equip);
			_skillPlus.setData({all: (ConfigManager.instance.getDataByName(ConfigDef.FILE_NAME_VOCATIONAL)[_data.vocational] as VocationalVo).skill, current: data.skill});
			_buffPlus.setData([]);
		}

		override public function setVocationVo(data:VocationalVo):void
		{
			super.setVocationVo(data);
			_hp_current=getPropertyByName("hp");
			_mp_current=getPropertyByName("mp");
		}

		override public function getPropertyByName(name:String):Number
		{
			return (_skillPlus.hasOwnProperty(name) ? _skillPlus[name] : 0) + (_buffPlus.hasOwnProperty(name) ? _buffPlus[name] : 0) + /*(this.hasOwnProperty(name) ? this[name] : 0) +*/ (_equipPlus.hasOwnProperty(name) ? _equipPlus[name] : 0) + getVocationalPropertyByName(name);
		}

		override public function updateItem(data:*):void
		{
			if (data.hasOwnProperty("type") && (data.type == SpriteType.SPRITE_TYPE_MONSTER))
			{
				var monster:MonsterModel=data;
				if (monster.isDestroy)
				{
					this.exp_current+=monster.level * 10 + monster.hp + monster.mp; //等级*10+hp+mp
				}
			}
		}

	}
}
