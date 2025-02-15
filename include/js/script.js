document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector(".menu-toggle")
  const navLinks = document.querySelector(".nav-links")

  // Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active")
    navLinks.classList.toggle("active")
  })

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
      // Close mobile menu after clicking a link
      menuToggle.classList.remove("active")
      navLinks.classList.remove("active")
    })
  })

  // Animated counter for years of experience
  const counterElement = document.createElement("div")
  counterElement.className = "experience-counter"
  counterElement.textContent = "0 años de experiencia"
  document.querySelector("#por-que-elegirnos").appendChild(counterElement)

  const animateCounter = (target, duration) => {
    let start = 0
    const increment = target / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      counterElement.textContent = `${Math.floor(start)} años de experiencia`
      if (start >= target) {
        clearInterval(timer)
        counterElement.textContent = `${target} años de experiencia`
      }
    }, 16)
  }

  // Trigger animation when element is in view
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(10, 2000) // 10 years, 2 seconds duration
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.5 },
  )

  observer.observe(counterElement)

  // Form submission handling
  const form = document.getElementById("contact-form")
  form.addEventListener("submit", (e) => {
    e.preventDefault()
    // Here you would typically send the form data to a server
    alert("¡Gracias por tu mensaje! Te contactaremos pronto.")
    form.reset()
  })

  // Emergency button effect
  const auxilioBtn = document.getElementById("auxilio-btn")
  auxilioBtn.addEventListener("click", () => {
    auxilioBtn.classList.add("emergency-pulse")
    setTimeout(() => {
      auxilioBtn.classList.remove("emergency-pulse")
      alert("Llamando a servicios de emergencia...")
      // Here you would typically initiate an emergency call or notification
    }, 1000)
  })

  // Animación de texto de beneficios
  const textAnimationBenefits = document.getElementById("text-animation")
  const benefits = [",Te acompaña en cada etapa", ",Seguridad en tu camino", ",Respuesta rápida 24/7"]
  let benefitIndex = 0
  let charIndex = 0
  let isDeleting = false

  function typeEffectBenefits() {
    const currentBenefit = benefits[benefitIndex]

    if (isDeleting) {
      textAnimationBenefits.innerHTML = currentBenefit.substring(0, charIndex - 1) + '<span class="cursor"></span>'
      charIndex--
    } else {
      textAnimationBenefits.innerHTML = currentBenefit.substring(0, charIndex + 1) + '<span class="cursor"></span>'
      charIndex++
    }

    if (!isDeleting && charIndex === currentBenefit.length) {
      isDeleting = true
      setTimeout(typeEffectBenefits, 1500) // Pausa antes de empezar a borrar
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false
      benefitIndex++
      if (benefitIndex === benefits.length) {
        textAnimationBenefits.innerHTML = ""
        textAnimationBenefits.classList.remove("visible")
        setTimeout(startAnimationBenefits, 3000) // Espera antes de reiniciar la animación
        return
      }
      setTimeout(typeEffectBenefits, 500) // Pausa antes de la siguiente frase
    } else {
      setTimeout(typeEffectBenefits, isDeleting ? 50 : 100)
    }
  }

  function startAnimationBenefits() {
    benefitIndex = 0
    charIndex = 0
    isDeleting = false
    textAnimationBenefits.classList.add("visible")
    typeEffectBenefits()
  }

  // Inicia la animación después de un retraso inicial
  setTimeout(startAnimationBenefits, 2000)

  // Animación de texto
  //const textAnimation = document.getElementById("text-animation")
  //const phrases = [
  //  "Servicios Auxiliares Viales",
  //  "Te acompaña en cada etapa",
  //  "Seguridad en tu camino",
  //  "Respuesta rápida 24/7",
  //  "Optimiza tus rutas",
  //]
  //let phraseIndex = 0
  //let charIndex = 0
  //let isDeleting = false
  //let isPaused = false

  //function typeEffect() {
  //  const currentPhrase = phrases[phraseIndex]

  //  if (isDeleting) {
  //    textAnimation.innerHTML = currentPhrase.substring(0, charIndex - 1) + '<span class="cursor"></span>'
  //    charIndex--
  //  } else {
  //    textAnimation.innerHTML = currentPhrase.substring(0, charIndex + 1) + '<span class="cursor"></span>'
  //    charIndex++
  //  }

  //  if (!isDeleting && charIndex === currentPhrase.length) {
  //    isPaused = true
  //    setTimeout(() => {
  //      isPaused = false
  //      isDeleting = true
  //    }, 1500)
  //  } else if (isDeleting && charIndex === 0) {
  //    isDeleting = false
  //    phraseIndex = (phraseIndex + 1) % phrases.length
  //    setTimeout(() => {
  //      isPaused = false
  //    }, 500)
  //  }

  //  const typingSpeed = isDeleting ? 50 : 100
  //  if (!isPaused) {
  //    setTimeout(typeEffect, typingSpeed)
  //  } else {
  //    setTimeout(typeEffect, 1500)
  //  }
  //}

  //typeEffect()
})

