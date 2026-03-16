<?php 
include 'connexion.php';
include 'auth.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type ,Authorization ");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$user = verifyToken($connexion);
if($user['role'] == 'admin'){
$error = '';
try {
    $data = json_decode(file_get_contents("php://input"), true);
$nom = $data['nom'];
$prenom = $data['prenom'];
$email = $data['email'];
$password = $data['password'];
$role = $data['role'];
$id = $data['id'];
if(!empty($password)){
    $hash = password_hash($password,PASSWORD_DEFAULT);
    $stmt = $connexion->prepare( 'UPDATE user
     SET nom = ?, prenom = ?, email = ?, password = ? , role = ?
     WHERE id_user = ?');
$stmt->execute([
    $nom,$prenom,$email,$hash,$role,$id
]);
}
else {
     $stmt = $connexion->prepare( 'UPDATE user
     SET nom = ?, prenom = ?, email = ? , role = ?
     WHERE id_user = ?');
$stmt->execute([
    $nom,$prenom,$email,$role,$id
]);
}
echo json_encode(["message" => "User Edited Successful"]);
} catch(Exception $e) {
    $error = $e->getMessage();
    echo json_encode(['error' => $error]);
}
} else {
    echo json_encode([http_response_code(405)]);
}


?>