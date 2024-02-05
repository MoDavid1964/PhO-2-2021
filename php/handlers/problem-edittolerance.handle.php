<?php
/* 
    Edit a problem answer here
*/

    include_once "../includes/paths.inc.php";
    include_once filepath("database");
    include_once filepath("session");

    // Wrong request protocol
    if($_SERVER["REQUEST_METHOD"] != "POST"){
        redirect("/"); exit;
    }

    // Unauthorized
    if(!$SESSION || !$ADMIN){
        redirect("/"); exit;
    }

    // Check whether or not the problem input is filled
    if(!isset($_POST["problem"])) exit;
    if(!isset($_POST["hasTolerance"])) exit;

    // Define the problem input and the sql query
    $problem = trim($_POST["problem"]);
    $tolerance = trim($_POST["hasTolerance"]);

    // Query string to check if problem already exists
    $query = "SELECT problem_id, problem_name FROM problems WHERE problem_name = ?";
    
    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "s", $problem);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            // Problem with given name does not exist
            if(mysqli_stmt_num_rows($statement) == 0){
                echo json_encode([
                    "success" => false,
                    "response" => 'problem does not exist'
                ]); exit;
            } else {
                mysqli_stmt_bind_result($statement, $problem_id, $problem_name);
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }

    // Query string
    $query = "UPDATE problems SET problem_hasTolerance = ? WHERE problem_name = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "is", $tolerance, $problem);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            // Updated the problem answer key
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }

    echo json_encode([
        "success" => true,
        "response" => 'problem tolerance presence has been changed'
    ]);
?>
