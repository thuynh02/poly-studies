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
            <input type="text" class="form-control" id="question' + i + '" name="question' + i + '" placeholder="Insert Question Here"> \
          </div> \
        </div>';

    $( '#surveyQuestions' ).append( htmlContainer );
    $( '#question' + i ).val( question );

  }

  for (var i = 0; i < surveyQuestions.length; i++) {
    generateSurveyField( i, surveyQuestions[i] );
  };

  // ----------------------------------------------------------------------------------------------------------------------- BUTTON HANDLING

  if( numSurveyQuestions == 0 ) {
    generateSurveyField( numSurveyQuestions++, '' );
  }
  $("#addSurveyQuestion").click(function(){

    if( $( '#question' + ( numSurveyQuestions - 1 ) ).val() != "" ) {
      generateSurveyField( numSurveyQuestions++, '' );
    }

  });

  $("#submitSurvey").click(function(){

    var htmlContainer = '<input type="hidden" id="numSurveyQuestions" name="numSurveyQuestions" value="' + numSurveyQuestions + '">';
    $( '#surveyQuestions' ).append( htmlContainer );

    var jsonArr = $("#surveyQuestions").serializeArray();

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