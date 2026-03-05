<?php
include 'connexion.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$stmt = $connexion->prepare('SELECT c.id_module,c.nom_module,c.coeficient,c.masse_horaire,f.nom AS filiere  FROM module c INNER JOIN filiere f on c.id_filiere = f.id_filiere');
$stmt->execute([]);
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);


?>