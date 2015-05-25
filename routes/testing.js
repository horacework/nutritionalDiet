//check get json connect
exports.getJson= function (req, res, next) {
    var user = {
        no : '001',
        data:{
          name:'cry',
          chinese:'陈荣源'
        }
    };
    
    var jsoncallback = req.query.callback;
    if (jsoncallback==null) {
        res.send(user);
    }else{
        res.setHeader("Content-type", "application/x-javascript;charset=utf-8");
        res.send(jsoncallback+"({'hello':'world2222',no : '001',data:{name:'cry',chinese:'陈荣源'}})");
    }
    
};

//check post json connect
exports.postJson = function (req, res, next) {
    console.log(req.body.student);
    res.send('true');
}