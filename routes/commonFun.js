exports.jsonpCallbackItem = function (item){
	
	var ret = new Object;
	
    for (var index = 0; index < item.length; index++) {
        ret[index] = item[index];
    }
	return JSON.stringify(ret);
};

exports.resSend = function (req,res,dataJson){
	
	var jsoncallback = req.query.callback;
	var retData = JSON.stringify(dataJson);
	
    if (jsoncallback==null) {
        res.send(dataJson);
    }else{
        res.setHeader("Content-type", "application/x-javascript;charset=utf-8");
        res.send(jsoncallback+"("+retData+")");
    }
};