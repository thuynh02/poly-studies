<?php
	include( 'db.php' );

	if( isset($_POST) ){

		$time = time();
		$jsonRatingAnswers = $_POST['productAnswers'];

		//**NOTE** Using a dummy user_id of -1 for now! 
		$addAnswers = "UPDATE answers 
					   SET rating_answers = '$jsonRatingAnswers', created = '$time'
		               WHERE user_id=-1 AND survey_id=1";
        mysqli_query( $bd, $addAnswers );
		
		print_r( $jsonRatingAnswers );
	}

?>