<?php 
include 'connexion.php';
include 'auth.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$user = verifyToken($connexion);
if($user['role'] == 'admin'){
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
/*
$stmt = $connexion->prepare('SELECT c.id,c.annee,f.nom_formateur,d.nom_group,n.nom_module from afectation c INNER JOIN  formateur f on c.id_formateur = f.id_formateur
INNER JOIN groupe d on c.id_groupe = d.id_group INNER JOIN module n on c.id_module = n.id_module WHERE c.id = ?');
*/
$stmt = $connexion->prepare('SELECT * FROM afectation where id = ?');
$stmt->execute([$id]);
$data = $stmt->fetch(PDO::FETCH_ASSOC);
echo json_encode($data);
} 
else {
    http_response_code(403);
    echo json_encode(['error' => 'Accès refusé']);
    exit;
}


?>