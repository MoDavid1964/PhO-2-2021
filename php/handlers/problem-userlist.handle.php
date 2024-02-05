<?php
/* 
    Handles request for all enabled problems
    in the database (for non-admin users).
*/

    include_once "../includes/paths.inc.php";
    include_once filepath("database");
    include_once filepath("session");
        
    // Wrong request protocol
    if($_SERVER["REQUEST_METHOD"] != "GET"){
        redirect("/"); exit;
    }

    // Unauthorized
    if(!$SESSION){
        redirect("/php/errors/401.err.php"); exit;
    }

    $answered = [];
    $username = $_SESSION["account_name"];

    // The query
    $query = "SELECT submission_id, submission_problem
        FROM submissions WHERE submission_account = ? AND submission_verdict = 1";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "s", $username);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);
                
            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $submission_id, $submission_problem);

                // Create the response
                while($row = mysqli_stmt_fetch($statement)){
                    array_push($answered, $submission_problem);
                }
            } 
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }

    $query = "SELECT problem_id, problem_code, problem_name
        FROM problems WHERE problem_isDisabled = 0";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $problem_id, $problem_code, $problem_name);

                // Create the response
                $response = [];
                while($row = mysqli_stmt_fetch($statement)){
                    
                    // Problem has already been answered
                    if(in_array($problem_name, $answered)){
                        continue;
                    }

                    $problem = (object)[
                        "problem_id" => $problem_id,
                        "problem_code" => $problem_code,
                        "problem_name" => $problem_name,
                    ];

                    array_push($response, $problem);
                }

                // Send the response
                echo json_encode($response);
            } else {
                echo json_encode([
                    "success" => false,
                    "response" => 'no data found'
                ]);
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }
?>