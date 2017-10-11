/*
 *  互动聊天服务端实现
 */

var express = require('express'),
	http = require('http'),
	app = express(),
	server = http.createServer(app),
	io = require('socket.io').listen(server);

var path = require('path'),
	dbHelper = require('./database/dbHelper');

app.use(express.static(path.join(__dirname, 'public')));
server.listen(process.env.PORT || 8888);

//存储socket.id对应的个人信息
var users = {};


//处理socket部分
io.sockets.on('connection', function(socket){


	/*
	 * 上线
	 * {id:**, name: **, classID: **, userType: **}
	 */
	socket.on('online', function(data){
		joinRoom(socket, data);
	});

	/*
	 * 发送消息
	 * {classID: **, text: **}
	 */
	socket.on('message', function(data){
		handleMessage(socket, data);
	});

	/*
	 * 下线
	 * {classID: **}
	 */
	socket.on('disconnect', function(data) {
        handleDisconnection(socket, data);
    }); 
});

/*
 * 加入聊天室
 */
var joinRoom = function(socket, data){
	var room = 'class-'+data.classID;
	//加入以班级ID为命名的房间
	socket.join(room);
	users[socket.id] = data;

	//推送聊天室所有在线成员信息
	socket.emit('joinResult',{users : getUserInRoom(socket, room)});

	//通知聊天室其他成员XX上线了
	socket.broadcast.to(room).emit('onlineUser',{
		name : users[socket.id].name
	});
};

/*
 *  获取当前聊天室所有在线的成员
 */

var getUserInRoom = function(socket, room){
	var usersInRoom = io.sockets.adapter.rooms[room];
	if(usersInRoom.length > 1){
		var usersInRoomArr = [];
		for(var index in usersInRoom){
			var userSocketId = usersInRoom[index].id;
			if(userSocketId != socket.id){
				usersInRoomArr.push(users[userSocketId]);
			}
		}
		return usersInRoomArr;
	}
	return [];
};

var handleMessage = function(socket, data){
	socket.broadcast.to('class-'+data.classID).emit('message',{
		name : users[socket.id].name,
		text : data.text
	});
};

var handleDisconnection = function(socket, data){
	socket.broadcast.to('class-'+data.classID).emit('userDisconnect',{
		user : users[socket.id]
	});
	delete users[socket.id];
};

/*
 * 数组转换为以ID为键名的json格式，方便快速查找
 */
var arrToobj = function(arr){
	var obj = {};
	arr.forEach(function(val){
		if(!obj[val.id]){
			obj[val.id] = [];
		}
		obj[val.id].push(val);
	});
	return obj;
};

/*
 * 获取班级所有的学生和老师
 * classID： 班级ID
 * update: 是否强制更新
 */
var getClasses = function(){
	var classes = {};

	return function(classID, update){
		if(classes[classID] && !update){
			return classes[classID];
		}else{
			helper.query(null, 'SELECT count(*) as total FROM students WHERE classID='+classID+';SELECT count(*) as total FROM teachers WHERE classID='+classID+'', function(results){
				classes[classID]['s'] = arrToobj(results[0]);
				classes[classID]['t'] = arrToobj(results[1]);
				return classes[classID];
			});
		}
	}
}();

