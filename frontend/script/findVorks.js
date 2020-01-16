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
			locationHtml = `<p class="col-12 rounded m-1 pl-2 pr-5 text-white">Location: 
					${country} ${region} ${city}
					</p>`;
		}
		let date = new Date(vorks[vork].vork_creation_date);
		let formatted_date = date.getFullYear() + 
		"-" + (date.getMonth() + 1) + 
		"-" + date.getDate();
		let interests = "";

		let buttons = `
			<div class="col-12 d-flex  justify-content-center vork-actions">
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
		<div class="vork d-flex flex-wrap w-100 justify-content-center col-12 col-sm-12 col-md-5 col-lg-3 m-1 border-bottom vork_block_${vorks[vork].vork_id}" >
			<div class="vork_block d-flex col-12 flex-wrap">
				<div class="d-flex justify-content-center col-12 vork-img">
					<img src="https://loremflickr.com/320/240/${vorks[vork].vork_name}" alt="" class="vork-img rounded-left rounded	border-primary m-1">
				</div>
				<div class="d-flex flex-wrap ">
					<div class="col-12 d-flex flex-wrap align-items-center flex-wrap vork-info justify-content-center vork_${vorks[vork].vork_id}">
						<p class="col-12 rounded m-1 p-1 text-white font-weight-bold ">Vork: ${vorks[vork].vork_name}</p>
						<p class="col-12 rounded m-1 p-1 text-white ">Created: ${formatted_date}</p>
						<p class="col-12 rounded m-1 p-1 text-white ">Desc: ${vorks[vork].vork_desc}</p>
						<p class="col-12 rounded m-1 p-1 text-white ">Needs: ${vorks[vork].vork_needs}</p>
						<p class="col-12 rounded m-1 p-1 text-white ">Vorker: ${vorks[vork].user_name}</p>
						<p class="col-12 rounded m-1 p-1 text-white ">Email: ${vorks[vork].user_email}</p>
						${locationHtml}
						<p class="col-12 rounded m-1 p-1 text-white " id="status_${vorks[vork].vork_id}">Status: ${vorks[vork].vork_status}</p>			
					</div>
				</div>
			</div>
		</div>
		`;
		$('.canvas').append(htmlVork);
		loadInterestsForVork(vorks[vork].vork_id);
		$(`.vork_block_${vorks[vork].vork_id}`).append(buttons);
		}
		
	}

function loadInterestsForVork(vork_id){
	httpGetAsync(`/getInterestsForVork?vork_id=${vork_id}`,function(res,err){
		let interests = JSON.parse(res);
		var html = `<p class="col-12 rounded m-1 pl-2 pr-5 text-white vork-button align-items-end"> Interests: `;
		for(let i in interests){	
			html += interests[i].interest + "  ";
		}
		html+="</p>";
		$(`#status_${vork_id}`).after(html);
	});
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
			return;
		}
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