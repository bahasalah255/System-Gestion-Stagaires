
# 🎓 System-Gestion-Stagaires

A web application for managing trainees (stagiaires) at OFPPT, built with **React** (frontend) and **PHP** (backend API).

---

## 📁 Project Structure

```
System-Gestion-Stagaires/
├── back-end/          # PHP REST API
│   ├── connexion.php  # Database connection (not pushed - see setup)
│   ├── login.php
│   ├── register.php
│   ├── add_stagaire.php
│   ├── list-stagaire.php
│   ├── list_groupes.php
│   └── index.php
├── front-end/         # React + Vite app
│   ├── src/
│   │   ├── App.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Dashforma.jsx
│   │   └── Dashstagaire.jsx
│   └── public/
└── Diagramme De Flux
```

---

## 🛠️ Tech Stack

| Layer     | Technology        |
|-----------|-------------------|
| Frontend  | React + Vite      |
| Backend   | PHP 8.3           |
| Database  | MySQL             |
| Styling   | CSS               |

---

## ⚙️ Installation & Setup

### Prerequisites

- PHP 8.x
- MySQL
- Node.js & npm

---

### 1. Clone the repository

```bash
git clone https://github.com/bahasalah255/System-Gestion-Stagaires.git
cd System-Gestion-Stagaires
```

---

### 2. Database Setup

1. Open **phpMyAdmin** or your MySQL client
2. Create a database named `gestion_ofppt`
3. Import the SQL file:
   - Go to your database → **Import** → select `gestion_ofppt.sql`

---

### 3. Backend Setup

Create a `connexion.php` file inside the `back-end/` folder (this file is not pushed for security reasons):

```php
<?php
$host = 'localhost';
$dbname = 'gestion_ofppt';
$port = '3306'; // change to your MySQL port
$username = 'root';
$password = '';

try {
    $connexion = new PDO("mysql:host=$host;port=$port;dbname=$dbname;charset=utf8", $username, $password);
    $connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die(json_encode(["status" => "error", "message" => $e->getMessage()]));
}
?>
```

Then start the PHP development server:

```bash
cd back-end
php -S localhost:8000
```

---

### 4. Frontend Setup

```bash
cd front-end
npm install
npm run dev
```

The React app will be available at `http://localhost:5173`

---

## 🔗 API Endpoints

| Method | Endpoint            | Description          |
|--------|---------------------|----------------------|
| POST   | `/login.php`        | User login           |
| POST   | `/register.php`     | User registration    |
| POST   | `/add_stagaire.php` | Add a new stagiaire  |
| GET    | `/list-stagaire.php`| List all stagiaires  |
| GET    | `/list_groupes.php` | List all groups      |

---

## 🔒 Security Note

The `connexion.php` file is excluded from the repository via `.gitignore` to protect database credentials. Always create it manually on each environment.

---

## 👤 Author

**Salah Baha** — [@bahasalah255](https://github.com/bahasalah255)
