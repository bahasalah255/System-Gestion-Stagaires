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
$date = $data['date_naissance'];
$groupeid = $data['groupe_id'];
$id = $data['id'];
$stmt = $connexion->prepare( 'UPDATE stagaire 
     SET nom = ?, telephone = ?, date_naissance = ?, groupe_id = ?
     WHERE id_stagaire = ?');
$stmt->execute([
    $nom,$telephone,$date,$groupeid,$id
]);
echo json_encode(["success" => true]);



?>