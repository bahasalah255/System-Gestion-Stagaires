<?php 
include 'connexion.php';
include 'auth.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type , Authorization");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$user = verifyToken($connexion);
if($user['role'] == 'admin'){
    $stmt = $connexion->prepare('SELECT
c.id,
d.nom as formateur,
f.nom_group as groupe,
n.nom_module as module,
c.annee
from afectation c 
INNER JOIN user d ON c.id_formateur = d.id_user
INNER JOIN module n ON c.id_module = n.id_module
INNER JOIN groupe f ON c.id_groupe = f.id_group
ORDER BY id limit 4
;');
    $stmt->execute();
    $datac = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($datac);
}
else {
    echo json_encode(['error' => 'action requis']);
}



?>