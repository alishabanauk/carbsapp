var mongoclient = require("mongodb").MongoClient;
var url = "mongodb+srv://Shani:Yasir1511@carbapp-4rnlu.mongodb.net/CarbsDB?retryWrites=true";
var express = require("express");
var path = require("path");
var bodyparser = require("body-parser");
var urlencodedParser = bodyparser.urlencoded({ extended: false });
var app = express();
var mysql = require("mysql");
var port = process.env.PORT || 8082;


//Connecting to my remote mysql DB
app.use(express.static("public"));
/*app.use("/", function(req, res, next){
var con = mysql.createConnection({
	host: "remotemysql.com",
	user: "bupFWhT8t5",
	password: "HtaOPLrUi5",
	database: "bupFWhT8t5",
	port:3306
	});	
		con.query("SELECT * FROM mytable", function(err, rows){
		//con.query("SELECT name, nutritionper100gcarbohydrate FROM mytable limit 10", function(err, rows){
		if (err) throw err;
		//res.json(rows);
		console.log(rows[0].name +" "+ rows[0].nutritionper100genergy);
	});

	next();
	
});
*/

  // Load middleware function before routes to any path
app.post("/users",urlencodedParser, function(req, res){
	res.send("Thankyou, the data has been recieved.");
	console.log(req.body.firstname);
	console.log(req.body.lastname);
	console.log(req.body.email);
	console.log(req.body.pass_word);
	console.log(req.body.con_firm);
	mongoclient.connect(url,{useNewUrlParser:true},  function(err, db){
		if (err) throw err;
		console.log("Connection is successfull");
		var database = db.db("CarbsDB");
		
		var obj= {
			firstname:req.body.firstname,
			lastname:req.body.lastname,
			email:req.body.email,
			pass_word:req.body.pass_word,
			con_firm:req.body.con_firm
		};
	
	database.collection("Users").insertOne(obj, function (err, result) {	
		if (err) throw err;
		console.log("Data has been added to the database");
		
	   });
	
	});
});
	// Querying all food types 
	app.get("/food", function(req, res){
		var con = mysql.createConnection({
		host: "remotemysql.com",
		user: "bupFWhT8t5",
		password: "HtaOPLrUi5",
		database: "bupFWhT8t5",
		port:3306
     });	
	
	con.query("SELECT * FROM mytable limit 10", function(err, result){
		if(err) throw err;
		res.json(result);
	
	});
});

//route to handle the path(/home)
app.get("/home", function(req, res){
	res.sendFile(path.join(__dirname + "/home.html"));
}); 

//route to handle the path(/food)
app.get("/Fooditem", function(req, res){
	res.sendFile(path.join(__dirname + "/food.html"));
});
	
//Route to handle the path (/login)
	
app.get("/login", function(req, res){
	res.sendFile(path.join(__dirname + "/login.html"));
});

//Route to handle the path (register)
app.get("/register", function (req,res){
	res.sendFile(path.join(__dirname + "/register.html"));
});
app.listen(port);