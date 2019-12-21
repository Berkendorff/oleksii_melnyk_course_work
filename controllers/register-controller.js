var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./../config');
cryptr = new Cryptr('myTotalySecretKey');
 
module.exports.register=function(req,res){
  var today = new Date();
  console.log(req.body);

  var encryptedString = cryptr.encrypt(req.body.user_password);
  console.log(encryptedString.length);
    var users={
        "user_name":req.body.user_name,
        "user_email":req.body.user_email,
        // "created_at":today,
        // "updated_at":today,
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
}