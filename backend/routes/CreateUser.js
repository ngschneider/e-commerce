// Modules
	const addUser = require("./addUser");
	const userCredentials = require("./UserCredentials");
	const UserInformation = require("./UserInformation");
	const sqlCommands = require("../database/sqlCommand");
	const JSON_Tools = require("../misc/JSONTools");
	const createUser = (input,cb) => {

		input = JSON.parse(input);
		console.log(input);
		let uniqueId = generateUniqueId();
		let date = generateDate();

		let user = addUser.addUser(uniqueId, input.username, date);
		let userCred = userCredentials.userCredentials(uniqueId, input.email, input.username, input.password);	      
		let userInfo = UserInformation.userInformation(uniqueId, input.firstname, input.lastname);
		let commandList = [user, userCred, userInfo];
		sqlCommands.send(commandList, function(result){
			let jsonResponse = response(result.errnum, input, uniqueId);
			cb(jsonResponse);
		});
	}
	


	function response(errNum, input, id){
		switch(errNum){
			case 1: // Successfully created user
				return creationSuccessfull(input);
				break;
			case 3:
				return duplicate_user(id);
				break;
			default : 
		}

	}
	function creationSuccessfull(input){
		let jsonString = JSON_Tools.create_JSON_Object();
		let jsonKey = ["signup"];
		let jsonVal = ["true"]
		jsonString = JSON_Tools.add_JSON_Object(jsonString,jsonKey,jsonVal);
		jsonString = JSON.stringify(jsonString);
		return jsonString;
	}
	function duplicate_user(id) {
		let jsonString = JSON_Tools.create_JSON_Object();
		//console.log(`JSON STRING => ${jsonString}`);
		let jsonKey = ["Error", "signup"];
		let jsonVal = ["DUP_MYSQL", "false"];
		
		jsonString = JSON_Tools.add_JSON_Object(jsonString,jsonKey,jsonVal)
		//console.log(`JSON STRING => ${jsonString}`);
		jsonString = JSON.stringify(jsonString);
		let infoDel = sqlCommands.deleteRecord("UserInformation","id",id);
		let credDel = sqlCommands.deleteRecord("userCredentials","id",id);
		let userDel = sqlCommands.deleteRecord("Users","id",id);
		sqlCommands.send([infoDel,credDel,userDel], function(results){
			console.log(results);
		
		});
		return jsonString;
	}
	function generateDate() {
		let dateObj = new Date();
		let date = dateObj.getFullYear() + "-" + dateObj.getMonth() + "-" + dateObj.getDate();
		return date;
	}

	function generateUniqueId(){
		return Math.floor(Math.random() * 99999999);	
	
	}



exports.createUser = createUser;
