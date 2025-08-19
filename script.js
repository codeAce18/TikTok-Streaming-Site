
// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", () => {
  // Initialize animations
  initScrollAnimations()

  // Initialize FAQ functionality
  initFAQ()

  // Initialize countdown timer
  initCountdown()

  // Initialize charts
  initCharts()

  // Initialize checkbox interactions
  initCheckboxes()
})

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.3, 
    rootMargin: "0px 0px 0px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add animation classes to elements
  const animatedElements = document.querySelectorAll(
    ".feature-card, .why-card, .example-card, .testimonial-card, .step-card, .campaign-card",
  )

  animatedElements.forEach((el, index) => {
    el.classList.add("fade-in")
    // el.style.transitionDelay = `${index * 0.05}s`
    observer.observe(el)
  })

  // Add slide animations to specific sections
  const leftSlideElements = document.querySelectorAll(".about-text")
  leftSlideElements.forEach((el) => {
    el.classList.add("slide-in-left")
    observer.observe(el)
  })

  const rightSlideElements = document.querySelectorAll(".about-image")
  rightSlideElements.forEach((el) => {
    el.classList.add("slide-in-right")
    observer.observe(el)
  })

  const scaleElements = document.querySelectorAll(".chart-container, .chart-wrapper")
  scaleElements.forEach((el) => {
    el.classList.add("scale-in")
    observer.observe(el)
  })
}

// FAQ functionality
function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active")

      // Close all FAQ items
      faqItems.forEach((faq) => {
        faq.classList.remove("active")
      })

      // Open clicked item if it wasn't active
      if (!isActive) {
        item.classList.add("active")
      }
    })
  })
}

// Countdown timer
function initCountdown() {
  const countdownDate =
    new Date().getTime() + 7 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 30 * 60 * 1000 + 22 * 1000

  const timer = setInterval(() => {
    const now = new Date().getTime()
    const distance = countdownDate - now

    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    document.getElementById("days").textContent = days
    document.getElementById("hours").textContent = hours
    document.getElementById("minutes").textContent = minutes
    document.getElementById("seconds").textContent = seconds

    if (distance < 0) {
      clearInterval(timer)
      document.querySelector(".countdown-timer").innerHTML =
        '<div style="color: white; font-size: 18px;">キャンペーン終了</div>'
    }
  }, 1000)
}

// Charts initialization
function initCharts() {
  // Growth chart
  const growthCtx = document.getElementById("growthChart")
  if (growthCtx) {
    new Chart(growthCtx, {
      type: "bar",
      data: {
        labels: ["2020", "2021", "2022", "2023", "2024", "2025"],
        datasets: [
          {
            label: "TikTokライブ市場規模",
            data: [100, 300, 700, 1200, 1800, 2500],
            backgroundColor: "#ff0050",
            borderRadius: 8,
            borderSkipped: false,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              callback: (value) => value,
            },
          },
        },
      },
    })
  }

  // Pie charts for work examples
  const chartConfigs = [
    {
      id: "chart1",
      data: [45, 35, 20],
      colors: ["#ff0050", "#4ecdc4", "#95a5a6"],
    },
    {
      id: "chart2",
      data: [40, 40, 20],
      colors: ["#ff0050", "#4ecdc4", "#95a5a6"],
    },
    {
      id: "chart3",
      data: [35, 45, 20],
      colors: ["#ff0050", "#4ecdc4", "#95a5a6"],
    },
  ]

  chartConfigs.forEach((config) => {
    const ctx = document.getElementById(config.id)
    if (ctx) {
      new Chart(ctx, {
        type: "doughnut",
        data: {
          datasets: [
            {
              data: config.data,
              backgroundColor: config.colors,
              borderWidth: 0,
              cutout: "70%",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
      })
    }
  })

  // Comparison charts
 // Plugin to draw text inside the doughnut
const centerTextPlugin = {
  id: "centerText",
  beforeDraw(chart) {
    const { width, height } = chart;
    const ctx = chart.ctx;
    ctx.save();

    const lines = chart.config.options.plugins.centerText?.lines || [];

    if (lines.length) {
      let totalHeight = 0;
      // calculate total text block height
      lines.forEach((line) => {
        totalHeight += line.fontSize * 1.2; // line-height factor
      });

      let y = height / 2 - totalHeight / 2; // start from top of center block

      lines.forEach((line) => {
        const fontFamily = line.fontFamily || "sans-serif"; // 👈 allow custom font
        ctx.font = `${line.fontSize}px '${fontFamily}'`;
        ctx.fillStyle = line.color || "#000";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(line.text, width / 2, y);
        y += line.fontSize * 1.2; // move down for next line
      });
    }

    ctx.restore();
  },
};


// Hybrid chart
const hybridCtx = document.getElementById("hybridChart");
if (hybridCtx) {
  new Chart(hybridCtx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [45, 28, 27],
          backgroundColor: ["#ff0050", "#4ecdc4", "#95a5a6"],
          borderWidth: 0,
          cutout: "80%",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        centerText: {
          lines: [
            { text: "45%", fontSize: 30, color: "#FF0050", fontFamily: "Noto Serif JP" },
            { text: "20万円以上", fontSize: 14, color: "#333333", fontFamily: "Noto Serif JP" },
          ],
        },
      },
    },
    plugins: [centerTextPlugin],
  });
}

// Others chart
const othersCtx = document.getElementById("othersChart");
if (othersCtx) {
  new Chart(othersCtx, {
    type: "doughnut",
    data: {
      datasets: [
        {
          data: [20, 80],
          backgroundColor: ["#ff0050", "#95a5a6"],
          borderWidth: 0,
          cutout: "80%",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        centerText: {
          lines: [
            { text: "20%", fontSize: 30, color: "#FF0050", fontFamily: "Noto Serif JP" },
            { text: "20万円以上", fontSize: 14, color: "#333333", fontFamily: "Noto Serif JP" },
          ],
        },
      },
    },
    plugins: [centerTextPlugin],
  });
}



// Checkbox interactions
function initCheckboxes() {
  const checkboxes = document.querySelectorAll('.cta-option input[type="checkbox"]')

  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", function () {
      const option = this.closest(".cta-option")
      if (this.checked) {
        option.style.background = "#ffb3d1"
        option.style.transform = "scale(1.02)"
      } else {
        option.style.background = "#ffe8f0"
        option.style.transform = "scale(1)"
      }
    })
  })
}

// Button click animations
document.addEventListener("click", (e) => {
  if (e.target.matches("button") || e.target.closest("button")) {
    const button = e.target.matches("button") ? e.target : e.target.closest("button")

    // Create ripple effect
    const ripple = document.createElement("span")
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = e.clientX - rect.left - size / 2
    const y = e.clientY - rect.top - size / 2

    ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s ease-out;
            pointer-events: none;
        `

    button.style.position = "relative"
    button.style.overflow = "hidden"
    button.appendChild(ripple)

    setTimeout(() => {
      ripple.remove()
    }, 600)
  }
})

// Add ripple animation CSS
const style = document.createElement("style")
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`
document.head.appendChild(style)

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)"
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)"
    navbar.style.boxShadow = "none"
  }
})

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroImage = document.querySelector(".hero-image")
  if (heroImage) {
    heroImage.style.transform = `translateY(${scrolled * 0.5}px)`
  }
})

// Loading animation
window.addEventListener("load", () => {
  document.body.style.opacity = "0"
  document.body.style.transition = "opacity 0.5s ease"

  setTimeout(() => {
    document.body.style.opacity = "1"
  }, 100)
})}
