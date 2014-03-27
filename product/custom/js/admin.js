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
			success : function( data ){
				for( var i = 0; i < data.length; ++i ){
					productArr.push( createProductItem( data[i].upload_id, data[i].image_name, "images/"+data[i].image_filename ) );
				}
			},
			async: false
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
			<form class="form-horizontal" role="form" type="POST"> \
			\
			<div class="form-group"> \
				<label for="imageName' + i + '" class="col-sm-3 control-label">Image Name: </label> \
				<div class="col-sm-9"> \
					<input type="hidden" name="imageID" value="' + productItems[i]["imageID"] + '"> \
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
						<button type="submit" class="btn btn-primary btn-block">Update</button> \
					</div> \
					<div class="col-sm-6"> \
						<button id="delete" class="btn btn-danger btn-block">Delete</button> \
					</div> \
				</div> \
			</div> \
			\
			</form> \
			\
			</div> \
			</div>';

		$( '#productItems' ).append( htmlContainer );

		$( "#imageName" + i ).val( productItems[i].productName );
		
		$( "#imageCaption" + i ).val( "Have you used " + productItems[i].productName + "?" );

		$( '#productImg' + i ).attr( "src", productItems[i].imagePath) ;

	};



}