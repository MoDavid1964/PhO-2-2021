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
            default:
                return PARENT.$absolutePath;
        }
    }

    function route_home(){
        header("location: ".PARENT."index.php");
    }
?>