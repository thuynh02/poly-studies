window.onload = function(){

	var data = $.ajax({
		type: 'POST',
		url: './custom/php/getSurveyCode.php',
		data: data,
		success: function( surveyCode ){
			console.log( 'test' );
			$("#confirmation").html( surveyCode );
		},
		fail: function(){
			console.log( 'Failed to connect to getSurveyCode.php' );
		}
	});

}