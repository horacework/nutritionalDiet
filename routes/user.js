exports.islogin= function (req, res, next) {
	if (req.isAuthenticated()) {
		res.send('ture')
	}else{
		res.send('false')
	}
};

exports.login= function (req, res, next) {
//	var passport = require('passport');// phonegap利用session或cookies保持会话比较蛋疼
//	passport.authenticate('local', {
//        successRedirect: '/islogin',
//        failureRedirect: '/islogin'
//    })
	var User = req.models.user;
	var username = req.body.username;
	var password = req.body.password;
	console.log(req.body);
	User.one({name:username,pass:password},function (err,result) {
		console.log(result);
		res.send(result);
	})
};

exports.signup= function (req, res, next) {
	var User = req.models.user;
	var username = req.body.username;
	var password = req.body.password;
	User.create({name:username,pass:password},function (err,result) {
		res.send(result[0].tokenID);
	})
}