<?php
/*
    The main login page for the website.
    Note that once a session has started, the
    user will be redirected to the home page
    instead.
*/

    include_once "../includes/paths.inc.php";
    include_once filepath("session");

    if($SESSION){
        route_home();
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Sign In to PIPHO</title>
    </head>
    <body>
        <canvas class="canvas fullscreen"></canvas>
        <div class="interface">
            <div class="interface-panel">
                <form class="interface-panel-form" method="POST" action="../handlers/login.handle.php">
                    <div class="interface-panel-form-title-container form-section">
                        <div class="interface-panel-form-title">
                            <div class="interface-panel-form-title-text">
                                Sign in
                            </div>
                        </div>
                    </div>
                    <div class="interface-panel-form-inputs-container form-section">
                        <div class="interface-panel-form-inputs">
                            <div class="interface-panel-form-inputs-field">
                                <div class="interface-panel-form-inputs-field-input-container">
                                    <input class="interface-panel-form-inputs-field-input"
                                        type="text" name="username" value="" placeholder="Enter username">
                                </div>
                            </div>
                            <div class="interface-panel-form-inputs-field">
                                <div class="interface-panel-form-inputs-field-input-container">
                                    <input class="interface-panel-form-inputs-field-input"
                                        type="password" name="password" value="" placeholder="Enter password">
                                </div> 
                            </div><br>
                            <div class="interface-panel-form-inputs-field">
                                <div class="interface-panel-form-inputs-field-input-container">
                                    <button class="interface-panel-form-inputs-field-button" type="submit">
                                        Sign in
                                    </button>
                                </div> 
                            </div>
                        </div>
                    </div>
                    <div class="interface-panel-form-foot-container form-section">

                    </div>
                </form>
            </div>
        </div>
    </body>

    <script id="include.h.js" src="../../js/headers/include.h.js"></script>
    <script>
        // Css files
        include("css", "../../css/general.css");
        include("css", "../../css/pages/login.css");

        // Js files
        include("js", "../../js/headers/loop.h.js");
        include("js", "../../js/headers/canvas.h.js");
        include("js", "../../js/headers/scheme.h.js");
        include("js", "../../js/libs/bg.lib.js");
        include("js", "../../js/bg.js");
    </script>
</html>