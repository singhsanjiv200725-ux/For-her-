// Global navigation and interaction functionality
class SiteNavigation {
  constructor() {
    this.currentPage = this.getCurrentPage()
    this.initializeNavigation()
    this.addSmoothScrolling()
    this.addPageTransitions()
  }

  getCurrentPage() {
    const path = window.location.pathname
    if (path.includes("gallery")) return "gallery"
    if (path.includes("ma.html")) return "music"
    if (path.includes("about")) return "about"
    return "home"
  }

  initializeNavigation() {
    // Add active state to current page navigation
    const navLinks = document.querySelectorAll(".nav_link a")
    navLinks.forEach((link) => {
      const href = link.getAttribute("href")
      if (this.isCurrentPage(href)) {
        link.classList.add("active")
      }

      // Add click tracking
      link.addEventListener("click", (e) => {
        console.log(`[v0] Navigating to: ${href}`)
        this.addPageTransition()
      })
    })

    // Add mobile menu toggle if needed
    this.addMobileMenuToggle()
  }

  isCurrentPage(href) {
    if (href.includes("index.html") && this.currentPage === "home") return true
    if (href.includes("gallery") && this.currentPage === "gallery") return true
    if (href.includes("ma.html") && this.currentPage === "music") return true
    if (href.includes("about") && this.currentPage === "about") return true
    return false
  }

  addSmoothScrolling() {
    // Add smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const target = document.querySelector(this.getAttribute("href"))
        if (target) {
          target.scrollIntoView({
            behavior: "smooth",
            block: "start",
          })
        }
      })
    })
  }

  addPageTransitions() {
    // Add fade-in effect when page loads
    document.body.style.opacity = "0"
    document.body.style.transition = "opacity 0.3s ease-in-out"

    window.addEventListener("load", () => {
      document.body.style.opacity = "1"
    })
  }

  addPageTransition() {
    // Add fade-out effect when leaving page
    document.body.style.opacity = "0.8"
  }

  addMobileMenuToggle() {
    // Check if we need mobile menu functionality
    const navContent = document.querySelector(".nav_content")
    if (!navContent) return

    // Add mobile responsiveness
    const checkMobile = () => {
      if (window.innerWidth <= 768) {
        navContent.classList.add("mobile")
      } else {
        navContent.classList.remove("mobile")
      }
    }

    window.addEventListener("resize", checkMobile)
    checkMobile()
  }
}

// Heart animation for romantic touch
class HeartAnimations {
  constructor() {
    this.createFloatingHearts()
    this.addHeartHoverEffects()
  }

  createFloatingHearts() {
    // Create floating hearts animation
    const heartsContainer = document.createElement("div")
    heartsContainer.className = "floating-hearts"
    heartsContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 1;
    `
    document.body.appendChild(heartsContainer)

    // Generate hearts periodically
    setInterval(() => {
      if (Math.random() < 0.3) {
        // 30% chance every interval
        this.createHeart(heartsContainer)
      }
    }, 3000)
  }

  createHeart(container) {
    const heart = document.createElement("div")
    heart.innerHTML = "♥"
    heart.style.cssText = `
      position: absolute;
      color: #d46a84;
      font-size: ${Math.random() * 20 + 10}px;
      left: ${Math.random() * 100}%;
      top: 100%;
      opacity: 0.7;
      animation: floatUp 4s ease-out forwards;
      pointer-events: none;
    `

    container.appendChild(heart)

    // Remove heart after animation
    setTimeout(() => {
      if (heart.parentNode) {
        heart.parentNode.removeChild(heart)
      }
    }, 4000)
  }

  addHeartHoverEffects() {
    // Add heart effects to interactive elements
    const interactiveElements = document.querySelectorAll("button, .music-item, .gridimg, .note")

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        this.createHeartBurst(element)
      })
    })
  }

  createHeartBurst(element) {
    const rect = element.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        const heart = document.createElement("div")
        heart.innerHTML = "♥"
        heart.style.cssText = `
          position: fixed;
          color: #e28f9a;
          font-size: 12px;
          left: ${centerX}px;
          top: ${centerY}px;
          opacity: 1;
          pointer-events: none;
          z-index: 1000;
          animation: heartBurst 1s ease-out forwards;
        `
        document.body.appendChild(heart)

        setTimeout(() => {
          if (heart.parentNode) {
            heart.parentNode.removeChild(heart)
          }
        }, 1000)
      }, i * 100)
    }
  }
}

// Love message system
class LoveMessages {
  constructor() {
    this.messages = [
      "You make my heart skip a beat",
      "Every moment with you is magical",
      "You are my sunshine on cloudy days",
      "My love for you grows stronger every day",
      "You are my favorite notification",
      "With you, every day feels like Valentine's Day",
      "You are my happy place",
      "I love you more than words can express",
    ]
    this.showRandomMessage()
  }

  showRandomMessage() {
    // Show a random love message occasionally
    setTimeout(
      () => {
        if (Math.random() < 0.3) {
          this.displayMessage()
        }
        // Schedule next check
        this.showRandomMessage()
      },
      Math.random() * 30000 + 15000,
    ) // Between 15-45 seconds
  }

  displayMessage() {
    const message = this.messages[Math.floor(Math.random() * this.messages.length)]
    const messageEl = document.createElement("div")
    messageEl.textContent = message
    messageEl.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(255, 238, 242, 0.95);
      color: #684c59;
      padding: 15px 20px;
      border-radius: 25px;
      border: 1px solid #d46a84;
      font-family: "Cormorant Garamond", serif;
      font-size: 0.9rem;
      font-style: italic;
      box-shadow: 0 4px 12px rgba(212, 106, 132, 0.3);
      z-index: 1000;
      opacity: 0;
      transform: translateX(100%);
      transition: all 0.5s ease;
      max-width: 250px;
      text-align: center;
    `

    document.body.appendChild(messageEl)

    // Animate in
    setTimeout(() => {
      messageEl.style.opacity = "1"
      messageEl.style.transform = "translateX(0)"
    }, 100)

    // Animate out
    setTimeout(() => {
      messageEl.style.opacity = "0"
      messageEl.style.transform = "translateX(100%)"
      setTimeout(() => {
        if (messageEl.parentNode) {
          messageEl.parentNode.removeChild(messageEl)
        }
      }, 500)
    }, 4000)

    console.log(`[v0] Showing love message: ${message}`)
  }
}

// Initialize all functionality when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new SiteNavigation()
  new HeartAnimations()
  new LoveMessages()

  // Add CSS animations
  const style = document.createElement("style")
  style.textContent = `
    @keyframes floatUp {
      0% {
        transform: translateY(0) rotate(0deg);
        opacity: 0.7;
      }
      100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
      }
    }

    @keyframes heartBurst {
      0% {
        transform: scale(1) translateY(0);
        opacity: 1;
      }
      100% {
        transform: scale(1.5) translateY(-30px);
        opacity: 0;
      }
    }

    .nav_link a.active {
      color: #d46a84 !important;
      font-weight: 600;
    }

    .nav_content.mobile {
      flex-direction: column;
      gap: 10px;
    }

    .nav_content.mobile .nav_link ul {
      flex-direction: column;
      gap: 5px;
    }

    /* Smooth transitions for all interactive elements */
    button, .music-item, .gridimg, .note, .nav_link a {
      transition: all 0.3s ease;
    }

    /* Loading animation */
    body {
      animation: fadeIn 0.5s ease-in;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
  `
  document.head.appendChild(style)

  console.log("[v0] Site navigation and interactions initialized")
})
