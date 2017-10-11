var express = require('express');
var router = express.Router();
var utils = require('../../controllers/utils');
var middlewares = require('../../controllers/middlewares');
var dbHelper = require('../../database/dbHelper');

var helper = new dbHelper.helper();


//分享

/*
 *  分享列表
 *  参数：body/query:
 					pageno----页码
 					pagesize----每页条数（默认20）
 					filter: classID,userType,fromTime,toTime   过滤    
 *		  headers:
 					userToken:  用户token
 */
 router.all('/share/list',middlewares.checkToken,function(req, res, next){
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
		hasWhere = false,
		sql1 = "SELECT a.id,a.content,a.create_time,a.status,a.reject,b.name AS sname,t.name AS tname,c.name AS cname FROM class AS c,share AS a \
				left join students AS b on a.fromType=2 and a.userID=b.id \
				left join teachers AS t on a.fromType=1 and a.userID=t.id \
				WHERE a.classID=c.id",
		sql2 = ";SELECT count(*) as total FROM share";

	if(params.classID){
		sql1 += " AND a.classID="+params.classID;
		sql2 += " WHERE classID="+params.classID;
		hasWhere = true;
	}

	if(params.gradeID != 0){
		sql1 += " AND a.gradeID="+params.gradeID;
		if(!hasWhere){
			sql2 += " WHERE";
		}else{
			sql2 += " AND";
		}
		sql2 += " gradeID="+params.gradeID;
		hasWhere = true;
	}

	if(params.userType){
		sql1 += " AND a.fromType="+params.userType;
		if(!hasWhere){
			sql2 += " WHERE";
		}else{
			sql2 += " AND";
		}
		sql2 += " fromType="+params.userType;
		hasWhere = true;
	}

	if(params.timerange){
		var timerange = params.timerange,
			startTime = timerange[0],
			endTime = timerange[1];
		if(startTime && endTime){
			startTime = new Date(startTime).Format("yyyy-MM-dd hh:mm:ss");
			endTime = new Date(endTime).Format("yyyy-MM-dd hh:mm:ss");
			sql1 += " AND a.create_time BETWEEN '"+startTime+"' AND '"+endTime+"'";
			if(!hasWhere){
				sql2 += " WHERE";
			}else{
				sql2 += " AND";
			}
			sql2 += " create_time BETWEEN '"+startTime+"' AND '"+endTime+"'";
			hasWhere = true;
		}
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
 *  分享详情
 *  参数：body/query:
 					id----搜索（ID）    
 *		  headers:
 					userToken:  用户token
 */
 router.all('/share/detail',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;

	if(!params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}


 	helper.query(res, "SELECT * FROM share WHERE id=" + params.id, function(results){
 		res.json(utils.resJSON(200,results[0]));
 	});

});

/*
 *  禁止分享内容
 *  参数：body/query:
 					id
 *		  headers:
 					userToken:  用户token
 */
router.all('/share/status',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers;
 	var _reject = null;
 	if(!params.status || !params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}
 	if(params.reject){
 		_reject = params.reject;
 	}
 	helper.update(res, "UPDATE share SET status="+ params.status +",reject='"+_reject+"' WHERE id="+ params.id, function(result){
 		var affectedRows = result.affectedRows;
 		if(affectedRows > 0){
			res.json(utils.resJSON(200,{status: params.status}));
 		}else{
 			res.json(utils.resJSON(201,'内容id不存在'));
 		}
 	});
});

 module.exports = router;