var express = require('express');
var router = express.Router();
var utils = require('../../controllers/utils');
var middlewares = require('../../controllers/middlewares');
var dbHelper = require('../../database/dbHelper');

var helper = new dbHelper.helper();


//信息管理

/*
 *  内容列表
 *  参数：body/query:
 					pageno----页码
 					pagesize----每页条数（默认20）
 					search----搜索（名称）    
 *		  headers:
 					userToken:  用户token
 */
 router.all('/content/list',middlewares.checkToken,function(req, res, next){
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
		sql1 = "SELECT * FROM content",
		sql2 = ";SELECT count(*) as total FROM content";

	if(!utils.isEmpty(search)){
		sql1 += " WHERE title like '%"+ search +"%'";
		sql2 += " WHERE title like '%"+ search +"%'";
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
 *  内容详情
 *  参数：body/query:
 					id----搜索（ID）    
 *		  headers:
 					userToken:  用户token
 */
 router.all('/content/detail',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

	if(!params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}


 	helper.query(res, "SELECT * FROM content WHERE id=" + params.id, function(results){
 		res.json(utils.resJSON(200,results[0]));
 	});

});

 /*
 *  内容审核
 *  参数：body/query:
 					status----0/1
 					id----用户ID   
 *		  headers:
 					userToken:  用户token
 */
router.all('/content/status',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;
 	if(params.status === undefined || !params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}
 	helper.update(res, "UPDATE content SET status="+ params.status +" WHERE id="+ params.id, function(result){
 		var affectedRows = result.affectedRows;
 		if(affectedRows > 0){
			res.json(utils.resJSON(200,{status: params.status}));
 		}else{
 			res.json(utils.resJSON(201,'内容id不存在'));
 		}
 	});
});

 /*
 *  内容修改
 *  参数：body/query:
 					body   
 *		  headers:
 					userToken:  用户token
 */
router.all('/content/update',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;
 	if(!params.id || !utils.sqlCheck(params.title)){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}
 	
 	helper.query(res,"SELECT * FROM content WHERE title='"+params.title+"' and id!="+params.id,function(rows){
 		if(rows.length > 0){
			res.json(utils.resJSON(201,'该标题已经存在'));
 		}else{
 			helper.update(res, "UPDATE content SET title='"+ params.title +"',content='"+params.content+"',last_time='"+new Date().toLocaleString()+"' WHERE id="+ params.id, function(result){
		 		var affectedRows = result.affectedRows;
		 		if(affectedRows > 0){
					res.json(utils.resJSON(200,{}));
		 		}
		 	});
 		}
 	});
});


 /*
 *  内容添加
 *  参数：body/query:
 					body   
 *		  headers:
 					userToken:  用户token
 */
