 <?php
	error_reporting(0);
	session_start();
	include('db.php');

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
		$i = mysqli_query($bd, 'SELECT COUNT(*) FROM user_uploads');

		$htmlContainer = '<div class="item row"> 
			<img src="'.$directory.$name.'" alt="" id="productImg'.$i.'" class="productImg col-xs-12 col-md-4">
			<div id="productDesc" class="col-xs-12 col-md-8">
		
			<form class="form-horizontal" role="form" type="POST">
		
			<div class="form-group">
				<label for="imageName'.$i.'" class="col-sm-3 control-label">Image Name: </label>
				<div class="col-sm-9">
					<input type="text" class="form-control" id="imageName'.$i.'" placeholder="Enter Image Name">
				</div>
			</div>
			
			<div class="form-group">
				<label for="imageName'.$i.'" class="col-sm-3 control-label">Image Caption: </label>
				<div class="col-sm-9">
					<textarea class="form-control" id="imageCaption'.$i.'" rows="3" placeholder="Enter Image Caption"></textarea>
				</div>
			</div>
			
			<div class="form-group">
				<label  class="col-sm-3 control-label"></label>
				<div class="col-sm-9">
					<div class="col-sm-6">
						<button type="submit" class="btn btn-primary btn-block">Update</button>
					</div>
					<div class="col-sm-6">
						<button id="delete" class="btn btn-danger btn-block">Delete</button>
					</div>
				</div>
			</div>
			
			</form>
			
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
<<<<<<< HEAD
						$imagePath = time().$fileName;

						echo generateForm( $imageDirectory.$imagePath );
						$newFileName = $imageDirectory.$imagePath;
=======
						$imageFilename = time().$fileName;

						echo generateForm( $imageDirectory.$imageFilename );
						$newFileName = $imageDirectory.$imageFilename;
>>>>>>> development

						if ( move_uploaded_file( $_FILES['images']['tmp_name'][$name], $newFileName ) ) {

						   $time=time();
<<<<<<< HEAD
						   mysqli_query( $bd, "INSERT INTO user_uploads( image_name, image_description, image_path, created ) VALUES ( '', '', '$imagePath', '$time' )");
=======
						   mysqli_query( $bd, "	INSERT INTO user_uploads( image_name, image_filename, created ) 
						   						VALUES ( '$imageFilename', '$imageFilename', '$time' )");
>>>>>>> development
						
						}

						else { echo '<span class="imgList">You have exceeded the size limit! so moving unsuccessful! </span>'; }

					}

					else { echo '<span class="imgList">You have exceeded the size limit!</span>'; }

				}

				else { echo '<span class="imgList">Unknown extension!</span>'; }
	           
	    }
	}

	if(isset($_POST["newName"])) {
		$imgNameValue = $_POST["newName"];
		$currentImg = $_POST["uploadID"];
		if( $stmt = mysqli_prepare( $bd, "UPDATE user_uploads SET image_name=? WHERE upload_id=?" ) ) {
			mysqli_bind_param( $stmt, "si", $imgNameValue, $currentImg );
			mysqli_stmt_execute( $stmt );
			mysqli_stmt_close($stmt);
		}
	}
?>