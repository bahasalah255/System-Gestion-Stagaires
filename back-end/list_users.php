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
$stmt = $connexion->prepare('SELECT id_user,nom FROM user where role = "formateur" ');
$stmt->execute([]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
} else {
    echo json_encode([http_response_code(405)]);
}


?>