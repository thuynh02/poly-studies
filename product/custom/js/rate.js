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
  //   questionTypes: [ 'familiarity-slider', 'star-rating', 'usage' ]
  //   questionValues: [ 0, 0, 0 ]
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
  // **NOTE** Image names for the question have yet to be implemented in the database/image-upload.php!
  // **NOTE** Questions will display the image name w/ extensions and all. 
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
          productArr.push( createProductItem( data[i].upload_id, 
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


  function getRatingData(){
    var data = $.ajax({
      type: 'POST',
      url: 'custom/php/getRatings.php',
      data: data,
      dataType: 'json',
      async: false,
      success : function( data ){
        console.log( data );
        for (var i = 0; i < productItems.length; i++) {
          for (var j = 0; j < data.length; j++) {
            if( productItems[i].imageID === data[j].upload_id ) {
              var voterRates = {
                questionID: data[j].question_id,
                voters: data[j].voters,
                rating: data[j].rating
              };
              productItems[i]['voterRating'].push( voterRates );
            }
          };
          
        };

      }
    });
  }
  getQuestionData();

  // productItems serve as the array of Objects for each productItem returned from the 'createProductItem' function.
  var productItems = getImageData();

  getRatingData();

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

  function generateQuestionHTML( item, question ) {
    console.log( "I: " + item );
    console.log( "Q: " + question );

    var name = productItems[item].productName;
    var keyword = productItems[item].questionTypes[question];
    var voters = productItems[item]['voterRating'][question].voters;
    var rating = productItems[item]['voterRating'][question].rating;

    var html = '<p class="lead">' + voters + ' people voted ' + rating + '.</p>';
    if( voters == "" || rating == "" || voters == null || rating == null  ) {
      html = '';
    }


    if ( keyword == 'usage' ){
      return '\
      <div class="usage question"> \
        ' + html + ' \
        <p class="lead">Have you ever had a ' + name + '?</p> \
        <input type="radio" name="usageValue" value="yes" /> Yes \
        <input type="radio" name="usageValue" value="no" /> No \
      </div> \
      '; 
    }

    else if ( keyword == 'familiarity-slider' ) {
      return '\
      <div class="question"> \
        ' + html + ' \
        <p class="lead">On a scale of 1 - 10, how familiar are you with ' + name + '?</p> \
        <div id="famSlider"></div> \
        <p>Your slider has a value of <span id="famValue"></span></p> \
      </div> \
      ';
    }

    else if ( keyword == 'opinion-star' ) {
      return '\
      <div class="question"> \
        ' + html + ' \
        <p class="lead">On a scale of 1 (very negative) to 5 (very positive), what is your opinion of ' + name + '?</p> \
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
  }

  var htmlContainer = generateQuestionHTML( currentItem, currentQuestion );
  $( '#productDesc' ).html( htmlContainer );
  $( '#productImg' ).attr( "src", productItems[currentItem].imagePath) ;


  // ----------------------------------------------------------------------------------------------------------------------- BUTTON HANDLING


  $("#next, #prev").click(function(){

    // When the 'next' button is pressed and the user has not finished all the items
    if( this.id=='next' && currentItem < productItems.length ) { 

      //To determine if the user has submitted a valid answer for the questions.
      //Switch cases are used to gather the results depending on the type of question. 
      
      try{
        switch( currentQuestion ){

          // Usage question
          case 0: 
            // Gets the value of the checked radio button and assign it to the corresponding index of questionValues
            productItems[currentItem].questionValues[currentQuestion] = document.querySelector( 'input[name="usageValue"]:checked' ).value;
            
            break;

          // Familiarity question
          case 1:
            // Get the value from the slider object 
            productItems[currentItem].questionValues[currentQuestion] = $("#famSlider" ).slider('value');
            break;

          // Star-rating question
          case 2:
            // Get the rating by grabbing the value from the selected input value with the name, opinionValue.
            productItems[currentItem].questionValues[currentQuestion] = document.querySelector( 'input[name="opinionValue"]:checked' ).value / 2;
            break;

          // For any question types that are not handled above
          default:
            console.log( "This question type is not recognized!" );
            break;

        }
      } 
      catch(err){
          console.log( "INVALID QUESTION." );
      }

      // Only proceed to the next questionType/item if the answer is a valid value. (Basically, not 0)
      if( productItems[currentItem].questionValues[currentQuestion] != DEFAULTVALUE ){

        // Increment the currentQuestion if there's still more questions for that particular item
        if( currentQuestion < productItems[currentItem].questionTypes.length -1){ currentQuestion++; }

        // Once you reached the end of the question types for that particular item and you're not
        // at the last item, reset the current question and go to the next item.
        else if( currentQuestion == productItems[currentItem].questionTypes.length -1
                  && currentItem < productItems.length - 1 ){  
            currentQuestion = 0;
            currentItem++;

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
            var jsonItems = JSON.stringify(productItems);
            console.log( jsonItems );
            
            $.ajax({
              type: 'POST',
              url: 'custom/php/addAnswers.php',
              data: jsonItems,
              dataType: 'json',
              success : function( data ){
                console.log( "YAY " + data );
              },
              error : function(){
                console.log( "NAY" );
              }
            });
            
          }
        }
      }
    }

    // When the 'prev' button is pressed and the user has not finished all the items
    if( this.id=='prev') { 

      // Decrement the currentQuestion if there's still more questions for that particular item
      if( currentQuestion > 0 ){ currentQuestion--; }

      // Once you reached the end of the question types for that particular item and you're not
      // at the last item, reset the current question as the last question of the previous item.
      else if( currentQuestion == 0 && currentItem > 0 ){  
        if( currentItem > 0 ){ 
          currentItem--; 

          // Image path is change only if the current image changes
          $( '#productImg' ).attr( "src", productItems[currentItem].imagePath) ;
        }
        currentQuestion = productItems[currentItem].questionTypes.length - 1;
      }
    }

    // Changing the productDesc container based on currentItem's question type
   
    var htmlContainer = generateQuestionHTML( currentItem, currentQuestion );
    $( '#productDesc' ).html( htmlContainer );

    // console.log( 'Q' + currentQuestion );
    // console.log( 'I' + currentItem);

    $("#famSlider").slider( {
      value: 5,
      min: 1,
      max: 10,
      step: 1,
      slide: function( event, ui ) {
        $( '#famValue' ).html( ui.value );
      }
    } );

    if( currentQuestion != productItems[currentItem].questionTypes.length - 1 
        && currentItem != productItems.length - 1 ){  

      // Change the newly formatted productDesc container to select the attributes based on what's currently stored in the object
      var currentValue = productItems[currentItem].questionValues[currentQuestion];

      switch( currentQuestion ){

        // Usage question
        case 0: 
          if( currentValue == 'yes' ){ document.getElementsByName("usageValue")[0].checked = true; }
          else if( currentValue == 'no' ){ document.getElementsByName("usageValue")[1].checked = true; }
          break;

        // Familiarity question
        case 1:
          $( '#famSlider' ).slider( "value", currentValue );
          $( '#famValue' ).html(  $("#famSlider" ).slider('value') );
          break;

        // Star-rating question
        case 2:
          document.getElementsByName("opinionValue")[currentValue].checked = true;
          break;

        // For any question types that are not handled above
        default:
          console.log( "This question type is not recognized!" );
          break;

      }
    }

  });

}
