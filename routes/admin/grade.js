var express = require('express');
var router = express.Router();
var utils = require('../../controllers/utils');
var middlewares = require('../../controllers/middlewares');
var dbHelper = require('../../database/dbHelper');

var helper = new dbHelper.helper();


//年级接口

/*
 *  年级列表
 *  参数：body/query:
 					isAll----全部
 					pageno----页码
 					pagesize----每页条数（默认20）
 					search----搜索（年级名称）    
 *		  headers:
 					userToken:  用户token
 */
 router.all('/grade/list',middlewares.checkToken,function(req, res, next){
 	var params = utils.reqParams(req),
 		headers = req.headers;
 	var total = 0,
		pageno = 1,
		pagesize = 20,
		search = '',
		isAll = false;

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

	if(params.isAll !== undefined){
		isAll = params.isAll;
	}

	var _start = (pageno-1) * pagesize,
		sql1 = "SELECT * FROM school_grade",
		sql2 = ";SELECT count(*) as total FROM school_grade";

	if(!utils.isEmpty(search)){
		sql1 += " WHERE name like '%"+ search +"%'";
		sql2 += " WHERE name like '%"+ search +"%'";
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
 *  年级详情
 *  参数：body/query:
 					id----搜索（年级ID）    
 *		  headers:
 					userToken:  用户token
 */
router.all('/grade/detail',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

	if(!params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}


 	helper.query(res, "SELECT * FROM school_grade WHERE id=" + params.id, function(results){
 		res.json(utils.resJSON(200,results[0]));
 	});

});

 /*
 *  年级审核
 *  参数：body/query:
 					status----0/1
 					id----用户ID   
 *		  headers:
 					userToken:  用户token
 */
router.all('/grade/status',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;
 	if(params.status === undefined || !params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}
 	helper.update(res, "UPDATE school_grade SET status="+ params.status +" WHERE id="+ params.id, function(result){
 		var affectedRows = result.affectedRows;
 		if(affectedRows > 0){
			res.json(utils.resJSON(200,{status: params.status}));
 		}else{
 			res.json(utils.resJSON(201,'年级id不存在'));
 		}
 	});
});

 /*
 *  年级修改
 *  参数：body/query:
 					body   
 *		  headers:
 					userToken:  用户token
 */
router.all('/grade/update',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;
 	if(!params.id || !utils.sqlCheck(params.name)){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}
 	
 	helper.query(res,"SELECT * FROM school_grade WHERE name='"+params.name+"' and id!="+params.id,function(rows){
 		if(rows.length > 0){
			res.json(utils.resJSON(201,'该年级名称已经存在'));
 		}else{
 			helper.update(res, "UPDATE school_grade SET name='"+ params.name +"',status="+ params.status +" WHERE id="+ params.id, function(result){
		 		var affectedRows = result.affectedRows;
		 		if(affectedRows > 0){
					res.json(utils.resJSON(200,{}));
		 		}else{
		 			res.json(utils.resJSON(201,'年级id不存在'));
		 		}
		 	});
 		}
 	});
});

 /*
 *  年级添加
 *  参数：body/query:
 					body   
 *		  headers:
 					userToken:  用户token
 */
router.all('/grade/add',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

	if(!utils.sqlCheck(params.name)){
		res.json(utils.resJSON(400,'参数错误'));
		return false;
	}

 	helper.query(res,"SELECT * FROM school_grade WHERE name='"+params.name+"'",function(rows){
 		if(rows.length > 0){
			res.json(utils.resJSON(201,'该年级已经存在'));
 		}else{
 			helper.insert(res, "INSERT school_grade (name,create_time,schoolID,status) VALUES('"+params.name+"','"+new Date().toLocaleString()+"',1,"+params.status+")", function(result){
		 		if(result.affectedRows > 0){
					res.json(utils.resJSON(200,{}));
		 		}
		 	});
 		}
 	}); 	
});

/*
 *  年级删除
 *  参数：body/query:
 					id   
 *		  headers:
 					userToken:  用户token
 */
router.all('/grade/del',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

 	if(!params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}

 	helper.delete(res,"DELETE FROM school_grade WHERE id in (" + (params.id).toString() + ")",function(result){
 		if(result.affectedRows > 0){
			res.json(utils.resJSON(200,{}));
 		}else{
 			res.json(utils.resJSON(201,'删除失败'));
 		}
 	}); 	
});


 module.exports = router;