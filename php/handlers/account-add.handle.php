<?php
/* 
    Remove an account from the database
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
    if(!isset($_POST["password"])) exit;
    if(!isset($_POST["category"])) exit;
    if(!isset($_POST["email"])) exit;

    // Define the account input and the sql query
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);
    $category = trim($_POST["category"]);
    $email = trim($_POST["email"]);

    // Category is nonexistent
    if($category != "junior" && $category != "senior" && $category != "open"){
        echo json_encode([
            "success" => false,
            "response" => 'account category invalid',
        ]); exit;
    }

    // Hash the password
    $password = password_hash($password, PASSWORD_DEFAULT);

    // Query string to check if account already exists
    $query = "SELECT account_id FROM accounts WHERE account_name = ? or account_email = ?";
    
    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "ss", $username, $email);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            // Account with username already exists
            if(mysqli_stmt_num_rows($statement) > 0){
                echo json_encode([
                    "success" => false,
                    "response" => 'account already exists',
                ]); exit;
            }
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }

    // Query string
    $query = "INSERT INTO accounts (account_name, account_pass, account_email, account_category) VALUES (?, ?, ?, ?)";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "ssss", $username, $password, $email, $category);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            echo json_encode([
                "success" => true,
                "response" => 'account added',
            ]);
        } else {
            header("HTTP/1.1 500 Internal Server Error"); exit;
        }
    }
?>