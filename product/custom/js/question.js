window.onload=function(){

  // ----------------------------------------------------------------------------------------------------------------------- GLOBAL VARIABLES

  var surveyQuestions = [];
  var ratingQuestions = [];
  var numSurveyQuestions = 0;
  var numRatingQuestions = 0;
  var questionTypes = [ 'usage', 'familiarity-slider', 'opinion-star', 'like-rating' ];

  // ----------------------------------------------------------------------------------------------------------------------- PRODUCT INITIALIZATION

  // Retrieve a json string of the attributes: <question_id>, <question_type>, and <description> from the questions table 
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
            surveyQuestions.push( 
              { //Store survey question object such that it is possible to get the description and the ID
                description: data[i].description,
                question_id: data[i].question_id
              }
            );
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
          <div class="col-md-8"> \
            <input type="text" class="form-control" id="surveyQuestion' + i + '" name="surveyQuestion' + i + '" placeholder="Insert Question Here"> \
          </div> \
          <div class="btn-group">\
            <button type="button" id="hide"' + i + '" class="btn btn-default" value="' + i + '" name="survey">Hide</button>\
            <button type="button" id="del"' + i + '" class="btn btn-danger" value="' + i + '" name="survey">Delete</button>\
          </div>\
        </div>';

    // Elements found in question.html
    $( '#surveyWrap' ).append( htmlContainer );
    $( '#surveyQuestion' + i ).val( question );

  }

  // for (var i = 0; i < surveyQuestions.length; i++) {
  //   generateSurveyField( i, surveyQuestions[i] );
  // };

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
            htmlContainer += '\
            <div class="radio"> \
              <input type="radio" name="questionType' + i + '" value="' + questionTypes[j] + '"> Usage \
            </div> \
            ';
            break;

          // Familiarity question
          case 'familiarity-slider':
            htmlContainer += '\
            <div class="radio"> \
              <input type="radio" name="questionType' + i + '" value="' + questionTypes[j] + '"> Familiarity (Slider) \
            </div> \
            ';
            break;

          // Star-rating question
          case 'opinion-star':
            htmlContainer += '\
            <div class="radio"> \
              <input type="radio" name="questionType' + i +'" value="' + questionTypes[j] + '"> Opinion (Stars) \
            </div> \
            ';
            break;

          // Like-rating question
          case 'like-rating':
            htmlContainer += '\
            <div class="radio"> \
              <input type="radio" name="questionType' + i +'" value="' + questionTypes[j] + '"> Like/Dislike \
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
    // End of <div class="col-md-10">
    // End of <div class="form-group">


    // These elements are found in question.html
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
      generateSurveyField( i, surveyQuestions[i].description );
    };
  }

  for (var i = 0; i < ratingQuestions.length; i++) {
    generateRatingField( i, ratingQuestions[i] );
  };

  //Assign the on-click hide functionality to all buttons with the id, "hide"
  $(document.body).on( 'click', 'button[id="hide"]', function(event){

    if( event.target ){
      var currentQ = event.target.value;
      var type = event.target.name;
      var questionObj = 
          {
            question_id: surveyQuestions[currentQ].question_id, 
            hide: 1,
            del: 0
          };

      $.ajax({

        type: 'POST',
        url: 'custom/php/flagQuestions.php',
        data: questionObj,
        success: function( info ){
          console.log( info );
        }

      });

    }

  });

  //Assign the on-click hide functionality to all buttons with the id, "hide"
  $(document.body).on( 'click', 'button[id="del"]', function(event){

    if( event.target ){
      var currentQ = event.target.value;
      var type = event.target.name;
    }

  });

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


    //============ Not used yet - Probably used for debugging only ==============
    for (var i = 0; i < numRatingQuestions; i++) {
      var ratingSet = [ 
                        $('input[name="questionType' + i + '"]:checked').val(),
                        $( '#ratingQuestion' + i ).val() 
                      ];
      $( '#ratingQuestion' + i ).val( JSON.stringify(ratingSet) );

      console.log($( '#ratingQuestion' + i ).val());
    };
    //============ Not used yet - Probably used for debugging only ==============


    var jsonArr = $("#addQuestions").serializeArray();
    // console.log( jsonArr );

    $.ajax({
        type: 'POST',
        url: 'custom/php/addQuestions.php',
        data: jsonArr,

        success: function(info){
            console.log( 'YAY ' + info );
            window.location.reload();
        },

        fail: function(){
            console.log( 'NAY' );
        }

      });

  });

}