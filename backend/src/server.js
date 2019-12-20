
const port = 8080;
const host = '0.0.0.0';

const fs = require('fs');
const mysql = require('mysql');
// var net = require('net');
var http = require('http');
var url = require('url');
const htmlIndex = 'index.html';
const htmlBadGateWay = 'src/test.html';
// const cssHeader = 'frontend/css/header.css';
// const cssVariables = 'frontend/css/variables.css';
// const cssIndexMain = 'frontend/css/main.css';
// const cssFooter = 'frontend/css/footer.css';
// const cssRequired = 'frontend/css/required.css';
// const imgLogo = 'frontend/img/logo.png';



const mysqlOpt = mysql.createConnection({
	host : "zanner.org.ua",
	port : 33321,
	user : "ka7507",
	password : "380937307720",
	database : "ka7507"
});

var loginUserSQL = `loginUser("${userEmail}", "${userPassword}")`;
var queryLoginUser = `select ${loginUserSQL};` ;

var userEmail = "berk@gmail.com";
var userPassword = "1234556";

http.createServer(function (req, res){
	log(req.url + ' = '+req.url.replace('/',''));
	try{
		let reqUrl = req.url.replace('/', '');
		
		if(FileExists(reqUrl) || reqUrl === ''){
			log(reqUrl + ' - exists : ' + FileExists(reqUrl));
			res.writeHead(200, {'Content-Type': ContentTypeOfUrl(req.url)});
			if ( reqUrl === ''){
				fs.createReadStream(htmlIndex).pipe(res);
			} else{
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


function ContentTypeOfUrl(url){
	if (url.indexOf('.css') >=0){
		return 'text/css';
	}
	if (url.indexOf('.js') >=0){
		return 'text/script';
	}
	return 'text/html';
}

function FileExists(pathFile){
	if (fs.existsSync(pathFile)) {
    	return 1;
	}
	return 0;
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


// function connectMysql(){
// 	mysqlOpt.connect(function(err){
// 		if (err) throw err;
// 		console.log("Connected!!!");
// 	});
// }

// function disconnectMysql(){
// 	mysqlConn.end();
// }

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




// function parseLoginUserResponse(row){

// }



// ##################################################
// var net = require('net');

// var server = net.createServer(function(socket) {
// 	socket.write('Echo server\r\n');
// 	socket.pipe(socket);
// 	socket.on('error', function(err){
// 	console.log(err.toString());
// })
// });

// server.listen(port, host);

// ##################################################

// ##################################################
// var server = http.createServer((function(req,res){
// 	res.writeHead(200,
// 		{"Content-type": "text/plain"});
// 	res.end("Hello World!\n");
// 	http.server.bo
// }));

// server.listen(8080,'0.0.0.0'); 
// console.log('Node server running on port 8080');
// ##################################################

function log(str){
	console.log(str);
}