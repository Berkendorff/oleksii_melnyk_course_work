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
			let location = JSON.parse(vorks[vork].vork_location);
			// console.log(location);
			let htmlVork= 
			`
			<div class="vork rounded d-flex border-primary w-100 m-3"  >
				<div class="">
					<img src="https://loremflickr.com/320/240/mountain" alt="" class="vork-img rounded-left rounded	border-primary">
				</div>
				<div class="d-flex flex-wrap w-100">
					<div class="col-12 d-flex flex-wrap align-items-center flex-wrap vork-info justify-content-between ">
						<p class="col-5 rounded m-2 text-white ">Vork: ${vorks[vork].vork_name}</p>
						<p class="col-5 rounded m-2 text-white ">Desc: ${vorks[vork].vork_desc}</p>
						<p class="col-5 rounded m-2 text-white ">Vorker: ${vorks[vork].user_name}</p>
						<p class="col-5 rounded m-2 text-white ">Needs: ${vorks[vork].vork_needs}</p>
						<p class="col-5 rounded m-2 text-white ">Location: 
						${location.coutry}, ${location.region}, ${location.city}
						</p>
						<p class="col-5 rounded m-2 text-white ">Status: ${vorks[vork].vork_status}</p>
					</div>
				</div>
			</div>
			`;

		
			// `<div class="vork rounded m-3">\
			// 	<div class="">\
			// 	<div class="d-flex justify-content-center rounded-top bg-primary">\
			// 		<img src="img/logo.png" alt="logo" class="vork-img">\
			// 	</div>\
			// 	<div class="d-flex text-center flex-wrap justify-content-center rounded-bottom bg-secondary">\
			// 		<span class="container">${vorks[vork].vork_name}</span>\
			// 		<span class="container">${vorks[vork].vork_desc}</span>\
			// 		<span class="container">${vorks[vork].vork_needs}</span>\
			// 	</div>\
			// </div>`;
			$('.canvas').append(htmlVork);
		}
	});
}


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