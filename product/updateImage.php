<?php
	include( 'db.php' );

	if( isset($_POST) ){

		$uploadID = htmlspecialchars( strip_tags( $_POST['uploadID'] ) );
		$newName  = htmlspecialchars( strip_tags( $_POST['newName'] ) );
		
		$updateImageQuery = "UPDATE user_uploads SET image_name='$newName' WHERE upload_id='$uploadID'";

		mysqli_query( $bd, $updateImageQuery );

		// Debugging: If nothing shows up, ajax call in admin.js failed to pass information to this file.
		// var_dump($_POST);
	}

?>