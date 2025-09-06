document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll("#impact .count");

  const animateCounter = (el, target) => {
    let start = 0;
    const step = () => {
      start += Math.ceil(target / 60); // adjust speed
      if (start >= target) {
        el.textContent = target;
      } else {
        el.textContent = start;
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const box = entry.target;
        const countEl = box.querySelector(".count");
        const target = parseInt(box.getAttribute("data-count"), 10);
        animateCounter(countEl, target);
        observer.unobserve(box);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll("#impact .stat-box").forEach(box => observer.observe(box));
});
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const feedback = document.getElementById("formFeedback");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Simulate sending
    feedback.className = "alert alert-info mt-4";
    feedback.textContent = "⏳ Sending...";
    feedback.classList.remove("d-none");

    setTimeout(() => {
      // Randomly simulate success or error for demo
      const success = Math.random() > 0.2;
      if (success) {
        feedback.className = "alert alert-success mt-4";
        feedback.textContent = "✅ Message sent! We’ll be in touch soon.";
        form.reset();
      } else {
        feedback.className = "alert alert-danger mt-4";
        feedback.textContent = "⚠️ Something went wrong. Please try again.";
      }

      // Auto-fade after 4s
      setTimeout(() => {
        feedback.style.opacity = "0";
        setTimeout(() => {
          feedback.classList.add("d-none");
          feedback.style.opacity = "1";
        }, 600);
      }, 4000);
    }, 1500);
  });
});
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("fade-in");
  });
});
document.querySelectorAll(".animate-on-scroll").forEach(el => observer.observe(el));

// Copy to clipboard
document.querySelectorAll(".copyable").forEach(el => {
  el.addEventListener("click", () => {
    const text = el.dataset.copy;
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  });
});

// Show open/closed status
function checkOpenStatus() {
  const now = new Date();
  const day = now.getDay(); // 0 = Sunday
  const hour = now.getHours();
  const status = (day >= 1 && day <= 5 && hour >= 9 && hour < 18) 
    ? "✅ Open Now" 
    : "❌ Closed";
  document.getElementById("openStatus").textContent = status;
}
checkOpenStatus();


document.getElementById("faqForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const question = document.getElementById("faqQuestion").value.trim();
  if (!question) return;

  // Create new FAQ accordion item
  const id = "faq" + Date.now();
  const newItem = `
    <div class="accordion-item">
      <h2 class="accordion-header" id="h${id}">
        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#c${id}">
          ${question}
        </button>
      </h2>
      <div id="c${id}" class="accordion-collapse collapse" data-bs-parent="#faqAccordion">
        <div class="accordion-body text-muted">
          Thanks for your question! Our team will answer soon.
        </div>
      </div>
    </div>
  `;

  document.getElementById("faqAccordion").insertAdjacentHTML("beforeend", newItem);

  // Show feedback
  const feedback = document.getElementById("faqFeedback");
  feedback.classList.remove("d-none");

  // Clear input
  document.getElementById("faqQuestion").value = "";

  // Hide feedback after 3s
  setTimeout(() => feedback.classList.add("d-none"), 3000);
});