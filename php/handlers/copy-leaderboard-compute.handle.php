<?php
    include_once "../includes/paths.inc.php";
    include_once "../includes/contest.inc.php";
    include_once filepath("database");
    include_once filepath("session");

    // Unauthorized
    if(!$SESSION){
        redirect("/"); exit;
    }

    $accounts = [];
    $problems = [];

    // Retrieve all participating users
    $query = "SELECT account_id, account_name, account_category FROM accounts WHERE account_isAdmin = 0";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $account_id, $account_name, $account_category);

                // Initialize them arrays
                while($row = mysqli_stmt_fetch($statement)){
                    $accounts += [
                        $account_name => [
                            "problems" => [],
                            "finalScore" => 0,
                            "baseScore" => 0,
                            "category" => $account_category,
                        ]
                    ];
                }
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

    // Retrieve all enabled problems
    $query = "SELECT problem_id, problem_name, problem_base FROM problems";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $problem_id, $problem_name, $problem_base);

                // Initialize them arrays
                $index = 1;
                while($row = mysqli_stmt_fetch($statement)){
                    $problems += [
                        $problem_name => [$problem_base, $index],
                    ];

                    $index++;
                }
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

    // Retrieve all participating users
    $query = "SELECT submission_id, submission_account, submission_problem, submission_previous, submission_timestamp FROM submissions WHERE submission_verdict = 1";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $submission_id, $submission_account, $submission_problem, $submission_previous, $submission_timestamp);

                // Initialize them arrays
                while($row = mysqli_stmt_fetch($statement)){

                    // Compute score
                    $score = $problems[$submission_problem][0] * pow(2, -$submission_previous/2 - ($submission_timestamp - START)/DURATION + 2 * $problems[$submission_problem][1] / count($problems));

                    // Store score
                    if(!$accounts[$submission_account]["problems"][$problem_name] || true){
                        $accounts[$submission_account]["problems"] += [
                            $submission_problem => [$problems[$submission_problem][0], $score],
                        ];
                    } else {
                        $accounts[$submission_account]["problems"][$submission_problem][1] = max($score, $accounts[$submission_account]["problems"][$submission_problem][1]);
                    }
                }
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

    // Update scores for all users and the like
    foreach($accounts as $account => $details){
        
        // Compute the score
        foreach($accounts[$account]["problems"] as $problem => $score){
		//echo $account."-".$problem."-".$accounts[$account]["baseScore"]."-".$score[0]."<br>";
            $accounts[$account]["baseScore"] += $score[0];
            $accounts[$account]["finalScore"] += $score[1];
        }

        $baseScore = $accounts[$account]["baseScore"];
        $finalScore = $accounts[$account]["finalScore"];

        // Update user scores and stuff
        $query = "UPDATE accounts SET account_baseScore = ?, account_finalScore = ? WHERE account_name = ?";

        // A bunch of attempts to do the fckin statement
        if($statement = mysqli_prepare($LINK, $query)){
            mysqli_stmt_bind_param($statement, "sss", $baseScore, $finalScore, $account);

            // Execute the statement
            if(mysqli_stmt_execute($statement)){
                // Update scores
            } else {
                header("HTTP/1.1 500 Internal Server Error"); exit;
            }
        }      
    }
?>
