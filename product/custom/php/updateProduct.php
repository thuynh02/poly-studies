<?php
	include( 'db.php' );

	if( isset($_POST) ){

		// Will be used for callbacks to the js file in order to inform the user of the result of the query execution
		$numOfErrors = 0;

		$uploadID = htmlspecialchars( strip_tags( $_POST['uploadID'] ) );
		$newName  = htmlspecialchars( strip_tags( $_POST['newName'] ) );
		$imageDesc = htmlspecialchars( strip_tags( $_POST['imageDesc'] ) );
		$numberOfQuestions = htmlspecialchars( strip_tags( $_POST['numberOfQuestions'] ) );
		
		$query = "UPDATE product_images
				  SET image_name='$newName', image_description='$imageDesc' 
				  WHERE upload_id='$uploadID'";

		//Executes the query. If successful, continue. If failed, increment the numOfErrors counter
		mysqli_query( $bd, $query ) ? $numOfErrors : ++$numOfErrors;

		for ($j = 0; $j < $numberOfQuestions; $j++) { 
			$questionID = htmlspecialchars( strip_tags( $_POST['questionID'.$j ] ) );
			$voters = htmlspecialchars( strip_tags( $_POST['questionVoters'.$j ] ) );
			$rating  = htmlspecialchars( strip_tags( $_POST['questionRatings'.$j ] ) );
			
			if( $voters > 0 && $rating > 0 ) { 
				$query = "UPDATE ratings 
					  SET rating='$rating', voters='$voters'
					  WHERE upload_id='$uploadID' AND survey_id=1 AND question_id='$questionID'";

				//Executes the query. If successful, continue. If failed, increment the numOfErrors counter
				mysqli_query( $bd, $query ) ? $numOfErrors : ++$numOfErrors;
			}
		}

		// If no errors were logged, then the queries worked just fine!
		if( $numOfErrors === 0 ){ 
			print_r( "Success! " ); 
		}

		// Otherwise, at least inform the user of the number of errors encountered. 
		else{
			print_r( "Errors: ".$numOfErrors );
		}
		
		//Debugging purposes. Ajax call in admin.js should have some parameter like 'info' 
		//in success:function(info) in order to retrieve the following POST array information.
		//print_r( $_POST );
	}

?>