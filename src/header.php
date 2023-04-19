<?php
require_once '../GraphHelper.php';
require_once '../vendor/autoload.php';
session_start();
$_SESSION['state'] = session_id();
$graph = new GraphHelper();
$graph->login();
if(isset($_SESSION['msatg'])){
    $graph->getRoom();
}
?>
<!doctype html>
<HTML>
<head>



    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet"
          integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    <link rel="stylesheet" href="/public/style/<?= $style ?>">
    <title><?= $title ?></title>
</head>
<body>
<header>
    <nav class="navbar navbar-expand-xl navbar-dark bg-dark ">
        <a class="navbar-brand " href="index.php">
            <img src="/img/logo.svg" alt="" width="50" height="50" class="d-inline-block align-text-center">
            Time to Space
        </a>
        <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarCollapse">
            <span class="navbar-toggler-icon"></span>
        </button>
        <!-- Collection of nav links, forms, and other content for toggling -->
        <div id="navbarCollapse" class="collapse navbar-collapse">
            <div class="navbar-nav ">
                <a href="index.php" class="nav-item nav-link align-middle"><i class="fa fa-home"></i><span>Home</span></a>
                <?php if (empty($_SESSION['msatg'])) { ?>
                    <a href="?action=login" type="button" onclick="playAudio()" class="btn btn-success">LOGIN</a>
                <?php } else { ?>
                    <a href="3Dpage.php" class="nav-item nav-link "><i class="fa fa-briefcase"></i><span>Rooms</span></a>
                    <?php  $graph->getMicrosoftUserProfileinfo();
                } ?>
            </div>
        </div>
    </nav>
</header>