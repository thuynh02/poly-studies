window.onload=function(){

  // ----------------------------------------------------------------------------------------------------------------------- GLOBAL VARIABLES

  var currentQuestion = 0,
      // amountQuestions = 0,
      currentItem = 0,
      itemQuestionSize = [];

  var DEFAULTVALUE = 0;

  var surveyQuestions = [];
  var ratingQuestions = [];

  // questionTypes serves an array of Strings to serve as keywords for each type of rating to be asked.
  // In the sample survey provided, there is a slider for familiarity, opinion for stars, and usage for yes and no.
  var questionTypes = [];

  // ----------------------------------------------------------------------------------------------------------------------- PRODUCT INITIALIZATION

  // 'createProductItem' function is for creating and returning an Object called productItem with the attributes: 
  // productName, imagePath, questionTypes, and questionValues. Given a string for name, a string for path, and an 
  // array of strings for qTypes in its parameters, the function does an initial check of the parameter using jQuery's 
  // isArray() function to test if the parameter value truly is an array. If it isn't an array, then an array is 
  // created where the first element of the array is the passed in value. An array for questionValues is created 
  // under the array values with a default value of 0 for each of the element in the qTypes.

  // An example of a product made from such function would be: (with values)
  // var productItem = {
  //   productName: "Jethro",
  //   imagePath: "images/jethro.jpg",
  //   questionTypes: [ 'familiarity-slider', 'star-rating', 'usage', 'like-rating' ]
  //   questionValues: [ 0, 0, 0, 0 ]
  // };

  function createProductItem( id, name, desc, path, qTypes ) {
    if ( !$.isArray(qTypes) ) { qTypes = [ qTypes ]; }

    var values = new Array( qTypes.length );
    for (var i = 0; i < qTypes.length; i++) { values[i] = DEFAULTVALUE; }

    var productItem = {
      imageID: id,
      productName: name,
      productDesc: desc,
      imagePath: path,
      questionTypes: qTypes,
      questionValues: values,
      voterRating: []
    };


    return productItem;
  }

  // getImageData will make an ajax call to getImages.php, which queries the database for all
  // the uploaded images (table: user_uploads). The resulting array of image names are formatted to a
  // json string and retrieved here. Upon success of retrieval, the array is traversed and productItems
  // are given the appropriate data. 
  function getImageData(){
    var productArr = [];
    var data = $.ajax({
      type: 'POST',
      url: 'custom/php/getImages.php',
      data: data,
      dataType: 'json',
      async: false,
      success : function( data ){
        for( var i = 0; i < data.length; ++i ){
          productArr.push( createProductItem( 
                              data[i].upload_id, 
                              data[i].image_name, 
                              data[i].image_description, 
                              "images/"+data[i].image_path,
                              questionTypes) );
        }
      }
    });
    return productArr;
  }


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

        for (var i = 0; i < ratingQuestions.length; i++) {
          questionTypes.push( ratingQuestions[i][0] );
        };
      },

      error: function () { console.log("NAY"); }

    });
  }

  function getRatingData( array ){
    var data = $.ajax({
      type: 'POST',
      url: 'custom/php/getRatings.php',
      data: data,
      dataType: 'json',
      async: false,

      success : function( data ){
        console.log( data );
        for (var i = 0; i < array.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if( array[i].imageID === data[j].upload_id ) {
              var voterRates = {
                questionID: data[j].question_id,
                voters: data[j].voters,
                rating: data[j].rating
              };
              array[i]['voterRating'].push( voterRates );
            }
          };
        };
      }

    });
  }


  getQuestionData();

  // productItems serve as the array of Objects for each productItem returned from the 'createProductItem' function.
  var productItems = getImageData();

  getRatingData( productItems );

  console.log( productItems );

  //*** Hard-coded creation of product items are commented out just as a back up ***//
  // Initialize and push into 'productItems' the Objects created from the function 'createProductItem.'
  // Here five objects are created with associated index in array 'productItems': Jethro (Index 0), Merlin (Index 1), 
  // Skinny Luke (Index 2), Colin Morgan (Index 3), and Ariel (Index 4)

  // var productItems = [];
  // productItems.push( createProductItem( "iPad Mini", "images/ipad-mini.jpg", questionTypes ) );
  // productItems.push( createProductItem( "Coke", "images/coke.jpg", questionTypes ) );
  // productItems.push( createProductItem( "Twitter", "images/twitter.jpg", questionTypes ) );
  //*** Hard-coded creation of product items are commented out just as a back up ***//

  function checkAllAnswered( unansweredValue ) {
    var i, j;
    for ( i = 0; i < productItems.length; i++) {
      for ( j = 0; j < productItems[i].questionValues.length; j++) {
        if( productItems[i].questionValues[j] == unansweredValue ) { return [i, j]; }
      }
    }
    return [i, j];
  }

  // ----------------------------------------------------------------------------------------------------------------------- HTML HANDLING

  function generateQuestionHTML( item, questionIndex ) {
    console.log( "I: " + item );
    console.log( "Q: " + questionIndex );

    var question = ratingQuestions[questionIndex][1].replace('[id]', productItems[item].productName );
    var keyword = productItems[item].questionTypes[questionIndex];
    var voters = productItems[item]['voterRating'][questionIndex].voters;
    var rating = productItems[item]['voterRating'][questionIndex].rating;

    var html = '<p class="lead">' + voters + ' people voted ' + rating + '.</p>';
    if( voters == "" || rating == "" || voters == null || rating == null  ) {
      html = '';
    }

    if ( keyword == 'usage' ){
      return '\
      <div class="usage question"> \
        ' + html + ' \
        <p class="lead">' + question + '</p> \
        <input type="radio" name="usageValue" value="yes" /> Yes \
        <input type="radio" name="usageValue" value="no" /> No \
      </div> \
      '; 
    }

    else if ( keyword == 'familiarity-slider' ) {
      return '\
      <div class="question"> \
        ' + html + ' \
        <p class="lead">' + question + '</p> \
        <div id="famSlider"></div> \
        <p>Your slider has a value of <span id="famValue"></span></p> \
      </div> \
      ';
    }

    else if ( keyword == 'opinion-star' ) {
      return '\
      <div class="question"> \
        ' + html + ' \
        <p class="lead">' + question + '</p> \
        Very Negative \
          <div class="star-rating"> \
            <input class="starClass0" id="starValue0" name="opinionValue" type="radio" value="0" checked > \
            <input class="starClass1" id="starValue1" name="opinionValue" type="radio" value="1" /> \
            <input class="starClass2" id="starValue2" name="opinionValue" type="radio" value="2" /> \
            <input class="starClass3" id="starValue3" name="opinionValue" type="radio" value="3" /> \
            <input class="starClass4" id="starValue4" name="opinionValue" type="radio" value="4" /> \
            <input class="starClass5" id="starValue5" name="opinionValue" type="radio" value="5" /> \
            <input class="starClass6" id="starValue6" name="opinionValue" type="radio" value="6" /> \
            <input class="starClass7" id="starValue7" name="opinionValue" type="radio" value="7" /> \
            <input class="starClass8" id="starValue8" name="opinionValue" type="radio" value="8" /> \
            <input class="starClass9" id="starValue9" name="opinionValue" type="radio" value="9" /> \
            <input class="starClass10" id="starValue10" name="opinionValue" type="radio" value="10" /> \
            \
            <label for="starValue0" class="star starClass0l" onclick=""></label> \
            <label for="starValue1" class="star starClass1l" onclick=""></label> \
            <label for="starValue2" class="star starClass2l" onclick=""></label> \
            <label for="starValue3" class="star starClass3l" onclick=""></label> \
            <label for="starValue4" class="star starClass4l" onclick=""></label> \
            <label for="starValue5" class="star starClass5l" onclick=""></label> \
            <label for="starValue6" class="star starClass6l" onclick=""></label> \
            <label for="starValue7" class="star starClass7l" onclick=""></label> \
            <label for="starValue8" class="star starClass8l" onclick=""></label> \
            <label for="starValue9" class="star starClass9l" onclick=""></label> \
            <label for="starValue10" class="star starClass10l last" onclick=""></label> \
            \
            <div class="rating"></div> \
            <div class="rating-bg"></div> \
          </div> <!-- star-rating --> \
        Very Positive \
      </div> \
      ';
    }
    else if ( keyword == 'like-rating' ){
      return '\
      <div class="like-rating question"> \
        ' + html + ' \
        <p class="lead">' + question + '</p> \
        <label class="like-rate" for="like"> \
          <input id="like" type="radio" name="likeValue" value="like"/> \
          <img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/48/Thumb-up-icon.png"> \
        </label> \
        <label class="like-rate" for="dislike"> \
          <input id="dislike" type="radio" name="likeValue" value="dislike"/> \
          <img src="http://icons.iconarchive.com/icons/custom-icon-design/pretty-office-8/48/Thumb-down-icon.png"> \
        </label> \
        <label class="like-rate" for="unsure"> \
          <input id="unsure" type="radio" name="likeValue" value="unsure"/> \
          Not Sure \
        </label> \
      </div> \
      '; 
    }
  }

  var htmlContainer = generateQuestionHTML( currentItem, currentQuestion );
  $( '#productDesc' ).html( htmlContainer );
  $( '#productImg' ).attr( "src", productItems[currentItem].imagePath) ;
  $( '#productCaption' ).html( productItems[currentItem].productDesc );

  // ----------------------------------------------------------------------------------------------------------------------- BUTTON HANDLING

  //Prevent the 'next' button from being clickable if they user hasn't given a valid input
  $(document).on( 'click', function(){

    //Check if a radio input has been selected. If so, let the user continue
    if( $('input:checked').length > 0 && $('input:checked')[0].value != DEFAULTVALUE ){ 
      $('#next').attr('class', 'btn btn-default'); 
    }

    // ** WILL HAVE TO WORK ON THIS ** The slider starts off at 1, so the default value is never reached. Will need to approach this one differently
    // Ideally, the user should be forced to slide to the value, even if they want to select the default value of 1.
    else if( $('#famSlider').length > 0 && $('#famSlider').slider('value') != DEFAULTVALUE ){
      $('#next').attr('class', 'btn btn-default'); 
    }

    // If all else fails, do not let them continue 
    else{ 
      $('#next').attr('class', 'btn btn-default disabled'); 
    }

  });

  $("#next, #prev").click(function(){

    // When the 'next' button is pressed and the user has not finished all the items
    // else {
    if( this.id=='next' && currentItem < productItems.length ) { 

      //To determine if the user has submitted a valid answer for the questions.
      //Switch cases are used to gather the results depending on the type of question. 
      
      try{
        switch( productItems[currentItem].questionTypes[currentQuestion] ){

          // Usage question
          case 'usage': 
            // Gets the value of the checked radio button and assign it to the corresponding index of questionValues
            productItems[currentItem].questionValues[currentQuestion] = document.querySelector( 'input[name="usageValue"]:checked' ).value;
            break;

          // Familiarity question
          case 'familiarity-slider':
            // Get the value from the slider object 
            productItems[currentItem].questionValues[currentQuestion] = $("#famSlider" ).slider('value');
            break;

          // Star-rating question
          case 'opinion-star':
            // Get the rating by grabbing the value from the selected input value with the name, opinionValue.
            productItems[currentItem].questionValues[currentQuestion] = document.querySelector( 'input[name="opinionValue"]:checked' ).value / 2;
            break;

          // Like-rating question
          case 'like-rating':
            // Get the rating by grabbing the value from the selected input value with the name, opinionValue.
            productItems[currentItem].questionValues[currentQuestion] = document.querySelector( 'input[name="likeValue"]:checked' ).value;
            break;

          // For any question types that are not handled above
          default:
            console.log( "This question type is not recognized!" );
            break;

        } // End of switch statement
      } // End of try statement
      catch(err){
          console.log( "INVALID QUESTION." );
      }

      // Only proceed to the next questionType/item if the answer is a valid value. (Basically, not 0)
      if( productItems[currentItem].questionValues[currentQuestion] != DEFAULTVALUE ){

        // Increment the currentQuestion if there's still more questions for that particular item
        if( currentQuestion < productItems[currentItem].questionTypes.length - 1 ){ currentQuestion++; }

        // Once you reached the end of the question types for that particular item and you're not
        // at the last item, reset the current question as the last question of the previous item.
        else if( currentItem < productItems.length - 1 ){  
          currentItem++;
          currentQuestion = 0; 
          // Image path is change only if the current image changes
          $( '#productImg' ).attr( "src", productItems[currentItem].imagePath) ;
        }
        // Once you reached the end of the question types for that particular item and you're at the last item, ...
        else if( currentQuestion == productItems[currentItem].questionTypes.length - 1 
                  && currentItem == productItems.length - 1 ){  
            // Action to do last question script
          var arr = checkAllAnswered( DEFAULTVALUE );
          //console.log( arr );

          if ( arr[0] == productItems.length && arr[1] == productItems[ productItems.length - 1 ].questionValues.length ){
            
            //POST can only read in the: "key = value" format. 
            var jsonItems = "productAnswers=" + JSON.stringify( productItems );
            // console.log( productItems );
            
            $.ajax({
              type: 'POST',
              url: 'custom/php/addRatingAnswers.php',
              data: jsonItems,

              success : function( data ){
                console.log( data );
                window.location.replace("confirmation.html");
              },
              error : function(){
                console.log( "NAY" );
              }
            });
            
          }
        }
      } // End of if statement to check for valid answer
    } // End of if statement for the 'next' button



    // When the 'prev' button is pressed and the user has not finished all the items
    else if( this.id=='prev') { 

      // Decrement the currentQuestion if there's still more questions for that particular item
      if( currentQuestion > 0 ){ currentQuestion--; }

      // Once you reached the end of the question types for that particular item and you're not
      // at the last item, reset the current question as the last question of the previous item.
      else if( currentQuestion == 0 && currentItem > 0 ){  
        if( currentItem > 0 ){ 
          currentItem--; 
          currentQuestion = productItems[currentItem].questionTypes.length - 1;
          // Image path is change only if the current image changes
          $( '#productImg' ).attr( "src", productItems[currentItem].imagePath) ;
        }

        // Once you reached the end of the question types for that particular item and you're at the last item, ...
        else if( currentQuestion == productItems[currentItem].questionTypes.length - 1 
                  && currentItem == productItems.length - 1 ){  

          // Action to do last question script
          var arr = checkAllAnswered( DEFAULTVALUE );
          //console.log( arr );

          if ( arr[0] == productItems.length && arr[1] == productItems[ productItems.length - 1 ].questionValues.length ){
            
            //POST can only read in the: "key = value" format. 
            var jsonItems = "productAnswers=" + JSON.stringify( productItems );
            console.log( jsonItems );
            
            $.ajax({
              type: 'POST',
              url: 'custom/php/addAnswers.php',
              data: jsonItems,

              success : function( data ){
                console.log( data );
              },
              error : function(){
                console.log( "NAY" );
              }
            });
       
          }
          currentQuestion = productItems[currentItem].questionTypes.length - 1;
        }
      } 
    } // End of if statement for 'prev' button



    // Changing the productDesc container based on currentItem's question type
    var htmlContainer = generateQuestionHTML( currentItem, currentQuestion );
    $( '#productDesc' ).html( htmlContainer );

    if( currentQuestion == 0 && currentItem == 0 ) { $( '#productImg' ).attr("src", productItems[currentItem].imagePath) ; }

    // console.log( 'Q' + currentQuestion );
    // console.log( 'I' + currentItem);

    $("#famSlider").slider({
      value: 5,
      min: 1,
      max: 10,
      step: 1,
      slide: function( event, ui ) {
        $( '#famValue' ).html( ui.value );
      }
    });

    if( currentQuestion != productItems[currentItem].questionTypes.length - 1 
        && currentItem != productItems.length - 1 ){  

      // Change the newly formatted productDesc container to select the attributes based on what's currently stored in the object
      var currentValue = productItems[currentItem].questionValues[currentQuestion];

      switch( productItems[currentItem].questionTypes[currentQuestion] ){

        // Usage question
        case 'usage': 
          if( currentValue == 'yes' ){ document.getElementsByName("usageValue")[0].checked = true; }
          else if( currentValue == 'no' ){ document.getElementsByName("usageValue")[1].checked = true; }
          break;

        // Familiarity question
        case 'familiarity-slider':
          $( '#famSlider' ).slider( "value", currentValue );
          $( '#famValue' ).html(  $("#famSlider" ).slider('value') );
          break;

        // Star-rating question
        case 'opinion-star':
          document.getElementsByName("opinionValue")[currentValue * 2].checked = true;
          break;

        // Like/Dislike question
        case 'like-rating': 
          if( currentValue == 'like' ){ document.getElementsByName("likeValue")[0].checked = true; }
          else if( currentValue == 'dislike' ){ document.getElementsByName("likeValue")[1].checked = true; }
          else if( currentValue == 'unsure' ){ document.getElementsByName("likeValue")[2].checked = true; }
          break;

        // For any question types that are not handled above
        default:
          console.log( "This question type is not recognized!" );
          break;

      }
    } // end of if statement while still in survey
  });

}
