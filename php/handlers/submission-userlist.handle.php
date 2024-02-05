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

    $username = $_SESSION["account_name"];
    $query = "SELECT submission_id, submission_problem, submission_answer, submission_verdict, submission_timestamp
        FROM submissions WHERE submission_account = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "s", $username);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $submission_id, $submission_problem, $submission_answer, $submission_verdict, $submission_timestamp);

                // Create the response
                $response = [];
                while($row = mysqli_stmt_fetch($statement)){
                    $submission = (object)[
                        "submission_id" => $submission_id,
                        "submission_problem" => $submission_problem,
                        "submission_answer" => $submission_answer,
                        "submission_verdict" => $submission_verdict,
                        "submission_timestamp" => $submission_timestamp,
                    ];

                    array_push($response, $submission);
                }

                echo json_encode($response);
            } else {
                echo json_encode([(object)[
                    "submission_id" => 0,
                    "submission_problem" => "-",
                    "submission_answer" => "-",
                    "submission_verdict" => 1,
                    "submission_timestamp" => 0,
                ]]);
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }
?>