exports.init = function (req, res, next) {
	var categoryID = req.query.category;// food category
    
    if(req.query.element=='null'){//food element select
      var elementID = 'heat';
    }else{
      var elementID = req.query.element;
    }

    if (req.query.rank=='null'||req.query.rank=='up') {//food list show up or down
      var order= elementID;
    }else{
      var order = '-'+elementID;
    }
    var page = req.query.page;// per page has 10 object data
    var skip = 10*(page-1);
    req.models.foodInfo
      .find({category:categoryID,isDel:0})
      .order(order)
      .limit(10)
      .offset(skip)
      .run(function (err,item) {
        if(item[0]==undefined){
            res.send('null');
        }else{
            res.send(item);
        }
      });
}