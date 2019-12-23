var Cryptr = require('cryptr');
var express=require("express");
var connection = require('./../sql');
cryptr = new Cryptr('myTotalySecretKey');
 
function emailExists(){
  return connection.query('select count(user_email) from users;');
}

module.exports.register=function(req,res){
  var today = new Date();
  // console.log(req.body);
  if (!emailExists){
    var encryptedString = cryptr.encrypt(req.body.user_password);
    console.log(encryptedString.length);
    var users={
        "user_name":req.body.user_name,
        "user_email":req.body.user_email,
        "user_registration_date":today,
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
  }else{
    res.json({
      status:false,
      message:'this email already exist'
    })
  } 
}

