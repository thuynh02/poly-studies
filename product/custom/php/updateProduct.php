<?php
	include( 'db.php' );

	function getFirstPostValWithKeyPrefix( $prefix ){
		$POST_SUBSET = array_intersect_key($_POST, array_flip(preg_grep('/^'.$prefix.'/', array_keys($_POST))));
		return reset( $POST_SUBSET );
	}

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

			if( isset($_POST['questionID'.$j]) && isset($_POST['questionType'.$j]) ){
			
				$questionID = htmlspecialchars( strip_tags( $_POST['questionID'.$j ] ) );
				$questionType = htmlspecialchars( strip_tags( $_POST['questionType'.$j ] ) );

				if( $questionType == "like-rating" ){
					$likes[0] = htmlspecialchars( strip_tags( getFirstPostValWithKeyPrefix( 'likeVoters' ) ) );
					$likes[1] = htmlspecialchars( strip_tags( getFirstPostValWithKeyPrefix( 'unsureVoters' ) ) );
					$likes[2] = htmlspecialchars( strip_tags( getFirstPostValWithKeyPrefix( 'dislikeVoters') ) );
					$likes = json_encode($likes);
					
					$query = "UPDATE ratings 
							  SET rating='$likes', voters='like-rating'
							  WHERE upload_id='$uploadID' AND survey_id=1 AND question_id='$questionID'";
				}
				else {
					$voters = htmlspecialchars( strip_tags( $_POST['questionVoters'.$j ] ) );
					$rating  = htmlspecialchars( strip_tags( $_POST['questionRatings'.$j ] ) );
					
					$query = "UPDATE ratings 
							  SET rating='$rating', voters='$voters'
							  WHERE upload_id='$uploadID' AND survey_id=1 AND question_id='$questionID'";
				}

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