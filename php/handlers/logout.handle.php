<?php
    /*
        Handles logging out of user accounts
        and destroying their sessions.
    */

    include_once "../includes/paths.inc.php";
    include_once filepath("session");

    $_SESSION = array();
    session_destroy();

    redirect("/"); exit;
?>