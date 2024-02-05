<?php
/*
    A file which manages all file paths for 
    the project.
*/

    // Very shtty way of getting the parent directory
    define("PARENT", strrev(substr(strrev(__DIR__), 12)));

    // Some utility functions
    function filepath($absolutePath){
        switch($absolutePath){
            case "session":
                return PARENT."php/includes/session.inc.php";
            case "database":
                return PARENT."php/includes/db.inc.php";
            case "preloader":
                return PARENT."php/includes/preloader.inc.php";
            default:
                return PARENT.$absolutePath;
        }
    }

    // Redirects to a page, with js as a failsafe
    function redirect($url){
        if (headers_sent()){
            die("<script>window.location='".$url."';</script‌​>");
        } else {
            header("Location: ".$url);die();
        }    
    }
?>