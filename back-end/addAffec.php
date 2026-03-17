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
$formateur = $data['formateur'];
$groupe = $data['groupe'];
$module = $data['module'];
$annee = $data['annee'];
$stmt = $connexion->prepare('INSERT INTO afectation (id_formateur,id_groupe,id_module,annee) values(?,?,?,?)');
$stmt->execute([$formateur,$groupe,$module,$annee]);
echo json_encode(['message'=> " Affectation added avec success"]);
}
else {
    http_response_code(403);
    echo json_encode(['error' => 'Accès refusé']);
    exit;
}
?>