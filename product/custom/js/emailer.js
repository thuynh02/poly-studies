window.onload = function(){
    
    var turkDataObj;
    var userDataObj;

    // Fetch TURK information from the php file, getTurkData and store in the object, turkDataObj
    $.ajax({
        type: 'POST',
        url: 'custom/php/getTurkData.php',
        async: false,
        success: function( data ){
            turkDataObj = jQuery.parseJSON( data );
        },
        error: function(){
            console.log( 'Failed to get turk data' );
        }
    });


    // Fetch user information from database
    $.ajax({
        type: 'POST',
        url: 'custom/php/getUsers.php',
        async: false,
        success: function( data ){
            userDataObj = jQuery.parseJSON( data );
        },
        error: function(){
            console.log( 'Failed to get turk data' );
        }
    });


    // Fill the table with mechanical turk information
    for( var i = 0; i < turkDataObj["NumResults"]; ++i ){
        var currentWorker = turkDataObj["Assignment"][i];

        // Fetch the Answer XML content found in the turk data in order to get to the survey code the worker was given and submitted 
        var xml = $( jQuery.parseXML( currentWorker["Answer"] ) );

        // Scan the xml for the information found in between the "FreeText" tags
        var surveyCode = xml.find( "FreeText" ).html();

        // Split the time string at 'T' and only take the YYYY-MM-DD portion. Then, split using "-" to be able to use in creating a Date obj
        var acceptTime = currentWorker["AcceptTime"].split( "T" )[0].split( "-" );
        var acceptDateObj = new Date ( acceptTime[0], acceptTime[1], acceptTime[2] );
        var twoWeeksLater = new Date ( acceptDateObj );
        twoWeeksLater.setDate( twoWeeksLater.getDate() + 14 );

        // Get the time remaining until a notification email should be sent
        var today = new Date();
        var timeRemaining = Math.ceil( twoWeeksLater.getDate() - today.getDate() );

        // Simple fetch for workerId and userId
        var workerId = currentWorker["WorkerId"];
        var userId = userDataObj[surveyCode];

        $("#workerList > tbody").append( 
            '\
            <tr> \
                <td> <input type="checkbox" id="workerCheckbox" value="' + workerId + '-' + surveyCode + '-' + userId + '"> </td> \
                <td>' + i + '</td> \
                <td>' + workerId + '</td> \
                <td>' + surveyCode + '</td> \
                <td>' + userId + '</td> \
                <td>' + acceptDateObj.getFullYear() + "/" + acceptDateObj.getMonth() + "/" + acceptDateObj.getDate() + '</td> \
                <td>' + twoWeeksLater.getFullYear() + "/" + twoWeeksLater.getMonth() + "/" + twoWeeksLater.getDate() + '</td> \
                <td>' + timeRemaining + ' days</td> \
                <td> $email_status </td> \
            </tr> \
            '
        );
    }

    // function sendEmail($wrkrId, $code, $msg) {
     
    //     global $turk50;
    //     $defaultWorkerId = "A27YK1ATF39NIR";

    //     $subject = "Please complete survey";
    //         $msg .= "\n Your code is ".$code;

    //     $Request = array(
    //         "Subject" => $subject,
    //         "MessageText" => $msg,
    //         "WorkerId" => $wrkrId
    //     );

    //     $Response = $turk50->NotifyWorkers($Request);

    // }


    /* SAMPLE OF TABLE FORMAT FOR DISPLAYING TURKS
        <tr>
            <td> <input type="checkbox" id="workerCheckbox" value=""> </td>
            <td> $n </td>
            <td> $workerId </td>
            <td> $surveyId </td>
            <td> $id </td>
            <td> $formattedAcceptTime </td>
            <td> date('Y-m-d', $twoweekslater) </td>
            <td> $time_remaining </td>
            <td> $email_status </td>
        </tr>
    */

    $("#selectAll").on( "click", function(){
        if( this.checked ){
            $("input").each( function(){
                this.checked = true;
            });
        }
        else{
            $("input").each( function(){
                this.checked = false;
            });
        }
    });

}