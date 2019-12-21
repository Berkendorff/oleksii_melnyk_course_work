// var axios = require('axios');

function getVorks(){
	httpGetAsync('/getVorksQuery',function(res,err){
		if (err) {
			alert("Error!");
			console.log(err);
			console.log(res);
			return 0;
		}
		// console.log(res);
		let vorks = JSON.parse(res);
		// console.log();
		for (let vork in vorks){
			let htmlVork= 
			`<div class="vork rounded m-3">\
				<div class="d-inline-block">\
				<div class="d-flex justify-content-center rounded-top bg-primary">\
					<img src="frontend/img/logo.png" alt="" class="vork-img">\
				</div>\
				<div class="d-flex text-center flex-wrap justify-content-center rounded-bottom bg-secondary">\
					<span class="container ">${vorks[vork].vork_name}</span>\
					<span class="container">${vorks[vork].vork_desc}</span>\
					<span class="container">${vorks[vork].vork_needs}</span>\
				</div>\
			</div>`;
			$('.canvas').append(htmlVork);
		}

		

		

	});

	// axios.get('/getVorks').then((response) => {
	// 	console.log(response);
	// }, (error)=>{console.log(error);} );
}

function httpGetAsync(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}