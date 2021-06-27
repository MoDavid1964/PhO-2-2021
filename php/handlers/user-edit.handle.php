<?php
/* 
    Changes user data for the specified
    user; user is specified via their id.
*/

    include_once "../includes/paths.inc.php";
    include_once filepath("database");
    include_once filepath("session");

    // Wrong request protocol
    if($_SERVER["REQUEST_METHOD"] != "GET")
        header("location: /");

    // Unauthorized
    if(!$SESSION || !$ADMIN)
        header("location: /php/errors/401.err.php");

    // Check whether or not the user input is filled
    if(!isset($_GET["user_id"])) exit;
    if(!isset($_GET["action"])) exit;

    // Define the user input and the sql query
    $user_id = trim($_GET["user_id"]);
    $action = trim($_GET["action"]);
    $params = [];

    // Cant edit yourself
    if($_SESSION["user_id"] == $user_id)
        exit;

    if(isset($_GET["params"]))
        $params = $_GET["params"];

    // Possible actions
    $query_delete = "DELETE FROM users WHERE user_id = ?";
    $query_admin = "UPDATE users SET user_isAdmin = ? WHERE user_id = ?";
    $query = "";

    switch($action){
        case "admin":
            $query = $query_admin;
            break;
        case "delete":
            $query = $query_delete;
            break;
    }

    // Binds the parameters, given their arbitrary nature
    function bindParameters($statement, $params, $user_id){
        $type_string = "";

        for($i = 0; $i < sizeof($params); $i++){
            switch(gettype($params[$i])){
                case "integer":
                    $type_string.="i";
                    break;
                case "string":
                    $type_string.="s";
                    break;
            }
        }

        mysqli_stmt_bind_param($statement, 
            "i".$type_string, ...[...$params, $user_id]);
    }

    // A bunch of attempts to do the fckin statement
    if($statement = mysqli_prepare($LINK, $query)){

        // Specify and bind the parameters to the query
        if(sizeof($params) > 0){
            bindParameters($statement, $params, $user_id);
        } else {
            mysqli_stmt_bind_param($statement, "i", $user_id);
        }

        // Execute the statement
        if(mysqli_stmt_execute($statement)){
        } else {
            header("HTTP/1.1 500 Internal Server Error");
            exit;
        }
    }

    echo json_encode((object)[
        "test" => "testvalue"
    ]);
?>