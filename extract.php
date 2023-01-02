<?php
set_time_limit(0);
ob_start();
ob_implicit_flush(1);


$data = json_decode(file_get_contents("php://input"), true);

$gifHandle = new Imagick();
$gifHandle->readImageBlob(base64_decode($data["image"]));

$frames = $gifHandle->coalesceImages();
foreach($frames as $frame){
    echo json_encode(['data' => base64_encode($frame->getImageBlob())]);
    ob_flush();
}
?>