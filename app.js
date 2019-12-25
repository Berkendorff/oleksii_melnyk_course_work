
const port = process.env.PORT || 8080;
const host = '0.0.0.0';
const ejs = require('ejs')
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = express.Router();
const bodyParser = require('body-parser');
const mysql = require('./sql');
const authenticateController=require('./controllers/authenticate-controller');
const registerController=require('./controllers/register-controller');

const Cryptr = require('cryptr');
cryptr = new Cryptr('MyVrySecr');
// console.log(cryptr);

var app = express();

const html = 'frontend/html/';
const css = 'frontend/css/';
const img = 'frontend/img/';
const js = 'frontend/script/';
const Index = html + 'index.html';
const BadGateWay = html + 'test.html';

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(cookieParser());
app.use(session({
  secret: 'SecretKeyForSecretUser',
  resave: true,
  saveUninitialized: true,
  cookie: {maxAge: 8694000000}
}));

/* route to handle login and registration */
router.post('/api/register',register);
// router.post('/api/authenticate',authenticateController.authenticate);
router.post('/api/authenticate',authenticateUser);
 
console.log(authenticateController);
router.post('/controllers/register-controller', register);
// router.post('/controllers/authenticate-controller', authenticateController.authenticate);
router.post('/controllers/authenticate-controller', authenticateUser);



/*
Send html
*/

// app.get('/', function(req, res){
//    if(req.session.page_views && req.session.email){

//       req.session.page_views++;
//       res.send("You visited this page " + req.session.page_views + " times, with email " + req.session.email);
//    } else {
//       req.session.page_views = 1;
//       req.session.email = "alexeym00@gmail.com";
//       res.send("Welcome to this page for the first time!");
//    }
// });

router.get('/cookie',sendCookie);
router.get('/logout',destroySession);
router.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + Index );  
});

router.get('/', function (req, res) {  
   res.sendFile( __dirname + "/" + Index );  
});
router.get('/index.html', function (req, res) {  
   authorisationUser(req);
   res.sendFile( __dirname + "/" +  html + "index.html");  
});
router.get('/template.html', function (req, res) {  
   authorisationUser(req);
   res.sendFile( __dirname + "/" +  html + "template.html");  
});
router.get('/find_vorks.html', function (req, res) {  
   authorisationUser(req);
   res.sendFile( __dirname + "/" +  html + "find_vorks.html");  
});
router.get('/profile.html', function (req, res) {  
   authorisationUser(req);
   res.sendFile( __dirname + "/" +  html + "profile.html");  
});
router.get('/add_vork.html', function (req, res) {  
   authorisationUser(req);
   res.sendFile( __dirname + "/" +  html + "add_vork.html");  
});
/*
Send  css
*/

router.get('/css/find_vorks.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "find_vorks.css" );  
});
router.get('/css/footer.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "footer.css" );  
});
router.get('/css/header.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "header.css" );  
});
router.get('/css/main.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "main.css" );  
});
router.get('/css/required.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "required.css");  
});
router.get('/css/style.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "style.css" );  
});
router.get('/css/variables.css', function (req, res) {  
   res.sendFile( __dirname + "/" +  css + "variables.css");  
});
router.get('/css/profile.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "profile.css" );  
});
router.get('/css/add_vork.css', function (req, res) {  
   res.sendFile( __dirname + "/" + css + "add_vork.css" );  
});

/*
Send img
*/
router.get('/img/logo.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "logo.png" );  
});

router.get('/img/web.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "web.png" );  
});

router.get('/img/ml.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "ml.png" );  
});
router.get('/img/data.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "data.png" );  
});
router.get('/img/garden.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "garden.png" );  
});
router.get('/img/devops.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "devops.png" );  
});
router.get('/img/cat.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "cat.png" );  
});
router.get('/img/chemistry.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "chemistry.png" );  
});

router.get('/img/agro.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "agro.png" );  
});
router.get('/img/dropdown.png', function (req, res) {  
   res.sendFile( __dirname + "/" + img + "dropdown.png" );  
});
/*
Send js
*/
router.get('/script/findVorks.js', function (req, res) {  
   res.sendFile( __dirname + "/" + js + "findVorks.js" );  
});
router.get('/script/require.js', function (req, res) {  
   res.sendFile( __dirname + "/" + js + "require.js" );
});


