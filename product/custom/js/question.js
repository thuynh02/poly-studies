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
                question_id: data[i].question_id,
                hide: data[i].hide,
                del: data[i].del
              }
            );
          }
          else if( data[i].question_type == "rating"){
            ratingQuestions.push( 
              { //Store survey question object such that it is possible to get the description and the ID
                description: JSON.parse( data[i].description ),
                question_id: data[i].question_id,
                hide: data[i].hide,
                del: data[i].del
              } 
            );
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

  function generateSurveyField( i , num, question ) {
    var htmlContainer = '\
        <div class="form-group"> \
          <label for="question'+ i +'" class="col-md-2 control-label">Survey Question #' + ( num ) + '</label> \
          <div class="col-md-8"> \
            <input type="text" class="form-control" id="surveyQuestion' + i + '" name="surveyQuestion' + i + '" placeholder="Insert Question Here"> \
          </div> \
          <div class="btn-group" id="questionCtrl">\
            <button type="button" id="hide' + i + '" class="btn btn-default" value="' + i + '" name="survey">Hide</button>\
            <button type="button" id="del' + i + '" class="btn btn-danger" value="' + i + '" name="survey">Delete</button>\
          </div>\
        </div>';

    // Elements found in question.html
    $( '#surveyWrap' ).append( htmlContainer );
    $( '#surveyQuestion' + i ).val( question );

  }

  // for (var i = 0; i < surveyQuestions.length; i++) {
  //   generateSurveyField( i, surveyQuestions[i] );
  // };

  function generateRatingField( i , num, obj ) {
    var htmlContainer = '\
        <div class="form-group" id="ratingContainer'+ i +'" > \
          <label for="question'+ i +'" class="col-md-2 control-label">Rating Question #' + ( num ) + '</label> \
          <div class="col-md-8"> \
        '; 


    for (var j = 0; j < questionTypes.length; j++) {
      switch( questionTypes[j] ){

          // Usage question (active by default when adding a new rating question)
          case 'usage': 
            htmlContainer += '\
            <div class="radio"> \
              <input type="radio" name="questionType' + i + '" value="' + questionTypes[j] + '" checked="checked"> Usage \
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
            <div class="btn-group" id="questionCtrl">\
              <button type="button" id="hide' + i + '" class="btn btn-default" value="' + i + '" name="rating">Hide</button>\
              <button type="button" id="del' + i + '" class="btn btn-danger" value="' + i + '" name="rating">Delete</button>\
            </div>\
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


  function fillQuestionObj( type, currentQ, toggleHide, toggleDel ){
    var questionObj;
    var questionArr;
    if( type == 'survey' ){ questionArr = surveyQuestions; }
    else if( type == 'rating' ){ questionArr = ratingQuestions; }

    console.log( type );
    console.log( questionArr );

    questionObj = { question_id: questionArr[currentQ].question_id, 
                    question_type: type,
                    hide: questionArr[currentQ].hide,
                    del: questionArr[currentQ].del 
                  }; 

    if( toggleHide ){ questionObj.hide = 1 - questionObj.hide; }
    if( toggleDel ){ questionObj.del = 1 - questionObj.del; }

    console.log( questionObj );
    return questionObj;
  }

  var containerCounter = 0;
  if( numSurveyQuestions < 1 ) {
    // console.log( "WHY? Survey." );
    generateSurveyField( numSurveyQuestions++, '' );
  }
  else{

    for (var i = 0; i < surveyQuestions.length; i++) {
      if( surveyQuestions[i].del != 1 ){
        generateSurveyField( i, ++containerCounter, surveyQuestions[i].description );
        if( surveyQuestions[i].hide == 1 ){
          $('#surveyQuestion'+i).addClass('enableHide');
        }
      }
    }
  }
  containerCounter = 0;
  for (var i = 0; i < ratingQuestions.length; i++) {

    if( ratingQuestions[i].del != 1 ){
      generateRatingField( i, ++containerCounter, ratingQuestions[i].description );
      if( ratingQuestions[i].hide == 1 ){
          $('#ratingContainer'+i).addClass('enableHide');
      }
    }
  };

  //Assign the on-click hide functionality to all buttons with the id, "hide"
  $(document.body).on( 'click', 'button[id^="hide"]', function(event){

    if( event.target ){
      var currentQ = event.target.value;
      var type = event.target.name;

      // fillQuestionObj takes the question type and current question
      // and creates a question object with a toggle hide or toggle del
      // value. 
      // ex) If hide was 1 before, this object will store hide as 0
      var questionObj = fillQuestionObj( type, currentQ, true, false )

      $.ajax({
        type: 'POST',
        url: 'custom/php/flagQuestions.php',
        data: questionObj,
        dataType: 'json',
        success: function( newData ){

          //Update survey array & corresponding form
          if( type == 'survey' ){ 
            surveyQuestions[currentQ].hide = questionObj.hide;
            if( questionObj.hide ){  $('#surveyQuestion'+currentQ).addClass('enableHide'); }
            else{ $('#surveyQuestion'+currentQ).removeClass('enableHide'); }
          }

          //Update rating array & corresponding form
          else if( type == 'rating' ){ 
            ratingQuestions[currentQ].hide = questionObj.hide;
            if( questionObj.hide ){ $('#ratingContainer'+currentQ).addClass('enableHide'); }
            else{ $('#ratingContainer'+currentQ).removeClass('enableHide'); }
          }

        }
      });
    }

  });

  //Assign the on-click hide functionality to all buttons with the id, "hide"
  $(document.body).on( 'click', 'button[id^="del"]', function(event){

    if( event.target ){
      var currentQ = event.target.value;
      var type = event.target.name;
      var questionObj = fillQuestionObj( type, currentQ, false, true )

      $.ajax({
        type: 'POST',
        url: 'custom/php/flagQuestions.php',
        data: questionObj,
        dataType: 'json',
        success: function( newData ){

          //Update survey array & corresponding form
          if( type == 'survey' ){ 
            surveyQuestions[currentQ].del = questionObj.del;
            if( questionObj.del == 1 ){  $('#surveyQuestion'+currentQ).addClass('enableDel'); }
            else{ $('#surveyQuestion'+currentQ).removeClass('enableDel'); }
          }

          //Update rating array & corresponding form
          else if( type == 'rating' ){ 
            ratingQuestions[currentQ].del = questionObj.del;
            if( questionObj.del == 1 ){ $('#ratingContainer'+currentQ).addClass('enableDel'); }
            else{ $('#ratingContainer'+currentQ).removeClass('enableDel'); }
          }

        }
      });
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
    console.log( JSON.stringify(jsonArr) );

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