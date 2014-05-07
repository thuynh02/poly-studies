<?php
	include( 'db.php' );

	if( isset($_POST) ){

		//A bit of paranoid cleaning. All info is from database, but just in case something stupid happens
		$questionID =  htmlspecialchars( strip_tags( $_POST['question_id'] ));
		$type = htmlspecialchars( strip_tags( $_POST['question_type'] ));
		$hide =  htmlspecialchars( strip_tags( $_POST['hide'] ));
		$del =  htmlspecialchars( strip_tags( $_POST['del'] ));

		mysqli_query( $bd, "UPDATE questions 
							SET hide='$hide', del='$del'
							WHERE question_id='$questionID' AND question_type='$type'");

		echo( json_encode( $_POST ) );

	}

?>