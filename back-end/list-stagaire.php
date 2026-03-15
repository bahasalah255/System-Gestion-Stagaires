<?php 
require_once 'connexion.php';
include 'auth.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$user = verifyToken($connexion);
if($user['role'] == 'admin'){
    $stmt = $connexion->prepare("SELECT c.id_stagaire,c.nom,c.telephone,c.date_naissance,g.nom_group AS groupe,f.nom AS filiere FROM stagaire c INNER JOIN filiere f on c.filiere = f.id_filiere
INNER JOIN groupe g on c.groupe_id = g.id_group");
$stmt->execute();
$stagiaires = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($stagiaires);
}
else {
    echo json_encode(['error' => 'access invalide']);
}


?>
