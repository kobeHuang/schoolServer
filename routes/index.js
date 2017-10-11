var express = require('express');
var router = express.Router();
var utils = require('../controllers/utils');
var md5 = require('md5')



/* 验证头部信息请求内容 */
router.use(function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

 	var vaildBody = JSON.stringify(params)+'mySchoolAdmin';
 	if(!headers.usertoken){
		vaildBody +=  headers.usertoken;
	}
	vaildBody = md5(vaildBody);
 	if(vaildBody = headers.sign){
 		next();
 	}else{
 		res.json(utils.resJSON(203,'签名验证错误'));
 	}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '智慧校园' });
});

module.exports = router;
