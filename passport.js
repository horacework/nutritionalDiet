exports = module.exports = function(app, passport) {
	var LocalStrategy = require('passport-local').Strategy;
	
	passport.use(new LocalStrategy(
    	function(username, password, done) {
	        var user = {
	            id: '1',
	            username: 'admin',
	            password: '1234'
	        }; // TODO:通过数据库方式读取登陆账号,hash,盐值验证计算

	        if (username !== user.username) {
	            return done(null, false, { message: 'Incorrect username.' });
	        }
	        if (password !== user.password) {
	            return done(null, false, { message: 'Incorrect password.' });
	        }
	        return done(null, user);	//成功返回user对象
    	}
	));

	passport.serializeUser(function (user, done) {//保存user对象
	    done(null, user);//TODO:通过数据库方式操作
	});
	
	passport.deserializeUser(function (user, done) {//删除user对象
	    done(null, user);//TODO:通过数据库方式操作
	});
	
};