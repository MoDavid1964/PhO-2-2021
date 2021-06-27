<?php
/* 
    This page displays the account panel
    which allows users to modify their account
    details and site preferences.
*/

    include_once "../includes/paths.inc.php";
    include_once filepath("session");
    include_once filepath("php/includes/head.inc.php");

    if(!$SESSION){
        header("location: /");
    }
?>

<!DOCTYPE html>
<html>
    <body>
        <div class="content">
            <div class="content-pane-container">
                <div class="content-pane">
                    <whitespace class="header-space">
                    </whitespace><br><br>
                    <div class="content-pane-category">
                        <div class="content-pane-category-title">
                            <div class="content-pane-category-title-text">
                                <a class="content-pane-category-title-text-href" 
                                    href="#" onclick="">
                                    Account
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="content-pane-category">
                        <div class="content-pane-category-title">
                            <div class="content-pane-category-title-text">
                                <a class="content-pane-category-title-text-href"
                                    href="#" onclick="">
                                    Team
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="content-pane-category">
                        <div class="content-pane-category-title">
                            <div class="content-pane-category-title-text">
                                <a class="content-pane-category-title-text-href"
                                    href="#" onclick="">
                                    Preferences
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="content-pane-category">
                        <div class="content-pane-category-title">
                            <div class="content-pane-category-title-text">
                                <a class="content-pane-category-title-text-href" 
                                    href="#" onclick="">
                                    Statistics
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="content-pane-category">
                        <div class="content-pane-category-title">
                            <div class="content-pane-category-title-text">
                                <a class="content-pane-category-title-text-href" 
                                    href="#" onclick="">
                                    Logout
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="content-interface-container">
                <whitespace class="header-space">
                </whitespace>
                <div class="content-interface">
                    <div class="content-interface-header">
                        <div class="content-interface-header-title">
                            <div class="content-interface-header-title-text">
                                Account
                            </div>
                        </div>
                        <div class="content-interface-header-subtitle">
                            <div class="content-interface-header-subtitle-text">
                                The following are your account details.
                            </div>
                        </div>
                    </div>
                    <div class="content-interface-body-container">
                        <div class="content-interface-body">
                        </div>
                    </div>
                </div>
                <div class="content-interface-scrollbar">
                    <div class="content-interface-scrollbar-bar"></div>
                </div>
            </div>
        </div>
    </body>

    <script id="include.h.js" src="../../js/headers/include.h.js"></script>
    <script>
        // Css files
        include("css", "../../css/general.css");
        include("css", "../../css/dialog.css");
        include("css", "../../css/pages/account.css");

        // Js files
        include("js", "../../js/headers/scroll.h.js")
            .then(() => {include("js", "../../js/headers/loop.h.js")})
            .then(() => {include("js", "../../js/headers/dialog.h.js")})
            .then(() => {include("js", "../../js/headers/scheme.h.js")})
            .then(() => {include("js", "../../js/pages/account.js")})
            .catch(error => console.error(error));

        // fetch("../../php/handlers/user-list.handle.php?start_id=0&limit=5")
        //     .then(response => response.json())
        //     .then(data => console.log(data[0]["user_name"]));

        // Set document title
        document.getElementsByTagName("title")[0].innerHTML = "Account";
    </script>
</html>