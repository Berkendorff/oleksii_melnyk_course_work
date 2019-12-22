/*
Send html
*/
const port = process.env.PORT || 8080;
const host = '0.0.0.0';

const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('./config');
const authenticateController=require('./controllers/authenticate-controller');
const registerController=require('./controllers/register-controller');
var app = express();

;
const html = 'frontend/html/';
const css = 'frontend/css/';
const img = 'frontend/img/';
const js = 'frontend/script/';
const Index = html + 'index.html';
const BadGateWay = html + 'test.html';



app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/* route to handle login and registration */
app.post('/api/register',registerController.register);
app.post('/api/authenticate',authenticateController.authenticate);
 
console.log(authenticateController);
app.post('/controllers/register-controller', registerController.register);
app.post('/controllers/authenticate-controller', authenticateController.authenticate);



app.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + Index );  
});
app.get('/index.html', function (req, res) {  
   res.sendFile( __dirname + "/" +  html + "index.html");  
});
app.get('/template.html', function (req, res) {  
   res.sendFile( __dirname + "/" +  html + "template.html");  
});
app.get('/find_vorks.html', function (req, res) {  
   res.sendFile( __dirname + "/" +  html + "find_vorks.html");  
});

/*
Send  css
*/

app.get('/css/find_vorks.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "find_vorks.css" );  
});
app.get('/css/footer.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "footer.css" );  
});
app.get('/css/header.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "header.css" );  
});
app.get('/css/main.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "main.css" );  
});
app.get('/css/required.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "required.css");  
});
app.get('/css/style.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "style.css" );  
});
app.get('/css/variables.css', function (req, res) {  
   res.sendFile( __dirname + "/" +  css + "variables.css");  
});

/*
Send img
*/
app.get('/img/logo.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "logo.png" );  
});

app.get('/img/web.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "web.png" );  
});

app.get('/img/ml.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "ml.png" );  
});
app.get('/img/dropdown.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "dropdown.png" );  
});

/*
Send js
*/



app.get('/script/findVorks.js', function (req, res) {  
   res.sendFile( __dirname + "/" + js + "findVorks.js" );  
});


app.get('/getVorksQuery',function (req, res) {  
   mysql.query('select * from vorks;', 
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
});



app.get('*', function (req, res) {  
   res.sendFile( __dirname + "/" +  html + "404.html");  
});



app.listen(port);

module.exports = app;


// function getVorks(){
//    mysql.query('select * from vorks;', 
//       function(err,rows, fields){
//             if (err) {
//                res.writeHead(404,{'Content-type':'text/html'});
//                res.end(err);
//                throw err;
//             }
//             res.writeHead(200,{'Content-type':'text/plain'});
//             // log(rows);
//             res.end(JSON.stringify(rows));            
//          });
// }

// function httpGetAsync(theUrl, callback)
// {
//     var xmlHttp = new XMLHttpRequest();
//     xmlHttp.onreadystatechange = function() { 
//         if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
//             callback(xmlHttp.responseText);
//     }
//     xmlHttp.open("GET", theUrl, true); // true for asynchronous 
//     xmlHttp.send(null);
// }