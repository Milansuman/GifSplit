<?php
if(isset($_FILES["userfile"])){
    $uploadFile = "uploads/" . basename($_FILES["userfile"]["name"]);
    if(move_uploaded_file($_FILES["userfile"]["tmp_name"], $uploadFile)){
        $gif = new Imagick($uploadFile);
        $image = $gif->coalesceImages();
        foreach($image as $index => $frame){
                   
        }
    }
}

?>