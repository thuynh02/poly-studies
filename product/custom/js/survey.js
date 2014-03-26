// Validate is used to verify that all survey questions have been answered.
// 
// NOTE: A bool can be passed in order to enable alert messages. 
//		 Alerts will tell the user what questions were left unanswered.
// 
// This function is used in survey.html. Form name, "initialSurvey" calls this function from attribute, 'onsubmit'
// TO BE IMPLEMENTED: Check for valid age and if awareness questions are answered correctly
// Ex: 	Question 11 asks that the user selects choice 2. 
//		We need to ensure that choice is selected before moving on.
function validate( showMessage ){

	if( showMessage == null ){ showMessage = false; }
	var message = "";
	var isValid = true;

	// Check if age was given 
	// ***MUST CHECK FOR NUMERICAL ANSWER UNDER 99***
	if( $('input[name="age"]')[0].value == '' ){
		message += "Please fill out your age.\n";
		isValid = false;
	}

	// Check if gender is given
	if( $('input[name="gender"]:checked').length == 0 ){
		message += "Please select your gender.\n";
		isValid = false;
	}

	// Check if all the remaining survey questions were answered
	// ***MUST CHECK FOR QUESTION 11. ANSWER MUST BE CHOICE 2***
	var numOfLikertQuestions = 18;
	var currentQuestion;
	for( var i = 1; i <= numOfLikertQuestions; ++i ){

		// Likert scale (radio button input) questions
		if( $('input[name="q' + i + '"]').attr("type") == 'radio' 
			&& $('input[name="q' + i + '"]:checked').length == 0 ){
     		message += 'Please select one option for question ' + i + '\n';
     		isValid = false;

		}

		// Text field question(s) 
		else if( $('input[name="q' + i + '"]').attr("type") == 'text' 
				 && $('input[name="q' + i + '"]')[0].value == '' ){
			message += 'Please fill out question ' + i + '\n';
			isValid = false;
		}
	}

	//
	if( showMessage && message != ''){
		alert( message );
	}

	//If, by the end of all the tests, nothing triggers an invalid answer, the answers are okay to go
	return isValid;
}

window.onload = function(){
	var surveyData = new Object();

	// Once the user clicks submit, begin to fill the survey data object with the answers
	// Afterwards, convert the object into a JSON string 
	$('#surveySubmit').click( function(){

		// Validate takes a boolean parameter. If true is passed, alerts appear, telling the user what
		// questions were left unanswered
		if( validate(true) ){
			//For every checked radio button and provided text input, add the value to the survey data
			$('input:checked, input[type="text"]').each( function(){
				surveyData[$(this)[0].name] = $(this)[0].value;
			});
			var jsonSurveyData = JSON.stringify(surveyData);
	        console.log( jsonSurveyData );
	    }
	});
}







