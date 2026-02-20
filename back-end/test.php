<?php 
require_once 'connexion.php';
$nom = 'salah';
$prenom = 'baha';
$email = 'salaheddinebaha32@gmail.com';
role = 'admin';
$password = 'admin123';
$password = password_hash($password,PASSWORD_DEFAULT);
$stmt = $connexion->prepare('INSERT INTO USER (nom,prenom,email,password,role) values(?,?,?,?,?) ');
$stmt->excute([$nom,$prenom,$email,$password,$role])


?>