//check get json connect
exports.getJson= function (req, res, next) {
    var user = {
        no : '001',
        data:{
          name:'cry',
          chinese:'陈荣源'
        }
    };
    res.send(user);
};

//check post json connect
exports.postJson = function (req, res, next) {
    console.log(req.body.student);
    res.send('true');
}