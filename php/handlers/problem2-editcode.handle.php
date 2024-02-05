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
    if(!isset($_POST["code"])) exit;

    // Define the problem input and the sql query
    $problem2 = trim($_POST["problem"]);
    $code = trim($_POST["code"]);
    $isCode = '/^[0-9]{1,}[a-z]{0,1}$/';

    if(!preg_match($isCode, $code)){
        echo json_encode([
            "success" => false,
            "response" => 'invalid problem code format'
        ]); exit;
    }

    // Query string to check if problem already exists
    $query = "SELECT problem2_id, problem2_name FROM problems2 WHERE problem2_name = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "s", $problem2);

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

    // Query string to check if problem has duplicate code
    $query = "SELECT problem2_id, problem2_code FROM problems2 WHERE problem2_code = ?";
    
    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "s", $code);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            // Problem with given code exists already
            if(mysqli_stmt_num_rows($statement) != 0){
                echo json_encode([
                    "success" => false,
                    "response" => 'problem with duplicate code'
                ]); exit;
            } else {
                mysqli_stmt_bind_result($statement, $problem_id, $problem_code);
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }

    // Query string
    $query = "UPDATE problems2 SET problem2_code = ? WHERE problem2_name = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "ss", $code, $problem2);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            echo json_encode([
                "success" => true,
                "response" => 'problem code has been changed'
            ]);
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }
?>