<?php
/*
    This PHP header file is included in every
    page. Determines whether or not a session
    is currently active, and whether or not
    the current account is an admin account.
*/

    session_start();
    $SESSION = false;
    $ADMIN = false;
    $DISQUALIFIED = false;

    // The session has started
    if(isset($_SESSION["account_name"])){
        $SESSION = true;

        // The account is an admin account
        if($_SESSION["account_isAdmin"]){
            $ADMIN = true;
        }

        if($_SESSION["account_isDisqualified"]){
            $DISQUALIFIED = true;
        }
    }
?>