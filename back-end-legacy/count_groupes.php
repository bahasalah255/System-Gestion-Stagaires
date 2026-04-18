<?php 
include 'connexion.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$data = [];
for($i = 1; $i <=8 ;$i++){
     $stmt = $connexion->prepare("SELECT COUNT(c.nom) AS total FROM stagaire c WHERE c.groupe_id = ?");
    $stmt->execute([$i]);
    $data[$i] = $stmt->fetchColumn();
}
echo json_encode($data);


?>