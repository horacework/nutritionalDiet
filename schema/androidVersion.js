exports = module.exports = function (db,models) {
    models.androidVersion = db.define("android_version", {
            id: {type: 'integer', key: true},
            version: {type: 'text'},
			downLink: {type: 'text'},
            isDel: {type: 'integer'}
        });
}