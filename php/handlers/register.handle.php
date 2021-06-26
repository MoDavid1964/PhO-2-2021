<?php
/*
    Handles requests to register for the site.
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
    if(!isset($_POST["email"])) exit;
    if(!isset($_POST["password"])) exit;

    if(empty($_POST["username"])) exit;
    if(empty($_POST["email"])) exit;
    if(empty($_POST["password"])) exit;

    // Define the user input and the sql queries
    $username = trim($_POST["username"]);
    $email = trim($_POST["email"]);
    $password = trim($_POST["password"]);
    
    $crosscheck_query1 = "SELECT user_id FROM users WHERE user_name = ?";
    $crosscheck_query2 = "SELECT user_id FROM users WHERE user_email = ?";
    $register_query = "INSERT INTO users (user_name, user_pass, user_email) 
        VALUES (?, ?, ?)";

    // A bunch of attempts to do the fckin statement
    if($crosscheck_statement = mysqli_prepare($LINK, $crosscheck_query1)){
        mysqli_stmt_bind_param($crosscheck_statement, "s", $username);

        // Execute the statement
        if(mysqli_stmt_execute($crosscheck_statement)){
            mysqli_stmt_store_result($crosscheck_statement);

            // Username taken
            if(mysqli_stmt_num_rows($crosscheck_statement) >= 1){
                echo "{ response: 0 }";
                exit;
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            exit;
        }
    }

    // A bunch of attempts to do the fckin statement
    if($crosscheck_statement = mysqli_prepare($LINK, $crosscheck_query2)){
        mysqli_stmt_bind_param($crosscheck_statement, "s", $email);

        // Execute the statement
        if(mysqli_stmt_execute($crosscheck_statement)){
            mysqli_stmt_store_result($crosscheck_statement);

            // Email taken
            if(mysqli_stmt_num_rows($crosscheck_statement) >= 1){
                echo "{ response: 0 }";
                exit;
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            exit;
        }
    }

    // Proceed to register user
    if($register_statement = mysqli_prepare($LINK, $register_query)){

        // Hash password then bind parameters
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        mysqli_stmt_bind_param($register_statement, "sss", 
            $username, $password_hash, $email);

        // Execute the statement
        if(mysqli_stmt_execute($register_statement)){
            header("location: /");
            exit;
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            exit;
        }
    }
?>