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
$error = '';
$user = verifyToken($connexion);
if($user['role'] == 'admin' || $user['role'] == 'formateur'){
try {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $pdo = $connexion->prepare('SELECT password from user where id_user = ?');
    $pdo->execute([$id]);
    $pass = $pdo->fetch(PDO::FETCH_ASSOC);
    $nom = $data['nom'];
    $prenom = $data['prenom'];
    $email = $data['email'];
    $password = $data['password'];
    $newpass = $data['newpassword'];
    $role = $data['role'];
    $pass_bdd = $pass['password'];
if(!empty($newpass) && password_verify($password, $pass_bdd )){
    $hash = password_hash($newpass,PASSWORD_DEFAULT);
    $stmt = $connexion->prepare( 'UPDATE user
     SET nom = ?, prenom = ?, email = ?, password = ? , role = ?
     WHERE id_user = ?');
$stmt->execute([
    $nom,$prenom,$email,$hash,$role,$id
]);
echo json_encode(["message" => "User Edited Successful"]);
}
else {
    if(password_verify($password, $pass_bdd)){
        $stmt = $connexion->prepare( 'UPDATE user
     SET nom = ?, prenom = ?, email = ? , role = ?
     WHERE id_user = ?');
$stmt->execute([
    $nom,$prenom,$email,$role,$id
]);
echo json_encode(["message" => "User Edited Successful"]);
    }
    else {
        echo json_encode(["error" => "Mot De passe incorrect"]);
    }
     
}

} catch(Exception $e) {
    $error = $e->getMessage();
    echo json_encode(['error' => $error]);
}
} else {
      http_response_code(403);
    echo json_encode(['error' => 'Accès refusé']);
    exit;
}


?>