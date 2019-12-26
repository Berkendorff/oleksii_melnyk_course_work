function getInterests(){
	httpGetAsync('/getInterestsQuery', function(rows,error){
		console.log(rows);
		if (error) {
			alert("Error!");
			return 0;
		}	
		let interests = JSON.parse(rows);
		for (let i in interests){;
			let checkbox = `<div><label for="${interests[i].interest}" class="">${interests[i].interest}</label>
					<input type="checkbox" name="${interests[i].interest}" id="${interests[i].interest}" class=""></div>`;
			$('.interests-checkbox').append(checkbox);
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