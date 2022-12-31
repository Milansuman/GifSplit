<?php
$frames = array();

if(isset($_FILES["userfile"])){
    $uploadFile = "uploads/" . basename($_FILES["userfile"]["name"]);
    if(move_uploaded_file($_FILES["userfile"]["tmp_name"], $uploadFile)){
        $gif = new Imagick($uploadFile);
        $image = $gif->coalesceImages();
        foreach($image as $frame){
             array_push($frames, $frame);
        }
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="main.css">
    <title>Gif Splitter</title>
</head>
<body>
    <div id="frame">
        <div id="ribbon">
            <form action="index.php" enctype="multipart/form-data" method="post" id="file-form">
                <label for="file-upload">
                    <div class="button">Upload</div>
                </label>
                <input type="file" name="userfile" id="file-upload">
            </form>
        </div>
        <div id="img-container">
            <?php
            foreach($frames as $frame){
                echo "<img src=\"data:image/jpg;base64," . base64_encode($frame->getImageBlob()) . "\"></img>";
            }
            ?>
        </div>
    </div>
    <script src="main.js"></script>
</body>
</html>