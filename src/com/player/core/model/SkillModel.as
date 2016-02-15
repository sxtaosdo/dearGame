package com.player.core.model
{
	import com.player.core.data.model.sprite.ISpriteModel;
	import com.player.core.data.vo.SkillVo;

	/**
	 *
	 * @author shixt
	 * 基本的伤害
	 * 附加的属性
	 */
	public class SkillModel extends BaseModel implements IModel
	{
		private var _data:SkillVo;
		/**
		 * 是否是暴击
		 */
		private var _isCrite:Boolean=false;
		/**
		 * 技能目标
		 */
		private var _target:ISpriteModel;
		/**
		 * 技能源
		 */
		private var _source:ISpriteModel;
		/**
		 * 技能产生的buff
		 */
		private var _buffList:Vector.<BuffModel>;
		/**
		 * 最后释放时间
		 */
		private var _lastTime:Number=0;
		/**
		 * 魔法伤害
		 */
		private var _magicHurt:Number=0;
		/**
		 * 物理伤害
		 */
		private var _damageHurt:Number=0;
		/**
		 * 最终实际伤害
		 */
		private var _realHurt:Number=0;

		public function SkillModel()
		{
			super();
			_buffList=new Vector.<BuffModel>();
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
			isDestroy=false;
			clearnBuffList();
		}

		private function clearnBuffList():void
		{
			while (_buffList.length > 0)
			{
				_buffList.pop();
			}
			_realHurt=0;
		}

		public function addItem(data:*):void
		{

		}
		
		public function updateItem(data:*):void{
			
		}
		
		public function clearn():void{
			
		}

		/**
		 * 是否是暴击
		 */
		public function get isCrite():Boolean
		{
			return _isCrite;
		}

		/**
		 * @private
		 */
		public function set isCrite(value:Boolean):void
		{
			_isCrite=value;
		}

		/**
		 * 技能目标
		 */
		public function get target():ISpriteModel
		{
			return _target;
		}

		/**
		 * @private
		 */
		public function set target(value:ISpriteModel):void
		{
			_target=value;
		}

		/**
		 * 技能产生的buff
		 */
		public function get buffList():Vector.<BuffModel>
		{
			return _buffList;
		}

		/**
		 * @private
		 */
		public function set buffList(value:Vector.<BuffModel>):void
		{
			_buffList=value;
		}

		/**
		 * 最后释放时间
		 */
		public function get lastTime():Number
		{
			return _lastTime;
		}

		/**
		 * @private
		 */
		public function set lastTime(value:Number):void
		{
			_lastTime=value;
		}


		/**
		 * 设置伤害量的种子
		 * @param value
		 */
		public function setMagicPowerSeed(value:Number):void
		{
			_damageHurt=value;
		}
		
		public function setDamagePowerSeed(value:Number):void
		{
			_magicHurt=value;
		}

		/**
		 * 魔法伤害
		 */
		public function get magicHurt():Number
		{
			return _magicHurt;
		}

		/**
		 * 物理伤害
		 */
		public function get damageHurt():Number
		{
			return _damageHurt;
		}

		/**
		 * 最终实际伤害
		 */
		public function get realHurt():Number
		{
			return _realHurt;
		}

		/**
		 * @private
		 */
		public function set realHurt(value:Number):void
		{
			_realHurt = value;
		}

		/**
		 * 技能源
		 */
		public function get source():ISpriteModel
		{
			return _source;
		}

		/**
		 * @private
		 */
		public function set source(value:ISpriteModel):void
		{
			_source = value;
		}


	}
}
