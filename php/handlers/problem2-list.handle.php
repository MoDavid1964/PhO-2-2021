<?php
/* 
    Handles requests for the problem
    list and their individual details.
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

    // Check whether or not the problem input is filled
    if(!isset($_GET["limit"])) exit;

    // Define the account input and the sql query
    $limit = trim($_GET["limit"]);

    $query = "SELECT problem2_id, problem2_code, problem2_name, problem2_hps
        FROM problems2 LIMIT ?";

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){
        mysqli_stmt_bind_param($statement, "i", $limit);

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
            mysqli_stmt_store_result($statement);

            if(mysqli_stmt_num_rows($statement) > 0){
                mysqli_stmt_bind_result($statement, 
                    $problem2_id, $problem2_code, $problem2_name, $problem2_hps);

                // Create the response
                $response = [];
                while($row = mysqli_stmt_fetch($statement)){
                    $problem = (object)[
                        "problem_id" => $problem2_id,
                        "problem_code" => $problem2_code,
                        "problem_name" => $problem2_name,
                        "problem_hps" => $problem2_hps,
                    ];

                    array_push($response, $problem);
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
