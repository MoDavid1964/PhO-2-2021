<?php
/*
    The main login page for the website.
    Note that once a session has started, the
    account will be redirected to the home page
    instead.
*/

    include_once "../includes/paths.inc.php";

    include_once filepath("session");
    include_once filepath("preloader");

    if($SESSION){
        redirect('/');
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Sign In to (PhO)&sup2;</title>

        <link rel="stylesheet" href="../../css/general.css">
        <link rel="stylesheet" href="../../css/utils/keyframes.utils.css">
        <link rel="stylesheet" href="../../css/templates/dialog.temp.css">
	<link rel="stylesheet" href="../../css/templates/warning.temp.css">
        <link rel="stylesheet" href="../../css/pages/login.css">
    </head>
    <body>
        <?php preloader(); ?>
    </body>

    <script id="scheme.h.js" src="../../js/headers/scheme.h.js" defer></script>
    <script id="dialog.h.js" src="../../js/headers/dialog.h.js" defer></script>
	<script id="warning.h.js" src="../../js/headers/warning.h.js" defer></script>
    <script id="loop.h.js" src="../../js/headers/loop.h.js" defer></script>
    <script id="gl.lib.js" src="../../js/libs/gl.lib.js" defer></script>
    <script id="login.js" src="../../js/pages/login.js" defer></script>
</html>
