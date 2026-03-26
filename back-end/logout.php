<?php
include 'connexion.php';
include 'auth.php';

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type,Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$user = verifyToken($connexion);
if($user['role'] == 'admin' || $user['role'] == 'formateur'){
$data = json_decode(file_get_contents("php://input"), true);
$id = $user['id_user'];
$stmt = $connexion->prepare('UPDATE user set token = ? , is_connected = ? where id_user = ?');
$stmt->execute([null,0,$id]);
echo json_encode(['message' => 'Logged out successfully']);

}
else {
    http_response_code(403);
    echo json_encode(['error' => 'Accès refusé']);
    exit;
}


?>