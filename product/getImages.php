<?php
	include('db.php');
	
<<<<<<< HEAD
	$getImageData = "SELECT image_path FROM user_uploads";
=======
	$getImageData = "SELECT upload_id, image_name, image_filename FROM user_uploads";
>>>>>>> development
	
	$imgQueryResult = mysqli_query( $bd, $getImageData ) or die( "Failed to fetch image data. ".mysqli_error($bd));
	$imgArr = [];

	//Retrieve all the uploaded image names
	while( $row = mysqli_fetch_assoc($imgQueryResult) ){
		//Store the strings in an array
		array_push( $imgArr, $row );
	}

	//Make the array of image names into a json string to be parsed and used in rate.js
	echo( json_encode($imgArr) );
	
?>