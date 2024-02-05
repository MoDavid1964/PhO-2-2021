<?php
    include_once "../includes/paths.inc.php";
    include_once "../includes/contest.inc.php";
    include_once filepath("database");
    include_once filepath("session");

    // Unauthorized
    // if(!$SESSION){
    //     redirect("/"); exit;
    // }

    $accounts = [];
    $problems = [];
    $submissions = [];

    $junior_teams = 0;
    $senior_teams = 0;

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
                    if($account_category == "junior"){
                        $junior_teams++;
                    } else if($account_category == "senior"){
                        $senior_teams++;
                    }

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
    $query = "SELECT problem_id, problem_name, problem_base, problem_code FROM problems";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $problem_id, $problem_name, $problem_base, $problem_code);

                // Initialize them arrays
                $index = 1;
                while($row = mysqli_stmt_fetch($statement)){
                    $problems += [
                        $problem_name => [$problem_base, $index, $problem_code],
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

    // Retrieve all submissions
    $query = "SELECT submission_id, submission_account, submission_problem, submission_verdict FROM submissions";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $submission_id, $submission_account, $submission_problem, $submission_verdict);

                // Initialize them arrays
                while($row = mysqli_stmt_fetch($statement)){
                    if(!$submissions[$submission_problem]){
                        $submissions[$submission_problem] = [0, []];
                        $submissions[$submission_problem."-junior"] = [0, []];
                        $submissions[$submission_problem."-senior"] = [0, []];
                    }

                    if(array_key_exists($submission_account, $submissions[$submission_problem][1])){
                        continue;
                    }

                    $submissions[$submission_problem][0]++;
                    if($submission_verdict == 1){
                        $submissions[$submission_problem][1] += array($submission_account => 1);
                    }

                    if($accounts[$submission_account]["category"] == "junior"){
                        if(array_key_exists($submission_account, $submissions[$submission_problem."-junior"][1])){
                            continue;
                        }

                        $submissions[$submission_problem."-junior"][0]++;
                        if($submission_verdict == 1){
                            $submissions[$submission_problem."-junior"][1] += array($submission_account => 1);
                        }   
                    } else if($accounts[$submission_account]["category"] == "senior"){
                        if(array_key_exists($submission_account, $submissions[$submission_problem."-senior"][1])){
                            continue;
                        }

                        $submissions[$submission_problem."-senior"][0]++;
                        if($submission_verdict == 1){
                            $submissions[$submission_problem."-senior"][1] += array($submission_account => 1);
                        }   
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

    // Retrieve all participating users
    $query = "SELECT submission_id, submission_account, submission_problem, submission_previous, submission_timestamp, submission_verdict FROM submissions WHERE submission_verdict = 1";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $submission_id, $submission_account, $submission_problem, $submission_previous, $submission_timestamp, $submission_verdict);

                // Initialize them arrays
                while($row = mysqli_stmt_fetch($statement)){
                    
                    // Compute score
                    if($submission_account == "rgm") continue;

                    $catSize = $accounts[$submission_account]["category"] == "junior" ? $junior_teams : $senior_teams;
                    $catScore = $problems[$submission_problem][0] * 
                        pow(2, -($submission_previous-1)/2 
                            - ($submission_timestamp - START)/DURATION + 2*intval($problems[$submission_problem][2])/40
                        ) * 
                        (4 * log(
                            ($catSize) * $submissions[$submission_problem."-".$accounts[$submission_account]["category"]][0] / pow(count($submissions[$submission_problem."-".$accounts[$submission_account]["category"]][1]), 2), $catSize) + 1);
                    $score = $problems[$submission_problem][0] * 
                        pow(2, -($submission_previous-1)/2 
                            - ($submission_timestamp - START)/DURATION + 2*intval($problems[$submission_problem][2])/40
                        ) * 
                        (4 * log(
                            ($junior_teams+$senior_teams) * $submissions[$submission_problem][0] / pow(count($submissions[$submission_problem][1]), 2), $junior_teams+$senior_teams) + 1);

                    // Store score
                    // if($submission_problem = "rolling spheres 2") echo $submissions[$submission_problem."-".$accounts[$submission_account]["category"]][0];
                    if(!$accounts[$submission_account]["problems"][$problem_name] || true){
                        $accounts[$submission_account]["problems"] += [
                            $submission_problem => [$problems[$submission_problem][0], $score, $catScore],
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

            // echo $account.$problem.$accounts[$account]["problems"][$problem][0]."<br>";
            // echo $account."-".$problem."-".$accounts[$account]["baseScore"].$score[0]."<br>";

            $accounts[$account]["baseScore"] += $accounts[$account]["problems"][$problem][0];
            $accounts[$account]["finalScore"] += $score[1];
            $accounts[$account]["catScore"] += $score[2];
        }

        $baseScore = $accounts[$account]["baseScore"];
        $finalScore = round($accounts[$account]["finalScore"] * 100) / 100;
        $catScore = round($accounts[$account]["catScore"] * 100) / 100;

        if(strpos($finalScore, ".")){
            if(strlen(explode(".", $finalScore)[1]) < 2){
                $finalScore = $finalScore."0";
            } 
        } else {
            $finalScore = $finalScore.".00";
        }

        if(strpos($catScore, ".")){
            if(strlen(explode(".", $catScore)[1]) < 2){
                $catScore = $catScore."0";
            } 
        } else {
            $catScore = $catScore.".00";
        }

        // Update user scores and stuff
        $query = "UPDATE accounts SET account_baseScore = ?, account_finalScore = ?, account_catScore = ? WHERE account_name = ?";

        // A bunch of attempts to do the fckin statement
        if($statement = mysqli_prepare($LINK, $query)){
            mysqli_stmt_bind_param($statement, "ssss", $baseScore, $finalScore, $catScore, $account);

            // Execute the statement
            if(mysqli_stmt_execute($statement)){
                // Update scores
            } else {
                header("HTTP/1.1 500 Internal Server Error"); exit;
            }
        }      
    }
?>
