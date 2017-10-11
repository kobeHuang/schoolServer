var express = require('express');
var router = express.Router();
var fs = require("fs");
var middlewares = require('../controllers/middlewares');
var utils = require('../controllers/utils');

/*
 *  上传图片
 *  图片保存的路径为images/2017520+用户类型+用户ID/当前时间串+用户ID
 */
router.post('/img',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req);
	var imgData = params.img;
	var imgType = params.type;
	var userInfo = req.api_user;
	var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
	var dataBuffer = new Buffer(base64Data, 'base64');
	var filePath = '2017520' + userInfo.userType + userInfo.id;
	var fileName = new Date().getTime() + userInfo.id;

	var extName = ''; //后缀名
    switch (imgType) {
        case 'image/pjpeg':
        case 'image/jpeg':
            extName = 'jpg';
            break;
        case 'image/png':
        case 'image/x-png':
            extName = 'png';
            break;
        case 'image/gif':
            extName = 'gif';
            break;
        default:
        	break;
    }

    if (extName.length === 0) {
    	res.json(utils.resJSON(202,'只支持png和jpg格式图片'));
        return;
    } 

    filePath = "images/" + filePath;

	//判断文件夹是否存在，如果不存在则创建文件夹
	fs.exists('public/'+filePath,function(exists){
		if(!exists){
			fs.mkdir('public/'+filePath,function(err){
				if(err){
                    res.json(utils.resJSON(998,'服务端错误'));
                }else{
                    fs.writeFile('public/'+filePath+'/'+fileName+'.'+extName, dataBuffer, function(err) {
				        if(err){
				            res.json(utils.resJSON(998,'服务端错误'));
				        }else{
				        	res.json(utils.resJSON(200,{img: 'http://'+req.headers.host+'/'+filePath+'/'+fileName+'.'+extName}));
				        }
				    });
                }
			});
		}else{
			fs.writeFile('public/'+filePath+'/'+fileName+'.'+extName, dataBuffer, function(err) {
		        if(err){
		          res.json(utils.resJSON(998,'服务端错误'));
		        }else{
		          res.json(utils.resJSON(200,{img: 'http://'+req.headers.host+'/'+filePath+'/'+fileName+'.'+extName}));
		        }
		    });
		}
	});

});


 module.exports = router;