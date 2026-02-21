<?php 
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$host = 'localhost';
$dbname = 'gestion_ofppt';
$port = "3308";
$username = 'root';
$password = '';
$success = FALSE;
try {
    $connexion = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $username, $password);
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $success = TRUE;
} catch(PDOException $e) {
    $success = FALSE;
    $errorMessage = $e->getMessage();
}
if ($success) {
    $response = ["status" => "ok", "message" => "Connexion réussie !"];
} else {
    $response = ["status" => "error", "message" => "Impossible de se connecter  $errorMessage "];
}




?>