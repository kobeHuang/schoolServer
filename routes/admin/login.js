var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var utils = require('../../controllers/utils');
var dbHelper = require('../../database/dbHelper');

var helper = new dbHelper.helper();


//管理平台登录接口

/*
 *  登录
 *  参数：@account: 账号,
 		  @password: 密码---md5    admin123456
 */

router.post('/login',function(req, res, next){
	
	var params = req.body;
	if(!params.account || !params.password){
		res.json(utils.resJSON(400,'参数错误'));
		return false;
	}

	helper.query(res,"SELECT * FROM admin WHERE account='"+params.account+"' and password='"+params.password+"'", function(result){
		if(result.length > 0){
			if(result[0].status){
				var _info = Object.assign({}, result[0]);
				_info.userType = 4;
				delete _info.password;
				var _key = new Buffer(_info.account);
				_key = _key.toString('base64');
				var token = jwt.sign(_info, _key, {
		            'expiresIn': Math.floor(Date.now() / 1000) + (60 * 60) * 24 // 设置过期时间
		        });
				helper.update(res,"UPDATE login_token SET status=0 WHERE account='"+_info.account+"'",function(result1){
					helper.insert(res,"INSERT INTO login_token(account,token,token_key,type,last_time,status) VALUES('"+_info.account+"','"+token+"','"+_key+"',4,'"+new Date().toLocaleString()+"',1)",function(result2){
						_json = utils.resJSON(200,{
								id: _info.id,
								userToken: token,
								account: _info.account,
								userType: 4
						});
						res.json(_json);
					});
				});
			}else{
				_json = utils.resJSON(201,'该用户不能正常使用，请联系后台管理员');
				res.json(_json);
			}
		}else{
			_json = utils.resJSON(202,'用户名或者密码错误');
			res.json(_json);
		}
		
	});
});



/*
 *  登出
 *  参数：@userToken: 当前用户token
 */
router.all('/logout',function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

	if(!headers.userToken){
		res.json(utils.resJSON(400,'参数错误'));
		return false;
	}

	helper.update(res,"UPDATE login_token SET status=0 WHERE token='"+headers.userToken+"'",function(resource){
		res.json(utils.resJSON(200,{msg: '账号已退出'}));
	});
});

module.exports = router;
