<?php
/*
    Handles requests to login to the site.
    Note that admin users will receive different
    interfaces and different functionalities.
*/

    include_once "../includes/paths.inc.php";
    include_once filepath("database");
        
    // Wrong request protocol
    if($_SERVER["REQUEST_METHOD"] != "POST") 
        header("location: /");

    // Check whether or not the user input is filled
    if(!isset($_POST["username"])) exit;
    if(!isset($_POST["password"])) exit;

    if(empty($_POST["username"])) exit;
    if(empty($_POST["password"])) exit;

    // Define the user input and the sql query
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    $query = "SELECT user_id, user_name, user_pass, user_isAdmin 
        FROM users WHERE user_name = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "s", $username);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) == 1){
                mysqli_stmt_bind_result($statement, 
                    $user_id, $user_name, $user_pass, $user_isAdmin);

                // Verify the password
                if(mysqli_stmt_fetch($statement)){
                    if(password_verify($password, $user_pass)){

                        // Start the session
                        session_start();

                        // Set session details
                        $_SESSION["user_id"] = $user_id;
                        $_SESSION["user_name"] = $user_name;
                        $_SESSION["user_isAdmin"] = $user_isAdmin;

                        header("location: ../../index.php");
                    } else {
                        echo "{ response: 0 }";
                    }
                } else {
                    header("HTTP/1.1 500 Internal Server Error");
                    exit;
                }
            } else {
                echo "{ response: 0 }";
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            exit;
        }
    }
?>