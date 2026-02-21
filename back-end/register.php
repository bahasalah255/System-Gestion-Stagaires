<?php 
require_once 'connexion.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$data = json_decode(file_get_contents("php://input"), true);
$nom = $data['nom'] ?? '';
$prenom = $data['prenom'] ?? '';
$email = $data['email'] ?? '';
$password = $data['password'] ?? '';
$password = password_hash($password,PASSWORD_DEFAULT);
$stmt = $connexion->prepare('INSERT into user (nom,prenom,email,password) values(?,?,?,?)');
$stmt->execute([$nom,$prenom,$email,$password]);
echo json_encode([
    'reussi' => 'ook'
]);