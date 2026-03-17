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
if($user['role'] == 'admin'){
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$stmt = $connexion->prepare('DELETE FROM groupe where id_group= ?');
if ($stmt->execute([$id])) {
    echo json_encode(['success' => true, 'message' => 'User deleted']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to delete user']);
}
}
else {
     http_response_code(403);
    echo json_encode(['error' => 'Accès refusé']);
    exit;
}
