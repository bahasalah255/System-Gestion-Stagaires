<?php
include 'connexion.php';
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$data = json_decode(file_get_contents("php://input"), true);
$id = $data['id'];
$stmt = $connexion->prepare('select count(id_stagaire) as counter from stagaire');
$stmt->execute([]);
$data = $stmt->fetch(PDO::FETCH_ASSOC);
$stm = $connexion->prepare('select count(id_group) as grouper from groupe');
$stm->execute([]);
$data += $stm->fetch(PDO::FETCH_ASSOC);
$st = $connexion->prepare('select count(id_formateur) as formateur1 from formateur');
$st->execute([]);
$data += $st->fetch(PDO::FETCH_ASSOC);
$s = $connexion->prepare('select count(id_module) as module1 from module');
$s->execute([]);
$data += $s->fetch(PDO::FETCH_ASSOC);
$ftp = $connexion->prepare('select count(id_filiere) as counter2 from filiere');
$ftp->execute([]);
$data += $ftp->fetch(PDO::FETCH_ASSOC);
$pdo = $connexion->prepare('select count(id_user) as counter3 from user where is_delete = 0');
$pdo->execute([]);
$data += $pdo->fetch(PDO::FETCH_ASSOC);
$sto = $connexion->prepare("SELECT 
    count(s.id_stagaire) As Stagairecount
FROM stagaire s
INNER JOIN afectation a ON s.groupe_id = a.id_groupe
INNER JOIN filiere b on s.filiere = b.id_filiere
WHERE a.id_formateur = ?");
$sto->execute([$id]);
$data += $sto->fetch(PDO::FETCH_ASSOC);
$pdosta = $connexion->prepare("SELECT count(DISTINCT id_groupe) AS countergroupes from afectation where id_formateur = ?");
$pdosta->execute([$id]);
$data += $pdosta->fetch(PDO::FETCH_ASSOC);
$pdostatment = $connexion->prepare("SELECT count(DISTINCT id_module) AS module from afectation where id_formateur = ?");
$pdostatment->execute([$id]);
$data += $pdostatment->fetch(PDO::FETCH_ASSOC);
echo json_encode($data);


?>