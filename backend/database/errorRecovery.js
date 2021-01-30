

/*
 * Helps recover from mysql errors
 * 1 - no mysql errors
 * 2 - error could not be recovered
 * 3 - duplicate entry in unique or primary key 
 * 4 - 
 *
 */

const errorRecovery = (err) => {
	
	if(!err.hasOwnProperty('message')){ // Determines if their is an error.
	//	console.log(err);
		err.errnum = 1;
		return err;
		
	}else {
		console.log("ErrorRecovery : " + err.message)
		let errorString = "" + err.message+ "";
		let errorType = errorRegex(err.message);

		console.log(`message + ${errorType}`);	
		switch(errorType){
			case "ER_DUP_ENTRY":
				err.errnum = 3;
				return err;
				break;
			default:

		}
		
	}
	err.errnum = 2;
	return err;
}

function errorRegex(message){
	let regex = /(.*):.*/;
	let res = message.match(regex);
	return res[1];
}

function normailizeDatabase_DUP(){


}


exports.errorRecovery = errorRecovery;

