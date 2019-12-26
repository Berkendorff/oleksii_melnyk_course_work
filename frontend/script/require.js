function correctNavBar() {
	  var cookie = "";
	  httpGetAsync("/cookie",(res)=>{
	  	var cookie = JSON.parse(res);
	  	let addprofNav = `<li class="d-flex justify-content-center p-0 "><a href="add_vork.html" class="text-center text-white rounded nav-link ">Add&nbsp;vork</a></li>
		      <li class="d-flex justify-content-center p-0 "><a href="profile.html" class="text-center text-white rounded nav-link ">Profile</a></li>`;
		let addprofDropdown = `<li class="d-flex justify-content-center p-0 "><a href="add_vork.html" class="text-center rounded nav-link ">Add&nbsp;vork</a></li>
		      <li class="d-flex justify-content-center p-0 "><a href="profile.html" class="text-center rounded nav-link ">Profile</a></li>`;
	  	let logout = `	
		<div class="d-none d-flex justify-content-center logout" id="logout">
			<a href="/logout" class="btn btn-block text-light logout">Log&nbsp;out</a>
		</div>
		`;

		let login = `
		<div class="d-flex justify-content-center login">
			<a href="#" class="btn btn-block text-light login" data-toggle="modal" data-target="#loginModal">Log&nbsp;in</a>
		</div>
		`;
		let signup = `
		<div class="d-flex justify-content-center signup">
			<a href="#" class="btn btn-block bg-primary text-light signup" data-toggle="modal" data-target="#signupModal">Sign&nbsp;up</a>
		</div>
		`;
		if((cookie.fail!='undefined'&&cookie.fail!="")){
			alert(cookie.fail);
		}
	  	if(cookie.token!==`undefined`){
	  		$('.log-btn').append(logout);
	  		$('.global-vorks-nav').after(addprofNav);
	  		$('.global-vorks-dropdown').after(addprofDropdown);
	  		
	  	}else{
	  		$('.log-btn').append(login);
	  		$('.log-btn').append(signup);
	  	}
	  });
}
 
function httpGetAsync(theUrl, callback){
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onreadystatechange = function() { 
		if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
		    callback(xmlHttp.responseText);
	}
	xmlHttp.open("GET", theUrl, true); // true for asynchronous 
	xmlHttp.send(null);
}	
