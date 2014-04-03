<?php
	include('db.php');

	$getQuestionData = "SELECT question_id, question_type, description FROM questions WHERE survey_id = 1";	
	$questionQueryResult = mysqli_query( $bd, $getQuestionData ) or die( "Failed to fetch question data. ".mysqli_error($bd));
	$questionArr = array();

	while( $row = mysqli_fetch_assoc($questionQueryResult) ){
		//Store the strings in an array
		array_push( $questionArr, $row );
	}

	echo( json_encode($questionArr) );
	
?>