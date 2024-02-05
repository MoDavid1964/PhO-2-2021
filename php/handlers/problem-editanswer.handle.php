<?php
/* 
    Edit a problem answer here
*/

    include_once "../includes/paths.inc.php";
    include_once "../includes/checker.inc.php";
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
    if(!isset($_POST["answer"])) exit;

    // Define the problem input and the sql query
    $problem = trim($_POST["problem"]);
    $answer = trim($_POST["answer"]);
    $problemHasTol = 1;

    // Query string to check if problem already exists
    $query = "SELECT problem_id, problem_name, problem_hasTolerance FROM problems WHERE problem_name = ?";
    
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
                mysqli_stmt_bind_result($statement, $problem_id, $problem_name, $problem_hasTolerance);
                mysqli_stmt_fetch($statement);

                // Store tolerance thingy
                $problemHasTol = $problem_hasTolerance;
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }

    // Query string
    $query = "UPDATE problems SET problem_answer = ? WHERE problem_name = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "ss", $answer, $problem);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            // Updated the problem answer key
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }

    $inConcernIDs = [];
    $inConcernAnswers = [];
    
    // Retrieve all submissions which need rechecking
    $query = "SELECT submission_id, submission_answer FROM submissions WHERE submission_problem = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "s", $problem);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $submission_id, $submission_answer);

                // Store details
                $inConcernIDs = [];
                $inConcernAnswers = [];

                while($row = mysqli_stmt_fetch($statement)){
                    array_push($inConcernIDs, $submission_id);
                    array_push($inConcernAnswers, $submission_answer);
                }
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }

    for($i = 0; $i < count($inConcernAnswers); $i++){
    
        // Some details
        $id = $inConcernIDs[$i];
        $verdict = checkAnswer($inConcernAnswers[$i], $answer, $problemHasTol);
        
        // Query for each submission
        $query = "UPDATE submissions SET submission_verdict = ? WHERE submission_id = ?";

        // A bunch of attempts to do the fckin statement
        if($statement = mysqli_prepare($LINK, $query)){
            mysqli_stmt_bind_param($statement, "ii", $verdict, $id);

            // Execute the statement
            if(mysqli_stmt_execute($statement)){
                // Change the verdicy
            } else {
                header("HTTP/1.1 500 Internal Server Error"); exit;
            }
        }
    }

    echo json_encode([
        "success" => true,
        "response" => 'problem answer key has been changed and submissions have been rechecked'
    ]);
?>
