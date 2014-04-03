<?php
	include( 'db.php' );

	if( isset($_POST) ){

		$numSurveyQuestions = htmlspecialchars( strip_tags( $_POST['numSurveyQuestions'] ) );
		
		$query = "SELECT COUNT(*) FROM questions WHERE survey_id=1";	
	
		$oldQuestions = mysqli_fetch_assoc( $query )["COUNT(*)"];

		$time = time();

		for ($i=0; $i < $numSurveyQuestions; $i++) { 

			$description = htmlspecialchars( strip_tags( $_POST['question' + $i] ) );
			
			if( $description != "" && $i < $oldQuestions) {
				$query = "UPDATE questions
					  SET description='$description', created='$time'
					  WHERE question_type='survey' AND survey_id=1 AND question_id='$i'";
			}
			else if ( $description != "") {
				$query = "INSERT INTO questions (question_id, survey_id, question_type, description, created)
						  VALUES ( '$i', 1, 'survey', '$description', '$time' )";
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