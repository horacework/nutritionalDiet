exports.postdata = function (req, res, next) {
	var async = require('async');
	var postJson = req.body;
	var nutrStandard = req.models.nutrStandard;
	var foodInfo = req.models.foodInfo;
	var postNutr = {		//初始化上传营养值对象
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
	var standard = new Object;
	var reData = new Object;
	var i = 0;
	console.log(postNutr);
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
					foodInfo.get( 1/*solData.id*/, function (err,item) {
						//postNutr.fat 		= postNutr.fat+125;
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
					console.log(postNutr);
					cb(err);
				}
			);
//			for (var i = 0; postJson[i]!=null ;i++) {
//				console.log('loop');
//				var solData = postJson[i];
//				foodInfo.get( 1/*solData.id*/, function (err,item) {
//					postNutr.fat 		+= 125;
//					postNutr.fat 		+= item.fat*solData.weight;
//					postNutr.heat 		+= item.heat*solData.weight;
//					postNutr.protein 	+= item.protein*solData.weight;
//					postNutr.vitaminC 	+= item.vitaminC*solData.weight;
//					postNutr.vitaminE 	+= item.vitaminE*solData.weight;
//					postNutr.vitaminB1 	+= item.vitaminB1*solData.weight;
//					postNutr.vitaminB2 	+= item.vitaminB2*solData.weight;
//					postNutr.Fe 		+= item.Fe*solData.weight;
//					postNutr.Zn 		+= item.Zn*solData.weight;
//					postNutr.Se 		+= item.Se*solData.weight;
//					console.log('ssssss');
//					console.log(item);
//					console.log(solData);
//					var j = i+1;
//					if (postJson[j]==null) {
//						cb(err);
//					}
//				});
//				//i++;
//			}; 
	    }
	],function(err){  
	    console.log('Todo:组建返回对象');
		res.send('ddddsas');
	})
	
	
//	nutrStandard.find({isDel:0},function (err,results) {//Todo:错误机制
//		while (results[k]!=null) {		//组建标准营养对象
//			standard[results[k].name] = results[k].content;
//			k++;
//		};
//		while (postJson[i]!=null) {
//			var solData = postJson[i];
//			foodInfo.get(solData.id, function (err,item) {
//				postNutr.fat 		+= 125;
//				postNutr.fat 		+= item.fat*solData.weight;
//				postNutr.heat 		+= item.heat*solData.weight;
//				postNutr.protein 	+= item.protein*solData.weight;
//				postNutr.vitaminC 	+= item.vitaminC*solData.weight;
//				postNutr.vitaminE 	+= item.vitaminE*solData.weight;
//				postNutr.vitaminB1 	+= item.vitaminB1*solData.weight;
//				postNutr.vitaminB2 	+= item.vitaminB2*solData.weight;
//				postNutr.Fe 		+= item.Fe*solData.weight;
//				postNutr.Zn 		+= item.Zn*solData.weight;
//				postNutr.Se 		+= item.Se*solData.weight;
//				console.log('ssssss');
//			});
//			i++;
//		};
//		console.log(standard);
//		console.log(postNutr);
//	});
//	res.send(reData);
}