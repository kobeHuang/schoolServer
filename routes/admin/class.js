var express = require('express');
var router = express.Router();
var utils = require('../../controllers/utils');
var middlewares = require('../../controllers/middlewares');
var dbHelper = require('../../database/dbHelper');

var helper = new dbHelper.helper();


//班级接口

/*
 *  班级列表
 *  参数：body/query:
 					gradeID----年级ID
 					isAll----全部
 					pageno----页码
 					pagesize----每页条数（默认20）
 					search----搜索（班级名称）    
 *		  headers:
 					userToken:  用户token
 */
 router.all('/class/list',middlewares.checkToken,function(req, res, next){
 	var params = utils.reqParams(req),
 		headers = req.headers;
 	var total = 0,
		pageno = 1,
		pagesize = 20,
		search = '',
		gradeID = 0,
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

	if(params.gradeID){
		gradeID = params.gradeID;
	}

	if(params.isAll !== undefined){
		isAll = params.isAll;
	}
	var _start = (pageno-1) * pagesize,
		sql1 = "SELECT a.id,a.name,a.code,a.create_time,a.status,a.gradeID,b.name as gradeName \
				FROM class as a,school_grade as b \
				WHERE a.gradeID=b.id",
		sql2 = ";SELECT count(*) as total FROM class",
		hasWhere = false;

	if(!utils.isEmpty(search)){
		sql1 += " and a.name like '%"+ search +"%'";
		sql2 += " WHERE name like '%"+ search +"%'";
		hasWhere = true;
	}

	if(gradeID != 0){
		sql1 += " and a.gradeID="+gradeID;
		if(!hasWhere){
			sql2 += " WHERE";
		}else{
			sql2 += " and";
		}
		sql2 += " gradeID="+gradeID;
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
 *  班级详情
 *  参数：body/query:
 					id----搜索（班级ID）    
 *		  headers:
 					userToken:  用户token
 */
router.all('/class/detail',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

	if(!params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}

 	helper.query(res, "SELECT * FROM class WHERE id=" + params.id + ";SELECT * FROM school_grade", function(results){
 		var data = {};
 		data.detail = results[0][0];
 		data.grade = results[1];
 		res.json(utils.resJSON(200,data));
 	});

});

 /*
 *  班级审核
 *  参数：body/query:
 					status----0/1
 					id----用户ID   
 *		  headers:
 					userToken:  用户token
 */
router.all('/class/status',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;
 	if(params.status === undefined || !params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}
 	helper.update(res, "UPDATE class SET status="+ params.status +" WHERE id="+ params.id, function(result){
 		var affectedRows = result.affectedRows;
 		if(affectedRows > 0){
			res.json(utils.resJSON(200,{status: params.status}));
 		}else{
 			res.json(utils.resJSON(201,'班级id不存在'));
 		}
 	});
});

 /*
 *  班级修改
 *  参数：body/query:
 					body   
 *		  headers:
 					userToken:  用户token
 */
router.all('/class/update',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;
 	if(!params.id || !utils.sqlCheck(params.name)){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}
 	
 	helper.query(res,"SELECT * FROM class WHERE name='"+params.name+"' and gradeID="+params.gradeID +" and id!="+params.id,function(rows){
 		if(rows.length > 0){
			res.json(utils.resJSON(201,'该年级的班级已经存在'));
 		}else{
 			helper.update(res, "UPDATE class SET name='"+ params.name +"',gradeID="+params.gradeID+" WHERE id="+ params.id, function(result){
		 		var affectedRows = result.affectedRows;
		 		if(affectedRows > 0){
					res.json(utils.resJSON(200,{}));
		 		}else{
		 			res.json(utils.resJSON(201,'用户id不存在'));
		 		}
		 	});
 		}
 	});
});

 /*
 *  班级添加
 *  参数：body/query:
 					body   
 *		  headers:
 					userToken:  用户token
 */
router.all('/class/add',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

 	if(!utils.sqlCheck(params.name)){
		res.json(utils.resJSON(400,'参数错误'));
		return false;
	}

 	helper.query(res,"SELECT * FROM class WHERE name='"+params.name+"' and gradeID="+params.gradeID,function(rows){
 		if(rows.length > 0){
			res.json(utils.resJSON(201,'该年级的班级已经存在'));
 		}else{
 			helper.insert(res, "INSERT class (name,create_time,code,schoolID,gradeID,status) VALUES('"+params.name+"','"+new Date().toLocaleString()+"','"+params.code+"',1,"+params.gradeID+","+params.status+")", function(result){
		 		if(result.affectedRows > 0){
					res.json(utils.resJSON(200,{}));
		 		}
		 	});
 		}
 	}); 	
});

/*
 *  班级删除
 *  参数：body/query:
 					id   
 *		  headers:
 					userToken:  用户token
 */
router.all('/class/del',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

 	if(!params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}

 	helper.delete(res,"DELETE FROM class WHERE id in (" + (params.id).toString() + ")",function(result){
 		if(result.affectedRows > 0){
			res.json(utils.resJSON(200,{}));
 		}else{
 			res.json(utils.resJSON(201,'删除失败'));
 		}
 	}); 	
});


 module.exports = router;