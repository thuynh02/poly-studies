<?php
	include( 'db.php' );

	if( isset($_POST) ){

		$uploadID = htmlspecialchars( strip_tags( $_POST['uploadID'] ) );
		$newName  = htmlspecialchars( strip_tags( $_POST['newName'] ) );
		$imageDesc = htmlspecialchars( strip_tags( $_POST['imageDesc'] ) );
		
		$updateImageQuery = "UPDATE user_uploads 
							SET image_name='$newName', image_description='$imageDesc' 
							WHERE upload_id='$uploadID'";

		mysqli_query( $bd, $updateImageQuery );

		//Debugging purposes. Ajax call in admin.js should have some parameter like 'info' 
		//in success:function(info) in order to retrieve the following POST array information.
		print_r($_POST);
	}

?>