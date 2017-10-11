

/*
* Date格式化
* (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 \
* (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
*/
Date.prototype.Format = function(fmt){
var dt = {
	'M+' : this.getMonth() + 1,
	'd+' : this.getDate(),
	'h+' : this.getHours(),
	'm+' : this.getMinutes(),
	's+' : this.getSeconds(),
	'S+' : this.getMilliseconds()
}
if(/(y+)/.test(fmt)){
	fmt = fmt.replace(RegExp.$1,(this.getFullYear()+'').substr(4-RegExp.$1.length));
}
for(var o in dt){
	if(new RegExp('('+ o +')').test(fmt)){
		fmt = fmt.replace(RegExp.$1,(RegExp.$1.length == 1) ? dt[o] : ('00' + dt[o]).substr(('' + dt[o]).length));
	}
}
return fmt;
};

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
	isJSON: function(data){
		return typeof(data) == 'object' && Object.prototype.toString.call(data).toLowerCase() == '[object object]' && !data.length
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
			return false;
		}  
		return true;
	}
}