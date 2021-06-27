<?php
/* 
    Note that this is a dummy landing page. The final
    UI will look different from the one below.
*/

    include_once "paths.inc.php";
    include_once filepath("session");
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Welcome to PIPHO</title>
    </head>
    <body>
        <nav class="nav">
            <div class="nav-container">
                <div class="nav-title-container">
                    <div class="nav-title">
                        <div class="nav-title-href">
                            <a class="nav-title-href-link" href="/">PIPHO 2022</a>
                        </div>
                    </div>
                </div>
                <div class="nav-buttons-container">
                    <div class="nav-buttons">
                        <?php
                            if(!$SESSION){
                                echo "<div class=\"nav-buttons-button register-button\">
                                    <a class=\"nav-buttons-button-link\" href=\"/php/pages/register.php\">Register</a>
                                </div>
                                <div class=\"nav-buttons-button login-button\">
                                    <a class=\"nav-buttons-button-link\" href=\"/php/pages/login.php\">Login</a>
                                </div>";
                            } else {
                                if(!$ADMIN){
                                    echo "<div class=\"nav-buttons-button account-button\">
                                        <a class=\"nav-buttons-button-link\" href=\"/php/pages/account.php\">Account</a>
                                    </div>
                                    <div class=\"nav-buttons-button forum-button\">
                                        <a class=\"nav-buttons-button-link\" href=\"/php/pages/forum.php\">Forum</a>
                                    </div>
                                    <div class=\"nav-buttons-button problems-button\">
                                        <a class=\"nav-buttons-button-link\" href=\"/php/pages/problems.php\">Problems</a>
                                    </div>";
                                } else {
                                    echo "<div class=\"nav-buttons-button account-button\">
                                        <a class=\"nav-buttons-button-link\" href=\"/php/pages/account.php\">Account</a>
                                    </div>
                                    <div class=\"nav-buttons-button forum-button\">
                                        <a class=\"nav-buttons-button-link\" href=\"/php/pages/forum.php\">Forum</a>
                                    </div>
                                    <div class=\"nav-buttons-button manager-button\">
                                        <a class=\"nav-buttons-button-link\" href=\"/php/pages/manager.php\">Manager</a>
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
    
    <script id="include.h.js" src="../../js/headers/include.h.js"></script>
    <script>
        // Css files
        include("css", "../../css/general.css");
        include("css", "../../css/nav.css");

        // Js files
        include("js", "../../js/headers/scheme.h.js")
            .then().catch(error => console.error(error));
    </script>
</html>