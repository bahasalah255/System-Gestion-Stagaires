<?php 
// auth.php — fichier réutilisable
function verifyToken($connexion) {
    $headers = getallheaders();
    
    if (!isset($headers['Authorization'])) {
        echo json_encode(['error' => 'Non autorisé']);
        http_response_code(401);
        exit();
    }

    $token = str_replace('Bearer ', '', $headers['Authorization']);
    
    $stmt = $connexion->prepare('SELECT * FROM user WHERE token = ?');
    $stmt->execute([$token]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$user) {
        echo json_encode(['error' => 'Token invalide']);
        http_response_code(401);
        exit();
    }

    return $user;
}
?>