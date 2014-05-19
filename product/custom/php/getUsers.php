<?php

	include( "db.php" );
	$usersBySurveyCode = array();

	$getUsers = "SELECT user_id, survey_code FROM users";
	$userList = mysqli_query($bd, $getUsers) or die( "Failed to fetch question data. ".mysqli_error($bd));

	while( $user = mysqli_fetch_assoc( $userList ) ){

		$usersBySurveyCode[ $user['survey_code'] ] = $user['user_id'];

	}

	echo( json_encode($usersBySurveyCode) );

?>