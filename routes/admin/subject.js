var express = require('express');
var router = express.Router();
var utils = require('../../controllers/utils');
var middlewares = require('../../controllers/middlewares');
var dbHelper = require('../../database/dbHelper');

var helper = new dbHelper.helper();


//学科接口

/*
 *  学科列表
 *  参数：body/query:
 					pageno----页码
 					pagesize----每页条数（默认20）
 					search----搜索（用户名称）    
 *		  headers:
 					userToken:  用户token
 */
 router.all('/subjects/list',middlewares.checkToken,function(req, res, next){
 	var params = utils.reqParams(req),
 		headers = req.headers;
 	var total = 0,
		pageno = 1,
		pagesize = 20,
		search = '';

	if(params.search){
		search = params.search;
	}

	if(!utils.sqlCheck(search)){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}

	if(params.pageno){
		pageno = params.pageno;
	}

	if(params.pagesize){
		pagesize = params.pagesize;
	}
	var _start = (pageno-1) * pagesize,
		sql1 = "SELECT * FROM subjects",
		sql2 = ";SELECT count(*) as total FROM subjects";

	if(!utils.isEmpty(search)){
		sql1 += " WHERE name like '%"+ search +"%'";
		sql2 += " WHERE name like '%"+ search +"%'";
	}
	sql1 += " limit "+ pagesize +" offset "+_start;

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
 *  学科详情
 *  参数：body/query:
 					id----搜索（学科ID）    
 *		  headers:
 					userToken:  用户token
 */
router.all('/subjects/detail',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

	if(!params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}


 	helper.query(res, "SELECT * FROM subjects WHERE id=" + params.id, function(results){
 		res.json(utils.resJSON(200,results[0]));
 	});

});

 /*
 *  学科审核
 *  参数：body/query:
 					status----0/1
 					id----用户ID   
 *		  headers:
 					userToken:  用户token
 */
router.all('/subjects/status',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;
 	if(params.status === undefined || !params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}
 	helper.update(res, "UPDATE subjects SET status="+ params.status +" WHERE id="+ params.id, function(result){
 		var affectedRows = result.affectedRows;
 		if(affectedRows > 0){
			res.json(utils.resJSON(200,{status: params.status}));
 		}else{
 			res.json(utils.resJSON(201,'学科id不存在'));
 		}
 	});
});

 /*
 *  学科修改
 *  参数：body/query:
 					body   
 *		  headers:
 					userToken:  用户token
 */
router.all('/subjects/update',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;
 	if(!params.id || !utils.sqlCheck(params.name)){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}
 	
 	helper.query(res,"SELECT * FROM subjects WHERE name='"+params.name+"' and id!="+params.id,function(rows){
 		if(rows.length > 0){
			res.json(utils.resJSON(201,'该学科已经存在'));
 		}else{
 			helper.update(res, "UPDATE subjects SET name='"+ params.name +"' WHERE id="+ params.id, function(result){
		 		var affectedRows = result.affectedRows;
		 		if(affectedRows > 0){
					res.json(utils.resJSON(200,{}));
		 		}
		 	});
 		}
 	});
});

 /*
 *  学科添加
 *  参数：body/query:
 					body   
 *		  headers:
 					userToken:  用户token
 */
router.all('/subjects/add',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

 	for(var key in params){
 		if(!utils.sqlCheck(params[key])){
 			res.json(utils.resJSON(400,'参数错误'));
 			return false;
 		}
 	}

 	helper.query(res,"SELECT * FROM subjects WHERE name='"+params.name+"'",function(rows){
 		if(rows.length > 0){
			res.json(utils.resJSON(201,'该学科已经存在'));
 		}else{
 			helper.insert(res, "INSERT subjects (name,create_time,code,schoolID,status) VALUES('"+params.name+"','"+new Date().toLocaleString()+"','"+params.code+"',1,"+params.status+")", function(result){
		 		if(result.affectedRows > 0){
					res.json(utils.resJSON(200,{}));
		 		}
		 	});
 		}
 	}); 	
});


 module.exports = router;