<?php
	session_start();
	include( 'db.php' );

	if( isset( $_SESSION['user_id'] ) ){
		$userId = $_SESSION['user_id'];
		$surveyCode = mysqli_fetch_assoc( mysqli_query( $bd, "SELECT survey_code FROM users WHERE user_id = '$userId'" ) )['survey_code'];
		echo( $surveyCode );
	}

?>
