exports.postdata = function (req, res, next) {
	var async = require('async');
	var postJson = req.query;	//获取post数据
	//console.log(postJso);
	// var postJson = {		//测试Object
	// 	0:{id:5,weight:50},	//weight单位为100g
	// 	1:{id:9,weight:63},
	// 	2:{id:6,weight:99},
	// }
	var jsonpcallback = req.query.callback;
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
			
			async.whilst(				//处理上传数据，查询计算各个营养值
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
	    },function (callback) {					//摄入营养值与每日标准对比
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
		},function (callback) {
			reData.advice = new Object;
			reData.advice.moreEat = new String;
			reData.advice.lessEat = new String;
			//接下来的判断方式非常粗糙！！！！小朋友千万别学
			suggestFood('fat','坚果类,动物类皮肉');
			suggestFood('heat','牛肉,烘烤类食品');
			suggestFood('protein','豆类,水产类,蛋类');
			suggestFood('vitaminC','草莓,橘子等水果');
			suggestFood('vitaminE','豆油,芝麻油');
			suggestFood('vitaminB1','动物内脏,粮谷类');
			suggestFood('vitaminB2','全麦粉,豆腐');
			suggestFood('Fe','猪肝,鸡血');
			suggestFood('Zn','牡蛎,鱼类');
			suggestFood('Se','猪肾,鱿鱼');
			callback(null);
		}
	],function(err){  	//组建返回对象
		if (jsonpcallback==null) {
			res.send(reData);
		}else{
            res.setHeader("Content-type", "application/x-javascript;charset=utf-8");
            var ret = JSON.stringify(reData);
			res.send(jsonpcallback + "(" +ret+ ")");
		}
		
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
	function suggestFood(element,adviceFood) {
		if (reData.result.judge[element]=='over') {
				reData.advice.lessEat  += adviceFood+',';
			}else if (reData.result.judge[element]=='lack') {
				reData.advice.moreEat  += adviceFood+',';
			};
	}
};

exports.getStandard = function (req, res, next) {
	
	var nutrStandard = req.models.nutrStandard;
	var k = 0;
	var standard = new Object;
    
	nutrStandard.find({isDel:0},function (err,results){
		while (results[k]!=null) {		//组建标准营养对象
			standard[results[k].name] = results[k].content;
			k++;
		};
		res.send(standard);
	});
	
};

//function perDayStandard(req)  {  //模块化失败，莫名其妙竟然return不了数据
//	
//	var nutrStandard = req.models.nutrStandard;
//	var k = 0;
//	var standard = new Object;
//    
//	nutrStandard.find({isDel:0},function (err,results){
//		while (results[k]!=null) {		//组建标准营养对象
//			standard[results[k].name] = results[k].content;
//			k++;
//			console.log(k);
//		};
//		console.log(JSON.stringify(standard));
//		return JSON.stringify(standard);
//	});
//	
//}