function loadProfile(){
	httpGetAsync('/loadProfile',function(res,err){
		if(err){
			alert('Some error');
			$('main').append(`error`);
			return;
		}
		console.log(res);
		let profile = JSON.parse(res);
		$('main').append(`
	<div class="container bg-motivation pt-3 pb-3">
        <div class="row ">
            <div class="col-12 ">
                <div class="card ">
                    <div class="card-body bg-motivation">
                        <div class="card-title mb-4">
                            <div class="d-flex justify-content-start">
                                <div class="image-container">
                                    <img src="http://placehold.it/150x150" id="imgProfile" style="width: 150px; height: 150px" class="img-thumbnail" />
                                    <div class="middle">
                                        <input type="button" class="btn btn-secondary" id="btnChangePicture" value="Change" />
                                        <input type="file" style="display: none;" id="profilePicture" name="user_img" />
                                    </div>
                                </div>
                              	
                                <div class="ml-auto">
                                    <input maxlength="256" type="button" class="btn btn-primary d-none" id="btnDiscard" value="Discard Changes" />
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-12">
                                <ul class="nav nav-tabs mb-4 " id="myTab" role="tablist">
                                    <li class="nav-item ml-1">
                                        <a class="nav-link nav-link-info active text-dark" id="basicInfo-tab" data-toggle="tab" href="#basicInfo" role="tab" aria-controls="basicInfo" aria-selected="true">Basic Info</a>
                                    </li>
                                    <li class="nav-item ml-1">
                                        <a class="nav-link nav-link-info text-dark" id="createdVorks-tab" data-toggle="tab" href="#createdVorks" role="tab" aria-controls="createdVorks aria-selected="false">Created Vorks</a>
                                    </li>
                                    <li class="nav-item ml-1">
                                        <a class="nav-link nav-link-info text-dark" id="subscribedVorks-tab" data-toggle="tab" href="#subscribedVorks" role="tab" aria-controls="subscribedVorks" aria-selected="false">Subscribed Vorks</a>
                                    </li>
                                   
                                </ul>
                                <div class="tab-content ml-1" id="myTabContent">
                                    <div class="tab-pane fade show active" id="basicInfo" role="tabpanel" aria-labelledby="basicInfo-tab">
                                        

                                        <div class="row">
                                            <div class="col-sm-3 col-md-2 col-5">
                                                <label style="font-weight:bold;">User name</label>
                                            </div>
                                            <div class="col-md-8 col-6">
                                                ${profile.user_name}
                                            </div>
                                        </div>
                                        <hr />

                                        <div class="row">
                                            <div class="col-sm-3 col-md-2 col-5">
                                                <label style="font-weight:bold;">Email</label>
                                            </div>
                                            <div class="col-md-8 col-6">
                                                ${profile.user_email}
                                            </div>
                                        </div>
                                        <hr />
                                        
                                        
                                        <div class="row">
                                            <div class="col-sm-3 col-md-2 col-5">
                                                <label style="font-weight:bold;">Phone</label>
                                            </div>
                                            <div class="col-md-8 col-6">
                                                ${profile.user_phone}
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3 col-md-2 col-5">
                                                <label style="font-weight:bold;">About</label>
                                            </div>
                                            <div class="col-md-8 col-6">
                                                ${profile.user_about}
                                            </div>
                                        </div>
                                        <hr />
                                        <div class="row">
                                            <div class="col-sm-3 col-md-2 col-5">
                                                <label style="font-weight:bold;">Rating</label>
                                            </div>
                                            <div class="col-md-8 col-6">
                                                ${profile.user_rating}
                                            </div>
                                        </div>
                                        <hr />

                                    </div>
                                    <div class="tab-pane fade" id="createdVorks" role="tabpanel" aria-labelledby="createdVorks-tab">
                                        will be later
                                    </div>
                                    <div class="tab-pane fade" id="subscribedVorks" role="tabpanel" aria-labelledby="subscribedVorks-tab">
                                        will be later
                                    </div>
                                </div>
                            </div>
                        </div>


                    </div>

                </div>
            </div>
        </div>
    </div>
			`);

	});

}