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
$nom = $data['nom'];
$filiere = $data['filiere'];
$formation = $data['annee'];
$id = $data['id'];
$stmt = $connexion->prepare( 'UPDATE groupe
     SET nom_group = ?, id_filiere = ? , annee_formation = ?
     WHERE id_group= ?');
$stmt->execute([
   $nom,$filiere,$formation,$id
]);
echo json_encode(["success" => true]);

}else {
    http_response_code(403);
    echo json_encode(['error' => 'Accès refusé']);
    exit;
}

?>