<?php
/* 
    Edit an account password here
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

    // Check whether or not the account input is filled
    if(!isset($_POST["username"])) exit;
    if(!isset($_POST["isDisqualified"])) exit;

    // Define the account input and the sql query
    $username = trim($_POST["username"]);
    $isDisqualified = trim($_POST["isDisqualified"]);

    // Query string to check if account already exists
    $query = "SELECT account_id, account_name FROM accounts WHERE account_name = ?";
    
    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "s", $username);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            // Account with username does not exist
            if(mysqli_stmt_num_rows($statement) == 0){
                echo json_encode([
                    "success" => false,
                    "response" => 'account does not exist',
                ]); exit;
            } else {
                mysqli_stmt_bind_result($statement, $account_id, $account_name);
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }
    
    // Query string
    $query = "UPDATE accounts SET account_isDisqualified = ? WHERE account_name = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "is", $isDisqualified, $username);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            echo json_encode([
                "success" => true,
                "response" => 'account status has been changed',
            ]);
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }
?>