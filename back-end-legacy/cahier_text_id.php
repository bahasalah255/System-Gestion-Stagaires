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
$user = verifyToken($connexion);
if($user['role'] == 'formateur'){
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $data['id'];
    $stmt = $connexion->prepare('SELECT 
    s.id_module,
    s.nom_module,
    c.nom_group,
    a.date,
    a.heure_debut,
    a.heure_fin,
    a.contenu,
    a.statut
FROM module s
INNER JOIN cahier_text a ON s.id_module = a.id_module
INNER JOIN groupe c ON a.id_group = c.id_group 
where a.id_formateur = ?
ORDER BY a.id 
desc
LIMIT 4
');
    $stmt->execute([$id]);
    $datac = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($datac);
}
else {
    echo json_encode(['error' => 'action requis']);
}



?>