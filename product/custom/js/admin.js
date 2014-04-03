window.onload=function(){

	var numberOfQuestionTypes = 0;

	// ----------------------------------------------------------------------------------------------------------------------- PRODUCT INITIALIZATION

	// 'createProductItem' function is for creating and returning an Object called productItem with the attributes: 
	// productName, imagePath, questionTypes, and questionValues. Given a string for name, a string for path, and an 
	// array of strings for qTypes in its parameters, the function does an initial check of the parameter using jQuery's 
	// isArray() function to test if the parameter value truly is an array. If it isn't an array, then an array is 
	// created where the first element of the array is the passed in value. An array for questionValues is created 
	// under the array values with a default value of 0 for each of the element in the qTypes.

	// An example of a product made from such function would be: (with values)
	// var productItem = {
	//   productName: "Jethro",
	//   imagePath: "images/jethro.jpg",
	// };

	function createProductItem( id, name, desc, path ) {

		var productItem = {
		  imageID: id,
		  productName: name,
		  productDesc: desc,
		  imagePath: path,
		  voterRating: []
		};

		return productItem;
	}

	function getImageData(){
		var productArr = [];
		var data = $.ajax({
			type: 'POST',
			url: 'custom/php/getImages.php',
			data: data,
			dataType: 'json',
			async: false,
			success : function( data ){
				for( var i = 0; i < data.length; ++i ){
					productArr.push( createProductItem( data[i].upload_id, 
														data[i].image_name, 
														data[i].image_description, 
														"images/"+data[i].image_path ) );
				}
			}
		});
		return productArr;
	}

	var productItems = getImageData();

	function getRatingData(){
		var data = $.ajax({
			type: 'POST',
			url: 'custom/php/getRatings.php',
			data: data,
			dataType: 'json',
			async: false,
			success : function( data ){
				console.log( data );
				for (var i = 0; i < productItems.length; i++) {
					for (var j = 0; j < data.length; j++) {
						if( productItems[i].imageID === data[j].upload_id ) {
							var voterRates = {
								questionID: data[j].question_id,
								voters: data[j].voters,
								rating: data[j].rating
							};
							productItems[i]['voterRating'].push( voterRates );
						}
					};
					
				};
				

			}
		});
	}

	// productItems serve as the array of Objects for each productItem returned from the 'createProductItem' function.
	
	getRatingData();

	console.log( productItems );

	// Initialize and push into 'productItems' the Objects created from the function 'createProductItem.'
	// Here five objects are created with associated index in array 'productItems': Jethro (Index 0), Merlin (Index 1), 
	// Skinny Luke (Index 2), Colin Morgan (Index 3), and Ariel (Index 4)
	// var productItems = [];
	// productItems.push( createProductItem( "iPad Mini", "images/ipad-mini.jpg" ) );
	// productItems.push( createProductItem( "Coke", "images/coke.jpg" ) )
	// productItems.push( createProductItem( "Twitter", "images/twitter.jpg" ) );

	// ----------------------------------------------------------------------------------------------------------------------- HTML HANDLING

	for (var i = 0; i < productItems.length; i++) {
		var htmlContainer = '<div class="item row"> \
			<img src="" alt="" id="productImg' + i + '" class="productImg col-xs-12 col-md-4"> \
			<div id="productDesc" class="col-xs-12 col-md-8"> \
			\
			<div class="form-group"> \
				<label for="imageName' + i + '" class="col-sm-3 control-label">Image Name: </label> \
				<div class="col-sm-9"> \
					<input type="hidden" id="imageNum' + i + '" name="uploadID" value="' + productItems[i]["imageID"] + '"> \
					<input type="hidden" id="numQuestions' + i + '" name="numberOfQuestions" value="' + productItems[i]['voterRating'].length + '"> \
					<input type="text" class="form-control" id="imageName' + i + '" name="newName" value="' + productItems[i]["imageID"] + '" placeholder="Enter Image Name"> \
				</div> \
			</div> \
			\
			<div class="form-group"> \
				<label for="imageDesc' + i + '" class="col-sm-3 control-label">Image Caption: </label> \
				<div class="col-sm-9"> \
					<textarea class="form-control" id="imageDesc' + i + '" name="imageDesc" rows="3" placeholder="Enter Image Description"></textarea> \
				</div> \
			</div> \
			';

			for (var j = 0; j < productItems[i]['voterRating'].length; j++) {
				htmlContainer += '<div class="form-group"> \
					<label class="col-sm-3 control-label">Question #' + ( j + 1 ) + ': </label> \
					<input type="hidden" id="questionID' + j + "-" + i + '" name="questionID' + j +'" value="' + productItems[i]['voterRating'][j].questionID + '"> \
					<div class="col-sm-5"> \
							<input type="text" class="form-control" id="questionVoters' + j + "-" + i + '" name="questionVoters' + j + '" placeholder="Number of Voters"> \
					</div> \
					<div class="col-sm-4"> \
						<input type="text" class="form-control" id="questionRatings' + j + "-" + i + '" name="questionRatings' + j + '" placeholder="Value of Rating"> \
					</div> \
				</div> \
				';

			};

			htmlContainer += '<div class="form-group"> \
				<label  class="col-sm-3 control-label"></label> \
				<div class="col-sm-9"> \
					<div class="col-sm-6"> \
						<button id="update' + i + '" type="submit" name="' + i + '"class="btn btn-primary btn-block">Update</button> \
					</div> \
					<div class="col-sm-6"> \
						<button id="delete' + i + '" type="submit" name="' + i + '"class="btn btn-danger btn-block">Delete</button> \
					</div> \
				</div> \
			</div> \
			\
			<div id="result'+ i + '"></div>\
			\
			</div> \
			</div>';

		$( '#productItems' ).append( htmlContainer );

		$( "#imageName" + i ).val( productItems[i].productName );
		
		$( "#imageDesc" + i ).val( productItems[i].productDesc );

		$( '#productImg' + i ).attr( "src", productItems[i].imagePath) ;

		for (var j = 0; j < productItems[i]['voterRating'].length; j++) {
			$( "#questionVoters" + j + "-" + i ).val( productItems[i]['voterRating'][j].voters );
			$( "#questionRatings" + j + "-" + i ).val( productItems[i]['voterRating'][j].rating );
		};

	};

	//This function takes in the idNum of the image being updated and a message
	//to display in it's respective result div
	function displayUpdateResult( idNum, resultMsg){
		$("#result" + idNum).show();
		$("#result" + idNum).html( 'Status: ' + resultMsg);
		setTimeout( function(){
			$("#result" + idNum).fadeOut( 'fast' );
		}, 2000 );
	}

	//Finds all buttons with pre-fix "update" and attaches the following function
	//for their click action.
	$(document.body).on('click', "button[id^='update']", function(event){
		if( event.target ){

			//Get's the current image's id number. All inputs will have this number attatched to their id!
			var currentID = event.target.name;

			//The page that the form sends information to
			var url = $("#upload-form").attr("action");

			// An array of all the input information by finding id's with a suffix of the current id number
			var imgArr = $('[id$=' + currentID + ']').serializeArray();

			console.log( imgArr );
			//Post to the form's designated page with the information to be put into the database
			$.ajax({
				type: 'POST',
				url: url,
				data: imgArr,

				success: function(info){
					//If the request goes through successfully and confirmation is received from php file, 
					//inform the user of the success!
					if(info){
						displayUpdateResult(currentID, "Successfully stored! " + info);
					}

					//Otherwise, inform the user that something went wrong
					else{
						displayUpdateResult(currentID, "Failed to update to database.");
					}

					// window.location.reload();
				},

				//Something really went wrong if the ajax call failed! Tell the user D:
				fail: function(){
					$("#result" + currentID).html("Ajax call failed to send request! Look into it ASAP!");
				}

			});
		}
	});

	$(document.body).on('click', "button[id^='delete']", function(event){
		if( event.target ){

			//Get's the current image's id number. All inputs will have this number attatched to their id!
			var currentID = event.target.name;

			// An array of all the input information by finding id's with a suffix of the current id number
			var imgArr = $('[id$=' + currentID + ']').serializeArray();


			//Post to the form's designated page with the information to be put into the database
			$.ajax({
				type: 'POST',
				url: 'custom/php/deleteProduct.php',
				data: imgArr,

				success: function(info){
					//If the request goes through successfully and confirmation is received from php file, 
					//inform the user of the success!
					if(info){
						displayUpdateResult(currentID, "Successfully stored!" + info);
					}

					//Otherwise, inform the user that something went wrong
					else{
						displayUpdateResult(currentID, "Failed to update to database.");
					}

					//window.location.reload();
				},

				//Something really went wrong if the ajax call failed! Tell the user D:
				fail: function(){
					$("#result" + currentID).html("Ajax call failed to send request! Look into it ASAP!");
				}

			});
		}
	});
	
	//Prevent the form from redirecting
	$("#upload-form").submit( function(){
		return false;
	});

}