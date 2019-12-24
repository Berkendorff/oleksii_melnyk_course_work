
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


// var loginUserSQL = `loginUser("${userEmail}", "${userPassword}")`;
// var queryLoginUser = `select ${loginUserSQL};` ;

// var userEmail = "berk@gmail.com";
// var userPassword = "1234556";

/*OLD SERVER!!!!!!!!!!!!!!!!!!!!

http.createServer(function (req, res){
	log(req.url + ' = '+req.url.replace('/',''));
	try{
		let reqUrl = req.url.replace('/', '');
		/
		HANDLING REQUESTS 
		/

		if(StrIncld(reqUrl,'getVorksQuery')){
			getVorks();
			return;
		}

		/
		Send files!
		/

		if((FileExists(reqUrl) || reqUrl === '') && !RestrictedDir(reqUrl)){
			log(reqUrl + ' - exists : ' + FileExists(reqUrl));
			res.writeHead(200, {'Content-Type': ContentTypeOfUrl(req.url)});
			if ( reqUrl === ''){
				fs.createReadStream(htmlIndex).pipe(res);
			} else{
				if (StrIncld(reqUrl,'find_vorks.html')){

				}


				fs.createReadStream(reqUrl).pipe(res);
			}
		} else {
			log(reqUrl + ' - exists : ' + FileExists(reqUrl));
			res.writeHead(404, {'Content-Type': 'text/html'});
			fs.createReadStream(htmlBadGateWay).pipe(res);
		}	
	}
	catch(err){
		res.writeHead(404, {'Content-Type': 'text/html'});
		fs.createReadStream(htmlBadGateWay).pipe(res);
		log(err);
	}
}).listen(port); 
*/


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