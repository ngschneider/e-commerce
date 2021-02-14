const sqlCommand = require("../database/sqlCommand");
const fs = require("fs");
const upload = require("../database/googleDrive");
const uploadImg = (fileData,productId) => {
	let tableName = "test";
	let columnSet = ["img"];
	let recordSet = [];
	upload.upload(fileData,productId);
}

const uploadProduct = (merchantId,productId,productName,startDate,endDate,stock, cb) => {
	let tableName = "Products";
	let columnSet = ["merchantId","productId","productName","startDate","endDate","stock"];
	let recordSet = [merchantId,productId,productName,startDate,endDate,stock];
	let command = sqlCommand.insert(tableName,columnSet,recordSet);
	sqlCommand.send([command] ,(result) => {
		cb(result);
	});

}

exports.uploadProduct = uploadProduct;
exports.uploadImg = uploadImg;
