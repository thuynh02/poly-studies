<?php
	include('db.php');

	//Get all ratings for rate questions that are not labelled as hidden
	$getRatingData = "SELECT Rate.upload_id, Rate.question_id, Rate.voters, Rate.rating FROM ratings AS Rate WHERE survey_id=1
					  AND Rate.question_id IN (	SELECT Ques.question_id
											  	FROM questions as Ques
											  	WHERE hide = 0 AND del = 0)";	
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