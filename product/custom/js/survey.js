
function validateFilled( warn ){

	$( ".question" ).removeClass( "has-errored" );
	$( ".question" ).removeClass( "has-error" );

	var isValid = true;

	// Check if age was given 
	// ***MUST CHECK FOR NUMERICAL ANSWER UNDER 99***
	if( $('input[name="age"]')[0].value == '' ){
		if( warn ) $('#age').addClass( "has-error" );
		isValid = false;
	}

	// Check if gender is given
	if( $('input[name="gender"]:checked').length == 0 ){
		if( warn ) $('#gender').addClass( "has-error" );
		isValid = false;
	}

	// Check if all the remaining survey questions were answered
	// ***MUST CHECK FOR QUESTION 11. ANSWER MUST BE CHOICE 2***
	var numOfLikertQuestions = 18;
	var currentQuestion;
	var validTextValue = 'az'
	for( var i = 1; i <= numOfLikertQuestions; ++i ){

		// Likert scale (radio button input) questions
		if( $('input[name="q' + i + '"]').attr("type") == 'radio' 
			&& $('input[name="q' + i + '"]:checked').length == 0 ){
     		// message += 'Please select one option for question ' + i + '\n';
     		if( warn ) $('#q' + i ).addClass( "has-errored" );
     		isValid = false;

		}

		// // Text field question(s)
		// *** DEPRECATED: Specifications state user should be allowed to submit anything in text field to determine if they were being aware ***
		// else if( $('input[name="q' + i + '"]').attr("type") == 'text' 
		// 		 && $('input[name="q' + i + '"]')[0].value != validTextValue ){
		// 	// message += 'Please fill out question ' + i + '\n';
		// 	if( warn ) $('#q' + i ).addClass( "has-errored" );
		// 	isValid = false;
		// }
	}

	//If, by the end of all the tests, nothing triggers an invalid answer, the answers are okay to go
	return isValid;
}

// Validate is used to verify that all survey questions have been answered.
// 
// NOTE: A bool can be passed in order to enable alert messages. 
//		 Alerts will tell the user what questions were left unanswered.
// 
// This function is used in survey.html. Form name, "initialSurvey" calls this function from attribute, 'onsubmit'
// TO BE IMPLEMENTED: Check for valid age and if awareness questions are answered correctly
// Ex: 	Question 11 asks that the user selects choice 2. 
//		We need to ensure that choice is selected before moving on.
function validateInput( ){

	var isValid = validateFilled( true );

	if( $('input[name="age"]').val() < 18 ) {
		alert( "You're under the required age." );
		isValid = false;
	}

	if( !$('input[name="q5"][value=6]').is( ':checked' ) ) { 
		$('#q5' ).addClass( "has-errored" );
		isValid = false; 
	}
	if( !$('input[name="q11"][value=2]').is( ':checked' ) ) { 
		$('#q11' ).addClass( "has-errored" );
		isValid = false; 
	}

	// ** DEPRECATED: Specifications state user should be allowed to submit anything in text field to determine if they were being aware ***
	// if( $('input[name="q18"]').val() != "az" ) { 
	// 	isValid = false; 
	// }


	//
	// if( showMessage && message != ''){
	// 	// salert( message );
	// }

	//If, by the end of all the tests, nothing triggers an invalid answer, the answers are okay to go
	return isValid;
}


var surveyQuestions = [];
var ratingQuestions = [];
var numSurveyQuestions = 0;
var numRatingQuestions = 0;

  // ----------------------------------------------------------------------------------------------------------------------- PRODUCT INITIALIZATION

function getQuestionData(){
    var data = $.ajax({
      type: 'POST',
      url: 'custom/php/getQuestions.php',
      dataType: 'json',
      data: data,
      async: false,
      success : function( data ){
        for( var i = 0; i < data.length; ++i ){
          if( data[i].question_type == "survey" ){
            surveyQuestions.push( data[i].description );
          }
          else if( data[i].question_type == "rating" ){
            ratingQuestions.push( JSON.parse( data[i].description ) );
          }
        }

      },
      error: function () { console.log("NAY"); }
    });

}

