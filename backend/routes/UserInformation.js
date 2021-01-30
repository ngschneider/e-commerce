// Modules
	const sql = require("../database/events");
	const sqlCommand = require("../database/sqlCommand");


	let columnSet = ["id", "firstname", "lastname", "country"];
	let tableName = "UserInformation";
	const userInformation = (id, firstname, lastname) => {
		let recordSet = [ id, firstname, lastname, "NULL"]

		let sql_statement = sqlCommand.insert(tableName, columnSet, recordSet);
		console.log(sql_statement);

		//sql.select(sql_statement, function(result) {
		
	//	});
		return sql_statement;
	}
	const getUserInformation = (username) =>{
		let columnName = "";
		return sqlCommand.select(tableName,"");
		
	}
exports.userInformation = userInformation;
