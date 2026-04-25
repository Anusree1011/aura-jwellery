// ============================================
// script.js — Aura Jewellery JavaScript Logic
// ============================================

// ---- 1. DARK MODE TOGGLE ----
// We get the button and listen for a click.
// When clicked, we add/remove the "dark" class on <body>.
// CSS handles all the colour changes based on that class.

var darkBtn = document.getElementById("dark-btn");

darkBtn.addEventListener("click", function () {
  document.body.classList.toggle("dark");

  if (document.body.classList.contains("dark")) {
    darkBtn.textContent = "☀️ Light";
  } else {
    darkBtn.textContent = "🌙 Dark";
  }
});


// ---- 2. CART COUNTER ----
// cartCount keeps track of how many items are in the cart.
// Every time "Add to Cart" is clicked (from React), this updates.

var cartCount = 0;

function updateCartDisplay() {
  document.getElementById("cart-count").textContent = cartCount;
}

// This function is called by React when a product is added
function addItemToCart(productName) {
  cartCount++;
  updateCartDisplay();
  showToast(productName + " added to cart! 🛍️");
}


// ---- 3. TOAST NOTIFICATION ----
// A small popup message shown at the bottom of the screen.

function showToast(message) {
  // Remove old toast if it exists
  var old = document.getElementById("toast");
  if (old) old.remove();

  // Create a new toast <div>
  var toast = document.createElement("div");
  toast.id = "toast";
  toast.textContent = message;

  // Inline styles for the toast box
  toast.style.cssText =
    "position:fixed; bottom:24px; right:24px; background:#1a0e06;" +
    "color:#f0e0c8; padding:12px 20px; border-left:4px solid #c08040;" +
    "font-size:0.82rem; font-family:'Poppins',sans-serif; z-index:9999;" +
    "border-radius:4px; animation:fadeIn 0.3s ease;";

  document.body.appendChild(toast);

  // Remove after 2.5 seconds
  setTimeout(function () {
    toast.remove();
  }, 2500);
}


// ---- 4. CONTACT FORM VALIDATION ----
// We grab the form and run checks before allowing submit.

var form = document.getElementById("contact-form");

form.addEventListener("submit", function (e) {
  e.preventDefault(); // Stop the page from refreshing

  // Get field values
  var name    = document.getElementById("c-name").value.trim();
  var email   = document.getElementById("c-email").value.trim();
  var message = document.getElementById("c-msg").value.trim();

  // Clear old errors
  document.getElementById("err-name").textContent  = "";
  document.getElementById("err-email").textContent = "";
  document.getElementById("err-msg").textContent   = "";
  document.getElementById("form-ok").textContent   = "";

  var isValid = true;

  // Check name
  if (name === "") {
    document.getElementById("err-name").textContent = "⚠ Please enter your name.";
    isValid = false;
  }

  // Check email — must have "@" and "."
  if (email === "" || !email.includes("@") || !email.includes(".")) {
    document.getElementById("err-email").textContent = "⚠ Please enter a valid email.";
    isValid = false;
  }

  // Check message length
  if (message.length < 10) {
    document.getElementById("err-msg").textContent = "⚠ Message must be at least 10 characters.";
    isValid = false;
  }

  // If everything is fine, show success
  if (isValid) {
    document.getElementById("form-ok").textContent = "✅ Thank you! We'll get back to you soon.";
    form.reset();
  }
});


// ---- 5. SMOOTH SCROLL (for nav links) ----
// When a nav link is clicked, smoothly scroll to that section.

var navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    var target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
});
