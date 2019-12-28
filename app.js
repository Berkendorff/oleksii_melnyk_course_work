
const port = process.env.PORT || 8080;
const host = '0.0.0.0';
const ejs = require('ejs');
const url = require('url')
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
router.get('/about_us.html', function (req, res) {  
   authorisationUser(req);
   res.sendFile( __dirname + "/" +  html + "about_us.html");  
});
router.get('/contacts.html', function (req, res) {  
   authorisationUser(req);
   res.sendFile( __dirname + "/" +  html + "contacts.html");  
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
router.get('/script/add_vork.js', function (req, res) {  
   res.sendFile( __dirname + "/" + js + "add_vork.js" );  
});
router.get('/script/require.js', function (req, res) {  
   res.sendFile( __dirname + "/" + js + "require.js" );
});
router.get('/script/profile.js', function (req, res) {  
   res.sendFile( __dirname + "/" + js + "profile.js" );
});

router.get('/script/index.js', function (req, res) {  
   res.sendFile( __dirname + "/" + js + "index.js" );
});
/*
Req with sql
*/
router.get('/getInterestsQuery',function(req,res){
  mysql.query('select * from interests;', 
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

router.get('/getVorksQuery',function (req, res) {   
  // console.log(url.parse(req.url,true).query!);
  let interest = url.parse(req.url,true).query.interest;
  console.log("interest " + interest);
  console.log(interest=='null');

  if(interest!=''&&interest!='undefined'&&interest!='null'){
 mysql.query(`select * from interests as i join vorks_interests as vi join vorks as v join users u          
  where (i.interest = '${interest}' and vi.interest_id = i.interest_id and v.vork_id=vi.vork_id and u.user_id=v.vork_creator_id) 
  order by vork_date desc limit 32;`, 
      function(err,rows, fields){
            if (err) {
              console.log('error');
               res.writeHead(404,{'Content-type':'text/html'});
               res.redirect('/find_vorks.html');
               throw err;
            }
            res.writeHead(200,{'Content-type':'text/plain'});
            res.end(JSON.stringify(rows));            
         });
  }
  else{
   mysql.query(`select * from vorks v join users u
    where (v.vork_creator_id = u.user_id )  
    order by vork_date desc limit 32;`, 
      function(err,rows, fields){
        // console.log(rows);
            if (err) {
              console.log(err);
               res.writeHead(404,{'Content-type':'text/html'});
               res.redirect('/find_vorks.html');
               throw err;
               return;
            }
            // console.log(rows);
            res.writeHead(200,{'Content-type':'text/plain'});
            res.end(JSON.stringify(rows));            
         });
  }
});

// router.post('/getVorksQuery',function (req, res) {  
//   console.log(req.body.interest);
//   //  mysql.query(`select * from interests as i join vorks_interests as vi join vorks as v                ###########################3
//   // where (i.interest = '${req.body.interest}' and vi.interest_id = i.interest_id and v.vork_id=vi.vork_id) 
//   // order by vork_date desc limit 32;`, 
//   //     function(err,rows, fields){
//   //       console.log('in callback');
//   //           if (err) {
//   //             console.log('error');
//   //              res.writeHead(404,{'Content-type':'text/html'});
//   //              res.redirect('/find_vorks.html');
//   //              throw err;
//   //           }
//   //           // console.log(rows);
//   //           console.log('return values');
//   //           console.log(rows);
//   //           res.writeHead(200,{'Content-type':'text/plain'});
//   //           // res.redirect('/find_vorks.html')
//   //           res.end(JSON.stringify(rows));            
//   //        });
//   req.session.interest = req.body.interest;
//   console.log(req.session);
//   res.end('/find_vorks.html');

// });

router.get('/loadProfile',function(req,res){
if (req.session.auth){
     let user_id = '';
     let token = req.session.token;
     var decode = cryptr.decrypt(token);
     mysql.query(`select * from users where user_email = "${decode}"`,function(err,rows){
        if(err){
          res.writeHead(404,{'Content-type':'text/html'});
               res.end("Error");
          console.log(err);
        }
            // console.log(rows);
            res.writeHead(200,{'Content-type':'text/plain'});
            res.end(JSON.stringify(rows[0]));
          });

  }
  
});
 
router.post('/add_vork',function(req,res){
  if (req.session.auth){
    console.log(req.body);
     let user_id = '';
     let token = req.session.token;
     let token_id = req.session.token_id;
     var decode = cryptr.decrypt(token);
     var decode_id = cryptr.decrypt(token_id);
     addVork(req,decode_id);
   
  }else{
    req.session.fail='Please, login or sing in for add!';  
  }
  res.redirect('/add_vork.html');
});

router.post('/subscribeUser',function(req,res){
  console.log(req.body);
    if(req.body!=''&&req.session.auth&&req.body.data.length<20){
        mysql.query(`insert into users_vorks(user_id,vork_id) 
          values("${cryptr.decrypt(req.session.token_id)}","${req.body.data}");`,function(err,rows){
          if(err){
            console.log(err);
          }
          console.log("SUBS!");
        });
    }else{
      console.log("no(");
      req.session.fail="Please login or be quite";
      res.redirect('/');
      return;
    }
    res.redirect('/find_vorks.html');
});

function addVork(req,user_id){
  let body = req.body;
  console.log(body);
  let location={};
  if(body.country!='undefined' && body.country!=''){
    location.country=body.country;
  }
  if(body.region!='undefined' && body.region!=''){
    location.region=body.region;
  }
  if(body.city!='undefined' && body.city!=''){
    location.city=body.city;
  }

  // console.log(location);
  // console.log(JSON.stringify(location));
  mysql.query(`call app_add_vork(
    "${user_id}",
    "${body.vork_name}",
    "${body.vork_desc}",
    "${body.vork_needs}",
    "open",
    '${JSON.stringify(location)}');`,
    function(err,res){
      if(err){
        console.log(err);
        return;
      }
      mysql.query(`select vork_id from vorks where vork_creator_id="${user_id}" and vork_name ="${body.vork_name}";`,
      function(err,rows){
        console.log('open add interests;');
        if(err){
          console.log(err);
          req.session.fail="Can`t add interests of vork";
          return;
        }
          var keys = Object.keys(req.body);
          console.log(keys);
          for (let key in keys){
              if(!keys[key].match(/[^0-9]/)){
                console.log(keys[key]+" !!!");
                mysql.query(`insert into vorks_interests(vork_id,interest_id) values("${rows[0].vork_id}","${keys[key]}");`)
              }
          }
      });
      
    });
  
  
}

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
               req.session.token_id = cryptr.encrypt(results[0].user_id);
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
            req.session.auth = true;
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
  res.end(`{"token":"${req.session.token}","fail":"${req.session.fail}","interest":"${req.session.interest}"}`);
  // res.end(JSON.stringify(req.session));
}

function destroySession(req,res){
  req.session.destroy();
  res.redirect('/');
}

function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    location.search
        .substr(1)
        .split("&")
        .forEach(function (item) {
          tmp = item.split("=");
          if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
        });
    return result;
}