router.get('/getVorksQuery',function (req, res) {  
   mysql.query('select * from vorks;', 
      function(err,rows, fields){
            if (err) {
               res.writeHead(404,{'Content-type':'text/html'});
               res.end(err);
               throw err;
            }
            res.writeHead(200,{'Content-type':'text/plain'});
            res.end(JSON.stringify(rows));            
         });
});

router.get('*', function (req, res) {  
   res.sendFile( __dirname + "/" +  html + "404.html");  
});

app.use('/',router);

app.listen(port, (err)=>{
   if(err) throw err;
   console.log(`listening on port ${port}`);
});

module.exports = app;

function authenticateUser(req,res){
    var email=req.body.email;
    var password=req.body.password;
    if(email && password){
      mysql.query('SELECT * FROM users WHERE user_email = ?',[email], function (error, results, fields){
      if (error) {
          req.session.auth = false;
          req.session.fail='Some error';
          res.redirect('/');
      }else{
        if(results.length > 0){
            decryptedString = cryptr.decrypt(results[0].user_password);
            if(password==decryptedString){
               if(!req.session.token) {
                  req.session.token = cryptr.encrypt(results[0].user_email);
               }
               req.session.auth = true;
               req.session.fail="";
               res.redirect('/');
            }else{
               req.session.auth = false;
               req.session.fail='Email and password does not match!';
               res.redirect('/');
            }
        }
        else{
          req.session.auth = false;
          req.session.fail='Email does not exits!';
          res.redirect('/');
        }
      }
    });
  }else{
      req.session.auth = false;
      req.session.fail='Incorrect Email/Password!';
      res.redirect('/')
  }
}

function authorisationUser(req,res){
   let token = req.session.token;
   if(token){
      mysql.query(`select user_email from users where user_email="${cryptr.decrypt(token)}"`,function(err,rows, fields){
         if(err){
            console.log(err);
            // res.end("false");
            req.session.auth = false;
            req.session.fail = "";
            return false;
         }
         if (rows.length > 0){
            console.log("authorsation complete");
            // res.end("true");
            req.session.auth = false;
            req.session.fail = "";
            return true;
         }
         console.log("This email token invalid");
         // res.end("false");
         req.session.auth = false;
         req.session.fail = "";
         return false;
      });
      
   }
   else{
      console.log("token is empty");
      // res.end("false");
      req.session.auth = false;
      req.session.fail = "";
      return false;
   }
}

var existEmail = false;
function emailExists(email){
    mysql.query(`select count(user_email) as count from users where user_email="${email}";`,function(err,rows,fields){
      if(rows[0].count=='1'){
        existEmail = true;
        return existEmail;
      }
      existEmail = false;
      return existEmail;
    });
    return existEmail;
  }

function register (req,res){
  var today = new Date();
  console.log(emailExists(req.body.user_email));

  if (!emailExists(req.body.user_email)){
    var encryptedString = cryptr.encrypt(req.body.user_password);
    var users={
        'user_email':req.body.user_email,
        'user_name':req.body.user_name,
        'user_password':encryptedString
    }
    // mysql.query(`call signupUser("${req.body.user_email}","${req.body.user_name}","${encryptedString}");`, function (error, results, fields) {
      mysql.query('insert into users set ?',users,function(error,results,fileds){
      if (error) {
        console.log(error);
        req.session.fail = "Some error";
        res.redirect('/');
      }else{
        //All ok! registered confirmed
        req.session.fail = "";
        res.redirect('/');
      }
    });
  }else{
    req.session.fail = "Email already registered!";
    res.redirect('/');
  } 
}

function sendCookie(req,res){
  res.end(`{"token":"${req.session.token}","fail":"${req.session.fail}"}`);
}

function destroySession(req,res){
  req.session.destroy();
  res.redirect('/');
}

// function authorisationUser(req,res){
//    let token = req.session.token;
//    console.log("auth entered");
//    if(token){
//       mysql.query(`select user_email from users where user_email="${cryptr.decrypt(token)}"`,function(err,rows, fields){
//          if(err){
//             console.log(err);
//             // res.end("false");
//             return false;
//          }
//          if (rows.length > 0){
//             console.log("authorsation complete");
//             // res.end("true");
//             return true;
//          }
//          console.log("This email token invalid");
//          // res.end("false");
//          return false;
//       });
      
//    }
//    else{
//       console.log("token is empty");
//       // res.end("false");
//       return false;
//    }
// }




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