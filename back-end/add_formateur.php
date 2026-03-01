<?php 
include 'connexion.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$data = json_decode(file_get_contents("php://input"), true);
$nom = $data['nom'];
$telephone = $data['telephone'];
$specialite = $data['specialite'];
$stmt = $connexion->prepare('INSERT INTO formateur (nom_formateur,telephone,specialite) values(?,?,?)');
$stmt->execute([
$nom,$telephone,$specialite
]);
echo json_encode(['success'=> 'added']);
?>