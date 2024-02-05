<?php
/* 
    Handles requests for a list of the accounts
    and their privileges.
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

    $category = "senior";
    $query = "SELECT account_id, account_name, account_isDisqualified, account_baseScore, account_finalScore, account_catScore 
        FROM accounts WHERE account_category = ? AND account_isAdmin = 0 AND account_isDisqualified = 0";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "s", $category);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $account_id, $account_name, $account_isDisqualified, $account_baseScore, $account_finalScore, $account_catScore);

                // Create the response
                $response = [];
                while($row = mysqli_stmt_fetch($statement)){
                    $account = (object)[
                        "account_id" => $account_id,
                        "account_name" => $account_name,
                        "account_baseScore" => $account_baseScore,
                        "account_finalScore" => 0, //$account_finalScore
			"account_catScore" => $account_catScore,
                    ];

                    if(account_isDisqualified == 0){
                        array_push($response, $account);
                    }
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
