 <?php
	error_reporting(0);
	session_start();
	include('custom/php/db.php');

	define ("MAX_SIZE","9000"); 
	function getExtension($str)
	{
	         $i = strrpos($str,".");
	         if (!$i) { return ""; }
	         $l = strlen($str) - $i;
	         $fileExtension = substr($str,$i+1,$l);
	         return $fileExtension;
	}

	function generateForm( $directory, $name ){ 

		//MUST define $bd as a GLOBAL. Otherwise, mysqli connection cannot be established in any of the queries
		global $bd;

		//Get the current img count
		$stmt = mysqli_query($bd, "SELECT COUNT(*) FROM product_images");
		$i = mysqli_fetch_assoc( $stmt )["COUNT(*)"];

		//Get the next upload_id
		$stmt = mysqli_query($bd, "SHOW TABLE STATUS LIKE 'product_images'");
		$imageID = mysqli_fetch_assoc( $stmt )["Auto_increment"];

		$htmlContainer = '<div class="item row"> 
			<img src="'.$directory.$name.'" alt="" id="productImg'.$i.'" class="productImg col-xs-12 col-md-4">
			<div id="productDesc" class="col-xs-12 col-md-8">
		
			<div class="form-group">
				<label for="imageName'.$i.'" class="col-sm-3 control-label">Image Name: </label>
				<div class="col-sm-9">
					<input type="hidden" id="imageNum'.$i.'" name="uploadID" value="'.$imageID.'">
					<input type="text" class="form-control" id="imageName'.$i.'" name="newName" placeholder="Enter Image Name">
				</div>
			</div>
			
			<div class="form-group">
				<label for="imageName'.$i.'" class="col-sm-3 control-label">Image Caption: </label>
				<div class="col-sm-9">
					<textarea class="form-control" id="imageCaption'.$i.'" name="imageDesc" rows="3" placeholder="Enter Image Caption"></textarea>
				</div>
			</div>
			
			<div class="form-group">
				<label  class="col-sm-3 control-label"></label>
				<div class="col-sm-9">
					<div class="col-sm-6">
						<button id="update" type="submit" name="'.$i.'"class="btn btn-primary btn-block">Update</button>
					</div>
					<div class="col-sm-6">
						<button id="delete" class="btn btn-danger btn-block">Delete</button>
					</div>
				</div>
			</div>
			
			<div id="result'.$i.'"></div>

			</div>
			</div>';

		return $htmlContainer;
	}

	$allowedImageFormats = array("jpg", "png", "gif", "bmp","jpeg");

	if(isset($_POST) and $_SERVER['REQUEST_METHOD'] == "POST") {
		
	    $imageDirectory = "images/"; 
	    foreach ($_FILES['images']['name'] as $name => $value) {
		
	        $fileName = stripslashes($_FILES['images']['name'][$name]);
	        $size = filesize($_FILES['images']['tmp_name'][$name]);

	        	// Turning the extension as a lowercase
	          	$fileExtension = getExtension( $fileName );
	          	$fileExtension = strtolower( $fileExtension );
	     	
				if( in_array( $fileExtension, $allowedImageFormats ) ) {

					if ($size < (MAX_SIZE*1024)) {
						$imagePath = time().$fileName;
						$imageFilename = time().$fileName;

						echo generateForm( $imageDirectory.$imageFilename );
						$newFileName = $imageDirectory.$imageFilename;
						
						if ( move_uploaded_file( $_FILES['images']['tmp_name'][$name], $newFileName ) ) {
						   $time=time();
						   mysqli_query( $bd, "	INSERT INTO product_images( survey_id, image_name, image_path, created ) 
						   						VALUES ( 1, '$imageFilename', '$imageFilename', '$time' )");

						   	$uploadQuery = mysqli_query( $bd, "SELECT upload_id FROM product_images ORDER BY upload_id DESC LIMIT 1");

						   	$upload_id = mysqli_fetch_assoc( $uploadQuery )["upload_id"];

							$queryResult = mysqli_query( $bd, "SELECT question_id FROM questions WHERE survey_id=1 AND question_type='rating'");

						   	while( $row = mysqli_fetch_assoc($queryResult) ){
								$question_id = $row['question_id'];
								$query = "INSERT INTO ratings(question_id, upload_id, survey_id) VALUES ( '$question_id', '$upload_id', 1 )";
								mysqli_query( $bd, $query );
							}
						   
						}

						else { echo '<span class="imgList">You have exceeded the size limit! so moving unsuccessful! </span>'; }

					}

					else { echo '<span class="imgList">You have exceeded the size limit!</span>'; }

				}

				else { echo '<span class="imgList">Unknown extension!</span>'; }
	           
	    }
	}
?>