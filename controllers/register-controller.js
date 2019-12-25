var express=require("express");
var connection = require('./../sql');
var Cryptr = require('cryptr');
cryptr = new Cryptr('MyVrySecr');
var res = false;

function emailExists(email){
    connection.query(`select count(user_email) as count from users where user_email="${email}";`,function(err,rows,fields){
      if(rows[0].count=='1'){
        res = true;
        return res;
      }
      res = false;
      return res;
    });
    return res;
  }

module.exports.register=function(req,res){
  var today = new Date();
  console.log(emailExists(req.body.user_email));

  if (emailExists(req.body.user_email)){
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