<?php
session_start();
require_once 'conexion.php';

// Verificar la conexión
if (!$conn) {
    die("Error de conexión a la base de datos.");
}

// Si ya hay una sesión activa, redirigir al dashboard
if (isset($_SESSION['usuario_id'])) {
    header("Location: dashboard.html");
    exit();
}

$error = '';
$success = '';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Sanitización y validación de entradas
    $nombre = htmlspecialchars(trim($_POST['nombre']));
    $correo = filter_var(trim($_POST['correo']), FILTER_SANITIZE_EMAIL);
    $telefono = htmlspecialchars(trim($_POST['telefono']));
    $contrasena = trim($_POST['contrasena']);
    $confirmar_contrasena = trim($_POST['confirmar_contrasena']);
    $tipo = htmlspecialchars(trim($_POST['tipo']));

    // Validaciones
    if (empty($nombre) || empty($correo) || empty($telefono) || empty($contrasena) || empty($confirmar_contrasena) || empty($tipo)) {
        $error = "Por favor, complete todos los campos.";
    } elseif (!filter_var($correo, FILTER_VALIDATE_EMAIL)) {
        $error = "Por favor, ingrese un correo válido.";
    } elseif ($contrasena !== $confirmar_contrasena) {
        $error = "Las contraseñas no coinciden.";
    } elseif (strlen($contrasena) < 8) {
        $error = "La contraseña debe tener al menos 8 caracteres.";
    } else {
        try {
            // Configurar PDO para lanzar excepciones
            $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

            // Verificar si el correo ya está registrado
            $stmt = $conn->prepare("SELECT id_usuario FROM usuarios WHERE correo = :correo");
            $stmt->bindParam(':correo', $correo, PDO::PARAM_STR);
            $stmt->execute();

            if ($stmt->fetch()) {
                $error = "Este correo ya está registrado.";
            } else {
                // Hash de la contraseña
                $hash = password_hash($contrasena, PASSWORD_DEFAULT);

                // Insertar nuevo usuario
                $stmt = $conn->prepare("INSERT INTO usuarios (nombre, correo, telefono, contrasena, tipo) VALUES (:nombre, :correo, :telefono, :contrasena, :tipo)");
                $stmt->bindParam(':nombre', $nombre, PDO::PARAM_STR);
                $stmt->bindParam(':correo', $correo, PDO::PARAM_STR);
                $stmt->bindParam(':telefono', $telefono, PDO::PARAM_STR);
                $stmt->bindParam(':contrasena', $hash, PDO::PARAM_STR);
                $stmt->bindParam(':tipo', $tipo, PDO::PARAM_STR);

                if ($stmt->execute()) {
                    $success = "Registro exitoso. Redirigiendo...";
                    header("refresh:2;url=login.php");
                    exit();
                } else {
                    $error = "Error al registrar el usuario.";
                }
            }
        } catch (PDOException $e) {
            $error = "Error en la base de datos: " . $e->getMessage();
        }
    }
}
?>


<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SAV - Registro</title>
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
        <p>Procesando registro...</p>
    </div>

    <div class="auth-container">
        <div class="auth-card">
            <div class="logo-container">
                <img src="" alt="SAV Logo" class="logo">
            </div>
            
            <?php if (!empty($error)): ?>
            <div class="alert alert-error">
                <?php echo htmlspecialchars($error); ?>
            </div>
            <?php endif; ?>

            <?php if (!empty($success)): ?>
            <div class="alert alert-success">
                <?php echo htmlspecialchars($success); ?>
            </div>
            <?php endif; ?>
            
            <form id="registerForm" class="auth-form" method="POST" action="registro.php">
                <div class="form-group">
                    <label for="nombre">Nombre completo:</label>
                    <input type="text" id="nombre" name="nombre" required>
                </div>

                <div class="form-group">
                    <label for="correo">Correo electrónico:</label>
                    <input type="email" id="correo" name="correo" required>
                </div>

                <div class="form-group">
                    <label for="telefono">Teléfono:</label>
                    <input type="tel" id="telefono" name="telefono" required>
                </div>

                <div class="form-group">
                    <label for="tipo">Tipo de usuario:</label>
                    <select id="tipo" name="tipo" required>
                        <option value="">Seleccione un tipo</option>
                        <option value="conductor">Conductor</option>
                        <option value="operador">Operador</option>
                        <option value="administrador">Administrador</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="contrasena">Contraseña:</label>
                    <input type="password" id="contrasena" name="contrasena" required>
                </div>

                <div class="form-group">
                    <label for="confirmar_contrasena">Confirmar contraseña:</label>
                    <input type="password" id="confirmar_contrasena" name="confirmar_contrasena" required>
                </div>

                <button type="submit" class="auth-button">Registrarse</button>

                <div class="auth-links">
                    <a href="login.php" class="login-link">¿Ya tiene una cuenta? Iniciar sesión</a>
                </div>
            </form>
        </div>
    </div>

    <script src="include/js/logins.js"></script>
</body>
</html>
