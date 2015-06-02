exports = module.exports = function (app) {
  app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });//Express example
  });

  app.get('/json',require('../routes/testing').getJson);
  
  app.post('/json',require('../routes/testing').postJson);
  
  app.get('/getcategory',require('../routes/foodCategory').getCategoryList);
  
  app.get('/getfood',require('../routes/foodInfo').init);
  
  app.post('/analysis',require('../routes/analysis').postdata);
  
  app.all('*', require('../routes/http404').init);//Router 404
};
