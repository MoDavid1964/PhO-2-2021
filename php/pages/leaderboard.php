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

    <script id="leaderboard.js" src="../../js/managers/manager.js" defer></script>
    <script id="leaderboard.js" src="../../js/pages/leaderboard.js" defer></script>

    <script>
        <?php
            echo "localStorage.setItem('admin', 0);";

            if($ADMIN){
                echo "localStorage.setItem('admin', 1);";
            }
        ?>

        // Set document title
        document.getElementsByTagName("title")[0].innerHTML = "Leaderboard";
    </script>
</html>