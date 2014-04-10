<?php
	include( 'db.php' );

	function randString($length, $charset='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()'){
	    $str = '';
	    $count = strlen($charset);
	    while ($length--) {
	        $str .= $charset[mt_rand(0, $count-1)];
	    }
	    return $str;
	}

	if( isset($_POST) ){

		//Decode the json string and store it as an array of product answers
		$answersArr = json_decode($_POST['surveyAnswers']);

		$time = time();
		$jsonRatingAnswers = json_encode($answersArr);


		//**NOTE** Using a dummy user_id of -1 for now! 
		$addAnswers = "INSERT INTO answers (user_id, survey_id, survey_answers, created)
		               VALUES ( -1, 1, '$jsonRatingAnswers', '$time')";
        mysqli_query( $bd, $addAnswers );
		
		// print_r( json_encode($userID) );
	}

?>