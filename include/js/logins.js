document.addEventListener("DOMContentLoaded", () => {
  const loadingOverlay = document.getElementById("loading-overlay")
  const loginForm = document.getElementById("loginForm")
  const registerForm = document.getElementById("registerForm")

  // Función para mostrar el overlay de carga
  function showLoading() {
    loadingOverlay.classList.add("active")
  }

  // Función para ocultar el overlay de carga
  function hideLoading() {
    loadingOverlay.classList.remove("active")
  }

  // Validación del formulario de registro
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      const password = document.getElementById("contrasena").value
      const confirmPassword = document.getElementById("confirmar_contrasena").value
      const telefono = document.getElementById("telefono").value

      // Validar contraseña
      if (password.length < 8) {
        e.preventDefault()
        alert("La contraseña debe tener al menos 8 caracteres")
        return
      }

      // Validar que las contraseñas coincidan
      if (password !== confirmPassword) {
        e.preventDefault()
        alert("Las contraseñas no coinciden")
        return
      }

      // Validar formato de teléfono (10 dígitos)
      const telefonoRegex = /^\d{10}$/
      if (!telefonoRegex.test(telefono)) {
        e.preventDefault()
        alert("Por favor ingrese un número de teléfono válido (10 dígitos)")
        return
      }

      showLoading()
    })
  }

  // Validación del formulario de login
  if (loginForm) {
    loginForm.addEventListener("submit", () => {
      showLoading()
    })
  }

  // Mostrar overlay de carga en navegación
  document.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (link.href && !link.href.includes("#")) {
        showLoading()
      }
    })
  })
})

