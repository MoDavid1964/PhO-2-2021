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
    
    <script id="problems.js" src="../../js/pages/problems.js" defer></script>
    <script id="user-manager.js" src="../../js/managers/user-manager.js" defer></script>

    <script>
        <?php
            echo "localStorage.setItem('lastSubmit', ".$_SESSION["account_lastSubmit"].")";
        ?>

        // Set document title
        document.getElementsByTagName("title")[0].innerHTML = "Problems";
    </script>
</html>
