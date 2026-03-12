<?php 
include 'connexion.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$data = json_decode(file_get_contents("php://input"), true);
$error = '';
try {
    $id = $data['id'];
$stmt = $connexion->prepare('UPDATE user  SET is_delete = 0 where id_user = ?');
$stmt->execute([$id]);  // ← move execute() inside try
    
    echo json_encode(['success' => true, 'message' => 'User Restaurer Avec Success']);

} catch (Exception $e) {
    if(str_contains($e->getMessage(),'1451')){
        $error = 'Tu Dois Supprimer Le formateur';
    }
    else {
        $error = 'some thing wrong Try Again';
    }
     echo json_encode(['error' => $error]);
}

