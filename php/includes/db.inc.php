<?php
/*
    The main php header which handles database connections.
    Note that when this project is running locally,

        $DB_SERVERNAME = "localhost:3306";
        $DB_USERNAME = "root";
        $DB_PASSWORD = "lQpbSxr1p57e";
        $DB_NAME = "phopho";

    Otherwise, the details provided by 000webhost will be
    utilized.
*/

    // Database details
    $DB_SERVERNAME = "localhost:3306";
    $DB_USERNAME = "root";
    $DB_PASSWORD = "";//"lQpbSxr1p57e";
    $DB_NAME = "phopho";

    // Connect to the database
    $LINK = mysqli_connect($DB_SERVERNAME, $DB_USERNAME, $DB_PASSWORD, $DB_NAME);

    // In case it keks for some reason
    if(!$LINK) die("ERROR: could not establish a connection with the database.");

    // Disable warnings ffs
    // error_reporting(E_ERROR | E_PARSE); 
  	error_reporting(E_ALL);
?>
