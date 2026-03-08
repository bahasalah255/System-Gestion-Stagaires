<?php 
include_once 'connexion.php';
$mdp = 'salah123';
$nom = "mohammed";
$prenom = "belyamani";
$email = "belyamnimed";
$role = "formateur";

$mdphash = password_hash($mdp,PASSWORD_DEFAULT);
$stmt = $connexion->prepare("INSERT INTO user (nom,prenom,email,password,role) values(?,?,?,?,?) ");
$stmt->execute([$nom,$prenom,$email,$mdphash,$role]);
echo json_encode(['test']);

?>