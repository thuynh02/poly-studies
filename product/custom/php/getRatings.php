<?php
	include('db.php');

	$getRatingData = "SELECT upload_id, question_id, voters, rating FROM ratings WHERE survey_id=1";	
	$rateQueryResult = mysqli_query( $bd, $getRatingData ) or die( "Failed to fetch image data. ".mysqli_error($bd));
	$rateArr = array();

	//Retrieve all the uploaded image names
	while( $row = mysqli_fetch_assoc($rateQueryResult) ){
		//Store the strings in an array
		array_push( $rateArr, $row );
	}

	//Make the array of image names into a json string to be parsed and used in rate.js
	echo( json_encode($rateArr) );
	
?>