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
$stmt = $connexion->prepare('SELECT c.id_formateur,c.specialite,c.telephone,c.nom_formateur,f.nom FROM formateur c INNER JOIN user f on c.id_user = f.id_user');
$stmt->execute([]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);


?>