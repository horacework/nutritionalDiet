exports = module.exports = function (app,passport) {
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });//Express example
  });

  app.get('/json',require('../routes/testing').getJson);
  
  app.post('/json',require('../routes/testing').postJson);
  
  app.get('/islogin',require('../routes/user').islogin);
  
  app.post('/login',require('../routes/user').login);
  
  app.post('/signup',require('../routes/user').signup);
  
  app.get('/getcategory',require('../routes/foodCategory').getCategoryList);
  
  app.get('/getfood',require('../routes/foodInfo').init);
  
  app.get('/getfoodlist',require('../routes/foodInfo').getList);
  
  app.get('/getstandard',require('../routes/analysis').getStandard);
  
  app.get('/foodconsum',require('../routes/analysis').postdata);
  
  app.get('/android/update',require('../routes/android').checkUpdate);
  
  app.all('*', require('../routes/http404').init);//Router 404
};
