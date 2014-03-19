// Validate is used to verify that all survey questions have been answered.
// This function is used in survey.html. Form name, "initialSurvey" calls this function from attribute, 'onsubmit'
// TO BE IMPLEMENTED: Check for valid age and if awareness questions are answered correctly
// Ex: 	Question 11 asks that the user selects choice 2. 
//		We need to ensure that choice is selected before moving on.
function validate(){

	var isValid = true;

	// Check if age was given 
	// ***MUST CHECK FOR NUMERICAL ANSWER UNDER 99***
	if( $('input[name="age"]')[0].value == '' ){
		console.log( "Please fill out your age." );
		isValid = false;
	}

	// Check if gender is given
	if( $('input[name="gender"]:checked').length == 0 ){
		console.log( "Please select your gender." );
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
     		console.log('Please select one option for question ' + i);
     		isValid = false;

		}

		// Text field question(s) 
		else if( $('input[name="q' + i + '"]').attr("type") == 'text' 
				 && $('input[name="q' + i + '"]')[0].value == '' ){
			console.log('Please fill out question ' + i );
			isValid = false;
		}
	}

	//If, by the end of all the tests, nothing triggers an invalid answer, the answers are okay to go
	return isValid;
}

window.onload = function(){
	var surveyData = new Object();

	// Once the user clicks submit, begin to fill the survey data object with the answers
	// Afterwards, convert the object into a JSON string 
	$('#surveySubmit').click( function(){

		if( validate() ){
			//For every checked radio button and provided text input, add the value to the survey data
			$('input:checked, input[type="text"]').each( function(){
				surveyData[$(this)[0].name] = $(this)[0].value;
			});
			var jsonSurveyData = JSON.stringify(surveyData);
	        console.log( jsonSurveyData );
	    }
	});
}







