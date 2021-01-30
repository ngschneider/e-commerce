const sqlCommand = require("../database/sqlCommand");
const User = require("./User");
const Merchant = (input, cb) => {
	console.log(input);
	
	switch(input.type){
		case "isMerchant" : 
			IsMerchant(input.username, (response) => {	
				cb(response);
			});
			break;
		case "createMerchant" :
			createMerchant(input.merchantId,input.merchantUsername, (response) => {
				cb(response);
			});
			break;
		case "getMerchant" : 
			getMerchantInformation(input.merchantId, (response) =>	{
				cb(response)
			});
			break;
		case "getMerchantId" :
			getMerchantId( () =>	{
			
			});
			break;
		default :
			cb("Define the merchant type paramater!!!");
	
	}

	//cb("routes/mechant.js");

}

const createMerchant = (merchantId,merchantUsername, cb) => {
	let tableName = "merchantInformation";
	let columnSet = ["merchantId","merchantUsername","currentProductCount","totalItemsSold"];
	let recordSet = [merchantId,merchantUsername,0,0];

	let command = sqlCommand.insert(tableName,columnSet,recordSet);
	
	sqlCommand.send([command] , (response) =>{
		console.log(response)
		cb("test");
	});

}
const IsMerchant = (username, cb) => {
	let tableName = "";
	let columnName = ""
	let command = User.getUser(username);
	console.log(command);
	sqlCommand.send([command], (result) => {
		console.log(result);
		if(result[0]?.id){
			let userid = result[0].id;
			 getMerchantId(userid, (response) => {
				if(response[0].merchantId){
					cb({merchant:true,merchantId:response[0].merchantId});
				}else{
					cb({mechant:false})
				}
			} );
		}else{
			cb({merchant:false})
		}
	} );
}
const getMerchantInformation = (merchantId, cb) =>	{
	let tableName = "merchantInformation";
	let columnName = "merchantId";
	let command = sqlCommand.select(tableName,columnName,merchantId);
	console.log(command);
	sqlCommand.send([command], (response)=>	{
		console.log(response[0]);
		cb(response[0]);
	
	});

}


const getMerchantId = (userId, cb) => {
	let tableName = "Merchant";
	let columnName = "id";
	let command = sqlCommand.select(tableName,columnName,userId);
	console.log(command);
	sqlCommand.send([command] , (response) => {
		cb(response);
	});

}
exports.Merchant = Merchant;