router.all('/content/add',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

 	for(var key in params){
 		if(params[key] && typeof params[key] == 'string'){
 			if(!utils.sqlCheck(params[key])){
	 			res.json(utils.resJSON(400,'参数错误'));
	 			return false;
	 		}
 		}	
 	}

 	helper.query(res,"SELECT * FROM content WHERE title='"+params.title+"'",function(rows){
 		if(rows.length > 0){
			res.json(utils.resJSON(201,'该标题已经存在'));
 		}else{
 			helper.insert(res, "INSERT content (title,content,create_time,status) VALUES('"+params.title+"','"+params.content+"','"+new Date().toLocaleString()+"',1)", function(result){
		 		if(result.affectedRows > 0){
					res.json(utils.resJSON(200,{}));
		 		}
		 	});
 		}
 	}); 	
});


 /*
 *  删除内容
 *  参数：body/query:
 					id----搜索（ID）    
 *		  headers:
 					userToken:  用户token
 */
 router.all('/content/del',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

	if(!params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}


 	helper.delete(res, "DELETE FROM content WHERE id in (" + (params.id).toString() + ")", function(result){
 		var affectedRows = result.affectedRows;
 		if(affectedRows > 0){
			res.json(utils.resJSON(200,{}));
 		}
 	});

});




 /*
 *  通知列表
 *  参数：body/query:
 					pageno----页码
 					pagesize----每页条数（默认20）
 					search----搜索（名称）    
 *		  headers:
 					userToken:  用户token
 */
 router.all('/information/list',/*middlewares.checkToken,*/function(req, res, next){
 	var params = utils.reqParams(req),
 		headers = req.headers;
 	var total = 0,
		pageno = 1,
		pagesize = 20,
		from = 1,
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

	if(params.from){
		from = params.from;
	}
	var _start = (pageno-1) * pagesize,
		sql1 = "SELECT a.id,a.content,a.create_time,a.status,b.name FROM information AS a left join teachers AS b on a.fromType=2 and a.userID=b.id",
		sql2 = ";SELECT count(*) as total FROM information",
		hasWhere = false;

	if(!utils.isEmpty(search)){
		sql1 += " WHERE a.content like '%"+ search +"%'";
		sql2 += " WHERE content like '%"+ search +"%'";
		hasWhere = true;
	}

	if(from){
		if(!hasWhere){
			sql1 += " WHERE";
			sql2 += " WHERE";
		}else{
			sql1 += " and";
			sql2 += " and";
		}
		sql2 += " fromType="+from;
		sql1 += " a.fromType="+from;
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
 *  通知详情
 *  参数：body/query:
 					id----搜索（ID）    
 *		  headers:
 					userToken:  用户token
 */
 router.all('/information/detail',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

	if(!params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}


 	helper.query(res, "SELECT * FROM information WHERE id=" + params.id, function(results){
 		res.json(utils.resJSON(200,results[0]));
 	});

});

 /*
 *  通知审核
 *  参数：body/query:
 					status----0/1
 					id----用户ID   
 *		  headers:
 					userToken:  用户token
 */
router.all('/information/status',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;
 	if(params.status === undefined || !params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}
 	helper.update(res, "UPDATE information SET status="+ params.status +",last_time='"+new Date().toLocaleString()+"' WHERE id="+ params.id, function(result){
 		var affectedRows = result.affectedRows;
 		if(affectedRows > 0){
			res.json(utils.resJSON(200,{status: params.status}));
 		}else{
 			res.json(utils.resJSON(201,'内容id不存在'));
 		}
 	});
});

 /*
 *  通知修改
 *  参数：body/query:
 					body   
 *		  headers:
 					userToken:  用户token
 */
router.all('/information/update',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;
 	if(!params.id || !utils.sqlCheck(params.content)){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}
 	
 	
	helper.update(res, "UPDATE information SET content='"+params.content+"',status="+ params.status +",last_time='"+new Date().toLocaleString()+"' WHERE id="+ params.id + " and fromType=1", function(result){
		var affectedRows = result.affectedRows;
		if(affectedRows > 0){
		res.json(utils.resJSON(200,{}));
		}
	});
});


 /*
 *  通知添加
 *  参数：body/query:
 					body   
 *		  headers:
 					userToken:  用户token
 */
router.all('/information/add',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;
	for(var key in params){
 		if(params[key] && typeof params[key] == 'string'){
 			if(!utils.sqlCheck(params[key])){
	 			res.json(utils.resJSON(400,'参数错误'));
	 			return false;
	 		}
 		}	
 	}

 	var userID = req.api_user.id;
	helper.insert(res, "INSERT information (content,create_time,status,fromType,userID) VALUES('"+params.content+"','"+new Date().toLocaleString()+"',1,1,"+userID+")", function(result){
		if(result.affectedRows > 0){
		res.json(utils.resJSON(200,{}));
		}
	});
	
});


 /*
 *  删除通知
 *  参数：body/query:
 					id----搜索（ID）    
 *		  headers:
 					userToken:  用户token
 */
 router.all('/information/del',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

	if(!params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}

 	helper.delete(res, "DELETE FROM information WHERE id in (" + (params.id).toString() + ") and fromType=1", function(result){
 		console.log(result);
 		var affectedRows = result.affectedRows;
 		if(affectedRows > 0){
			res.json(utils.resJSON(200,{}));
 		}else{
 			res.json(utils.resJSON(201,'删除失败'));
 		}
 	});

});

 module.exports = router;

