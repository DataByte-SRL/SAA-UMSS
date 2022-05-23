
<?php

session_start();
if (isset($_SESSION["cuenta"])) {
    echo json_encode($_SESSION);
}

?>