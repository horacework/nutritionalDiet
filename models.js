exports = module.exports = function(db, models) {
  //embeddable docs first
  require('./schema/foodInfo')(db, models);
  require('./schema/foodCategory')(db, models);
  
};