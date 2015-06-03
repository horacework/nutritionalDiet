exports.postdata = function (req, res, next) {
	var async = require('async');
	//var postJson = req.body;	//获取post数据
	var postJson = {		//测试Object
		0:{id:5,weight:50},	//weight单位为100g
		1:{id:9,weight:63},
		2:{id:6,weight:99},
	}
	var nutrStandard = req.models.nutrStandard;
	var foodInfo = req.models.foodInfo;
	var postNutr = {		//初始化post营养值对象
		fat: 0,
		heat: 0,
		protein: 0,
		vitaminC: 0,
		vitaminE: 0,
		vitaminB1: 0,
		vitaminB2: 0,
		Fe: 0,
		Zn: 0,
		Se: 0
	};
	var standard = new Object;	//营养标准
	var reData = new Object;	//返回对象
	var i = 0;
	
	async.waterfall([
	    function(callback){
			var k = 0;
	        nutrStandard.find({isDel:0},function (err,results){
				while (results[k]!=null) {		//组建标准营养对象
					standard[results[k].name] = results[k].content;
					k++;
				};
				callback(err);
			});
	          
	    },function(cb){
			
			async.whilst(
				function () {
					return postJson[i]!=null;
				},
				function (ccb) {
					
					var solData = postJson[i];
					foodInfo.get( solData.id, function (err,item) {
						postNutr.fat 		+= item.fat*solData.weight;
						postNutr.heat 		+= item.heat*solData.weight;
						postNutr.protein 	+= item.protein*solData.weight;
						postNutr.vitaminC 	+= item.vitaminC*solData.weight;
						postNutr.vitaminE 	+= item.vitaminE*solData.weight;
						postNutr.vitaminB1 	+= item.vitaminB1*solData.weight;
						postNutr.vitaminB2 	+= item.vitaminB2*solData.weight;
						postNutr.Fe 		+= item.Fe*solData.weight;
						postNutr.Zn 		+= item.Zn*solData.weight;
						postNutr.Se 		+= item.Se*solData.weight;
						i++;
						ccb(err);
					});
				},function (err) {
					cb(err);
				}
			);
	    },function (callback) {
			reData.standard = standard ;
			reData.postNutr = postNutr ;
			reData.result = new Object;
			reData.result.diff = new Object;
			reData.result.judge = new Object;
			reData.result.judge['fat'] 			=  disposeNutr('fat');
			reData.result.judge['heat'] 		=  disposeNutr('heat');
			reData.result.judge['protein'] 		=  disposeNutr('protein');
			reData.result.judge['vitaminC'] 	=  disposeNutr('vitaminC');
			reData.result.judge['vitaminE'] 	=  disposeNutr('vitaminE');
			reData.result.judge['vitaminB1'] 	=  disposeNutr('vitaminB1');
			reData.result.judge['vitaminB2'] 	=  disposeNutr('vitaminB2');
			reData.result.judge['Fe'] 			=  disposeNutr('Fe');
			reData.result.judge['Zn'] 			=  disposeNutr('Zn');
			reData.result.judge['Se'] 			=  disposeNutr('Se');
			callback(null);
		}
	],function(err){  	//组建返回对象
		res.send(reData);
	});
	
	function disposeNutr(e) {
		reData.result.diff[e] = postNutr[e] - standard[e];
		if (reData.result.diff[e] > standard[e]*0.1) {
			return 'over' ;			//该营养值过剩
		}else if (reData.result.diff[e] < -standard[e]*0.1) {
			return 'lack' ;			//该营养值过少
		}else{
			return 'good' ;			//该营养值处在正常范围
		}
	};
};

