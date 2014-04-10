window.onload=function(){

  // ----------------------------------------------------------------------------------------------------------------------- GLOBAL VARIABLES

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
        console.log( data );
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

  getQuestionData();
  numSurveyQuestions = surveyQuestions.length;
  numRatingQuestions = ratingQuestions.length;
  // console.log( "S"+ numSurveyQuestions );
  // console.log( "R"+ numRatingQuestions );
  // console.log( surveyQuestions );
  // console.log( ratingQuestions );

  // ----------------------------------------------------------------------------------------------------------------------- HTML HANDLING

  function generateSurveyField( i , question ) {
    var htmlContainer = '\
        <div class="form-group"> \
          <label for="question'+ i +'" class="col-md-2 control-label">Survey Question #' + ( i + 1 ) + '</label> \
          <div class="col-md-10"> \
            <input type="text" class="form-control" id="surveyQuestion' + i + '" name="surveyQuestion' + i + '" placeholder="Insert Question Here"> \
          </div> \
        </div>';

    $( '#surveyWrap' ).append( htmlContainer );
    $( '#surveyQuestion' + i ).val( question );

  }

  // for (var i = 0; i < surveyQuestions.length; i++) {
  //   generateSurveyField( i, surveyQuestions[i] );
  // };

  var questionTypes = [ 'usage', 'familiarity-slider', 'opinion-star' ];

  function generateRatingField( i , obj ) {

    var htmlContainer = '\
        <div class="form-group"> \
          <label for="question'+ i +'" class="col-md-2 control-label">Rating Question #' + ( i + 1 ) + '</label> \
          <div class="col-md-10"> \
          '; 


    for (var j = 0; j < questionTypes.length; j++) {
      switch( questionTypes[j] ){

          // Usage question
          case 'usage': 
            htmlContainer += '<div class="radio"> \
              <input type="radio" name="questionType' + i + '" value="' + questionTypes[j] + '"> Usage \
            </div> \
            ';
            break;

          // Familiarity question
          case 'familiarity-slider':
            htmlContainer += '<div class="radio"> \
              <input type="radio" name="questionType' + i + '" value="' + questionTypes[j] + '"> Familiarity (Slider) \
            </div> \
            ';
            break;

          // Star-rating question
          case 'opinion-star':
            htmlContainer += '<div class="radio"> \
              <input type="radio" name="questionType' + i +'" value="' + questionTypes[j] + '"> Opinion (Stars) \
            </div> \
            ';
            break;

          // For any question types that are not handled above
          default:
            console.log( "This question type is not recognized!" );
            break;

        }

    };


    htmlContainer += '\
            <input type="text" class="form-control" id="ratingQuestion' + i + '" name="ratingQuestion' + i + '" placeholder="Insert Question Here"> \
          </div> \
        </div>';

    $( '#ratingWrap' ).append( htmlContainer );
    $('input[name="questionType' + i + '"][value="'+ obj[0] +'"]').attr("checked",true);
    $( '#ratingQuestion' + i ).val( obj[1] );

  }

  // ----------------------------------------------------------------------------------------------------------------------- BUTTON HANDLING

  if( numSurveyQuestions < 1 ) {
    // console.log( "WHY? Survey." );
    generateSurveyField( numSurveyQuestions++, '' );
  }
  else{
    for (var i = 0; i < surveyQuestions.length; i++) {
      generateSurveyField( i, surveyQuestions[i] );
    };
  }

  for (var i = 0; i < ratingQuestions.length; i++) {
    generateRatingField( i, ratingQuestions[i] );
  };

  $("#addSurveyQuestion").bind('click',function(){

    //if( $( '#surveyQuestion' + ( numSurveyQuestions - 1 ) ).val() != "" ) {
      generateSurveyField( numSurveyQuestions++, '' );
    //}

  });

  $("#addRatingQuestion").bind('click',function(){

    if( $( '#ratingQuestion' + ( numRatingQuestions - 1 ) ).val() != "" ) {
      generateRatingField( numRatingQuestions++, '' );
    }

  });


  $("#submitSurvey").click(function(){

    var htmlContainer = '<input type="hidden" id="numSurveyQuestions" name="numSurveyQuestions" value="' + numSurveyQuestions + '">\
                        <input type="hidden" id="numRatingQuestions" name="numRatingQuestions" value="' + numRatingQuestions + '">';

    $( '#addQuestions' ).append( htmlContainer );

    for (var i = 0; i < numRatingQuestions; i++) {
      var ratingSet = [
        $('input[name="questionType' + i + '"]:checked').val(),
        $( '#ratingQuestion' + i ).val( )
      ];
      $( '#ratingQuestion' + i ).val( 
        JSON.stringify(ratingSet)
      );
      console.log($( '#ratingQuestion' + i ).val());
    };

    var jsonArr = $("#addQuestions").serializeArray();

    console.log( jsonArr );

    $.ajax({
        type: 'POST',
        url: 'custom/php/addQuestions.php',
        data: jsonArr,

        success: function(info){
            console.log( 'YAY ' + info );
        },

        fail: function(){
            console.log( 'NAY' );
        }

      });

    window.location.reload();

  });

}