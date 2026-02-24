<?php
$host = 'localhost';
$dbname = 'your_database_name';
$port = "3306";
$username = 'root';
$password = '';

try {
    $connexion = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $username, $password);
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die(json_encode(["status" => "error", "message" => $e->getMessage()]));
}
?>