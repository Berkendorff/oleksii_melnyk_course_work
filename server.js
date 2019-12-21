
//oleksii_melnyk_course_work



const fs = require('fs');
const http = require('http');
const url = require('url');
// const express = require('express');
// const bodyParser = require('body-parser');


const html = 'frontend/html/';
const css = 'frontend/css/';
const img = 'frontend/img/';
const Index = html + 'index.html';
const BadGateWay = html + 'test.html';
const restrictedDirs = ['src'];


// console.log(__dirname);
// const connection = require('./config');
// const authenticateController=require('./controllers/authenticate-controller');
// const registerController=require('./controllers/register-controller');
const app = require('./app');





// function connectMysql(){
// 	mysqlConn.connect(function(err){
// 		if (err) throw err;
// 		console.log("Connected!!!");
// 	});
// }

// function disconnectMysql(){
// 	mysqlConn.end();
// }



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





// http.createServer(function(req, res){
//     if (req.url === '/') {
//         res.writeHead(200, {'Content-Type': 'text/html'});
//         fs.createReadStream('pages/index.html').pipe(res);
//     } 
//     else if (req.url === '/css/theme.css') {
//         res.writeHead(200, {'Content-Type': 'text/css'});
//         fs.createReadStream('css/theme.css').pipe(res);
//     } 
//     else if (req.url === '/data') {
//     	res.writeHead(200, {'Content-Type': 'text/html'});
// 		console.log("before exports");
		
// 		exports.connection.query('SELECT * FROM countryinfo;', function(error, results) {
// 		    console.log("inside exports");
// 		    let str = '<head><link rel="stylesheet" type="text/css" href="css/theme.css"></head><body><p>hello iasa!</p>';
	
// 		    if (error) throw error
// 		    try {
// 		    	str += '<table>';
// 		    	for(var key in results){
// 			    	const data = JSON.parse(results[key].doc);
// 			      	  str += '<tr>';
// 			        str += '<td>'+ data.Name+'</td>';
// 			        str += '<td>'+ data.geography.Continent+'</td>';
// 			        str += '<td>'+ data.geography.SurfaceArea+'</td>';
// 			      	str += '</tr>';
// 			    	console.log(data);
// 		    	}
// 		      	str += '</table>';
// 		    } 
// 		    catch(err) {
// 		      console.error(err)
// 			    } 
// 			str += "</body>";
// 			res.write(str);  
// 		    console.log(results); // [{2: 2}]
// 		    });
//     }
//     else{
//         res.writeHead(404, {'Content-Type': 'text/html'});
//         fs.createReadStream('pages/404.html').pipe(res);
//     }    
//  }).listen(port);


// var server = net.createServer(function(socket) {
// 	socket.write('Echo server\r\n');
// 	socket.pipe(socket);
// 	socket.on('error', function(err){
// 		console.log(err.toString());
// 	})
// 	socket.on('')
// });
// server.listen(port, host);




// function loginUser(enail, password){
// 	mysqlOpt.query(queryLoginUser, function(err,rows,fields){
// 	if(err) throw err;
// 	var queryLoginUser = `select loginUser("${userEmail}", "${userPassword}");` ;
// 	// console.log(rows);
// 	// for (var i in rows) {
// 	// 	console.log("Post titles: ", rows[i]);
// 	// }
// 	Object.keys(rows).forEach(function(key){
// 		console.log(rows[key]);
// 	});
// });
// }

function log(str){
	console.log(str);
}