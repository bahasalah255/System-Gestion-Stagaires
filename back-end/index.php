<?php
require_once 'connexion.php';
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
$nom = 'salah';
$prenom = 'baha';
$email = 'salaheddinebaha32@gmail.com';
$role = 'admin';
$password = 'admin123';
$password = password_hash($password,PASSWORD_DEFAULT);
$stmt = $connexion->prepare('INSERT INTO USER (nom,prenom,email,password,role) values(?,?,?,?,?) ');
$stmt->execute([$nom,$prenom,$email,$password,$role]);
$data = ['message' => 'avec success'];
echo json_encode($data);


?>
z