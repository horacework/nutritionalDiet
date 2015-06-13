exports = module.exports = function (db,models) {
    models.user = db.define("user", {
            tokenID: {type: 'integer', key: true},
            name: {type: 'text'},
			pass: {type: 'text'}
        });
}