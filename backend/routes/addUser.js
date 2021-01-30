// Routes
	const sql = require("../database/events");
	const errorRecovery = require("../database/errorRecovery");	
	const sqlCommand = require("../database/sqlCommand");
/*	
 * Input : Responce from webserver, JSON format
 * Output : boolean
 *
 */
	let columnSet = ["id","username","createTimeStamp"];
	let tableName = "Users";
	let errorResponce = 1;
	const addUser = (id,username,timeStamp) => {

		let recordSet = [id, username, timeStamp];
		let sql_statement = sqlCommand.insert(tableName, columnSet, recordSet);
		console.log(sql_statement);

	//	sql.select(sql_statement, function(result){
	//		 errorResponce = errorRecovery.errorRecovery(result);
	//	});

		//console.log(errorResponce)
		//if(errorResponce != 1){ // MYSQL ERROR ENCOUNTERED
		//	return "Oh no! Something went wrong\n mysql error type " + errorResponce + "\n\n" + input;
		//}

		//console.log(JSON.stringify(input,null,'\t'))
		return sql_statement;
	}
/*
 * Determines if input has required fields
*/

	function validInput(){

			
	}

/*
* Determines if a username Exist already
*/
	function userExist(username){
		
		
	}

/*
* Determines if a email is already in use
*/

	function emailExist(email){
		
		}

	function randomNumberInt(){
		return Math.floor(Math.random() * 99999999)
	}
exports.addUser = addUser;
