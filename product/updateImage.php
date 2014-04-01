<?php
	include( 'db.php' );

	if( isset($_POST) ){

		$uploadID = htmlspecialchars( strip_tags( $_POST['uploadID'] ) );
		$newName  = htmlspecialchars( strip_tags( $_POST['newName'] ) );
		$query = "UPDATE product_images SET image_name='$newName' WHERE upload_id='$uploadID'";
		mysqli_query( $bd, $query );

		$numOfQuestions  = htmlspecialchars( strip_tags( $_POST['numOfQuestions'] ) );

		for ($i = 0; $i < $numOfQuestions; $i++) { 

			
		}

		mysqli_query( $bd, $query );

		// Debugging: If nothing shows up, ajax call in admin.js failed to pass information to this file.
		// var_dump($_POST);
	}

?>