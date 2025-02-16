<?php
session_start();
require_once 'conexion.php';

// Si ya hay una sesión activa, redirigir al dashboard
if(isset($_SESSION['usuario_id'])) {
    header("Location: dashboard.html");
    exit();
}

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $correo = filter_var($_POST['correo'], FILTER_SANITIZE_EMAIL);
    $contrasena = $_POST['contrasena'];
    
    if (empty($correo) || empty($contrasena)) {
        $error = "Por favor complete todos los campos";
    } else {
        try {
            $stmt = $conn->prepare("SELECT id_usuario, nombre, contrasena, tipo FROM usuarios WHERE correo = :correo");
            $stmt->bindParam(':correo', $correo);
            $stmt->execute();
            
            if ($usuario = $stmt->fetch(PDO::FETCH_ASSOC)) {
                if (password_verify($contrasena, $usuario['contrasena'])) {
                    // Iniciar sesión
                    $_SESSION['usuario_id'] = $usuario['id_usuario'];
                    $_SESSION['nombre'] = $usuario['nombre'];
                    $_SESSION['tipo'] = $usuario['tipo'];
                    
                    // Registrar el último acceso
                    $stmt = $conn->prepare("UPDATE usuarios SET ultimo_acceso = CURRENT_TIMESTAMP WHERE id_usuario = :id");
                    $stmt->bindParam(':id', $usuario['id_usuario']);
                    $stmt->execute();
                    
                    header("Location: dashboard.html");
                    exit();
                } else {
                    $error = "Credenciales incorrectas";
                }
            } else {
                $error = "Credenciales incorrectas";
            }
        } catch(PDOException $e) {
            $error = "Error en el sistema. Por favor intente más tarde.";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAV - Iniciar Sesión</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="include/css/login.css">
</head>
<body>
    <!-- Loading Overlay -->
    <div id="loading-overlay" class="loading-overlay">
        <div class="gps-loader">
            <i class="fas fa-satellite-dish"></i>
            <div class="gps-signals">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <p>Conectando...</p>
    </div>

    <div class="auth-container">
        <div class="auth-card">
            <div class="logo-container">
                <img src="" alt="SAV Logo" class="logo">
            </div>
            
            <?php if($error): ?>
            <div class="alert alert-error">
                <?php echo htmlspecialchars($error); ?>
            </div>
            <?php endif; ?>

            <?php if($success): ?>
            <div class="alert alert-success">
                <?php echo htmlspecialchars($success); ?>
            </div>
            <?php endif; ?>
            
            <form id="loginForm" class="auth-form" method="POST" action="login.php">
                <div class="form-group">
                    <label for="correo">Correo electrónico:</label>
                    <input type="email" id="correo" name="correo" required>
                </div>

                <div class="form-group">
                    <label for="contrasena">Contraseña:</label>
                    <input type="password" id="contrasena" name="contrasena" required>
                </div>

                <div class="form-group checkbox">
                    <input type="checkbox" id="remember" name="remember">
                    <label for="remember">Recordar</label>
                </div>

                <button type="submit" class="auth-button">Iniciar sesión</button>

                <div class="auth-links">
                    <a href="recuperar.php" class="forgot-password">¿Ha olvidado su contraseña?</a>
                    <span class="divider">|</span>
                    <a href="registro.php" class="register-link">Registrarse</a>
                </div>
            </form>
        </div>
    </div>

    <script src="include/js/logins.js"></script>
</body>
</html>

