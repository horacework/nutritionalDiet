exports = module.exports = function(db, models) {
  //embeddable docs first
  require('./schema/foodInfo')(db, models);
  require('./schema/foodCategory')(db, models);
  require('./schema/nutrStandard')(db, models);
  require('./schema/androidVersion')(db, models);
  require('./schema/user')(db, models);
  
};