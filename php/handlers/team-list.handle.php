<?php
/* 
    Handles requests for a list of the teams
    partaking in the competition.
*/

    include_once "../includes/paths.inc.php";
    include_once filepath("database");
        
    // Wrong request protocol
    if($_SERVER["REQUEST_METHOD"] != "GET") 
        header("location: /");

    // Check whether or not the user input is filled
    if(!isset($_GET["start_id"])) exit;
    if(!isset($_GET["limit"])) exit;

    // Define the user input and the sql query
    $start_id = trim($_GET["start_id"]);
    $limit = trim($_GET["limit"]);

    $query = "SELECT team_id, team_name 
        FROM users WHERE team_id > ? LIMIT ?";

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
                    $team = (object)[
                        "team_id" => $user_id,
                        "team_name" => $user_name,
                    ];

                    array_push($response, $team);
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