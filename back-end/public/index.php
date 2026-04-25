<?php

require_once __DIR__ . '/../vendor/autoload.php';
require '../config/connexion.php';

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__));
$dotenv->load();

echo $_ENV['DB_USER'] ?? 'NOT FOUND';
$connexion = new DB();
echo $connexion->connexion()
?>