window.onload=function(){

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

	function createProductItem( id, name, path ) {

		var productItem = {
		  imageID: id,
		  productName: name,
		  imagePath: path
		};

		return productItem;
	}

	function getImageData(){
		var productArr = [];
		var data = $.ajax({
			type: 'POST',
			url: 'getImages.php',
			data: data,
			dataType: 'json',
			async: false,
			success : function( data ){
				for( var i = 0; i < data.length; ++i ){
					productArr.push( createProductItem( data[i].upload_id, data[i].image_name, "images/"+data[i].image_path ) );
				}
			}
		});
		return productArr;
	}

	// productItems serve as the array of Objects for each productItem returned from the 'createProductItem' function.
	var productItems = getImageData();

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
					<input type="text" class="form-control" id="imageName' + i + '" name="newName" placeholder="Enter Image Name"> \
				</div> \
			</div> \
			\
			<div class="form-group"> \
				<label for="imageName' + i + '" class="col-sm-3 control-label">Image Caption: </label> \
				<div class="col-sm-9"> \
					<textarea class="form-control" id="imageCaption' + i + '" rows="3" placeholder="Enter Image Caption"></textarea> \
				</div> \
			</div> \
			\
			<div class="form-group"> \
				<label  class="col-sm-3 control-label"></label> \
				<div class="col-sm-9"> \
					<div class="col-sm-6"> \
						<button id="update' + i + '" type="submit" name="' + i + '"class="btn btn-primary btn-block">Update</button> \
					</div> \
					<div class="col-sm-6"> \
						<button id="delete' + i + '" class="btn btn-danger btn-block">Delete</button> \
					</div> \
				</div> \
			</div> \
			\
			</div> \
			</div>';

		$( '#productItems' ).append( htmlContainer );

		$( "#imageName" + i ).val( productItems[i].productName );
		
		$( "#imageCaption" + i ).val( "Have you used " + productItems[i].productName + "?" );

		$( '#productImg' + i ).attr( "src", productItems[i].imagePath) ;

	};

	for( var i = 0; i < productItems.length; ++i ){
		$("button[id='update" + i + "']").click( function(event){
			if( event.target ){

				//Get's the current image's id
				var currentID = event.target.name;
				//The page that the form sends information to
				var url = $("#upload-form").attr("action");
				// An array of all the input information
				var imgArr = $('[id$=' + currentID + ']').serializeArray();


				//Post to the form's designated page with the information to be put into the database
				$.ajax({
					type: 'POST',
					url: url,
					data: imgArr,

					success: function(info){
						$("#result").html(info);
					}
				});
			}
		});
	}

	// $(document).on( 'click', 'button[id^="update"]', function(){
	// 	var imgNum = $("#update").attr("name");
	// 	var url = $("#upload-form").attr("action");
	// 	var imgArr = $('input[name$=' + imgNum + ']').serializeArray(); // An array of all the input information
	// 	$.ajax({
	// 		type: 'POST',
	// 		url: url, 	// The page that the form will send information to
	// 		data: imgArr, 
				
	// 		// Placing the return value into the "result" div, found in index.html
	// 		success: function(info){ 
	// 			$("#result").html(info) 
	// 		}
	// 	})
	// });

	$("#upload-form").submit( function(){
		return false;
	});

}