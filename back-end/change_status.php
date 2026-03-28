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
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $stmt = $connexion->prepare('UPDATE cahier_text set statut = "valider" where id = ?');
    if($stmt->execute([$id])){
        echo json_encode(['message' => 'Statut Changer']);
    }
}
else {
    echo json_encode(['message' => 'Erreur']);
}



?>