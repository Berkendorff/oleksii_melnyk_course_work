function getInterests(){
	console.log("open interests");
	httpGetAsync('/getInterestsQuery', function(rows,error){
		console.log(rows);
		if (error) {
			alert("Error!");
			return 0;
		}	
		let interests = JSON.parse(rows);
		console.log(interests);
		for (let i in interests){;
			let checkbox = `<div class="">|<label for="${interests[i].interest}" class="">${interests[i].interest}</label>
					<input type="checkbox" name="${interests[i].interest_id}" id="${interests[i].interest}" class="">|</div>`;
			$('.interests-checkbox').append(checkbox);
		}	

	});
	console.log("close interests");
}

