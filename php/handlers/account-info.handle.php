<?php
/* 
    Handles requests for a information on a
    a single account. Data from different tables
    is used.
*/

    include_once "../includes/paths.inc.php";
    include_once filepath("database");
    include_once filepath("session");
        
    // Wrong request protocol
    if($_SERVER["REQUEST_METHOD"] != "GET"){
        redirect("/"); exit;
    }

    // Unauthorized
    if(!$SESSION || !$ADMIN){
        redirect("/php/errors/401.err.php"); exit;
    }

    // Check whether or not the account input is filled
    if(!isset($_GET["account_id"])) exit;

    // Define the account input and the sql query
    $account_id = trim($_GET["account_id"]);
    $query = "SELECT account_id, account_name, account_email, account_isAdmin, account_isDisqualified
        FROM accounts WHERE account_id = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "i", $account_id);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $account_id, $account_name, $account_email, $account_isAdmin, $account_isDisqualified);

                // Fetch the data
                if(mysqli_stmt_fetch($statement)){

                    // Send the response
                    echo json_encode([
                        "account_id" => $account_id,
                        "account_name" => $account_name,
                        "account_email" => $account_email,
                        "account_isAdmin" => $account_isAdmin,   
                        "account_isDisqualified" => $account_isDisqualified,
                    ]);
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
?>