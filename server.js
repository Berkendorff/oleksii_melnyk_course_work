
//oleksii_melnyk_course_work

const fs = require('fs');
const http = require('http');
const url = require('url');
const mysql = require('./sql');
const app = require('./app');


const html = 'frontend/html/';
const css = 'frontend/css/';
const img = 'frontend/img/';
const Index = html + 'index.html';
const BadGateWay = html + 'test.html';
const restrictedDirs = ['src'];

function StrIncld(url,substr){
	if (url.indexOf(substr)>=0){
		return 1;
	}
	return 0;
}

function ContentTypeOfUrl(url){
	if (StrIncld(url,'.css')){
		return 'text/css';
	}
	if (StrIncld(url,'.js')){
		return 'text/javascript';
	}
	return 'text/html';
}

function FileExists(pathFile){
	if (fs.existsSync(pathFile)) {
    	return 1;
	}
	return 0;
}

function RestrictedDir(url){
	if (StrIncld(url,'src')){return 1;}
	return 0;
}

function getVorks(){
	mysqlConn.query('select * from vorks;', 
		function(err,rows, fields){
				if (err) {
					res.writeHead(404,{'Content-type':'text/html'});
					res.end(err);
					throw err;
				}
				res.writeHead(200,{'Content-type':'text/plain'});
				// log(rows);
				res.end(JSON.stringify(rows));				
			});
}

function loginUser(email,password){
	mysqlConn.query(`select loginUser(${email},${password})`,function(){

	});
}

function log(str){
	console.log(str);
}