/*
 *  数据库助手，增删查改功能 
 */

var mysql = require('mysql');
var utils = require('../controllers/utils');

var pool = mysql.createPool({
	host: 'localhost',     
    user: 'root',   
    password: '814908133',  
    database:'fun_school', // 前面建的user表位于这个数据库中 
    port: 3306,
    multipleStatements: true
});

var helper = function(){
	this.query = function(res, sql, callback){
		pool.getConnection(function(err, connection){
			var _json = utils.resJSON(500,'数据库操作失败');
			if(err){
				res.json(_json);
			}else{
				connection.query(sql,function(err,rows,fields){  
	                if(err){
	                	console.log(err);
	                	res.json(_json);
	                }else{
	                	callback(rows);  
	                }  
	            });  
	  
	            connection.release();  
			}
		});
	};

	this.insert = function(res, sql,callback){  
        pool.getConnection(function(err,connection){  
            var _json = utils.resJSON(500,'数据库操作失败');
			if(err){
				res.json(_json);
			}else{
				connection.query(sql,function(err,row){  
	                if(err){
	                	console.log(err);
	                	res.json(_json);
	                }else{
	                	callback(row);  
	                }  
	            });  
	  
	            connection.release();  
			}
        });  
    };  

    this.update = function(res, sql,callback){
    	pool.getConnection(function(err,connection){  
            var _json = utils.resJSON(500,'数据库操作失败');
			if(err){
				res.json(_json);
			}else{
				connection.query(sql,function(err,resource){  
	                if(err){
	                	console.log(err);
	                	res.json(_json);
	                }else{
	                	callback(resource);  //resource.affectedRows
	                }  
	            });  
	  
	            connection.release();  
			}
        });  
    };

    this.delete = function(res, sql,callback){
    	pool.getConnection(function(err,connection){  
            var _json = utils.resJSON(500,'数据库操作失败');
			if(err){
				res.json(_json);
			}else{
				connection.query(sql,function(err,resource){  
	                if(err){
	                	console.log(err);
	                	res.json(_json);
	                }else{
	                	callback(resource);  //resource.affectedRows
	                }  
	            });  
	  
	            connection.release();  
			}
        });
    };
};


exports.helper = helper;