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
if($user['role'] == 'admin' || $user['role'] == 'formateur'){
$data = json_decode(file_get_contents("php://input"), true);
$id_formateur = $data['id'];
$module = $data['module'];
$date = $data['date'];
$groupe = $data['groupe'];
$heure1 = $data['heure_debut'];
$heure2 = $data['heure_fin'];
$contenu = $data['contenu'];
$stmt = $connexion->prepare("
    INSERT INTO cahier_text (id_module,id_group,id_formateur,Date,heure_debut,heure_fin,contenu) 
    VALUES (?, ?, ?,?,?,?,?)
");

$stmt->execute([
   $module,$groupe,$id_formateur,$date,$heure1,$heure2,$contenu
]);
echo json_encode([
    'status' => '200',
    'message' => 'user adedd'
]);
}
else {
echo json_encode([
    'status' => '405',
    'message' => 'no autorisation'
]);
}
?>