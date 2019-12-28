var mysql = require('mysql');

const connection = mysql.createConnection({
	host : "zanner.org.ua",
	port : 33321,
	user : "ka7507",
	password : "380937307720",
	database : "ka7507"
});

connection.connect(function(err){
if(!err) {
    console.log("Database is connected");;
} else {
    console.log("Error while connecting with database");
}
});
module.exports = connection; 