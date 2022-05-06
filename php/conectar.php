
<?php
date_default_timezone_set("America/Santiago");
$time = time();

$day =date("d",$time);
$year =date("Y",$time);
$month = date("m",$time);

$month2 = date("m",$time+ (30 * 24 * 60 * 60)) ;


 echo (date("M-d-Y l h:i:s A e",time()));


?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

   <input type="date" <?php echo ("min='$year-$month-$day' max='$year-$month2-$day'")?>>
    
</body>
</html>*/