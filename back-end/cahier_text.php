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
if($user['role'] == 'admin'){
    $stmt = $connexion->prepare('SELECT 
    s.id_module,
    s.nom_module,
    c.nom_group,
    a.date,
    a.heure_debut,
    a.heure_fin,
    a.contenu,
    a.id,
    a.statut,
    f.nom_formateur
FROM module s
INNER JOIN cahier_text a ON s.id_module = a.id_module
INNER JOIN groupe c ON a.id_group = c.id_group 
INNER JOIN formateur f ON a.id_formateur = f.id_user');
    $stmt->execute();
    $datac = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($datac);
}
else {
    echo json_encode(['error' => 'action requis']);
}



?>