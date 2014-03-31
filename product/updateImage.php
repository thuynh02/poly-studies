<?php

	if( isset($_POST) ){

		$uploadID = $_POST['uploadID'];
		$newName  = $_POST['newName'];
		
		$query = "UPDATE user_uploads SET image_name=? WHERE upload_id =?";

	}

?>