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
$user = $data['user'];
$id = $data['id'];
$stmt = $connexion->prepare( 'UPDATE formateur
     SET nom_formateur = ?, telephone = ?,  specialite = ? , id_user = ?
     WHERE id_formateur = ?');
$stmt->execute([
    $nom,$telephone,$specialite,$user,$id
]);
echo json_encode(["success" => true]);



?>