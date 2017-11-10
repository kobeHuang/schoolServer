var express = require('express');
var router = express.Router();
var utils = require('../../controllers/utils');
var middlewares = require('../../controllers/middlewares');
var dbHelper = require('../../database/dbHelper');

var helper = new dbHelper.helper();

//图片管理

/*
 *  图片列表
 *  参数：body/query:
 					type----类型
 					isAll----全部
 					pageno----页码
 					pagesize----每页条数（默认20）
 *		  headers:
 					userToken:  用户token
 */

router.all('/images/list',middlewares.checkToken,function(req, res){
    var params = utils.reqParams(req),
    headers = req.headers;
    var total = 0,
        pageno = 1,
        pagesize = 20,
        search = '',
        type = 0,
        isAll = false;

    if(params.pageno){
        pageno = params.pageno;
    }

    if(params.pagesize){
        pagesize = params.pagesize;
    }

    if(params.type){
        type = params.type;
    }

    if(params.isAll !== undefined){
        isAll = params.isAll;
    }

    var _start = (pageno-1) * pagesize,
        sql1 = "SELECT * FROM images",
        sql2 = ";SELECT count(*) as total FROM images";
    
    if(type){
        sql1 += ` WHERE type=${type}`;
        sql2 += ` WHERE type=${type}`;
    }

    if(!isAll){
		sql1 += " limit "+ pagesize +" offset "+_start;
    }
    
    helper.query(res, sql1 + sql2, function(results){
		var _data = {};
		total = results[1][0].total;
		_data.items = results[0];
		_data.total = total;
		_data.pageno = pageno;
		_data.pagesize = pagesize;
		res.json(utils.resJSON(200,_data));
	});
});



/*
 *  添加图片
 *  参数：body/query:
                    type----类型
                    title----标题
                    image----图片
                    link----链接
 *		  headers:
 					userToken:  用户token
 */

router.all('/images/add',middlewares.checkToken,function(req, res){
    var params = utils.reqParams(req),
    headers = req.headers;

    if(params.title && !utils.sqlCheck(params.title)){
        res.json(utils.resJSON(400,'参数错误'));
        return false;
    }

    helper.insert(res, `INSERT images (title,create_time,image,link,type,status) VALUES('${params.title}','${new Date().toLocaleString()}','${params.image}','${params.link}',${params.type},${params.status})`, function(result){
        if(result.affectedRows > 0){
            res.json(utils.resJSON(200,{}));
        }
    });
});


/*
 *  修改图片
 *  参数：body/query:
                    id
 					type----类型
                    title----标题
                    image----图片
                    link----链接
                    status----状态
 *		  headers:
 					userToken:  用户token
 */
router.all('/images/update',middlewares.checkToken,function(req, res){
    var params = utils.reqParams(req),
        headers = req.headers;
    if(!params.id || !utils.sqlCheck(params.title)){
        res.json(utils.resJSON(400,'参数错误'));
        return false;
    }
    helper.update(res, `UPDATE images SET title='${params.title}',image='${params.image}',link='${params.link}',type=${params.type},status=${params.status} WHERE id=${params.id}`, function(result){
        var affectedRows = result.affectedRows;
        if(affectedRows > 0){
           res.json(utils.resJSON(200,{}));
        }else{
            res.json(utils.resJSON(201,'id不存在'));
        }
    });
});

 /*
 *  图片审核
 *  参数：body/query:
 					status----0/1
 					id----图片ID   
 *		  headers:
 					userToken:  用户token
 */
router.all('/images/status',middlewares.checkToken,function(req, res, next){
    var params = utils.reqParams(req),
        headers = req.headers;
    if(params.status === undefined || !params.id){
        res.json(utils.resJSON(400,'参数错误'));
        return false;
    }

    helper.update(res, `UPDATE images SET status=${params.status} WHERE id=${params.id}`, function(result){
        var affectedRows = result.affectedRows;
        if(affectedRows > 0){
            res.json(utils.resJSON(200,{status: params.status}));
        }else{
            res.json(utils.resJSON(201,'id不存在'));
        }
    });
});


 /*
 *  图片删除
 *  参数：body/query:
 					id----图片ID   
 *		  headers:
 					userToken:  用户token
 */
router.all('/images/del',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

 	if(!params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}

 	helper.delete(res,`DELETE FROM images WHERE id in (${(params.id).toString()})`,function(result){
 		if(result.affectedRows > 0){
			res.json(utils.resJSON(200,{}));
 		}else{
 			res.json(utils.resJSON(201,'删除失败'));
 		}
 	}); 	
});

module.exports = router;