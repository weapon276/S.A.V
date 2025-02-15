document.addEventListener("DOMContentLoaded", () => {
    const loadingOverlay = document.getElementById("loading-overlay")
    const loginForm = document.getElementById("loginForm")
    const registerForm = document.getElementById("registerForm")
  
    // Function to show loading overlay
    function showLoading() {
      loadingOverlay.classList.add("active")
    }
  
    // Function to hide loading overlay
    function hideLoading() {
      loadingOverlay.classList.remove("active")
    }
  
    // Function to simulate loading delay
    function simulateLoading(callback, duration = 2000) {
      showLoading()
      setTimeout(() => {
        hideLoading()
        callback()
      }, duration)
    }
  
    // Handle login form submission
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form data
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
  
        // Simulate API call
        simulateLoading(() => {
          // Here you would typically validate credentials with your backend
          // For demo purposes, we'll just redirect to dashboard
          window.location.href = "vista/dashboard.html"
        })
      })
    }
  
    // Handle registration form submission
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault()
  
        // Get form data
        const fullname = document.getElementById("fullname").value
        const email = document.getElementById("email").value
        const username = document.getElementById("username").value
        const password = document.getElementById("password").value
        const confirmPassword = document.getElementById("confirm-password").value
  
        // Basic validation
        if (password !== confirmPassword) {
          alert("Las contraseñas no coinciden")
          return
        }
  
        // Simulate API call
        simulateLoading(() => {
          // Here you would typically send registration data to your backend
          // For demo purposes, we'll just redirect to login
          window.location.href = "login.html"
        })
      })
    }
  
    // Show loading overlay on page navigation
    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", (e) => {
        // Only show loading for internal links
        if (link.href && link.href.startsWith(window.location.origin)) {
          e.preventDefault()
          simulateLoading(() => {
            window.location.href = link.href
          })
        }
      })
    })
  
    // Handle browser back/forward buttons
    window.addEventListener("popstate", () => {
      simulateLoading(() => {
        window.location.reload()
      })
    })
  })
  
  