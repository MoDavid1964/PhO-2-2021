<?php
/* 
    Enable or disable a problem here.
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
    if(!isset($_POST["isDisabled"])) exit;

    // Define the problem input and the sql query
    $problem = trim($_POST["problem"]);
    $isDisabled = trim($_POST["isDisabled"]);

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
    $query = "UPDATE problems SET problem_isDisabled = ? WHERE problem_name = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "is", $isDisabled, $problem);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            echo json_encode([
                "success" => true,
                "response" => 'problem status has been changed'
            ]);
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }
?>