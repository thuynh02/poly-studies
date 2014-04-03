$(document).ready(function() { 

	// $('#images').off('click').on('change', function()			{ 
	//            //$("#preview").html('');

	// 	$("#imageForm").ajaxForm({target: '#productItems', 
	// 	    beforeSubmit:function(){ 

	// 		console.log('ttest');
	// 		$("#imageloadstatus").show();
	// 		 $("#uploadButton").hide();
	// 		 }, 
	// 		success:function(){ 
	// 	    console.log('test');
	// 		 $("#imageloadstatus").hide();
	// 		 $("#uploadButton").show();
	// 		}, 
	// 		error:function(){ 
	// 		console.log('xtest');
	// 		 $("#imageloadstatus").hide();
	// 		$("#uploadButton").show();
	// 		} }).submit();


	// });

	$("#submitForm").click(function(){
	   
	    var data = $("#imageForm").serializeArray();

	    console.log( data);
	    
		// $.ajax({
		// 	type: 'POST',
		// 	url: "image-upload.php",
		// 	data: data,

		// 	success: function(info){
		// 		//If the request goes through successfully and confirmation is received from php file, 
		// 		//inform the user of the success!
				

		// 		console.log(info);

		// 		// $('#productItems').append(info);
		// 		// window.location.reload();
		// 	},

		// 	//Something really went wrong if the ajax call failed! Tell the user D:
		// 	fail: function(){
		// 		$("#result" + currentID).html("Ajax call failed to send request! Look into it ASAP!");
		// 	}

		// });
	});

	// $("#imageForm").submit( function(){
	// 	return false;
	// });
}); 