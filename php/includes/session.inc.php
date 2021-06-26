<?php
/*
    This PHP header file is included in every
    page. Determines whether or not a session
    is currently active, and whether or not
    the current user is an admin user.
*/

    session_start();
    $SESSION = false;
    $ADMIN = false;

    // The session has started
    if(isset($_SESSION["user_name"])){
        $SESSION = true;

        // The user is an admin user
        if($_SESSION["user_isAdmin"]){
            $ADMIN = true;
        }
    }
?>