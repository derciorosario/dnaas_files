<?php

    function start_session_(){
        session_start();
        $_SESSION['username'] = $_POST['username'];
        $_SESSION['password'] = $_POST['password'];
    }

    if($_POST['username'] !== "Dn445" || $_POST['password'] !== "$3guR4N#!"){
        echo 0;
    }else{
        start_session_();
        echo 1;
    }

?>