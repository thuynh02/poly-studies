window.onload=function(){

	var numberOfQuestionTypes = 0;

	// ----------------------------------------------------------------------------------------------------------------------- PRODUCT INITIALIZATION

	// 'createProductItem' function is for creating and returning an Object called productItem with the attributes: 
	// imageID, productName, productDesc, imagePath, and voterRating. Given an int for the imageID, a string for the
	// productName, a string for the productDesc, and a string for the imagePath, the function will create and return
	// a productItem object.
	// The voterRating array will be filled in a separate function, but is specified as an attribute in this function
	// to avoid confusion as to where the attribute comes from if it were to be added elsewhere.

	// An example of a product made from such function would be: (with values)
	// var productItem = {
	//	 imageID: 1
	//   productName: "Coca-cola",
	//	 productDesc: "Have you tried Coca-Cola before?",
	//   imagePath: "images/cola.jpg",
	//   voterRating: []
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

	// Fetch all the basic image data from getImages.php and store them as productItem objects, which are
	// pushed into an array. 
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
				// console.log( data );
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

	// This function will fill the attribute, voterRating, found in productItems, by retrieving rating
	// data from getRatings.php and binding ratings according to matching upload_id/imageID
	function getRatingData( products ){
		var data = $.ajax({
			type: 'POST',
			url: 'custom/php/getRatings.php',
			data: data,
			dataType: 'json',
			async: false,
			success : function( data ){

				console.log( data );

				for (var i = 0; i < products.length; i++) {
					for (var j = 0; j < data.length; j++) {
						if( products[i].imageID === data[j].upload_id ) {
							var voterRates = {
								questionID: data[j].question_id,
								voters: data[j].voters,
								rating: data[j].rating
							};
							products[i]['voterRating'].push( voterRates );
						}
					};	
				};
			}
		});
	}

	// The array of productItems to be used for retrieving information for display
	var productItems = getImageData();

	// Get rating data to fill the voterRating attribute for all elements in the array of productItems
	// voterRating will contain a list of voterRates objects with the attributes: questionID, voters, and rating
	// <questionID> ties the specific question to how many <voters> gave the question the specified <rating> value. 
	getRatingData( productItems );
	//console.log( productItems );
	
	var ratingQuestions = [];

	function getQuestionData(){
	    var data = $.ajax({
	      type: 'POST',
	      url: 'custom/php/getQuestions.php',
	      dataType: 'json',
	      data: data,
	      async: false,
	      success : function( data ){
	        for( var i = 0; i < data.length; ++i ){
	          if( data[i].question_type == "rating" ){
	          	console.log(JSON.parse( data[i].description ) );
	            ratingQuestions.push( JSON.parse( data[i].description ) );
	          }
	        }

	      },
	      error: function () { console.log("NAY"); }
	    });

	}

	getQuestionData();
	// ----------------------------------------------------------------------------------------------------------------------- HTML HANDLING

	//Will build all the product displays based on the information in the productItems array.
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
				if( ratingQuestions[j][0] != 'like-rating' ) {
					htmlContainer += '<div class="form-group"> \
						<label class="col-sm-3 control-label">Question #' + ( j + 1 ) + ': </label> \
						<input type="hidden" id="questionID' + j + "-" + i + '" name="questionID' + j +'" value="' + productItems[i]['voterRating'][j].questionID + '"> \
						<div class="col-sm-9"> \
							<div class="col-sm-12 form-control-static">' + ratingQuestions[j][1].replace('[id]', productItems[i].productName ) + '</div> \
							<div class="col-sm-6"> \
								<div class="input-group"> \
									<input type="text" class="form-control" id="questionVoters' + j + "-" + i + '" name="questionVoters' + j + '" placeholder="Number of Prior Voters"> \
									<span class="input-group-addon">Voters</span> \
								</div> \
							</div> \
							<div class="col-sm-6"> \
								<div class="input-group"> \
									<span class="input-group-addon">Rating</span> \
									<input type="text" class="form-control" id="questionRatings' + j + "-" + i + '" name="questionRatings' + j + '" placeholder="Value of Rating"> \
								</div> \
							</div> \
						</div> \
					</div> \
					';
				}
				else {
					htmlContainer += '<div class="form-group"> \
						<label class="col-sm-3 control-label">Question #' + ( j + 1 ) + ': </label> \
						<input type="hidden" id="questionID' + j + "-" + i + '" name="questionID' + j +'" value="' + productItems[i]['voterRating'][j].questionID + '"> \
						<div class="col-sm-9"> \
							<div class="col-sm-12 form-control-static">' + ratingQuestions[j][1].replace('[id]', productItems[i].productName ) + '</div> \
							<div class="col-sm-4"> \
								<div class="input-group"> \
									<input type="text" class="form-control" id="likeVoters' + j + '" name="likeVoters' + j + '" placeholder="Number of Likes"> \
									<span class="input-group-addon">Likes</span> \
								</div> \
							</div> \
							<div class="col-sm-4"> \
								<div class="input-group"> \
									<input type="text" class="form-control" id="unsureVoters' + j + '" name="unsureVoters' + j + '" placeholder="Number of Dislikes"> \
									<span class="input-group-addon">Unsure</span> \
								</div> \
							</div> \
							<div class="col-sm-4"> \
								<div class="input-group"> \
									<input type="text" class="form-control" id="dislikeVoters' + j + '" name="dislikeVoters' + j + '" placeholder="Number of Unsure"> \
									<span class="input-group-addon">Dislikes</span> \
								</div> \
							</div> \
						</div> \
					</div> \
					';
				}

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
			if( ratingQuestions[j][0] == 'like-rating' ) { 
				var voteArr = JSON.parse( productItems[i]['voterRating'][j].rating );
				console.log( voteArr );	
				$( "#likeVoters" + j ).val( voteArr[0] );
				$( "#unsureVoters" + j ).val( voteArr[1] );
				$( "#dislikeVoters" + j ).val( voteArr[2] );
			}
			else { $( "#questionRatings" + j + "-" + i ).val( productItems[i]['voterRating'][j].rating ); }
		};

	};

	// This function takes in the idNum of the image being updated and a message
	// to display in it's respective result div. The message fades away in 2 seconds (2000 milliseconds)
	function displayUpdateResult( idNum, resultMsg ){
		$("#result" + idNum).show();
		$("#result" + idNum).html( 'Status: ' + resultMsg);
		setTimeout( function(){
			$("#result" + idNum).fadeOut( 'fast' );
		}, 2000 );
	}

	// Finds all buttons with pre-fix "update" and attaches the following function
	// for their click action.
	$(document.body).on('click', "button[id^='update']", function(event){
		if( event.target ){

			//Get's the current image's id number. All inputs will have this number attatched to their id!
			var currentID = event.target.name;

			//The page that the form sends information to
			var url = $("#upload-form").attr("action");

			// An array of all the input information by finding id's with a suffix of the current id number
			var imgArr = $('[id$=' + currentID + ']').serializeArray();
			// console.log( imgArr );

			// Post to the form's designated page with the information to be put into the database
			$.ajax({
				type: 'POST',
				url: url,
				data: imgArr,

				success: function(info){
					// If the request goes through successfully, wait for a callback. If there is one, inform
					// the user of it! This callback will give the status of the query execution
					if(info){
						displayUpdateResult(currentID, info);
					}

					// Otherwise, inform the user that something went wrong
					else{
						displayUpdateResult(currentID, "Failed to get response from database.");
					}

					// Forces the page to refresh. Use it if updates are not dynamic
					// window.location.reload();
				},

				// Something really went wrong if the ajax call failed! Tell the user D:
				fail: function(){
					$("#result" + currentID).html("Ajax call failed to send request! Look into it ASAP!");
				}

			});
		}
	});


	//************** IMPORTANT ******************
	// As of right now, deletion from database does not work because images contain foreign keys.
	// Cascade has not been included yet! If delete doesn't work, check for cascade being messing with this!
	//************** IMPORTANT ******************

	// Finds all buttons with pre-fix "delete" and attaches the following function
	// for their click action.
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
						displayUpdateResult(currentID, info);
					}

					//Otherwise, inform the user that something went wrong
					else{
						displayUpdateResult(currentID, "Failed to get response from php file.");
					}

					// Forces the page to refresh. Use it if updates are not dynamic
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