function generateSurveyHTML( n, question ){
	return '<tr class="question" id="q' + ( n + 1 ) + '"> \
				<td>' + ( n + 1 ) + '.</td> \
				<td>' + question + '</td> \
				<td><input type="radio" name="q' + ( n + 1 ) + '" value="1">1</td> \
				<td><input type="radio" name="q' + ( n + 1 ) + '" value="2">2</td> \
				<td><input type="radio" name="q' + ( n + 1 ) + '" value="3">3</td> \
				<td><input type="radio" name="q' + ( n + 1 ) + '" value="4">4</td> \
				<td><input type="radio" name="q' + ( n + 1 ) + '" value="5">5</td> \
				<td><input type="radio" name="q' + ( n + 1 ) + '" value="6">6</td> \
				<td><input type="radio" name="q' + ( n + 1 ) + '" value="7">7</td> \
			</tr>';

}

$(document).ready(function() {

	var surveyData = new Object();

	getQuestionData();

	for (var i = 0; i < surveyQuestions.length; i++) {
		$( '#scaleSurvey' ).append( generateSurveyHTML( i, surveyQuestions[i] ) );
	};

	$( '#scaleSurvey' ).append( '<tr class="question" id="q18"> \
									<td>18</td> \
									<td><input type="text" name="q18"> </td> \
									<td></td> \
									<td></td> \
									<td></td> \
									<td></td> \
									<td></td> \
									<td></td> \
									<td></td> \
								</tr>' );


	//Listen for all mouse clicks on the page. 
	//Each click will check if all inputs have been filled & are valid before enabling the submit button
	$('input').on('click', function(){
		if( validateFilled() ){
			$( '#surveySubmit' ).attr( 'class', 'btn btn-default' );
		}
		else{
			$( '#surveySubmit' ).attr( 'class', 'btn btn-default disabled' );
		}
	});

	// Once the user clicks submit, begin to fill the survey data object with the answers
	// Afterwards, convert the object into a JSON string 
	$('#surveySubmit').click( function(){

		// Validate takes a boolean parameter. If true is passed, alerts appear, telling the user what
		// questions were left unanswered
		if( validateInput() ){
			//For every checked radio button and provided text input, add the value to the survey data
			$('input:checked, input[type="text"]').each( function(){
				surveyData[$(this)[0].name] = $(this)[0].value;
			});
			// var jsonSurveyData = JSON.stringify(surveyData);
	        console.log( surveyData );

	        //POST can only read in the: "key = value" format. 
            var jsonSurveyData = "surveyAnswers=" + JSON.stringify( surveyData );
            console.log( jsonSurveyData );

            $.ajax({
              type: 'POST',
              url: 'custom/php/addSurveyAnswers.php',
              data: jsonSurveyData,

              success : function( data ){
                console.log( data );
              },
              error : function(){
                console.log( "NAY" );
              }
            });
	    }
	});

	$('#fillAll').click( function(){
		
		for (var i = 1; i < surveyQuestions.length + 1; i++) {
			$('input[name="q' + i + '"][value=1]').attr("checked",true);
		};

		$('input[name="age"]').val( 18 );
		$('input[name="gender"][value="male"]').attr("checked",true);
		$('input[name="q5"][value=6]').attr("checked",true);
		$('input[name="q11"][value=2]').attr("checked",true);
		$('input[name="q18"]').val( "az" );

		if( validateFilled() ){
			$( '#surveySubmit' ).attr( 'class', 'btn btn-default' );
		}
		else{
			$( '#surveySubmit' ).attr( 'class', 'btn btn-default disabled' );
		}

	});

	$('#resetAll').click( function(){
		
		for (var i = 1; i < surveyQuestions.length + 1; i++) {
			$('input[name="q' + i + '"]').attr("checked",false);
		};

		$('input[name="age"]').val( "" );
		$('input[name="q18"]').val( "" );

	});


	$("#initialSurvey").submit( function(e){
		return false;
	});
} );







