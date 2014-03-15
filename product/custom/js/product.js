window.onload=function(){

  // ----------------------------------------------------------------------------------------------------------------------- GLOBAL VARIABLES

  var currentQuestion = 0,
      // amountQuestions = 0,
      currentItem = 0,
      itemQuestionSize = [];

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

  function createProductItem( name, path, qTypes ) {
    if ( !$.isArray(qTypes) ) { qTypes = [ qTypes ]; }

    var values = new Array( qTypes.length );
    for (var i = 0; i < qTypes.length; i++) { values[i] = 0; }

    var productItem = {
      productName: name,
      imagePath: path,
      questionTypes: qTypes,
      questionValues: values
    };

    return productItem;
  }

  // productItems serve as the array of Objects for each productItem returned from the 'createProductItem' function.
  var productItems = [];

  // questionTypes serves an array of Strings to serve as keywords for each type of rating to be asked.
  // In the sample survey provided, there is a slider for familiarity, opinion for stars, and usage for yes and no.
  var questionTypes = [ 'usage', 'familiarity-slider', 'opinion-star' ];

  // Initialize and push into 'productItems' the Objects created from the function 'createProductItem.'
  // Here five objects are created with associated index in array 'productItems': Jethro (Index 0), Merlin (Index 1), 
  // Skinny Luke (Index 2), Colin Morgan (Index 3), and Ariel (Index 4)

  productItems.push( createProductItem( "Jethro", "images/jethro.jpg", questionTypes ) );
  productItems.push( createProductItem( "Merlin", "images/merlin.jpg", questionTypes ) )
  productItems.push( createProductItem( "Skinny Luke", "images/mojo.jpg", questionTypes ) );
  productItems.push( createProductItem( "Colin Morgan", "images/normal.jpg", questionTypes ) );
  productItems.push( createProductItem( "Ariel", "images/tempest.png", questionTypes ) );

  // for (var i = 0; i < productItems.length; i++) {

  //   // amountQuestions += productItems[i]['questionTypes'].length;
  //   itemQuestionSize.push( productItems[i]['questionTypes'].length );

  // };

  // ----------------------------------------------------------------------------------------------------------------------- HTML HANDLING

  function generateQuestionHTML( name, keyword ) {
    if ( keyword == 'usage' ){
      return '\
      <div class="usage question"> \
        <p class="lead">Have you ever had a ' + name + '?</p> \
        <input type="radio" name="usageValue" value="yes" /> Yes \
        <input type="radio" name="usageValue" value="no" /> No \
      </div> \
      '; 
    }

    else if ( keyword == 'familiarity-slider' ) {
      return '\
      <div class="question"> \
        <p class="lead">On a scale of 1 - 10, how familiar are you with ' + name + '?</p> \
        <div id="famSlider"></div> \
        <p>Your slider has a value of <span id="sliderValue"></span></p> \
      </div> \
      ';
    }

    else if ( keyword == 'opinion-star' ) {
      return '\
      <div class="rating question"> \
        <p class="lead">On a scale of 1 (very negative) to 5 (very positive), what is your opinion of ' + name + '?</p> \
        Very Negative \
        <input type="radio" name="opinionValue" value="0" checked /><span id="hide"></span> \
        <input type="radio" name="opinionValue" value="1" /><span></span> \
        <input type="radio" name="opinionValue" value="2" /><span></span> \
        <input type="radio" name="opinionValue" value="3" /><span></span> \
        <input type="radio" name="opinionValue" value="4" /><span></span> \
        <input type="radio" name="opinionValue" value="5" /><span></span> \
        Very Positive \
      </div> \
      ';
    }
  }

  var htmlContainer = generateQuestionHTML( productItems[currentItem]['productName'], productItems[currentItem]['questionTypes'][currentQuestion] );
  $( '#productDesc' ).html( htmlContainer );
  $( '#productImg' ).attr( "src", productItems[currentItem]['imagePath']) ;


  // ----------------------------------------------------------------------------------------------------------------------- BUTTON HANDLING


  $("#next, #prev").click(function(){

    console.log(productItems);

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
            productItems[currentItem].questionValues[currentQuestion] = document.querySelector( 'input[name="opinionValue"]:checked' ).value;
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
      if( productItems[currentItem].questionValues[currentQuestion] != 0 ){

        if ( $('#next').hasClass('disabled') ) { $('#next').removeClass('disabled'); }

        // Increment the currentQuestion if there's still more questions for that particular item
        if( currentQuestion < productItems[currentItem]['questionTypes'].length -1){ currentQuestion++; }

        // Once you reached the end of the question types for that particular item and you're not
        // at the last item, reset the current question and go to the next item.
        else if( currentQuestion == productItems[currentItem]['questionTypes'].length -1
                  && currentItem < productItems.length - 1 ){  
            currentQuestion = 0;
            currentItem++;

            // Image path is change only if the current image changes
            $( '#productImg' ).attr( "src", productItems[currentItem]['imagePath']) ;
        }
        // Once you reached the end of the question types for that particular item and you're at the last item, ...
        else if( currentQuestion == productItems[currentItem]['questionTypes'].length 
                  && currentItem == productItems.length - 1 ){  
            // Action to do last question script
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
          $( '#productImg' ).attr( "src", productItems[currentItem]['imagePath']) ;
        }
        currentQuestion = productItems[currentItem]['questionTypes'].length - 1;
      }
    }

    // Changing the productDesc container based on currentItem's question type
    htmlContainer = generateQuestionHTML( productItems[currentItem]['productName'], productItems[currentItem]['questionTypes'][currentQuestion] );
    $( '#productDesc' ).html( htmlContainer );

    console.log( 'Q' + currentQuestion );
    console.log( 'I' + currentItem);

    $("#famSlider").slider( {
      value: 0,
      min: 0,
      max: 10,
      step: 1,
      slide: function( event, ui ) {
        $( '#sliderValue' ).html( ui.value );
      }
    } );

    $( '#sliderValue' ).html(  $("#famSlider" ).slider('value') );

    console.log( productItems[currentItem].questionValues );

    















  });








  // // The following for-loop, or at least a portion of it, should probably be in a function. For now, it is not.

  // // Here, for each of the product Objects in the array 'productItems,' a variable 'htmlContainer' is created to store
  // // the generated html for each of the questions, depending if the Object's 'questionType' array contains a particular
  // // keyword. For instance, if the Object's 'questionType' array contains the element 'usage,' it will append the html
  // // into the variable 'htmlContainer.' After all the html is appended for each questionType, based on keyword (such as 
  // // 'usage'), the 'htmlContainer's 'productItem' div is closed. 

  // // If additional html appenders should be added, you should note that the default value 0 is forbidden because it
  // // is the identifier for an unanswered question.


  //   // If the product Object's 'questionTypes' array contain the keyword 'usage' as one of its elements, add to the
  //   // variable 'htmlContainer' this html. When sent, the identifier of the answer for this product's 'usage' question 
  //   // is 'usageValue0' if the product Object was the first element of the 'productItems' array and 'usageValue3' if 
  //   // the product Object was the fourth element of the 'productItems' array. It is done based on the index of the 
  //   // Object in the array 'productItems.' The code to take in interaction and assign the value to the identifier has 
  //   // not been written.
  //   if ( $.inArray( 'usage' , productItems[i][questionTypes] ) ){
  //   }
    
  //   // If the product Object's 'questionTypes' array contain the keyword 'familiarity-slider' as one of its elements, 
  //   // add to the variable 'htmlContainer' this html. When sent, the identifier of the answer for this product's 
  //   // 'familiarity-slider' question is 'famSlideValue0' if the product Object was the first element of the 'productItems' 
  //   // array and 'famSlideValue3' if the product Object was the fourth element of the 'productItems' array. It is done 
  //   // based on the index of the Object in the array 'productItems.'

  //   if ( $.inArray( 'familiarity-slider' , productItems[i][questionTypes] ) ){
  //   }
    
  //   // If the product Object's 'questionTypes' array contain the keyword 'opinon-star' as one of its elements, 
  //   // add to the variable 'htmlContainer' this html. When sent, the identifier of the answer for this product's 
  //   // 'opinon-star' question is 'opinionValue0' if the product Object was the first element of the 'productItems' 
  //   // array and 'opinionValue3' if the product Object was the fourth element of the 'productItems' array. It is done 
  //   // based on the index of the Object in the array 'productItems.' The code to take in interaction and assign the 
  //   // value to the identifier has not been written.
  //   if ( $.inArray( 'opinion-star' , productItems[i][questionTypes] ) ){
  //   }

  //   // After all the html is appended for each questionType, based on keyword (such as 'usage'), the 'htmlContainer's 
  //   // 'productItem' div is closed. The first one is to end the column sizing, and the second is to end 'productItem.'

  //   // In the html page that includes this javascript file, if they have an identifying container with the identifier 
  //   // '#productContainer,' what was in the variable 'htmlContainer' will append, or add to the end, of the container 
  //   // '#productContainer.'


  //   // This following portion is from the jQuery UI Javascript file. The html page that includes this javascript file
  //   // must also include the jQuery UI javascript file for this to work. If the product has the element 
  //   // 'familiarity-slider' in its 'questionTypes' array, then value implementation and assignment for the slider 
  //   // with the 'famSlider0' identifier is here if the product Object was the first element of the 'productItems,' 
  //   // again based on the index of the Object in the array 'productItems.'
  //   // if ( $.inArray( 'familiarity-slider' , productItems[i][questionTypes] ) ){
  //   //   var valName = '#sliderValue' + i;

  //   //   $("#famSlider" + i ).slider( {
  //   //     value: 0,
  //   //     min: 0,
  //   //     max: 10,
  //   //     step: 1,
  //   //     slide: function( event, ui ) {
  //   //       $( valName ).html( ui.value );
  //   //     }
  //   //   } );

  //   // $( valName ).html(  $("#famSlider" + i ).slider('value') );

  //   // }

  // }

  // // Here are the controls of how the page is displayed. Remember that, in the html page that this javascript file is
  // // linked to, there should be a container with the identifier '#productContainer.' This '#productContainer' has a
  // // multitude of div elements from the appendings of each product Object in the array 'productItems,' each of which
  // // contains more div containers within with the class '.question.' The function below assumes that all of the 
  // // products have the same number of questions, so this will have to be fixed later on to allow more flexibility. 
  // // Currently, it is assuming that there is three questions per product.

  // // variable 'amountDiv' - Overall number of the dividers inside the container identifier '#productContainer'
  // // variable 'amountQuestions' - Overall number of the dividers with the class '.question' inside the container 
  // //      identifier '#productContainer'
  // // variable 'currentQuestion' - Counter variable for the current question the viewer is on, initialized to the first 
  // //      question of the first product Object element in 'productItems'
  
  // var $divs = $( "#productContainer > .productItem" ),
  //   $questions = $( "#productContainer > .productItem > div > .question" ),
  //   amountDiv = $divs.length,                           
  //   amountQuestions = $questions.length,                      
  //   currentQuestion = 0,                                      
  //   questionsPerDiv = amountQuestions / amountDiv,
  //   currentDiv = currentQuestion / questionsPerDiv
  //   ;

  // // This hides all the div containers within the '#productContainer', and then only shows the one with the value from
  // // the variable 'currentDiv.' If the variable 'currentDiv' has the value 2, then it shows the second div container 
  // // within the '#productContainer.'
  // $divs.hide();
  // $divs.eq( currentDiv ).show();

  // // This hides all the div containers with the class '.question' inside each of the div containers within the 
  // // '#productContainer', and then only shows the one with the value from the variable 'currentQuestion.' if the variable 
  // // 'currentQuestion' has the value 2, then it shows the second '.question' container of the '#productContainer'
  // $questions.hide();
  // $questions.eq( currentQuestion ).show();
  
  // // If the identifiers for '#next' or '#prev' are clicked, then the finction here activates.
  // $("#next, #prev").click(function(){

  //   // Once the user reaches the end of all the questions after clicking the identier '#next,' then the user has seen 
  //   // all of the question. There should be a check through all the elements of the array 'productItems' and their 
  //   // 'questionValues' array to make sure that none of the values of the array are zero, which is the default value 
  //   // should none of the questions be answered. This is not yet tested or implemented because action functions have
  //   // not been written to read in values after the data has been clicked to change the elements of the 'questionValues' 
  //   // array of each product Object.

  //   if( currentQuestion == amountQuestions) {
  //     // Submit Action Goes Here
  //     // First, gather all the values and put them into the objects' 'questionValue' arrays.
  //     // Then, check every value to make sure the entire form is filled.
  //     // Then perform the submit if all values were conducted
  //   }

  //   // Again, this hides all the div containers within the '#productContainer'.
  //   $divs.stop();
  //   $divs.hide();

  //   // This hides all the div containers with the class '.question' inside each of the div containers within the 
  //   // '#productContainer.'
  //   $questions.hide();

  //   // This updates the value of the 'currentQuestion' variable based on which identifier is clicked. Within the contraints
  //   // is also the limit as to the lowest and highest value that currentQuestion could be, that is 0 to symbolize the first
  //   // question and the value of 'amountQuestions' to demonstrate the total number of questions, which is the last question.
  //   if( this.id == 'next' && currentQuestion < amountQuestions - 1) { 
  //     currentQuestion++;
  //   }
  //   else if ( this.id=='prev' && currentQuestion > 0 ) {
  //     currentQuestion--;
  //   }

  //   // The value of the variable 'currentDiv' is updated based on the new value of 'currentQuestion.' If unsure, please do 
  //   // the math here. If the current question was the fourth overall question and each product has three questions, then the
  //   // current divider shown should be the second one, with the displaying question be the first question of the second product.
  //   currentDiv = parseInt( currentQuestion / questionsPerDiv );


  //   // This only shows the one with the value from the variable 'currentDiv.' If the variable 'currentDiv' has the value 2, 
  //   // then it shows the second div container within the '#productContainer.'
  //   $divs.eq( currentDiv ).show();

  //   /// This only shows the one with the value from the variable 'currentQuestion.' if the variable 'currentQuestion' has the 
  //   // value 2, then it shows the second '.question' container of the '#productContainer'
  //   $questions.eq( currentQuestion ).show();

  // });

}