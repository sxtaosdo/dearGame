package com.player.core.data.model.fun
{
	import com.player.core.data.model.sprite.ISpriteModel;

	public class SkillFun
	{
		public function SkillFun()
		{
		}

		/**
		 * 计算技能的输出伤害，这里是纯技能的伤害，不包含装备的浮动伤害
		 * @param monsterModel 怪物对象
		 * @param skillVo 技能数据
		 */
		public static function getSkillHurt(model:ISpriteModel, formula:String):Number
		{
			var temp:Array
			if (formula.indexOf("@") > -1)
			{
				var lf:Array=formula.split("@");
//				temp=lf[model.data.skill];
				temp=lf[0].split("#");
			}
			else
			{
				temp=formula.split("#"); //取一个技能描述列表
			}
			var value:Number=0;
			var len:int=temp.length;
			for (var i:int=0; i < len; i+=3) //每隔三位取一个描述组并计算
			{
				switch (temp[i + 1])
				{
					case "+":
						value+=model.getPropertyByName(temp[i]) + temp[i + 2];
						break;
					case "-":
						value+=model.getPropertyByName(temp[i]) - temp[i + 2];
						break;
					case "*":
						value+=model.getPropertyByName(temp[i]) * temp[i + 2];
						break;
					case "/":
						value+=model.getPropertyByName(temp[i]) / temp[i + 2];
						break;
				}
			}
			return value;
		}
	}
}
