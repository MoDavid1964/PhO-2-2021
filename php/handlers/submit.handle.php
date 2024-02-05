<?php
/* 
    Submit an answer for a user to a problem.
*/
    include_once "../includes/paths.inc.php";
    include_once "../includes/checker.inc.php";
    include_once "../includes/contest.inc.php";
    include_once filepath("database");
    include_once filepath("session");

    // Wrong request protocol
    if($_SERVER["REQUEST_METHOD"] != "POST"){
        redirect("/"); exit;
    }

    // Unauthorized
    if(!$SESSION){
        redirect("/"); exit;
    }

	echo json_encode([
		"success" => false,
		"response" => "the contest is over",
	]); exit;

    // Check whether or not the account input is filled
    if(!isset($_POST["problem"])) exit;
    if(!isset($_POST["answer"])) exit;

    // Define the account input and the sql query
    $username = $_SESSION["account_name"];
    if($SESSION["account_isDisqualified"]) exit;
    
    $problem = trim($_POST["problem"]);
    $answer = trim($_POST["answer"]);

    $answerKey = '';
    $problemName = '';
    $problemBase = 0;
	$problemHasTol = 1;
    $submissionsByUser = 0;

    // Check time of last submit
    $query = "SELECT account_id, account_isDisqualified, account_lastSubmit FROM accounts WHERE account_name = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "s", $username);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            // Account with username already exists
            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $account_id, $account_isDisqualified, $account_lastSubmit);

                mysqli_stmt_fetch($statement);

                // Make sure the cooldown has passed or else
                if(TIMESTAMP - $account_lastSubmit < COOLDOWN){
                    
                    // Reset the acccount last submit
                    $_SESSION["account_lastSubmit"] = $account_lastSubmit;

                    echo json_encode([
                        "success" => false,
                        "response" => 'five minutes have not passed since your last submission',
                        "time" => $account_lastSubmit,
                    ]); exit;                    
                }

                // If account is disqualified
                if($account_isDisqualified == 1){
                    echo json_encode([
                        "success" => false,
                        "response" => 'the account is apparently disqualified',
                        "time" => $account_lastSubmit,
                    ]); exit;                    
                }
            } else {
                echo json_encode([
                    "success" => false,
                    "response" => 'account does not exist',
                ]); exit;
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }

    // Retrieve the answer key
    $query = "SELECT problem_id, problem_name, problem_hasTolerance, problem_answer, problem_base FROM problems WHERE problem_code = ?";
    
    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "s", $problem);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            // Account with username already exists
            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $problem_id, $problem_name, $problem_hasTolerance, $problem_answer, $problem_base);

                mysqli_stmt_fetch($statement);

                // Store the answer key
                $answerKey = $problem_answer;
                $problemName = $problem_name;
                $problemBase = $problem_base;
	        	$problemHasTol = $problem_hasTolerance;
            } else {
                echo json_encode([
                    "success" => false,
                    "response" => 'problem does not exist',
                ]); exit;
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }

    // Make sure answer is in valid format
    $isFloat = '/^\-{0,1}[0-9\.]{1,}$/';
    $isNumber = '/^\-{0,1}[0-9]{1,}$/';

    $scinot = explode("e", trim(strtolower($answer)));
    if(count($scinot) > 2){
        echo json_encode([
            "success" => false,
            "response" => 'invalid answer format',
        ]); exit;
    }

    if(!preg_match($isFloat, $scinot[0])){
        echo json_encode([
            "success" => false,
            "response" => 'invalid answer format',
        ]); exit;
    }

    if(count($scinot) > 1){
        if(!preg_match($isNumber, $scinot[1])){
            echo json_encode([
                "success" => false,
                "response" => 'invalid answer format',
            ]); exit;
        }
    }

    $mantissa = explode(".", $scinot[0]);
    if(count($mantissa) > 2){
        echo json_encode([
            "success" => false,
            "response" => 'invalid answer format',
        ]); exit;
    }

    // Determine the verdict
    $verdict = checkAnswer($answer, $answerKey, $problemHasTol);

    // Determine number of attempts from account for given problem
    $query = "SELECT submission_id, submission_verdict FROM submissions WHERE submission_account = ? AND submission_problem = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "ss", $username, $problemName);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_bind_result($statement,
                    $submission_id, $submission_verdict);

            // Count submissions by user and check for verdict of submissions
            $submissionsByUser = 1;
            while($row = mysqli_stmt_fetch($statement)){
                
                $submissionsByUser++;
                if($submission_verdict == 1){
                    echo json_encode([
                        "success" => false,
                        "response" => 'problem already answered by account',
                    ]); exit;
                }
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }

    // Tabulate the submission
    $query = "INSERT INTO submissions (submission_account, submission_problem, submission_answer, submission_verdict, submission_previous, submission_timestamp) VALUES (?, ?, ?, ?, ?, ?)";
    $timestamp = TIMESTAMP;

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "sssisi",
            $username, $problemName, $answer, $verdict, $submissionsByUser, $timestamp);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){

            // Insert the submission into the table
            mysqli_stmt_store_result($statement);
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }

    // Update the latest timestamp
    $query = "UPDATE accounts SET account_lastSubmit = ? WHERE account_name = ?";
    $timestamp = TIMESTAMP;

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "ss", $timestamp, $username);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){

            // Update the timestamp in the table
            mysqli_stmt_store_result($statement);
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }

    // Account last submit
    $_SESSION["account_lastSubmit"] = $timestamp;

    // Update leaderboard
    include_once "../handlers/leaderboard-compute.handle.php";

    echo json_encode([
        "success" => true,
        "response" => 'submission was tabulated',
    ]);
?>
