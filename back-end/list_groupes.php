<?php 
include 'connexion.php';
include 'auth.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type ,Authorization ");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$user = verifyToken($connexion);
if($user['role'] == 'admin'){
$stmt = $connexion->prepare('SELECT c.id_group,c.nom_group,c.annee_formation, f.nom AS filiere  from groupe c INNER JOIN filiere f on c.id_filiere = f.id_filiere');
$stmt->execute();
$groupes = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($groupes);
} else {
     echo json_encode([http_response_code(405)]);
}