var express = require('express');
var router = express.Router();
var utils = require('../../controllers/utils');
var middlewares = require('../../controllers/middlewares');
var dbHelper = require('../../database/dbHelper');

var helper = new dbHelper.helper();


//作业列表

/*
 *  发布列表
 *  参数：body/query:
 					pageno----页码
 					pagesize----每页条数（默认20）
 					filter: classID,subjectID   过滤    
 *		  headers:
 					userToken:  用户token
 */

 router.all('/task/list',middlewares.checkToken,function(req, res, next){
 	var params = utils.reqParams(req),
 		headers = req.headers;
 	var total = 0,
		pageno = 1,
		pagesize = 20;

	if(params.pageno){
		pageno = params.pageno;
	}

	if(params.pagesize){
		pagesize = params.pagesize;
	}

	var _start = (pageno-1) * pagesize,
		sql1 = "SELECT a.content,a.create_time,a.id,b.name AS tname,c.name AS cname \
				FROM task AS a,teachers AS b,class AS c,school_grade AS g \
				WHERE a.classID=c.id and a.teacherID=b.id and a.gradeID=g.id",
		sql2 = ";SELECT count(*) as total FROM task",
		hasWhere = false;

	if(params.classID){
		sql1 += " and a.classID="+params.classID;
		sql2 += " WHERE classID="+params.classID;
		hasWhere = true;
	}

	if(params.gradeID != 0){
		sql1 += " and a.gradeID="+params.gradeID;
		if(!hasWhere){
			sql2 += " WHERE";
		}else{
			sql2 += " and";
		}
		sql2 += " gradeID="+params.gradeID;
		hasWhere = true;
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
 *  发布详情
 *  参数：body/query:
 					id
 *		  headers:
 					userToken:  用户token
 */
router.all('/task/detail',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

	if(!params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}


 	helper.query(res, "SELECT * FROM task WHERE id=" + params.id, function(results){
 		res.json(utils.resJSON(200,results[0]));
 	});

});

/*
 *  作业提交列表
 *  参数：body/query:
 					taskID
 *		  headers:
 					userToken:  用户token
 */
router.all('/task/submit_list',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;
 	var total = 0,
		pageno = 1,
		pagesize = 20;

	if(params.pageno){
		pageno = params.pageno;
	}

	if(params.pagesize){
		pagesize = params.pagesize;
	}

	var _start = (pageno-1) * pagesize;
	if(!params.taskID){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}

 	var _start = (pageno-1) * pagesize;
 	var sql1 = "SELECT a.id,a.create_time,a.filename,b.sname FROM task_submit AS a,students AS b \
 			    WHERE a.studentID=b.id and a.taskID=" + params.taskID;

 	sql1 += " limit "+ pagesize +" offset "+_start;
 	helper.query(res, sql1+";SELECT count(*) as total FROM task_submit WHERE taskID="+params.taskID, function(results){
 		var _data = {};
		total = results[1][0].total;
		_data.items = results[0];
		_data.total = total;
		_data.pageno = pageno;
		_data.pagesize = pagesize;
		res.json(utils.resJSON(200,_data));
 	});

});


module.exports = router;

