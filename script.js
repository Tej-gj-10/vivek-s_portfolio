document.addEventListener("DOMContentLoaded", function () {
  const qrModal = document.getElementById("qrModal"); // QR Code Modal
  const vivekModal = document.getElementById("modal"); // Vivek Portfolio Modal
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const passwordInput = document.getElementById("passwordInput");
  const verifyBtn = document.getElementById("verifyBtn");
  const continueBtn = document.getElementById("continueBtn"); // Continue from QR modal

  let hasTyped = false;

  // Generate a new random password (8-digit number)
  const password = Math.floor(10000000 + Math.random() * 90000000).toString();
  console.log("Generated Password:", password); // Debugging

  // Show QR modal initially
  qrModal.style.display = "block";
  vivekModal.style.display = "none"; // Hide portfolio modal initially

  // Generate and display QR Code
  const qrCodeElement = document.getElementById("qrCode");
  qrCodeElement.src = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Your%20password%20is:%20${password}`;

  // Event Listener for Verify Button
  verifyBtn.addEventListener("click", function () {
    if (passwordInput.value === password) {
      continueBtn.style.display = "block"; // Show Continue button
      showToast("Correct Password. Click on the Continue.", "success");
    } else {
      showToast("Incorrect Password. Scan the QR code again.", "error");
    }
  });

  // Event Listener for Continue Button (From QR Modal)
  continueBtn.addEventListener("click", function () {
    qrModal.style.display = "none"; // Hide QR modal
    vivekModal.style.display = "block"; // Show Vivek modal
    startTypewriterEffect(); // Start typewriter effect after authentication
  });

  // Typewriter Effect for the Modal
  function startTypewriterEffect() {
    modalTitle.innerHTML = ""; // Clear title initially
    modalBody.innerHTML = `
      <p id="welcome-text"></p>
      <div class="button-container">
        <button id="final-continue-btn" class="continue-btn">Continue</button>
      </div>
    `;

    const titleText = "Vivek's Portfolio";
    const welcomeText = "Welcome to my Portfolio Website";

    let i = 0,
      j = 0;

    function typeWriterTitle() {
      if (i < titleText.length) {
        modalTitle.innerHTML += titleText.charAt(i);
        i++;
        setTimeout(typeWriterTitle, 70);
      } else {
        modalTitle.classList.add("glow");
        setTimeout(typeWriterWelcome, 500);
      }
    }

    function typeWriterWelcome() {
      const welcomeElement = document.getElementById("welcome-text");
      if (j < welcomeText.length) {
        welcomeElement.innerHTML += welcomeText.charAt(j);
        j++;
        setTimeout(typeWriterWelcome, 80);
      } else {
        welcomeElement.classList.add("glow");
      }
    }

    typeWriterTitle();

    // Close modal on final continue button click
    document
      .getElementById("final-continue-btn")
      .addEventListener("click", () => {
        vivekModal.style.display = "none";
      });
  }
});

// Mobile Navigation
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Animate links
  links.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });

  // Hamburger animation
  hamburger.classList.toggle("toggle");
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    navLinks.classList.remove("active");

    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Skills animation
const skillBars = document.querySelectorAll(".skill-progress");

const animateSkills = () => {
  skillBars.forEach((bar) => {
    const progress = bar.getAttribute("data-progress");
    bar.style.transform = `scaleX(${progress / 100})`;
  });
};

// Animate skills when they come into view
const skillsSection = document.querySelector("#skills");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateSkills();
      }
    });
  },
  { threshold: 0.5 }
);

if (skillsSection) {
  observer.observe(skillsSection);
}

// Form validation and submission
const contactForm = document.getElementById("contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Basic form validation
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    if (name && email && message) {
      // Here you would typically send the form data to a server
      showToast("Thank you for your message! I will get back to you soon.");
      contactForm.reset();
    } else {
      showToast("Please fill in all fields.");
    }
  });
}

// Add scroll reveal animations
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");

  sections.forEach((section) => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (sectionTop < windowHeight * 0.75) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }
  });
});

// Initialize sections with initial state
document.querySelectorAll("section").forEach((section) => {
  section.style.opacity = "0";
  section.style.transform = "translateY(20px)";
  section.style.transition = "all 0.5s ease";
});

// Lottie Animation setup
if (window.lottie) {
  const lottie = window.lottie;
  lottie.loadAnimation({
    container: document.getElementById("lottie-animation"),
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "lottie.json", // Replace with your Lottie animation JSON
  });
}

// Main portfolio modal functionality
const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalBody = document.getElementById("modal-body");
const closeBtn = document.getElementsByClassName("close")[0];
const demoLink = "https://www.netflix.com/in/";
const demoLink1 = "https://www.amazon.com/";

// Project demo buttons
document.querySelectorAll(".demo-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const demoType = btn.getAttribute("data-demo");

    if (modalTitle && modalBody && modal) {
      modalTitle.textContent = `Demo: ${demoType}`;
      modalBody.innerHTML = `
        <p>This is a demo for the ${demoType} project.</p>
        <p><a href="${demoLink}" target="_blank" class="demo-link">Click here to open the demo</a></p>
      `;
      modal.style.display = "block";
      showToast("Click on Demo for Web Demo", "success");
    }
  });
});

document.querySelectorAll(".demo-btn1").forEach((btn) => {
  btn.addEventListener("click", () => {
    const demoType = btn.getAttribute("data-demo");

    if (modalTitle && modalBody && modal) {
      modalTitle.textContent = `Demo: ${demoType}`;
      modalBody.innerHTML = `
      <p>This is a demo for the ${demoType} project.</p>
      <p><a href="${demoLink1}" target="_blank" class="demo-link">Click here to open the demo</a></p>
      `;
      showToast("Click on Demo for web Demo", "success");
      modal.style.display = "block";
    }
  });
});

// Code buttons functionality
document.querySelectorAll(".code-btn, .code-btn1").forEach((btn) => {
  btn.addEventListener("click", () => {
    const codeLink = btn.getAttribute("data-code-link");

    if (codeLink && modalTitle && modalBody && modal) {
      modalTitle.textContent = "Code Link";
      modalBody.innerHTML = `
        <p>Click the link below to view the code:</p>
        <p><a href="${codeLink}" target="_blank" class="demo-link">${codeLink}</a></p>
      `;
      modal.style.display = "block";
      showToast("Click on following Link For code", "success");
    } else {
      showToast("Code link not available.", "error");
    }
  });
});

// Close modal functionality
if (closeBtn && modal) {
  closeBtn.onclick = () => {
    modal.style.display = "none";
  };

  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent page refresh

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    const ownerNumber = "919327370047"; // Portfolio owner's WhatsApp number

    if (!name || !email || !message) {
      showToast("❌ Please fill in all fields!", "error");
      return;
    }

    showToast("ℹ️ Submitting your message...", "info"); // Show info toast

    setTimeout(() => {
      showToast("✅ Message sent successfully!", "success"); // Show success toast

      setTimeout(() => {
        // Open WhatsApp after success toast appears
        const whatsappMessage = `Hello, I am ${name}.\nEmail: ${email}\n\nMessage: ${message}`;
        const whatsappURL = `https://wa.me/${ownerNumber}?text=${encodeURIComponent(
          whatsappMessage
        )}`;
        window.open(whatsappURL, "_blank"); // Opens WhatsApp in a new tab
      }, 1000); // 1s delay after success toast
    }, 3000); // 3s delay for success toast
  });
});

function showToast(message, type = "success") {
  const toastContainer = document.getElementById("toast-container");

  // Create toast element
  const toast = document.createElement("div");
  toast.classList.add("toast", type);

  // Icons based on type
  let icon;
  if (type === "success") icon = "✅"; // Unicode checkmark
  if (type === "error") icon = "❌"; // Unicode cross
  if (type === "info") icon = "ℹ️"; // Unicode info
  if (type === "warning") icon = "⚠️"; // Unicode warning

  toast.innerHTML = `<span>${icon}</span> ${message}`;
  toastContainer.appendChild(toast);

  // Remove toast after 3 seconds
  setTimeout(() => {
    toast.style.animation = "fade-out 0.5s ease-in-out forwards";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

document.addEventListener("DOMContentLoaded", function () {
  const passwordInput = document.getElementById("passwordInput");
  const eyeIcon = document.querySelector(".form-group img"); // Select the eye icon

  if (passwordInput && eyeIcon) {
    eyeIcon.addEventListener("click", function () {
      if (passwordInput.type === "password") {
        passwordInput.type = "text";
        eyeIcon.src = "Assests/eye.svg"; // Open eye
      } else {
        passwordInput.type = "password";
        eyeIcon.src = "Assests/eye-crossed.svg"; // Closed eye
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const socialLinks = document.querySelectorAll(".social-link");

  socialLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault(); // Prevent immediate navigation

      const url = this.getAttribute("href");
      const platform = this.innerText.trim(); // Get the platform name (Instagram, Telegram, etc.)

      showToast(` Opening ${platform}...`, "info"); // Show info toast

      setTimeout(() => {
        showToast(` ${platform} opened successfully!`, "success"); // Show success toast

        setTimeout(() => {
          window.open(url, "_blank"); // Open link after success toast
        }, 1000); // Delay for 1s
      }, 3000); // Delay for 3s
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const image = document.querySelector(".img"); // Select the profile image
  const modal = document.getElementById("modal"); // Modal to show the image
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close");

  if (image && modal) {
    image.addEventListener("click", function () {
      modalTitle.textContent = "Profile Picture"; // Set title
      modalBody.innerHTML = `<img src="${this.src}" alt="Profile" style="width:100%; border-radius:10px;">`;
      modal.style.display = "block"; // Show modal

      showToast("📷 Image opened!", "info"); // Show toast
    });

    // Close modal on clicking close button
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // Close modal when clicking outside of the content
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
        showToast(" Image closed!", "error");
      }
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const image = document.querySelector(".img1"); // Select the profile image
  const modal = document.getElementById("modal"); // Modal to show the image
  const modalTitle = document.getElementById("modal-title");
  const modalBody = document.getElementById("modal-body");
  const closeBtn = document.querySelector(".close");

  if (image && modal) {
    image.addEventListener("click", function () {
      modalTitle.textContent = "Profile Picture"; // Set title
      modalBody.innerHTML = `<img src="${this.src}" alt="Profile" style="width:100%; border-radius:10px;">`;
      modal.style.display = "block"; // Show modal

      showToast("📷 Image modal is opened!", "info"); // Show toast
    });

    // Close modal on clicking close button
    closeBtn.addEventListener("click", function () {
      modal.style.display = "none";
    });

    // Close modal when clicking outside of the content
    window.addEventListener("click", function (event) {
      if (event.target === modal) {
        modal.style.display = "none";
        showToast(" Image modal is  closed!", "error");
      }
    });
  }
});
