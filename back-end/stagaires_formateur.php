<?php 
include 'connexion.php';
include 'auth.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type , Authorization");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$user = verifyToken($connexion);
if($user['role'] == 'formateur'){
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $stmt = $connexion->prepare('SELECT 
    s.id_stagaire,
    s.nom,
    b.nom AS filiere,
    a.id_formateur
FROM stagaire s
INNER JOIN afectation a ON s.groupe_id = a.id_groupe
INNER JOIN filiere b on s.filiere = b.id_filiere
WHERE a.id_formateur = ?');
    $stmt->execute([$id]);
    $datac = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($datac);
}
else {
    echo json_encode(['error' => 'action requis']);
}



?>