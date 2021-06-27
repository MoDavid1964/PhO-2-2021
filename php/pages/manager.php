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
                                    href="#users" onclick="">
                                    Users
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="content-pane-category">
                        <div class="content-pane-category-title">
                            <div class="content-pane-category-title-text">
                                <a class="content-pane-category-title-text-href"
                                    href="#teams" onclick="">
                                    Teams
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="content-pane-category">
                        <div class="content-pane-category-title">
                            <div class="content-pane-category-title-text">
                                <a class="content-pane-category-title-text-href"
                                    href="#problems" onclick="">
                                    Problems
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="content-pane-category">
                        <div class="content-pane-category-title">
                            <div class="content-pane-category-title-text">
                                <a class="content-pane-category-title-text-href" 
                                    href="#reponses" onclick="">
                                    Responses
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="content-pane-category">
                        <div class="content-pane-category-title">
                            <div class="content-pane-category-title-text">
                                <a class="content-pane-category-title-text-href"
                                    href="#scores" onclick="">
                                    Scores
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
                                Users
                            </div>
                        </div>
                        <div class="content-interface-header-subtitle">
                            <div class="content-interface-header-subtitle-text">
                                Edit user privileges and details here.
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
            <div class="content-inspector-container">
                <whitespace class="header-space">
                </whitespace>
                <div class="content-inspector">
                    <br><br>
                    <div class="content-inspector-header">
                        <div class="content-inspector-header-title">
                            <div class="content-inspector-header-title-text">
                                Inspector
                            </div>
                        </div>
                    </div>
                    <div class="content-inspector-body">
                        
                    </div>
                </div>
            </div>
        </div>
    </body>

    <script id="include.h.js" src="../../js/headers/include.h.js"></script>
    <script>
        // Css files
        include("css", "../../css/general.css");
        include("css", "../../css/dialog.css");
        include("css", "../../css/pages/manager.css");

        // Js files
        include("js", "../../js/headers/scroll.h.js")
            .then(() => {include("js", "../../js/headers/loop.h.js")})
            .then(() => {include("js", "../../js/headers/dialog.h.js")})
            .then(() => {include("js", "../../js/headers/scheme.h.js")})
            .then(() => {include("js", "../../js/pages/manager.js")})
            .catch(error => console.error(error));

        // Set document title
        document.getElementsByTagName("title")[0].innerHTML = "Admin Control Panel";
    </script>
</html>