<?php
class DB {
    private $host;
    private $dbname;
    private $username;
    private $password;

    public function __construct() {
        $this->host = $_ENV['DB_HOST'] ?? 'localhost';
        $this->dbname = $_ENV['DB_NAME'] ?? '';
        $this->username = $_ENV['DB_USER'] ?? '';
        $this->password = $_ENV['DB_PASS'] ?? '';
    }

    public function connexion(){
        try {
            $connexion = new PDO(
                "mysql:host={$this->host};dbname={$this->dbname};charset=utf8",
                $this->username,
                $this->password
            );

            $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            return $connexion;

        } catch (PDOException $e){
            die("Connexion impossible : " . $e->getMessage());
        }
    }
}

?>