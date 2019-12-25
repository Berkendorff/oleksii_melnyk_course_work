function getCookie(cname) {
	setTimeout(function(){},500);
	  var name = cname + "=";

	  var cookie = "";
	  httpGetAsync("/cookie",(res)=>{
	  	var cookie = JSON.parse(res);
	  	// alert(cookie.token)
	  	// alert(cookie.token!==`undefined`)
	  	if(cookie.token!==`undefined`){
	  		$('.logout').css({
	  			"display": "yes"
	  		});
	  		$('.login').css({
	  			"display": "none"
	  		});
	  		
	  		$('.signup').css({
	  			"display": "none"
	  		});
	  	}else{
	  		$('.logout').css({
	  			"display": "none"
	  		});
	  		$('.login').css({
	  			"display": "yes"
	  		});
	  		
	  		$('.signup').css({
	  			"display": "yes"
	  		});
	  		
	  	}
	  });
	  
	  // var ca = document.cookie.split(';');
	  // for(var i = 0; i < ca.length; i++) {
	  //   var c = ca[i];
	  //   while (c.charAt(0) == ' ') {
	  //     c = c.substring(1);
	  //   }
	  //   if (c.indexOf(name) == 0) {
	  //     return c.substring(name.length, c.length);
	  //   }
	  // }
	  // return "";
}

	// function checkCookie(name) {
	//   var user = getCookie(name);
	//   if (user != "") {
	//     alert("Welcome again " + user);
	//   } 
	  
	//   else {
	//   	alert("No!");
	//     user = prompt("Please enter your name:", "");
	//   }
	// } 
function httpGetAsync(theUrl, callback){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
		    callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", theUrl, true); // true for asynchronous 
	xmlHttp.send(null);
}	
