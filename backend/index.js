const express = require('express')
const app = express()
const fileupload = require("express-fileupload");
const cors = require('cors')
const port = 444

//app.get('/', (req, res) => {
 //	console.log("Connected");
//	res.send('Hello World!')
//})

app.use(cors());
app.use(fileupload({
	useTempFiles : true,
	tempFileDir : './img/'
}));
app.use('/',require("./routes"));

app.listen(port);
//app.listen(port, () => {
  //console.log(`Example app listening at http://localhost:${port}`)
//})
