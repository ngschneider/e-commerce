// Packages 

const express = require('express');
const router = express.Router();
const sql = require('./database/events');
const addUser = require('./routes/addUser');
const CreateUser = require('./routes/CreateUser');
const Login = require('./routes/Login');
const upload = require('./routes/product');
const Merchant = require('./routes/Merchant');
const Product = require('./routes/product');


// Routes

	router.get('/addUser:input', (req,res) => {

			console.log(req.params.input)
       		CreateUser.createUser(req.params.input,function(result){
			res.send(`${result}`)
		});
	
	});

	router.get('/login:input', (req,res) => {
		
		Login.loginAuth(req.params.input,function(result){
			res.send(JSON.stringify(result));

		});	
		
	});

	router.post('/img', (req,res) => {
		console.log(req.files);
		console.log(req.files.file.name)
		upload.uploadImg(req.files.file.data,req.files.file.name);
		res.send("asdf");
	});

	router.get("/merchant:input", (req, res) => {
		Merchant.Merchant(JSON.parse(req.params.input), (response) => { 
			res.send(response);
		})
	});

	router.get( '/addProduct:input', (req,res) => {
		console.log(req.params.input);
		let input = JSON.parse(req.params.input);
		console.log(input)

		Product.uploadProduct(input.merchantId, 
			input.productId, input.productName,
			input.startDate, input.endDate, input.stock, (response) => {
				res.send(response);

		});
	});


module.exports = router;

