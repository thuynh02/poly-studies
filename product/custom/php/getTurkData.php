<?php

	require_once( 'Turk50.php' );
	include( 'db.php' );

	// SANDBOX KEYS
	$AWSAccessKeyId = 'AKIAJXNAJBMPIVO4RNSA';
	$AWSSecretAccessKeyId = 'lGZP20MrnP2Dr9RaXj1aahZMPHJIxb/zygd4cw+H';
	$turk50 = new Turk50($AWSAccessKeyId, $AWSSecretAccessKeyId, array("trace" => FALSE, "sandbox" => TRUE));

	// SANDBOX HIT ID
	$hitId = "33IXYHIZB5VOTZQ16X5F0E0YV6DE26";
	$pageSize = 100;

	$page = 1;
	$Request = array(
	 "HITId" => $hitId,
	 "PageSize" => $pageSize,
	 "PageNumber" => $page 
	);

	$Response = $turk50->GetAssignmentsForHIT($Request);

	echo( json_encode( $Response->GetAssignmentsForHITResult ) );

?>