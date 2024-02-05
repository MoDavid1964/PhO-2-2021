<?php
/* 
    Note that this is a dummy landing page. The final
    UI will look different from the one below.
*/

    include_once "paths.inc.php";
    include_once filepath("session");
    include_once filepath("php/includes/preloader.inc.php");

    if(!$SESSION) header('Location: /');
    if($DISQUALIFIED && !$ADMIN) header('Location: /php/errors/403.err.php');
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Welcome to (PhO)&sup2;</title>
	<meta http-equiv="refresh" content="3600;url=/php/handlers/logout.handle.php" />

        <link rel="stylesheet" href="../../css/general.css">
        <link rel="stylesheet" href="../../css/utils/keyframes.utils.css">
        <link rel="stylesheet" href="../../css/templates/dialog.temp.css">
        <link rel="stylesheet" href="../../css/templates/tabular.temp.css">
        <link rel="stylesheet" href="../../css/templates/panel.temp.css">
        <link rel="stylesheet" href="../../css/templates/warning.temp.css">
        <link rel="stylesheet" href="../../css/nav.css">
    </head>
    <body>
        <?php preloader(); ?>
        <nav class="nav">
            <div class="nav-container">
                <div class="nav-title-container">
                    <div class="nav-title">
                        <div class="nav-title-href">
                            <a class="nav-title-href-link" href="/">(PhO)<sup>2</sup> 2022</a>
                        </div>
                    </div>
                </div>
                <div class="nav-buttons-container">
                    <div class="nav-buttons">
                        <?php
                            if(!$SESSION){
                            } else {
                                if(!$ADMIN){
                                    echo "<div class=\"nav-buttons-button account-button\">
                                        <a class=\"nav-buttons-button-link logout-link\" href=\"#\">Logout</a>
                                    </div>
                                    <div class=\"nav-buttons-button leaderboard-button\">
                                        <a class=\"nav-buttons-button-link\" href=\"/php/pages/leaderboard.php\">Leaderboard</a>
                                    </div>
                                    <div class=\"nav-buttons-button problems-button\">
                                        <a class=\"nav-buttons-button-link\" href=\"/php/pages/problems.php\">Problems</a>
                                    </div>";
                                } else {
                                    echo "<div class=\"nav-buttons-button account-button\">
                                        <a class=\"nav-buttons-button-link logout-link\" href=\"#\">Logout</a>
                                    </div>
                                    <div class=\"nav-buttons-button leaderboard-button\">
                                        <a class=\"nav-buttons-button-link\" href=\"/php/pages/leaderboard.php\">Leaderboard</a>
                                    </div>
                                    <div class=\"nav-buttons-button manager-button\">
                                        <a class=\"nav-buttons-button-link\" href=\"/php/managers/interface.php\">Manager</a>
                                    </div>";
                                }
                            }
                        ?>
                    </div>
                </div>
            </div>
        </nav>
        <whitespace class="header-space"></whitespace>
        <div class="content-container">
    </body>
    
    <script id="scheme.h.js" src="../../js/headers/scheme.h.js" defer></script>
    <script id="loop.h.js" src="../../js/headers/loop.h.js" defer></script>
    <script id="dialog.h.js" src="../../js/headers/dialog.h.js" defer></script>
    <script id="panel.h.js" src="../../js/headers/panel.h.js" defer></script>
    <script id="tabular.h.js" src="../../js/headers/tabular.h.js" defer></script>
    <script id="warning.h.js" src="../../js/headers/warning.h.js" defer></script>
    <script id="logout.h.js" src="../../js/headers/logout.h.js" defer></script>
</html>
