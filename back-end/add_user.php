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
try {
    $nom = $data['nom'];
$prenom = $data['prenom'];
$email = $data['email'];
$password = $data['password'];
$hash = password_hash($password,PASSWORD_DEFAULT);
$role = $data['role'];
$stmt = $connexion->prepare("
    INSERT INTO user (nom,prenom, email, password,role) 
    VALUES (?, ?, ?,?,?)
");

$stmt->execute([
    $nom,
   $prenom,
   $email,
   $hash,
   $role
]);
$message = 'user Adedd';
    throw new Exception('Inavlid email');

} catch (Exception $e) {
    $e = 'Caught exception: ' . $e->getMessage();
}
finally {
    if($e != ""){
        echo json_encode([
            'status' => '404',
            'error' => $e
        ]);
    }
    else {
         echo json_encode([
    'status' => '200',
    'message' => 'user adedd',
         ]);
    }
   
}