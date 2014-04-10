window.onload=function(){

	var numberOfQuestionTypes = 0;

	// ----------------------------------------------------------------------------------------------------------------------- PRODUCT INITIALIZATION

	// Creates a Product Object with the imageID correlated to the table product_image's upload_id, the productName correlated
	// to the table product_image's image_name, the productDesc related to the table product_image's image_description, and the
	// imagePath correlating to the table product_image's image_path. These values are filled in their creation using the 
	// getImageData() function while the voterRating attribute is fulfuled in the getRatingData() function. 
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

	// Gets inforation via the getImages.php file and returns a populated array of Product objects.

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

	// Populates the voterRatings of each of the productArray's element.

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
	
	// Activate the getRatingData() function.
	getRatingData();

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

		// Add the htmlContainer into the container with the identifier #productItems
		$( '#productItems' ).append( htmlContainer );

		// Change the identifier imageName+i's value to the new value after its been added onto the container #productImages
		$( "#imageName" + i ).val( productItems[i].productName );
		
		// Change the identifier imageDesc+i's value to the new value after its been added onto the container #productItems
		$( "#imageDesc" + i ).val( productItems[i].productDesc );

		// Change the identifier productImage+i value to the new url after a new product item is reached
		$( '#productImg' + i ).attr( "src", productItems[i].imagePath) ;

		// Change the voters and ratings accordingly to what is stored in the table ratings.
		for (var j = 0; j < productItems[i]['voterRating'].length; j++) {
			$( "#questionVoters" + j + "-" + i ).val( productItems[i]['voterRating'][j].voters );
			$( "#questionRatings" + j + "-" + i ).val( productItems[i]['voterRating'][j].rating );
		};

	};

	//This function takes in the idNum of the image being updated and a message to display in it's respective result div.
	function displayUpdateResult( idNum, resultMsg){
		$("#result" + idNum).show();
		$("#result" + idNum).html( 'Status: ' + resultMsg);
		setTimeout( function(){
			$("#result" + idNum).fadeOut( 'fast' );
		}, 2000 );
	}

	//Finds all buttons with pre-fix "update" and attaches the following function for their click action.
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