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
//$user = verifyToken($connexion);
$data = json_decode(file_get_contents("php://input"), true);

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "No data received"
    ]);
    exit();
}

$nom = $data['nom'] ?? '';
$password = $data['password'] ?? '';

$stmt = $connexion->prepare("SELECT id_user,nom,password,role FROM user WHERE nom = :nom");
$stmt->execute([':nom' => $nom]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    $token = bin2hex(random_bytes(32));
    $expiresAt = date('Y-m-d H:i:s', time() + 3600);
    $stmt = $connexion->prepare('UPDATE user SET token = ?, is_connected = ?, expires_at = DATE_ADD(NOW(), INTERVAL 1 HOUR) WHERE id_user = ?');
    $stmt->execute([$token, 1, $user['id_user']]);
    echo json_encode([
        "status" => "ok",
        "message" => "Connexion réussie !",
        "user" => [
            "nom" => $user['nom'],
            "role" => $user['role'],
            "id" => $user['id_user'],
            'token' => $token,
            'token_expires_at' => $expiresAt
        ]
    ]);
    exit();
} else {
    echo json_encode([
        "status" => "error",
        "message" => "Nom ou mot de passe incorrect"
    ]);
    exit();
}