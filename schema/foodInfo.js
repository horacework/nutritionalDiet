
exports = module.exports = function (db, models) {
	models.foodInfo = db.define("food_info", {
            id: {type: 'integer', key: true},
            name: {type: 'text'},
            heat: {type:'integer'},
            protein: {type:'number'},
            fat: {type:'number'},
            vitaminC: {type:'number'},
            vitaminE: {type:'number'},
            vitaminB1: {type:'number'},
            vitaminB2: {type:'number'},
            Fe: {type:'number'},
            Zn: {type:'number'},
            Se: {type:'number'},
            category: {type:'integer'},
            isDel: {type: 'integer'}
        });
}
