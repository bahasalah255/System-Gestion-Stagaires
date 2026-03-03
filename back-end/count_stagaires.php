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
$data = [];
for($i = 1; $i <=3 ;$i++){
     $stmt = $connexion->prepare("select count(c.nom) as total from stagaire c where c.filiere = ?");
    $stmt->execute([$i]);
    $data[$i] = $stmt->fetchColumn();
}
echo json_encode($data);


?>