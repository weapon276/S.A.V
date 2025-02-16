<?php
session_start();

// Verificar si el usuario está autenticado
if (!isset($_SESSION['usuario_id'])) {
    // Si no hay sesión activa, redirigir al login
    header("Location: login.php");
    exit();
}

// Función para verificar el tipo de usuario
function verificarTipoUsuario($tipos_permitidos) {
    if (!isset($_SESSION['tipo']) || !in_array($_SESSION['tipo'], $tipos_permitidos)) {
        header("Location: acceso_denegado.php");
        exit();
    }
}
?>

