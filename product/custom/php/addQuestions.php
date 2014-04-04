<?php
	include( 'db.php' );

	if( isset($_POST) ){

		$numSurveyQuestions = htmlspecialchars( strip_tags( $_POST['numSurveyQuestions'] ) );
		$numRatingQuestions = htmlspecialchars( strip_tags( $_POST['numRatingQuestions'] ) );
		
		$stmtSurvey = mysqli_query($bd, "SELECT COUNT(*) FROM questions WHERE survey_id=1 AND question_type='survey'");
		$stmtRating = mysqli_query($bd, "SELECT COUNT(*) FROM questions WHERE survey_id=1 AND question_type='rating'");
	
		$oldSurvey = mysqli_fetch_assoc( $stmtSurvey )["COUNT(*)"];
		$oldRating = mysqli_fetch_assoc( $stmtRating )["COUNT(*)"];

		$time = time();



		for ($i=0; $i < $numSurveyQuestions; $i++) { 

			$description = htmlspecialchars( strip_tags( $_POST['surveyQuestion'.$i] ) );
			if(  $i < $oldSurvey) {
				$query = "UPDATE questions
					  SET description='$description', created='$time'
					  WHERE question_type='survey' AND survey_id=1 AND question_id='$i'";
			}
			else {
				$query = "INSERT INTO questions (question_id, survey_id, question_type, description, created)
						  VALUES ( $i, 1, 'survey', '$description', '$time' )";
			}

			mysqli_query( $bd, $query );
		}

		for ($i=0; $i < $numRatingQuestions; $i++) { 

			$description = strip_tags( $_POST['ratingQuestion'.$i] );

			if(  $i < $oldRating) {
				$query = "UPDATE questions
					  SET description='$description', created='$time'
					  WHERE question_type='rating' AND survey_id=1 AND question_id='$i'";
			}
			else {
				$query = "INSERT INTO questions (question_id, survey_id, question_type, description, created)
						  VALUES ( $i, 1, 'rating', '$description', '$time' )";
			}
			
			mysqli_query( $bd, $query );
		}
		
		//Debugging purposes. Ajax call in admin.js should have some parameter like 'info' 
		//in success:function(info) in order to retrieve the following POST array information.
		print_r($_POST);


		// $numOfQuestions  = htmlspecialchars( strip_tags( $_POST['numOfQuestions'] ) );

		// for ($i = 0; $i < $numOfQuestions; $i++) { 

			
		// }

		// mysqli_query( $bd, $query );
	}

?>