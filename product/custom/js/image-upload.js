$(document).ready(function() { 
	
    $('#images').off('click').on('change', function()			{ 
	           //$("#preview").html('');
	    
		$("#imageForm").ajaxForm({target: '#productItems', 
		    beforeSubmit:function(){ 
			
			console.log('ttest');
			$("#imageloadstatus").show();
			 $("#uploadButton").hide();
			 }, 
			success:function(){ 
		    console.log('test');
			 $("#imageloadstatus").hide();
			 $("#uploadButton").show();
			}, 
			error:function(){ 
			console.log('xtest');
			 $("#imageloadstatus").hide();
			$("#uploadButton").show();
			} }).submit();
			

	});
}); 