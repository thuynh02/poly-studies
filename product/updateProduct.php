<?php
	include( 'db.php' );

	if( isset($_POST) ){

		$uploadID = htmlspecialchars( strip_tags( $_POST['uploadID'] ) );
		$newName  = htmlspecialchars( strip_tags( $_POST['newName'] ) );
		$imageDesc = htmlspecialchars( strip_tags( $_POST['imageDesc'] ) );

		$numberOfQuestions = htmlspecialchars( strip_tags( $_POST['numberOfQuestions'] ) );
		
		$query = "UPDATE product_images
				  SET image_name='$newName', image_description='$imageDesc' 
				  WHERE upload_id='$uploadID'";

		mysqli_query( $bd, $query );

		for ($i=0; $i < $numberOfQuestions; $i++) { 
			$voters = htmlspecialchars( strip_tags( $_POST['questionVotes' + i ] ) );
			$rating  = htmlspecialchars( strip_tags( $_POST['questionRatings' + i ] ) );
			$query = "UPDATE ratings 
				  SET rating='$rating', voters='$rating'
				  WHERE upload_id='$uploadID' AND survey_id=1 AND question_id='$i'";

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