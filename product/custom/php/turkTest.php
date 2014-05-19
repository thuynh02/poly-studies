<head>
    <link rel="stylesheet" href="../../bootstrap/dist/css/bootstrap.min.css" type="text/css">
</head>

<?php

require_once("Turk50.php");
include_once("db.php");

// ORIGINAL, WORKING KEY
// $AWSAccessKeyId = "AKIAIDUS5MHIUFUXAVWA";
// $AWSSecretAccessKeyId = "Bu51fupr1wn1P5kXB0ZXi8jWena4RW902WQDaC1r";

// FOR TESTING IN SANDBOX MODE. The following access key stuff is NOT the official one to use
$AWSAccessKeyId = 'AKIAJXNAJBMPIVO4RNSA';
$AWSSecretAccessKeyId = 'lGZP20MrnP2Dr9RaXj1aahZMPHJIxb/zygd4cw+H';

$turk50 = new Turk50($AWSAccessKeyId, $AWSSecretAccessKeyId, array("trace" => FALSE, "sandbox" => TRUE));

if (isset($_POST["workerIds"])) {
	$postWorkerIds = $_POST["workerIds"];
	$msg = $_POST["infoText"];
	echo "Email sent to these worker IDs:<br>";
	$workerArr = explode(",",$postWorkerIds);

	foreach ($workerArr as &$worker) {
		$w = explode("-",$worker);
		echo $w[0] . "<br>\n";
	}
} else {
	$page = 1;
	// $hitId = $_GET["hitId"];
	// $hitId = "2FE2GTP9RA7SNBBTB9PSWF708RPVQN";
	// $hitId = "24M6UXFCD45XUTIFISETSIN3JMMWUV";

	// FOR TESING PURPOSES IN SANDBOX MODE. GET PUBLISHED HIT ID AFTER TESTING 
	$hitId = "34ZTTGSNJX1H5SJOY93MHZVE3RGHQY";
	$pageSize = 100;

	$Request = array(
	 "HITId" => $hitId,
	 "PageSize" => $pageSize,
	 "PageNumber" => $page 
	);

	$Response = $turk50->GetAssignmentsForHIT($Request);
	$Assignments = $Response->GetAssignmentsForHITResult->Assignment;
	$TotalNumResults = $Response->GetAssignmentsForHITResult->TotalNumResults;

	//print_r($Response);

	$n = 1;
	$pages = ceil($TotalNumResults/$pageSize);
	$out_str = "";

	printAssignments( $Assignments );

	while ($page < $pages) {
		
		$page++;
		
		$Request = array(
		 "HITId" => $hitId,
		 "PageSize" => $pageSize,
		 "PageNumber" => $page
		);
		
		$Response = $turk50->GetAssignmentsForHIT($Request);
		$Assignments = $Response->GetAssignmentsForHITResult->Assignment;
		printAssignments($Assignments);
		
	}

	echo "<form method='post' id='workerForm' action='emailer.php'>";
	echo "<table class='table table-striped table-hover'>";
	echo "<tr><th></th><th></th><th>Worker ID</th><th>Survey code</th><th>User ID</th><th>Survey date</th><th>Expected email date</th><th>Time until email</th><th>Email status</th></tr>";
	echo $out_str;


	echo '</table>';
	echo '<input type="hidden" value="" id="workerIdsToEmail" name="workerIds">';
	?>
	<br>
	<label>Custom message:</label><br>
	<textarea name="infoText" style="width: 400px; height: 200px">
	This is a reminder to complete the second part of the survey you started two weeks ago.

	Please visit: http://www.brooklynatlantis.poly.edu/study2a/
	</textarea>
	<br>
	<?php
	echo '<input type="submit" value="Send email">';
	echo '</form>';
}



$file_name = "mturkid.txt";
//file_put_contents($file_name, $out_str);

function printAssignments($arr) {
	global $n;
	global $out_str;
	global $bd;

	if (count($arr) == 1) {
	   $arr = array($arr);	   
	}

	foreach ($arr as $value) {
//	   print_r($value);
	
		if ($value && $value->WorkerId) {
			
			$workerId = $value->WorkerId;
			$xml = simplexml_load_string($value->Answer);
			$surveyId = $xml->Answer->FreeText;
            $acceptTime = $value->AcceptTime;

			$query = "SELECT * FROM users WHERE survey_code = '".$surveyId."';";
			$results = mysqli_query($bd, $query);

			$id = -1;
			$email_status = "";
			while ($result = mysqli_fetch_assoc($results)) {
			      //print_r($result);
				$id = $result["user_id"];
				// $email_status = $result["email_status"];
			}

//			if ($id != -1) {

			$query2 = "SELECT * FROM answers WHERE user_id = ".$id.";";
			$results2 = mysqli_query($bd, $query2);

			$time = -1;
			while ($result2 = mysqli_fetch_assoc($results2)) {
				$time = $result2["created"];
			}

			$twoweekslater = $time + (60*60*24*14);

			$time_remaining = "Less than two weeks";
			if ($twoweekslater <= $time) {
				$time_remaining = "Two weeks or longer";
			}

			if ($email_status == "" && $time_remaining == "Two weeks or longer") {
				//sendEmail($wrkrId);
			}

			if ($email_status == "") {
				$email_status = "No email sent";
			}

			$formattedAcceptTime = date('Y-m-d', strtotime($acceptTime));	
			$out_str .= "<tr><td><input type='checkbox' value='".  $workerId ."-".$surveyId."-".$id."'></td><td>" . $n . "</td><td>" . $workerId . "</td><td>" . $surveyId . "</td><td>" . $id  . "</td><td>" . 
				$formattedAcceptTime .  "</td><td>" . date('Y-m-d', $twoweekslater) .  "</td><td>" . $time_remaining . 
				"</td><td>" . $email_status .  "</td></tr>";

			$n++;
//}
		}
	}
}

?>