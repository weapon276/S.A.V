// Variables globales
let searchMarker = null;
let routeLayer = null;
let trafficLayer = null;

// Buscar ubicación en el mapa
document.getElementById("search").addEventListener("keypress", async (e) => {
  if (e.key === "Enter") {
    const query = e.target.value;
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const results = await response.json();
    
    if (results.length > 0) {
      const { lat, lon, display_name } = results[0];
      
      if (searchMarker) {
        searchMarker.remove();
      }
      
      searchMarker = L.marker([lat, lon]).addTo(map)
        .bindPopup(display_name)
        .openPopup();
      
      map.setView([lat, lon], 14);
    }
  }
});

// Planificar ruta usando OSRM
document.getElementById("calculateRoute").addEventListener("click", async () => {
  const start = document.getElementById("startPoint").value;
  const end = document.getElementById("endPoint").value;

  if (!start || !end) return;
  
  const startRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${start}`);
  const endRes = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${end}`);
  
  const startData = await startRes.json();
  const endData = await endRes.json();
  
  if (startData.length > 0 && endData.length > 0) {
    const startCoords = [startData[0].lat, startData[0].lon];
    const endCoords = [endData[0].lat, endData[0].lon];
    
    const osrmRoute = await fetch(`https://router.project-osrm.org/route/v1/driving/${startCoords[1]},${startCoords[0]};${endCoords[1]},${endCoords[0]}?overview=full&geometries=geojson`);
    const routeData = await osrmRoute.json();
    
    if (routeData.routes.length > 0) {
      const routeCoords = routeData.routes[0].geometry.coordinates.map(coord => [coord[1], coord[0]]);
      
      if (routeLayer) {
        routeLayer.remove();
      }
      
      routeLayer = L.polyline(routeCoords, { color: 'blue', weight: 4 }).addTo(map);
      map.fitBounds(routeLayer.getBounds());
    }
  }
});

// Activar tráfico en tiempo real
document.getElementById("toggleTraffic").addEventListener("click", () => {
  if (trafficLayer) {
    map.removeLayer(trafficLayer);
    trafficLayer = null;
  } else {
    trafficLayer = L.tileLayer("https://{s}.tile.opentrafficmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenTrafficMap contributors"
    }).addTo(map);
  }
});
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
  