<?php
	include( 'db.php' );

	if( isset($_POST) ){

		$uploadID = htmlspecialchars( strip_tags( $_POST['uploadID'] ) );
		
		$query = "DELETE FROM product_images
				  WHERE upload_id='$uploadID'";

		//If the query succeeds to execute, return a success message! Otherwise, tell them the bad news
		mysqli_query( $bd, $query ) ? print_r("Success") : print_r("Failed to run delete query.");
		

		//Debugging purposes. Ajax call in admin.js should have some parameter like 'info' 
		//in success:function(info) in order to retrieve the following POST array information.
		// print_r($_POST);


		// $numOfQuestions  = htmlspecialchars( strip_tags( $_POST['numOfQuestions'] ) );

		// for ($i = 0; $i < $numOfQuestions; $i++) { 

			
		// }

		// mysqli_query( $bd, $query );
	}

?>