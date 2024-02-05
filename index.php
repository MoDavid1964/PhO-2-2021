<?php
/* 
    This page displays the landing page.
    This is the first thing first time
    visitors are gonna see.
*/

    include_once "php/includes/paths.inc.php";
    include_once filepath("session");
    include_once filepath("preloader");

    if($SESSION){
        redirect("php/pages/home.php");
        exit;
    }
?>

<html>
    <head>
        <title>Welcome to (PhO)&sup2;</title>

        <link rel="stylesheet" href="../css/templates/dialog.temp.css">
        <link rel="stylesheet" href="../css/utils/keyframes.utils.css">
        <link rel="stylesheet" href="../css/general.css">
        <link rel="stylesheet" href="../css/main.css">
    </head>
    <body>
        <?php preloader(); ?>
        <div class="navigator">
            <div class="navigator-header">
                <div class="navigator-header-title">
                    (PhO)<sup>2</sup> 2022
                </div>
                <div class="navigator-header-subtitle">
                    Philippine Online Physics Olympiad<br>
                    2022 Edition
                </div>
            </div>
            <div class="navigator-content">
                <div class="navigator-content-description">
                    <div class="navigator-content-description-image-container">
                        <img class="navigator-content-description-image" src="../resources/images/logo.png">
                    </div>
                    <div class="navigator-content-description-controls-background"></div>
                    <div class="navigator-content-description-controls-container">
                        <div class="navigator-content-description-controls-instance-container">
                            <a class="navigator-content-description-controls-instance-hyperlink" href="#">
                                <img class="navigator-content-description-controls-instance rotate-180" src="../resources/images/arrow.png">
                            </a>
                        </div>
                        <div class="navigator-content-description-controls-instance-container">
                            <div class="navigator-content-description-controls-instance-text"></div>    
                        </div>
                        <div class="navigator-content-description-controls-instance-container">
                            <a class="navigator-content-description-controls-instance-hyperlink" href="#">
                                <img class="navigator-content-description-controls-instance" src="../resources/images/arrow.png">
                            </a>    
                        </div>
                    </div>    
                    <div class="navigator-content-description-login-container">
                        <a class="navigator-content-description-login" href="/php/pages/login.php">Login</a>
                        <div class="navigator-content-description-login-subtitle">Already have an account? Login here!<sup class="invisible">2</sup></div>
                    </div>
                </div>
            </div>
            <div class="navigator-footer">
                <div class="navigator-footer-icons">
                    <div class="navigator-footer-icons-instance-container">
                        <a class="navigator-footer-icons-instance-hyperlink" href="https://www.facebook.com/photo?fbid=321050563358127&set=a.256215663174951">
                            <img class="navigator-footer-icons-instance" src="../resources/images/facebook.png">
                        </a>
                    </div>
                    <div class="navigator-footer-icons-instance-container">
                        <a class="navigator-footer-icons-instance-hyperlink" href="https://discord.gg/vyjDqruXrD">
                            <img class="navigator-footer-icons-instance" src="../resources/images/discord.png">
                        </a>    
                    </div>
                    <div class="navigator-footer-icons-instance-container">
                        <a class="navigator-footer-icons-instance-hyperlink" href="mailto:onlinephysoly@pshs.edu.ph">
                            <img class="navigator-footer-icons-instance" src="../resources/images/gmail.png">
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="content">
            <div class="content-container">

            </div>
        </div>
    </body>

    <script id="matter.lib.js" src="https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.18.0/matter.js" defer></script>
    <script id="dialog.h.js" src="../js/headers/dialog.h.js" defer></script>
    <script id="scheme.h.js" src="../js/headers/scheme.h.js" defer></script>
    <script id="mouse.h.js" src="../js/headers/mouse.h.js" defer></script>
    <script id="loop.h.js" src="../js/headers/loop.h.js" defer></script>
    <script id="main.js" src="../js/main.js" defer></script>
</html>
