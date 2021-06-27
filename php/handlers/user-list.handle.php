<?php
/* 
    Handles requests for a list of the users
    and their privileges.
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
    if(!isset($_GET["start_id"])) exit;
    if(!isset($_GET["limit"])) exit;

    // Define the user input and the sql query
    $start_id = trim($_GET["start_id"]);
    $limit = trim($_GET["limit"]);

    $query = "SELECT user_id, user_name, user_isAdmin 
        FROM users WHERE user_id > ? LIMIT ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "ii", $start_id, $limit);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $user_id, $user_name, $user_isAdmin);

                // Create the response
                $response = [];
                while($row = mysqli_stmt_fetch($statement)){
                    $user = (object)[
                        "user_id" => $user_id,
                        "user_name" => $user_name,
                        "user_isAdmin" => $user_isAdmin,
                    ];

                    array_push($response, $user);
                }

                // Send the response
                echo json_encode($response);
            } else {
                echo json_encode(array());
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            exit;
        }
    }
?>