
module.exports = {
	resJSON: function(code, data){
		if(code == '200'){
			return {
				code: code,
				data: data
			}
		}else{
			return {
				code: code,
				msg: data
			}
		}
	},
	isEmpty: function(str){
		str = str.replace(/(^\s*)|(\s*$)/g, '')
		if(str.length == 0)
			return true
		return false
	},
	reqParams: function(req){
		var _method = req.method;
	 	var params = {};

	 	if(_method == 'GET'){
	 		return params = req.query || req.params;
	 	}else{
	 		return params = req.body;
	 	}
	},
	sqlCheck: function(sql){
		var reg = /(\bDROP\b)|(\bTRUNCATE\b)|(\bDELETE\b)|(\bUPDATE\b)|(\bINSERT\b)|(\bEXEC\b)|(\bEXECUTE\b)/gi;
		var sqlError = sql.match(reg);
		if(sqlError && sqlError.length > 0){
			return true;
		}  
		return false;
	}
}