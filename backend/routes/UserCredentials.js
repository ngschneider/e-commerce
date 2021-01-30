// Modules
	const sql = require("../database/events");
	const sqlCommand = require("../database/sqlCommand");



	let columnSet = ["id", "email", "password"];
	let tableName = "userCredentials";
	const userCredentials = (id, email, username, password) => {
		let recordSet = [id,email,password];
		let sql_statement = sqlCommand.insert(tableName, columnSet, recordSet);
		console.log(sql_statement);

	//	sql.select(sql_statement, function(result){
	//	
	//	});

	
		return sql_statement;	
	}




exports.userCredentials = userCredentials;

