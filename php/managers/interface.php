<?php
/* 
    This page displays the control panel visible
    only to admin accounts. This interface allows
    admin accounts to do admin-level stuff (like
    making problems, deleting accounts, stealing info~~)
*/

    include_once "../includes/paths.inc.php";
    include_once filepath("session");
    include_once filepath("preloader");
    include_once filepath("php/includes/head.inc.php");

    if($SESSION){
        // In case not an admin
        if(!$ADMIN){
            redirect("/php/errors/401.err.php"); exit;
        }
    } else {
        redirect("/"); exit;
    }
?>

<!DOCTYPE html>
<html>
    <body>
        <div class="left-side-panel"></div>
        <div class="right-side-content"></div>
    </body>

    <link rel="stylesheet" href="../../css/managers/manager.css">
    <script id="manager.js" src="../../js/managers/manager.js" defer></script>
    <script id="interface.js" src="../../js/managers/interface.js" defer></script>

    <script>
        // Set document title
        document.getElementsByTagName("title")[0].innerHTML = "Admin Control Panel";
    </script>
</html>