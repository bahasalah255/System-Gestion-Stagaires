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
$stmt = $connexion->prepare('INSERT INTO afectation (id_formateur,id_groupe,id_module) values(?,?,?)');
$stmt->execute([$formateur,$groupe,$module]);
echo json_encode(['message'=> "$formateur added avec success"]);
?>