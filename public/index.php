<?php
    $title = "Welcome";
    $style = "index.css";
    require "../vendor/autoload.php";
    require "../src/header.php";

?>




<video id="background-video" autoplay muted>
    <source src="/img/chargement.mp4" type="video/mp4">
</video>
<a href="https://jobtrek.ch/"><img width="100%" height="100%" src="./img/jobtrek.png"></a>

<!--Chargement video CSS-->
<link rel="stylesheet" href="/style/chargement_page/chargement.css">

<!--Chargement video JS-->
<script src="/style/chargement_page/chargement.js"></script>
<?php
require "../src/footer.php";
?>

