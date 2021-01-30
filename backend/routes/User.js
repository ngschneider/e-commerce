// Modules
const sqlCommand = require("../database/sqlCommand");

const getUser = (username) => {
	let tableName = "Users";
	let columnName = "username";
	let userSelect = sqlCommand.select(tableName, columnName, username);
	
	return userSelect;

}

const getCredentials = (id) => {
	let tableName = "userCredentials";
	let columnName = "id";
	let userCredentials = sqlCommand.select(tableName, columnName, id);
	
	return userCredentials;
}



exports.getUser = getUser;
exports.getCredentials = getCredentials;
