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
        </div>
    </div>
    <script src="main.js"></script>
</body>
</html>