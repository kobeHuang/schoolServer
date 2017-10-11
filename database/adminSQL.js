var adminSQL = {
	loginsql: {
		query: 'SELECT * FROM admin WHERE account=? and password=?',
		update: 'UPDATE admin SET last_time=? WHERE id=?'
	},
	tokensql: {
		insert: 'INSERT INTO login_token(account,token,token_key,type,last_time,status) VALUES(?,?,?,?,?,?)',
		update: 'UPDATE login_token SET status=? WHERE ?',
		query: 'SELECT * FROM login_token WHERE token=? and status=1 and type=?'
	},
	usersql:{
		query: 'SELECT * FROM ?'
	},
	classsql:{
		query: 'SELECT * FROM class'
	},
	subjectsql:{
		query: 'SELECT * FROM subjects'
	}
}

module.exports = adminSQL;