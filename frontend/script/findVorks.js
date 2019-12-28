// var axios = require('axios');

function getVorks(interest){
		if(findGetParameter('interest')!=''&&findGetParameter('interest')!='undefined'&&findGetParameter('interest')!='null'){
			httpGetAsync(`/getVorksQuery?interest=${findGetParameter('interest')}`,renderVorks);
		}
		else{
			httpGetAsync('/getVorksQuery',renderVorks);
		}
	
}

function renderVorks(res,err){
		if (err) {
			alert("Error!");
			console.log(err);
			console.log(res);
			return 0;
		}
		let vorks = JSON.parse(res);
		for (let vork in vorks){
		let location = JSON.parse(vorks[vork].vork_location);
		let country ='';
		let region = '';
		let city = '';
		if(location.country!='undefined'&&location.country!=undefined&&location.coutry!=''){
			country = location.country + ", ";
		}
		if(location.region!='undefined'&&location.region!=undefined&&location.region!=''){
			region = location.region + ", ";
		}
		if(location.city!='undefined'&&location.city!=undefined&&location.city!=''){
			city = location.city;
		}
		let locationhtml = ' ';
		if(country==''&&region==''&&city==''){
			locationhtml = '';
		}
		else{
			locationhtml = `<p class="col-5 rounded m-1 pl-5 pr-5 text-white text-center">Location: 
					${country} ${region} ${city}
					</p>`;
		}
		let date = new Date(vorks[vork].vork_creation_date);
		let formatted_date = date.getFullYear() + 
		"-" + (date.getMonth() + 1) + 
		"-" + date.getDate();

		let buttons = `
			<div class="col-12 d-flex  justify-content-center">
						<form method="post" action="/deleteVork" onsubmit="return false;" class="m-1">
							<button class="btn btn-danger" type="submit">&nbsp;&nbsp;&nbsp;Delete&nbsp;&nbsp;&nbsp;</button>
							<input class="d-none" type="text" name="data" value="${vorks[vork].vork_id}">  
						</form> 
						<form method="post" action="/subscribeUser" onsubmit="" class="m-1">
							<button class="btn btn-primary" type="submit">Subscribe</button>
							<input class="d-none" type="text" name="data" value="${vorks[vork].vork_id}">  
						</form> 
					</div>
		`;
		let htmlVork= 
		`
		<div class="vork d-flex flex-wrap flex-md-nowrap  flex-lg-nowrap justify-content-center  w-100 m-3 border-bottom"  >
			<div class="d-flex justify-content-center">
				<img src="https://loremflickr.com/320/240/${vorks[vork].vork_name}" alt="" class="vork-img rounded-left rounded	border-primary">
			</div>
			<div class="d-flex flex-wrap w-100">
				<div class="col-12 d-flex flex-wrap align-items-center flex-wrap vork-info justify-content-center s">
					<p class="col-5 rounded m-1 pl-5 pr-5 text-white font-weight-bold text-center">Vork: ${vorks[vork].vork_name}</p>
					<p class="col-5 rounded m-1 pl-5 pr-5 text-white text-center">Created: ${formatted_date}</p>
					<p class="col-5 rounded m-1 pl-5 pr-5 text-white text-center">Desc: ${vorks[vork].vork_desc}</p>
					<p class="col-5 rounded m-1 pl-5 pr-5 text-white text-center">Needs: ${vorks[vork].vork_needs}</p>
					<p class="col-5 rounded m-1 pl-5 pr-5 text-white text-center">Vorker: ${vorks[vork].user_name}</p>
					<p class="col-5 rounded m-1 pl-5 pr-5 text-white text-center">Email: ${vorks[vork].user_email}</p>
					${locationhtml}
					<p class="col-5 rounded m-1 pl-5 pr-5 text-white text-center">Status: ${vorks[vork].vork_status}</p>
					${buttons}
				</div>

			</div>
		</div>
		`;
		$('.canvas').append(htmlVork);
		}
		
	}

function subscribeUserToVork(data){
	httpPostAsync('/subscribeUser',"data="+data,function(rows,error){
		if(error){
			alert("Error!");
			return 0;
		}
		alert("Subscribed!");
	});
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

function addFilter(){
	httpGetAsync('/getInterestsQuery',function(res,err){
		if(err){
			alert('Error');
			console.log(err);
			return;
		}
		console.log(res);
		let interests = JSON.parse(res);
		for (let i in interests){
			let interest = 
			`
			<li class="d-flex justify-content-center p-1">
			<a href="#" onclick="redirectTo('/find_vorks.html?interest=${interests[i].interest}')" class="text-center">${interests[i].interest}</a>
			</li>
			`;
			$('.dropdown-interests').append(interest);
		}
	});
}