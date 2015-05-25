exports.jsonpCallbackItem = function (item){
	var ret = new Object;
    for (var index = 0; index < item.length; index++) {
        ret[index] = item[index];
    }
	return JSON.stringify(ret);
}