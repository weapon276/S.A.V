import { Chart } from "@/components/ui/chart"
document.addEventListener("DOMContentLoaded", () => {
  // Configuración común para los gráficos
  Chart.defaults.font.family = "'Inter', sans-serif"
  Chart.defaults.color = "#333333"

  // User dropdown functionality
  const userInfo = document.querySelector(".user-info")
  const userDropdown = document.querySelector(".user-dropdown")

  userInfo.addEventListener("click", (e) => {
    e.stopPropagation()
    userInfo.classList.toggle("active")
    userDropdown.classList.toggle("active")
  })

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    userInfo.classList.remove("active")
    userDropdown.classList.remove("active")
  })

  // Dark mode toggle
  const darkModeToggle = document.querySelector(".dark-mode-toggle")
  const body = document.body

  // Check for saved dark mode preference
  if (localStorage.getItem("darkMode") === "enabled") {
    body.classList.add("dark-mode")
  }

  darkModeToggle.addEventListener("click", () => {
    body.classList.toggle("dark-mode")

    // Save preference
    if (body.classList.contains("dark-mode")) {
      localStorage.setItem("darkMode", "enabled")
    } else {
      localStorage.setItem("darkMode", "disabled")
    }

    // Update charts for dark mode
    updateChartsTheme()
  })

  // Function to update charts theme
  function updateChartsTheme() {
    const isDarkMode = body.classList.contains("dark-mode")
    const textColor = isDarkMode ? "#ffffff" : "#333333"
    const gridColor = isDarkMode ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"

    Chart.defaults.color = textColor
    Chart.defaults.borderColor = gridColor

    // Update all charts
    Chart.instances.forEach((chart) => {
      // Update grid lines
      if (chart.options.scales?.x) {
        chart.options.scales.x.grid.color = gridColor
        chart.options.scales.y.grid.color = gridColor
      }

      // Update text colors
      if (chart.options.plugins?.legend) {
        chart.options.plugins.legend.labels.color = textColor
      }

      chart.update()
    })
  }

  // Estado de dispositivos
  const deviceStatusChart = new Chart(document.getElementById("deviceStatusChart"), {
    type: "doughnut",
    data: {
      labels: ["En buen estado", "Requieren atención", "En mal estado"],
      datasets: [
        {
          data: [1, 0, 0],
          backgroundColor: ["#4caf50", "#ff9800", "#f44336"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
          },
        },
      },
    },
  })

  // Estado de movimiento
  const movementStatusChart = new Chart(document.getElementById("movementStatusChart"), {
    type: "doughnut",
    data: {
      labels: [
        "Paradas",
        "Paradas con ignición",
        "En movimiento",
        "En movimiento con ignición",
        "Datos por LBS",
        "Datos por Wi-Fi",
        "No hay datos actuales",
        "No hay coordenadas",
      ],
      datasets: [
        {
          data: [0, 0, 0, 0, 0, 0, 1, 0],
          backgroundColor: ["#f44336", "#ff9800", "#4caf50", "#2196f3", "#9c27b0", "#00bcd4", "#9e9e9e", "#795548"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
          },
        },
      },
    },
  })

  // Consumido por FLS
  const consumptionChart = new Chart(document.getElementById("consumptionChart"), {
    type: "line",
    data: {
      labels: ["09 Feb", "10 Feb", "11 Feb", "12 Feb", "13 Feb", "14 Feb", "15 Feb"],
      datasets: [
        {
          label: "109-CURIER-CHIH",
          data: [0, 0.1, 0, 0, 0, 0, 0],
          borderColor: "#4caf50",
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 4,
        },
      },
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  })

  // Estado de conexión
  const connectionStatusChart = new Chart(document.getElementById("connectionStatusChart"), {
    type: "doughnut",
    data: {
      labels: ["Conectadas", "No conectadas"],
      datasets: [
        {
          data: [1, 0],
          backgroundColor: ["#4caf50", "#f44336"],
          borderWidth: 0,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      cutout: "70%",
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            padding: 20,
          },
        },
      },
    },
  })

  // Unidades con mayor kilometraje
  const mileageBarChart = new Chart(document.getElementById("mileageBarChart"), {
    type: "bar",
    data: {
      labels: ["109-CURIER-CHIH"],
      datasets: [
        {
          data: [531],
          backgroundColor: "#1976d2",
          barThickness: 20,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      indexAxis: "y",
      scales: {
        x: {
          beginAtZero: true,
          max: 600,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  })

  // Kilometraje
  const mileageLineChart = new Chart(document.getElementById("mileageLineChart"), {
    type: "line",
    data: {
      labels: ["09 Feb", "10 Feb", "11 Feb", "12 Feb", "13 Feb", "14 Feb", "15 Feb"],
      datasets: [
        {
          label: "109-CURIER-CHIH",
          data: [0, 120, 90, 95, 110, 85, 20],
          borderColor: "#4caf50",
          tension: 0.4,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          max: 140,
        },
      },
      plugins: {
        legend: {
          position: "bottom",
        },
      },
    },
  })

  // Interactividad de los filtros
  const filterBtns = document.querySelectorAll(".filter-btn")
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")
    })
  })

  // Actualización en tiempo real (simulada)
  setInterval(() => {
    // Actualizar datos aleatorios para simular cambios en tiempo real
    const randomValue = () => Math.floor(Math.random() * 100)

    deviceStatusChart.data.datasets[0].data = [randomValue(), randomValue(), randomValue()]
    deviceStatusChart.update()

    movementStatusChart.data.datasets[0].data = [
      randomValue(),
      randomValue(),
      randomValue(),
      randomValue(),
      randomValue(),
      randomValue(),
      randomValue(),
      randomValue(),
    ]
    movementStatusChart.update()

    // Actualizar línea de consumo
    const newData = consumptionChart.data.datasets[0].data.map(() => Math.random() * 4)
    consumptionChart.data.datasets[0].data = newData
    consumptionChart.update()

    // Actualizar estado de conexión
    connectionStatusChart.data.datasets[0].data = [randomValue(), randomValue()]
    connectionStatusChart.update()
  }, 5000)
})

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
  