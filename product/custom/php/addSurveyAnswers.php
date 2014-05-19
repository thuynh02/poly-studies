<?php
	session_start();
	include( 'db.php' );

	function randString($length, $charset='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'){
	    $str = '';
	    $count = strlen($charset);
	    while ($length--) {
	        $str .= $charset[mt_rand(0, $count-1)];
	    }
	    return $str;
	}

	if( isset($_POST) ){
		$numOfErrors = 0;

		//Decode the json string and store it as an array of product answers
		$answersArr = json_decode($_POST['surveyAnswers']);

		$time = time();
		$jsonRatingAnswers = json_encode($answersArr);
		$maxUserId = mysqli_query( $bd, "SELECT user_id FROM users ORDER BY user_id DESC LIMIT 1" );
		$newUser = 1 + mysqli_fetch_assoc( $maxUserId )['user_id'];
		$surveyCode = randString( 5 );

		// If we are adding new survey answers, then this must be a new user. Insert a new user with a corresponding unique survey code
		mysqli_query( $bd, "INSERT INTO users (user_id, survey_code) VALUES ('$newUser', '$surveyCode')" ) ? $numOfErrors : ++$numOfErrors;

		//Insert their survey answers into the answers table. The time elapsed is include in the jsonRatingAnswers string
		$addAnswers = "INSERT INTO answers (user_id, survey_id, survey_answers, created)
		               VALUES ( '$newUser', 1, '$jsonRatingAnswers', '$time')";
        mysqli_query( $bd, $addAnswers ) ? $numOfErrors : ++$numOfErrors;

        //Set the user id for this session
		$_SESSION['user_id'] = $newUser;

		//Return the number of errors to determine if the page should move on to rate.html or not. If there were no errors, it will redirect.
        echo( $numOfErrors );
	}

?>