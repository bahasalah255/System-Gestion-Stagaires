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
$stmt = $connexion->prepare("SELECT c.id,c.annee,f.nom_formateur,d.nom_group,n.nom_module from afectation c INNER JOIN  formateur f on c.id_formateur = f.id_formateur
INNER JOIN groupe d on c.id_groupe = d.id_group INNER JOIN module n on c.id_module = n.id_module");
$stmt->execute();
$data = $stmt->fetchAll(PDO::FETCH_ASSOC);
echo json_encode($data);
?>
