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
    $stmt = $connexion->prepare('SELECT c.id_stagaire,
c.telephone,
c.date_naissance,
d.nom_group,
c.nom 
as nom_stagaire,
f.nom
 from stagaire c 
 INNER JOIN groupe d ON c.groupe_id = d.id_group
 INNER JOIN filiere f ON c.filiere = f.id_filiere
 order by c.id_stagaire DESC LIMIT 4
;');
    $stmt->execute();
    $datac = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($datac);
}
else {
    echo json_encode(['error' => 'action requis']);
}



?>