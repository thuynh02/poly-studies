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

   	$("#imageForm").on('submit',(function(e){
		e.preventDefault();
		$.ajax({
		url: "image-upload.php",
		type: "POST",
		data:  new FormData(this),
		contentType: false,
		cache: false,
		processData:false,
		success: function(data){
			//$("#productItems").html(data);
			window.location.reload();
		},
		error: function(){} 	        
		});
	}));

	// $("#imageForm").submit( function(){
	// 	return false;
	// });
}); 