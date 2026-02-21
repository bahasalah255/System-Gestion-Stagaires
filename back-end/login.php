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

if (!$data) {
    echo json_encode([
        "status" => "error",
        "message" => "No data received"
    ]);
    exit();
}

$nom = $data['nom'] ?? '';
$password = $data['password'] ?? '';

$stmt = $connexion->prepare("SELECT nom,password,role FROM user WHERE nom = :nom");
$stmt->execute([':nom' => $nom]);

$user = $stmt->fetch(PDO::FETCH_ASSOC);

if ($user && password_verify($password, $user['password'])) {
    echo json_encode([
        "status" => "ok",
        "message" => "Connexion réussie !",
        "user" => [
            "nom" => $user['nom'],
            "role" => $user['role'],
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