<?php
	include( 'db.php' );

	if( isset($_POST) ){

		//Decode the json string and store it as an array of product answers
		$answersArr = json_decode($_POST['productAnswers']);
		$ratingAnswers = array();

		//Iterate through each product answer and insert into the database
		foreach( $answersArr as $productAnswer ){

			$productName = htmlspecialchars(strip_tags($productAnswer->productName));
			$questionTypes = $productAnswer->questionTypes;
			$questionValues = $productAnswer->questionValues;

			for( $i = 0; $i < count($questionTypes); $i++ ) {

				$questionTypes[$i] = htmlspecialchars(strip_tags($questionTypes[$i]));
				$questionValues[$i] = htmlspecialchars(strip_tags($questionValues[$i]));

				array_push( $ratingAnswers, '{'.$productName.'_'.$questionTypes[$i].':'.$questionValues[$i].'}' );

			}
		}

		$time = time();
		$jsonRatingAnswers = json_encode($ratingAnswers);

		//**NOTE** Using a dummy user_id of -1 for now! 
		$addAnswers = "UPDATE answers 
					   SET rating_answers = '$jsonRatingAnswers', created = '$time'
		               WHERE user_id=-1 AND survey_id=1";
        mysqli_query( $bd, $addAnswers );
		
		print_r( json_encode($ratingAnswers) );
	}

?>