var express=require("express");
var connection = require('./../sql');
var Cryptr = require('cryptr');
cryptr = new Cryptr('MyVrySecr');
 
function emailExists(email){
  return connection.query(`select count(user_email) as count from users where user_email="${email}";`);
}

module.exports.register=function(req,res){
  var today = new Date();

  if (!emailExists(req.body.user_email).count){
    var encryptedString = cryptr.encrypt(req.body.user_password);
    var users={
        "user_name":req.body.user_name,
        "user_email":req.body.user_email,
        "user_registration_date":today,
        "user_password":encryptedString
    }
    connection.query('INSERT INTO users SET ?',users, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.json({
            status:false,
            message:'there are some error with query'
        })
      }else{
          res.json({
            status:true,
            data:results,
            message:'user registered sucessfully'
        })
      }
    });
  }else{
    res.json({
      status:false,
      message:'this email already exist'
    })
  } 
}

module.exports.checkToken=function(req,res){
  let token = req.body.token;
  if(token){
    let decrtoken = cryptr.decript(token);
    console.log(checkTokenQuery(decrtoken));
  }
  res.end();
}

function checkTokenQuery(token){
  return connection.query(`select checkToken("${token}"");`)
}