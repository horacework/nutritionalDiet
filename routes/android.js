exports.checkUpdate= function (req, res, next) {
	
	var getVersion = req.models.androidVersion;
    var jsoncallback = req.query.callback;
    
    getVersion.one({isDel:0},['id','Z'],function (err,result) {
        if (err===null) {
            require('../routes/commonFun.js').resSend(req,res,result);
        }else{
            console.log(err);
        }
        
    });
    
};