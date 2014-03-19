window.onload=function(){

  // ----------------------------------------------------------------------------------------------------------------------- GLOBAL VARIABLES

  var currentQuestion = 0,
      // amountQuestions = 0,
      currentItem = 0,
      itemQuestionSize = [];

  var DEFAULTVALUE = 0;

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
    for (var i = 0; i < qTypes.length; i++) { values[i] = DEFAULTVALUE; }

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

  productItems.push( createProductItem( "iPad Mini", "images/ipad-mini.jpg", questionTypes ) );
  productItems.push( createProductItem( "Coke", "images/coke.jpg", questionTypes ) );
  productItems.push( createProductItem( "Twitter", "images/twitter.jpg", questionTypes ) );

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
        <p>Your slider has a value of <span id="famValue"></span></p> \
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

  var htmlContainer = generateQuestionHTML( productItems[currentItem].productName, productItems[currentItem].questionTypes[currentQuestion] );
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
    htmlContainer = generateQuestionHTML( productItems[currentItem].productName, productItems[currentItem].questionTypes[currentQuestion] );
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

  });

}