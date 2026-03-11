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
    $nom = htmlspecialchars($data['nom']);
$prenom = htmlspecialchars($data['prenom']);
$email = htmlspecialchars($data['email']);
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


} catch (Exception $e) {
  if(str_contains($e->getMessage(), '1062')){
        $error = 'Email already exists !'; 
    } else {
        $error = 'Something went wrong !';
    }
   
}
finally {
    if($error != ""){
        echo json_encode([
            'status' => '404',
            'error' => $error
        ]);
    }
    else {
         echo json_encode([
    'status' => '200',
    'message' => 'user adedd',
         ]);
    }
   
}