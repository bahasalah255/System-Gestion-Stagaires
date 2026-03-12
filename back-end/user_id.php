<?php 
require_once 'connexion.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$stmt = $connexion->prepare("SELECT * FROM user where is_delete = 0 and id_user = ?");
$stmt->execute([$id]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
?>
