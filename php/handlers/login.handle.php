<?php
/*
    Handles requests to login to the site.
    Note that admin users will receive different
    interfaces and different functionalities.
*/

    include_once "../includes/paths.inc.php";
    include_once "../includes/contest.inc.php";
    include_once filepath("database");
        
    // Wrong request protocol
    if($_SERVER["REQUEST_METHOD"] != "POST"){
        redirect("/"); exit;
    }

    // Check whether or not the account input is filled
    if(!isset($_POST["username"])) exit;
    if(!isset($_POST["password"])) exit;

    // Define the account input and the sql query
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);

    $query = "SELECT account_id, account_name, account_pass, account_isAdmin, account_category, account_isDisqualified, account_lastSubmit 
        FROM accounts WHERE account_name = ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "s", $username);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) == 1){
                mysqli_stmt_bind_result($statement, 
                    $account_id, $account_name, $account_pass, $account_isAdmin, $account_category, $account_isDisqualified, $account_lastSubmit);

                // Verify the password
                if(mysqli_stmt_fetch($statement)){
                    if(password_verify($password, $account_pass)){

                        // Start the session
                        session_start();

                        // Set session details
                        $_SESSION["account_id"] = $account_id;
                        $_SESSION["account_name"] = $account_name;
                        $_SESSION["account_isAdmin"] = $account_isAdmin;
			$_SESSION["account_category"] = $account_category;
                        $_SESSION["account_isDisqualified"] = $account_isDisqualified;
                        $_SESSION["account_lastSubmit"] = $account_lastSubmit;
                        $_SESSION["contest_start"] = START;

                        echo json_encode([
				"success" => true,
				"response" => 'you have successfully logged in',
			]);
                    } else {
                        echo json_encode([
                            "success" => false,
                            "response" => 'password incorrect'
                        ]);
                    }
                } else {
                    header("HTTP/1.1 500 Internal Server Error"); exit;
                }
            } else {
                echo json_encode([
                    "success" => false,
                    "response" => 'account does not exist',
                ]);
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }
?>
