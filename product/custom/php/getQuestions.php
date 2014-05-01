<?php
	include('db.php');

	$getQuestionData = "SELECT question_id, question_type, description, hide, del FROM questions WHERE survey_id = 1";	
	$stmt = mysqli_query( $bd, $getQuestionData ) or die( "Failed to fetch question data. ".mysqli_error($bd));
	$questionArr = array();

	while( $row = mysqli_fetch_assoc($stmt) ){
		//Store the strings in an array
		array_push( $questionArr, $row );
	}

	//This json string is currently received only in question.js
	echo( json_encode($questionArr) );
	
?>