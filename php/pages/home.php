<?php
/* 
    This page displays the control panel visible
    only to admin accounts. This interface allows
    admin accounts to do admin-level stuff (like
    making problems, deleting accounts, stealing info~~)
*/

    include_once "../includes/contest.inc.php";
    include_once "../includes/paths.inc.php";
    include_once filepath("session");
    include_once filepath("preloader");
    include_once filepath("php/includes/head.inc.php");

    if($SESSION){
        $_SESSION["contest_start"] = START;
	$_SESSION["contest_end"] = END;
    } else {
        redirect("/"); exit;
    }
?>

<!DOCTYPE html>
<html>
    <body>
        <div class="right-side-content"></div>
    </body>
    
    <link rel="stylesheet" href="../../css/pages/home.css">
    <script id="home.js" src="../../js/pages/home.js" defer></script>

    <script>
        <?php
            echo "localStorage.setItem('start', ".$_SESSION["contest_start"].");";
		echo "localStorage.setItem('end', ".$_SESSION["contest_end"].");";
            echo "localStorage.setItem('lastSubmit', ".$_SESSION["account_lastSubmit"].");";
		echo "localStorage.setItem('category', '".$_SESSION["account_category"]."');";
		echo "localStorage.setItem('name', '".$_SESSION["account_name"]."');";
        ?>

        // Set document title
        document.getElementsByTagName("title")[0].innerHTML = "Home";
    </script>
</html>
