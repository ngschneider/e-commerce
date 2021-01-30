// Modules
const sqlCommand = require("../database/sqlCommand");
const User = require("./User");


/*
 * Authenticates a user login
 */
const loginAuth = (input,cb) => {
	console.log(input)
	input = JSON.parse(input)	
	let selectedUser = User.getUser(input.user);
	sqlCommand.send([selectedUser], function(results){
		// TODO if user is found and if not
		console.log(results);
		if(isUser(results)){
			userFound(results[0].id,input.pass,function(result){
			result.username = input.user;
			cb(result)
			});		
		
		}else{
			cb(noUser());
		}

	});
}
/*
 * Was a user with the username given found in the database
 */
function isUser(input){
	if(input[0]){
		return true;
	}else{
		return false;
	}
}

/*
 * Response, if a user is not found
 */
function noUser(){
	let response = {
		userfound:'false'
	}
	console.log("nbnbbbbb")
	return response;

}

/*
 *  Is the given password the same as the one in the database?
 *  return correct response.
 */
function userFound(id,givenPass,cb){
	let currentUser = User.getCredentials(id);
	let response = {
		userfound:'true'
	}
	console.log(currentUser)
	sqlCommand.send([currentUser],function(results){
		
		console.log(results);
		
		if(correctCredentials(results[0].password,givenPass)){
			response.signin = 'true';

		}else{
			response.signin = 'false';
		}
		console.log(response)
		cb(response);
	});
}

function correctCredentials(passwordRecord,passwordGiven){
	//console.log(`${passwordRecord} \n ${passwordGiven}`);
	if(passwordRecord == passwordGiven){
	
		return true;

	}else{
		return false;
	}

}
exports.loginAuth = loginAuth;
