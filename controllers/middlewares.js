var jwt = require('jsonwebtoken');
var dbHelper = require('../database/dbHelper');
var utils = require('./utils');
var helper = new dbHelper.helper();

module.exports = {
	/*
	 * token 验证
	 */
	checkToken: function(req, res, next){
		var params = utils.reqParams(req),
 		headers = req.headers;

	 	if(!headers.usertoken){
	 		res.json(utils.resJSON(400,'参数错误'));
			return false;
	 	}

	 	helper.query(res,"SELECT * FROM login_token WHERE token='"+headers.usertoken+"' and status=1 and type=4", function(result){
	 		if(result.length > 0 && result[0].status){
				var _key = result[0]['token_key'];
				jwt.verify(headers.usertoken, _key, function(err, decoded) {
			      if (err) {
					res.json(utils.resJSON(999,'登录已失效'));
			      } else {
			        // 如果没问题就把解码后的信息保存到请求中，供后面的路由使用
			        req.api_user = decoded;
			        next();
			      }
			    });
			}else{
				res.json(utils.resJSON(999,'登录已失效')); 
			}
	 	});
	} 
}