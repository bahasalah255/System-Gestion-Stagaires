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
$stmt = $connexion->prepare("SELECT c.id,c.annee,f.nom AS nom_formateur,d.nom_group,n.nom_module from afectation c INNER JOIN  user f on c.id_formateur = f.id_user
INNER JOIN groupe d on c.id_groupe = d.id_group INNER JOIN module n on c.id_module = n.id_module");
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
}else {
     http_response_code(403);
    echo json_encode(['error' => 'Accès refusé']);
    exit;
}
?>
