window.onload=function(){

  // ----------------------------------------------------------------------------------------------------------------------- GLOBAL VARIABLES

  var surveyQuestions = [];
  var ratingQuestions = [];
  var numSurveyQuestions = 0;
  var numRatingQuestions = 0;

  // ----------------------------------------------------------------------------------------------------------------------- PRODUCT INITIALIZATION

  // getImageData will make an ajax call to getImages.php, which queries the database for all
  // the uploaded images (table: user_uploads). The resulting array of image names are formatted to a
  // json string and retrieved here. Upon success of retrieval, the array is traversed and productItems
  // are given the appropriate data. 
  // **NOTE** Image names for the question have yet to be implemented in the database/image-upload.php!
  // **NOTE** Questions will display the image name w/ extensions and all. 
  function getQuestionData(){

    var data = $.ajax({
      type: 'POST',
      url: 'custom/php/getQuestions.php',
      data: data,
      dataType: 'json',
      success : function( data ){
        console.log(data);
        for( var i = 0; i < data.length; ++i ){
          if( data[i].question_type == "survey" ){
            surveyQuestions.push( data[i].description );
          }
          else if( data[i].question_type == "rating" ){
            ratingQuestions.push( data[i].description );
          }
        }

        numSurveyQuestions = surveyQuestions.length;
        numRatingQuestions = ratingQuestions.length;

      },

      async: false
    });

  }

  getQuestionData();

  // ----------------------------------------------------------------------------------------------------------------------- HTML HANDLING

  function generateSurveyField( i , question ) {
    var htmlContainer = '\
        <div class="form-group"> \
          <label for="question'+ i +'" class="col-md-2 control-label">Question #' + ( i + 1 ) + '</label> \
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


  function generateRatingField( i , question ) {
    var htmlContainer = '\
        <div class="form-group"> \
          <label for="question'+ i +'" class="col-md-2 control-label">Question #' + ( i + 1 ) + '</label> \
          <div class="col-md-10"> \
            <input type="checkbox"> Usage (Yes/No) \
            <input type="checkbox"> Familiarity (Slider) \
            <input type="checkbox"> Opinion (Star) \
            <input type="text" class="form-control" id="ratingQuestion' + i + '" name="ratingQuestion' + i + '" placeholder="Insert Question Here"> \
          </div> \
        </div>';

    $( '#ratingWrap' ).append( htmlContainer );
    $( '#ratingQuestion' + i ).val( question );

  }

  // ----------------------------------------------------------------------------------------------------------------------- BUTTON HANDLING

  if( numSurveyQuestions < 1 ) {
    generateSurveyField( numSurveyQuestions++, '' );
  }

  $("#addSurveyQuestion").click(function(){

    if( $( '#surveyQuestion' + ( numSurveyQuestions - 1 ) ).val() != "" ) {
      generateSurveyField( numSurveyQuestions++, '' );
    }

  });

  $("#addRatingQuestion").click(function(){

    if( $( '#ratingQuestion' + ( numRatingQuestions - 1 ) ).val() != "" ) {
      generateRatingField( numRatingQuestions++, '' );
    }

  });


  $("#submitSurvey").click(function(){

    var htmlContainer = '<input type="hidden" id="numSurveyQuestions" name="numSurveyQuestions" value="' + numSurveyQuestions + '">\
                        <input type="hidden" id="numRatingQuestions" name="numRatingQuestions" value="' + numRatingQuestions + '">';

    $( '#addQuestions' ).append( htmlContainer );

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

  });

}