<?php
/* 
    Handles requests for a information on a
    a single user. Data from different tables
    is used.
*/

    include_once "../includes/paths.inc.php";
    include_once filepath("database");
    include_once filepath("session");
        
    // Wrong request protocol
    if($_SERVER["REQUEST_METHOD"] != "GET") 
        header("location: /");

    // Unauthorized
    if(!$SESSION || !$ADMIN)
        header("location: /php/errors/401.err.php");

    // Check whether or not the user input is filled
    if(!isset($_GET["user_id"])) exit;

    // Define the user input and the sql query
    $user_id = trim($_GET["user_id"]);
    $query = "SELECT user_id, user_name, user_email, user_isAdmin 
        FROM users WHERE user_id = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "i", $user_id);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $user_id, $user_name, $user_email, $user_isAdmin);

                // Fetch the data
                if(mysqli_stmt_fetch($statement)){

                    // Send the response
                    echo json_encode([
                        "user_id" => $user_id,
                        "user_name" => $user_name,
                        "user_email" => $user_email,
                        "user_isAdmin" => $user_isAdmin,   
                    ]);
                }
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            exit;
        }
    }
?>