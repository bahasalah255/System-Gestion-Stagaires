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

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['error' => 'Corps JSON invalide']);
    exit;
}

$formateur = $data['formateur'] ?? null;
$groupe = $data['groupe'] ?? null;
$module = $data['module'] ?? null;
$annee = $data['annee'] ?? null;

if (empty($formateur) || empty($groupe) || empty($module) || empty($annee)) {
    http_response_code(422);
    echo json_encode(['error' => 'Tous les champs sont obligatoires']);
    exit;
}

try {
    $stmt = $connexion->prepare('INSERT INTO afectation (id_formateur,id_groupe,id_module,annee) values(?,?,?,?)');
    $stmt->execute([$formateur,$groupe,$module,$annee]);
    echo json_encode(['message'=> "Affectation added avec success"]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'DB_ERROR', 'details' => $e->getMessage()]);
}
}
else {
    http_response_code(403);
    echo json_encode(['error' => 'Accès refusé']);
    exit;
}
?>