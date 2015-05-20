exports = module.exports = function (db,models) {
    models.foodCategory = db.define("food_category", {
            id: {type: 'integer', key: true},
            name: {type: 'text'},
            isDel: {type: 'integer'}
        });
}
