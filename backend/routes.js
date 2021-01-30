// Packages 

const express = require('express');
const router = express.Router();
const sql = require('./database/events');
const addUser = require('./routes/addUser');
const CreateUser = require('./routes/CreateUser');
const Login = require('./routes/Login');
const upload = require('./routes/product');
const Merchant = require('./routes/Merchant');

// Routes

	router.get('/where', (req,res) => {
		let sql_statement = "SELECT * from tabletest";
		sql.select(sql_statement, function(result)
			{
				res.send(result);
			}
		);
	});


	router.get('/addUser:input', (req,res) => {
       		CreateUser.createUser(req.params.input,function(result){
			res.send(`${result}`)
		});
	
	});

	router.get('/login:input', (req,res) => {
		
		Login.loginAuth(req.params.input,function(result){
			res.send(JSON.stringify(result));

		});	
		
	
	})
	router.post('/img', (req,res) => {
		console.log(req.files);
		console.log(req.files.file.name)
		upload.uploadImg(req.files.file.tempFilePath,1);
		res.send("asdf");
	});
	router.get("/merchant:input", (req, res) => {
		Merchant.Merchant(JSON.parse(req.params.input), (response) => { 
			res.send(response);
		})
	});


module.exports = router;

