<?php
/* 
    This page displays the control panel visible
    only to admin users. This interface allows
    admin users to do admin-level stuff (like
    making problems, deleting users, stealing info~~)
*/

    include_once "../includes/paths.inc.php";
    include_once filepath("session");
    include_once filepath("php/includes/head.inc.php");

    if($SESSION){
        // In case not an admin
        if(!$ADMIN){
            header("location: /php/errors/401.err.php");
        }
    } else {
        header("location: /");
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Admin Control Panel</title>
    </head>
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
                                    Users
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="content-pane-category">
                        <div class="content-pane-category-title">
                            <div class="content-pane-category-title-text">
                                <a class="content-pane-category-title-text-href"
                                    href="#" onclick="">
                                    Teams
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="content-pane-category">
                        <div class="content-pane-category-title">
                            <div class="content-pane-category-title-text">
                                <a class="content-pane-category-title-text-href"
                                    href="#" onclick="">
                                    Problems
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="content-pane-category">
                        <div class="content-pane-category-title">
                            <div class="content-pane-category-title-text">
                                <a class="content-pane-category-title-text-href" 
                                    href="#" onclick="">
                                    Responses
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="content-pane-category">
                        <div class="content-pane-category-title">
                            <div class="content-pane-category-title-text">
                                <a class="content-pane-category-title-text-href"
                                    href="#" onclick="">
                                    Scores
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div">
            <div class="content-interface-container">
                <div class="content-interface">
                    <div class="content-interface-header">
                        <div class="content-interface-header-title">
                            <div class="content-interface-header-title-text">
                                Welcome to the Control Panel!
                            </div>
                            <div class="content-interface-header-title-subtext">
                                Click on one of the categories on the left<br>
                                to be able to perform further actions.
                            </div>
                        </div>
                    </div>
                    <div class="content-interface-body">
                        
                    </div>
                </div>
            </div>
            <div class="content-inspector-container">
                <div class="content-inspector">
                    <whitespace class="header-space">
                    </whitespace><br><br>
                    <div class="content-inspector-header">
                        <div class="content-inspector-header-title">
                            <div class="content-inspector-header-title-text">
                                Inspector
                            </div>
                        </div>
                    </div>
                    <div class="content-interface-body">
                        
                    </div>
                </div>
            </div>
        </div>
    </body>

    <script id="include.h.js" src="../../js/headers/include.h.js"></script>
    <script>
        // Css files
        include("css", "../../css/general.css");
        include("css", "../../css/pages/manager.css");

        // Js files
        include("js", "../../js/headers/scheme.h.js");

        fetch("../../php/handlers/user-list.handle.php?start_id=0&limit=5")
            .then(response => response.json())
            .then(data => console.log(data[0]["user_name"]));
    </script>
</html>