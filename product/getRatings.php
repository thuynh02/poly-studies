<?php

	include('db.php');

	$getRatingsData = "SELECT * FROM ratings";	
	$imgQueryResult = mysqli_query( $bd, $getRatingsData ) or die( "Failed to fetch image data. ".mysqli_error($bd));
	$resultArr = [];

	//Retrieve all the uploaded image names
	while( $row = mysqli_fetch_assoc($imgQueryResult) ){
		//Store the strings in an array
		array_push( $resultArr, $row );
	}

	//Make the array of image names into a json string to be parsed and used in rate.js
	echo( json_encode($resultArr) );

?>