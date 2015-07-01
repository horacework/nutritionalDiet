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
    
    var callback = req.query.callback;
    
    if (categoryID == '0') {    //all
        req.models.foodInfo
          .find({isDel:0})
          .order(order)
          .limit(10)
          .offset(skip)
          .run(function (err,item) {
            if(item[0]==undefined){
                if (callback==null) {
                    res.send('null');
                }else{
                    res.setHeader("Content-type", "application/x-javascript;charset=utf-8");
                    res.send(callback + "(" +"{0:null}"+ ")");
                }
            }else{
                if (callback==null) {
                    res.send(item);
                }else{
                    var retu = require('../routes/commonFun.js').jsonpCallbackItem(item);
                    res.setHeader("Content-type", "application/x-javascript;charset=utf-8");
                    res.send(callback + "(" +retu+ ")");
                }
            }
          });
    }else{                    //select limit by categoryID
        req.models.foodInfo
          .find({category:categoryID,isDel:0})
          .order(order)
          .limit(10)
          .offset(skip)
          .run(function (err,item) {
            
              if(item[0]==undefined){
                  if (callback == null) {
                      res.send('null');
                  }else{
                    res.setHeader("Content-type", "application/x-javascript;charset=utf-8");
                    res.send(callback + "(" +"{0:null}"+ ")");
                  }
              }else{
                  if (callback ==null) {
                      res.send(item)
                  }else{
                        var retu = require('../routes/commonFun.js').jsonpCallbackItem(item);
                        res.setHeader("Content-type", "application/x-javascript;charset=utf-8");
                        res.send(callback + "(" +retu+ ")");
                  }
              }
            });
      } 
};

exports.getList = function (req, res, next) {
    
    var categoryID = req.query.category;// food category
    var callback = req.query.callback;
    var retu = new Object;
    var i = 0;
    req.models.foodInfo.find({category:categoryID,isDel:0},function (err,item) {
        while(true){
            if (item[i]==null) {
                if (callback==null) {
                    res.send(retu);
                }else{
                    res.setHeader("Content-type", "application/x-javascript;charset=utf-8");
                    var ret = JSON.stringify(retu);
                    res.send(callback + "(" +ret+ ")");
                }
                break;
            }else{
                var temp = new Object;
                temp.id = item[i].id;
                temp.name = item[i].name;
                retu[i] = temp;
                i++;
            }
        }
    });
}