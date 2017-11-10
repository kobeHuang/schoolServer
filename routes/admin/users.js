var express = require('express');
var router = express.Router();
var utils = require('../../controllers/utils');
var middlewares = require('../../controllers/middlewares');
var dbHelper = require('../../database/dbHelper');

var helper = new dbHelper.helper();


//用户管理接口

/*
 *  用户列表
 *  参数：body/query:
 					type----1：教师  2：学生  3：家长
 					pageno----页码
 					pagesize----每页条数（默认20）
 					search----搜索（用户名称）
 					gradeID----年级ID
 					classID----班级ID    
 *		  headers:
 					userToken:  用户token
 */
router.all('/users/list',middlewares.checkToken,function(req, res, next){

 	var params = utils.reqParams(req),
 		headers = req.headers;
 	var classes = [],
		subjects = [],
		total = 0,
		pageno = 1,
		pagesize = 20,
		search = '',
		gradeID = 0,
		classID = 0;

 	if(params.search){
		search = params.search;
	}

 	if(!params.type || !utils.sqlCheck(search)){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}

	if(params.type == 1){
		tname = 'teachers';
	}else if(params.type == 2){
		tname = 'students';
	}else{
		tname = 'parents';
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

	if(params.classID){
		classID = params.classID;
	}

	var _start = (pageno-1) * pagesize,
		sql1 = "",
		sql2 = "";
	if(params.type == 3){  //家长信息，不需要查询班级跟学科名称
		sql1 = "SELECT a.id,a.name,a.nickName,a.account,a.sexy,a.photo,a.email,a.phone,a.create_time,a.status,b.name AS sname,b.userID FROM parents AS a,students AS b WHERE a.studentID=b.id",
		sql2 = ";SELECT count(*) as total FROM "+tname;
		if(!utils.isEmpty(search)){
			sql1 += " WHERE name like '%"+ search +"%'";
			sql2 += " WHERE name like '%"+ search +"%'";
		}
		sql1 += " limit "+ pagesize +" offset "+_start;
	}else{
		sql1 = "",
		sql2 = ";SELECT count(*) as total FROM "+tname;
		hasWhere = false;
		if(params.type == 1){
			sql1 = "SELECT a.*,b.name as className \
				  FROM teachers as a,class as b,class_teachers_ref as c \
				  WHERE c.classID=b.id and c.teacherID=a.id";
		}else{
			sql1 = "SELECT a.*,b.name as className \
				  FROM students as a,class as b,class_students_ref as c \
				  WHERE c.classID=b.id and c.studentID=a.id";
		}
		if(!utils.isEmpty(search)){
			sql1 += " and a.name like '%"+ search +"%'";
			sql2 += " WHERE name like '%"+ search +"%'";
			hasWhere = true;
		}
		if(gradeID){
			if(!hasWhere){
				sql2 += " WHERE";
			}else{
				sql2 += " and"
			}
			if(params.type == 1){
				sql1 += " and find_in_set('"+gradeID+"', a.gradeID)";
				sql2 += " find_in_set('"+gradeID+"', gradeID)";
			}else{
				sql1 += " and a.gradeID="+gradeID;
				sql2 += " gradeID="+gradeID;
			}
			hasWhere = true;
		}
		if(classID){
			if(!hasWhere){
				sql2 += " WHERE";
			}else{
				sql2 += " and"
			}
			if(params.type == 1){
				sql1 += " and find_in_set("+classID+", a.classID)";
				sql2 += " find_in_set("+classID+", classID)";
			}else{
				sql1 += " and a.classID="+classID;
				sql2 += " classID="+classID;
			}
			hasWhere = true;
		}
		sql1 += " limit "+ pagesize +" offset "+_start;
	}
	helper.query(res, sql1+sql2, function(results){
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
 *  用户详情
 *  参数：body/query:
 					type----1：教师  2：学生  3：家长
 					id----搜索（用户ID）    
 *		  headers:
 					userToken:  用户token
 */
router.all('/users/detail',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers,
 		tname = '';

	if(!params.type || !params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}

 	if(params.type == 1){
		tname = 'teachers';
	}else if(params.type == 2){
		tname = 'students';
	}else{
		tname = 'parents';
	}

 	helper.query(res, "SELECT * FROM " + tname + " WHERE id=" + params.id, function(results){
 		res.json(utils.resJSON(200,results[0]));
 	});

});

/*
 *  用户审核
 *  参数：body/query:
 					type----1：教师  2：学生  3：家长
 					status----0/1
 					id----用户ID   
 *		  headers:
 					userToken:  用户token
 */
router.all('/users/status',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers,
 		tname;
 	if(!params.type || params.status === undefined || !params.id){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}
 	if(params.type == 1){
		tname = 'teachers';
	}else if(params.type == 2){
		tname = 'students';
	}else{
		tname = 'parents';
	}
 	helper.update(res, "UPDATE "+ tname +" SET status="+ params.status +" WHERE id="+ params.id, function(result){
 		var affectedRows = result.affectedRows;
 		if(affectedRows > 0){
			res.json(utils.resJSON(200,{status: params.status}));
 		}else{
 			res.json(utils.resJSON(201,'用户id不存在'));
 		}
 	});
});

/*
 *  添加用户
 *  参数：body/query:
 					type----1：教师  2：学生  3：家长
 					status----0/1
 					id----用户ID   
 *		  headers:
 					userToken:  用户token
 */
router.all('/users/add',middlewares.checkToken,function(req, res, next){
	var params = utils.reqParams(req),
 		headers = req.headers,
 		tname,
 		reftname,
 		idName;

 	if(!params.type || !params.name || !params.userID || !params.account || !params.password){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}
 	if(params.type == 1){
		tname = 'teachers';
		reftname = 'class_teachers_ref';
		idName = 'teacherID';
	}else if(params.type == 2){
		tname = 'students';
		reftname = 'class_students_ref';
		idName = 'studentID';
	}else{
		tname = 'parents';
	}


 	helper.query(res, `SELECT * FROM ${tname} WHERE userID=${params.userID}`, function(rows){
 		if(rows.length > 0){
			res.json(utils.resJSON(201,'该学号已被占用'));
 		}else{
 			helper.insert(res, `INSERT ${tname} (name,sexy,userID,phone,account,password,create_time,schoolID,gradeID,ClassID,status) VALUES('${params.name}',${params.sexy},'${params.userID}','${params.phone}','${params.account}','${params.password}','${params.create_time}',1,'${params.gradeID}','${params.classID}',${params.status})`, function(result){
		 		if(result.affectedRows > 0){
					var insertID = result.insertId;
					var sqlVals = '';
					if(params.type == 1){
						var classIDs = (params.classID).split(',');
						classIDs.forEach(function(val,i){
							sqlVals += `(${val},${insertID})`;
							if(i < classIDs.length -1){
								sqlVals += ',';
							}
						});
					}else{
						sqlVals = `(${params.classID},${insertID})`;
					}
					helper.insert(res, `INSERT ${reftname} (classID,${idName}) VALUES${sqlVals}`, function(result2){
						if(result2.affectedRows > 0){
							res.json(utils.resJSON(200,{}));
						}
					});
		 		}
		 	});
 		}
 	});
});
/*
 *  添加用户
 *  参数：body/query:
 					type----1：教师  2：学生  3：家长
 					status----0/1
 					id----用户ID   
 *		  headers:
 					userToken:  用户token
 */
 router.all('/users/update',middlewares.checkToken,function(req, res, next){
 	var params = utils.reqParams(req),
 		headers = req.headers,
 		tname,
 		reftname,
 		idName;

 	if(!params.type || !params.name || !params.userID || !params.account || !params.password){
 		res.json(utils.resJSON(400,'参数错误'));
		return false;
 	}

 	if(params.type == 1){
		tname = 'teachers';
	}else if(params.type == 2){
		tname = 'students';
	}else{
		tname = 'parents';
	}

 	helper.query(res, `SELECT * FROM ${tname} WHERE userID=${params.userID} and id!=${params.id}`, function(rows){
 		if(rows.length > 0){
			res.json(utils.resJSON(201,'该学号已被占用'));
 		}else{
 			helper.update(res, `UPDATE ${tname} SET name='${params.name}',sexy=${params.sexy},userID='${params.userID}',phone='${params.phone}',account='${params.account}',password='${params.password}',create_time='${params.create_time}',schoolID=1,gradeID='${params.gradeID}',ClassID='${params.classID}',status=${params.status} WHERE id=${params.id}`, function(result){
 				var affectedRows = result.affectedRows;
		 		if(affectedRows > 0){
					res.json(utils.resJSON(200,{}));
		 		}else{
		 			res.json(utils.resJSON(201,'用户不存在'));
		 		}
 			});
 		}
 	});
 });
module.exports = router;