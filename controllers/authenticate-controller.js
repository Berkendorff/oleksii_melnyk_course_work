var Cryptr = require('cryptr');
cryptr = new Cryptr('MyVrySecr');
var express = require('express');
var bodyParser = require('body-parser');  
var mysql = require('./../sql');

// var app = express();

// app.use(session({
//   secret: 'SecretKeyForSecretUser',
//   resave: true,
//   saveUninitialized: true,
//   cookie: {maxAge: 8694000000}
// }));

// app.use(bodyParser.urlencoded({extended : true}));
// app.use(bodyParser.json());


module.exports.authenticate=function(req,res){
    var email=req.body.email;
    var password=req.body.password;
    if(email && password){
      mysql.query('SELECT * FROM users WHERE user_email = ?',[email], function (error, results, fields){
      if (error) {
          res.send('Incorrect Email/Password!');
          res.end();
      }else{
        if(results.length > 0){
            decryptedString = cryptr.decrypt(results[0].user_password);
            if(password==decryptedString){
              // req.session.loggedin = true;
              // req.session.email = email;
              res.redirect('/');
            }else{
                res.send("Email and password does not match");
                res.end();
            }
        }
        else{
          res.send("Email does not exits");
          res.end();
        }
      }
    });
  }else{
    res.send('Incorrect Email/Password!');
    res.end();
  }
}

// module.exports.checkToken = function(req,res){
//   // console.log(req);
//   console.log(checkTokenQuery(req.session.token));
//   res.end();
// }

// function checkTokenQuery(token){
//   return mysql.query(`select checkValidToken("${token}");`)
// }

// function setToken(req,res){

// }