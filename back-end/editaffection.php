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
$formateur = $data['formateur'];
$groupe = $data['groupe'];
$module = $data['module'];
$annee = $data['annee'];
$id = $data['id'];
$stmt = $connexion->prepare( 'UPDATE afectation
     SET id_formateur = ?, id_groupe = ?,
     id_module = ?,annee = ?
     WHERE id= ?');
$stmt->execute([
  $formateur , $groupe, $module  , $annee , $id
]);
echo json_encode(["message" => "Modifie Avec success" ]);



?>