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
$filiere = $data['filiere'];
$coeficient = $data['coeficient'];
$masse = $data['masse'];
$id = $data['id'];
$stmt = $connexion->prepare( 'UPDATE module
     SET nom_module = ?, coeficient = ?,
     id_filiere = ?,masse_horaire = ?
     WHERE id_module= ?');
$stmt->execute([
  $nom , $coeficient, $filiere , $masse , $id
]);
echo json_encode(["message" => "$nom Modifie Avec success" ]);



?>