var mysql = require("mysql");
// var express    = require('express');   
// var app        = express();  
//Database connection

var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'root',
		password : '',
		database : 'iit'
	});
	connection.connect(function(error){
		if(error)
		{
			console.log(error);
		}
		else
		{
			console.log("DB connected");
			//next();
		}
	});
	
module.exports = connection;