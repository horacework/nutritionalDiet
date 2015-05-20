exports.getCategoryList = function (req, res, next) {
	req.models.foodCategory.find({isDel:0},function (err,item) {
      res.send(item);
    });
}