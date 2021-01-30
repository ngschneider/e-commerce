const sqlCommand = require("../database/sqlCommand");
const fs = require("fs");
const uploadImg = (fileData,productId) => {
	let tableName = "test";
	let columnSet = ["img"];
	let recordSet = [];
	console.log("./" + fileData)
	fs.readFile("./" + fileData ,"utf8", (err,file) => {
		if(err) throw err;
		recordSet.push("" + file.toString());
		console.log(file.toString())
		let command = sqlCommand.insert(tableName, columnSet, recordSet);
		console.log(command);
		sqlCommand.send([command], (result) =>{
			console.log(command)
			console.log(result);
		});
	});

}


exports.uploadImg = uploadImg;
