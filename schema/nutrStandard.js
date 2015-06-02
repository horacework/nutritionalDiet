exports = module.exports = function (db,models) {
    models.nutrStandard = db.define("nutr_standard", {
            name: {type: 'text', key: true},
            content: {type: 'number'}
        }
//        ,{
//            methods:{
//                heat: function () {
//                    return this.name
//                }
//            }
//        }
        );
}