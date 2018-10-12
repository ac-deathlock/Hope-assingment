var conn = require('conn');
var express = require('express');
var router = express.Router();

module.exports.register = function(req, res){
    // console.log("req",req.body);
  //var today = new Date();
  var student=[
    req.body.name,
    req.body.email,
    req.body.password
  ];
  //console.log(student);
  conn.query('INSERT INTO student (name, email, password) VALUES (?, ?, ?)', student,function(er,result){
    if (er) {
        console.log("error ocurred",er);
        res.send({
          "code":400,
          "failed":"error ocurred"
        })
      }else{
        console.log('The solution is: ', result);
        res.send({
          "code":200,
          "success":"user registered sucessfully"
            });
      }
  });

};

module.exports.login = function(req, res){
    var email = req.body.email;
    var password = req.body.password;
    conn.query('SELECT * FROM student WHERE email = ?', email, function(er, result){
        console.log(result);
        if (er) {
            // console.log("error ocurred",error);
            res.send({
              "code":400,
              "failed":"error ocurred"
            })
          }else{
            // console.log('The solution is: ', results);
            if(result.length >0){
              if(result[0].password == password){
                res.send({
                  "code":200,
                  "success":"login sucessfull"
                    });
              }
              else{
                res.send({
                  "code":204,
                  "success":"Email and password does not match"
                    });
              }
            }
            else{
              res.send({
                "code":204,
                "success":"Email does not exits"
                  });
            }
          }
    });
};

module.exports.forgot = function(req, res){
    var email = req.body.email;
    var fpass = req.body.fpass;
    var data = [fpass, email];
    	conn.query('SELECT * FROM student WHERE email = ?', email, function(er, result){
        console.log(result);
        if(er)
        {
            console.log("Some error " + error);
            res.status(400);
            res.json({"message":"Some error in fetching"});
        }
        else if(results.length == 0) {
            console.log("NO RECORDS");
            res.status(401);
            res.json({"message":"No account with this email"});
        }
        else
		{
			conn.query('UPDATE student SET password = ? WHERE email = ?', data, function(error, result){
				if(error)
			        {
			            //console.log(error);
			            res.status(200);
			            res.json({"message":"some error try again"});

			        }
			        else
			        {
			            res.status(200);
			            res.json({"message":"password updated"});
					}
			});
		}
	}
	)};
    