document.addEventListener('DOMContentLoaded', function(){
const elements = document.querySelectorAll('.fade-in');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


if (prefersReducedMotion) {
elements.forEach(el => el.classList.add('show'));
} else {
const io = new IntersectionObserver((entries) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
entry.target.classList.add('show');
} else {
// remove to allow repeat when re-entering
entry.target.classList.remove('show');
}
});
}, { threshold: 0.25 });


elements.forEach(el => io.observe(el));
}


// Flip-card: support tap-to-flip on touch devices and keyboard activation
const flipCards = document.querySelectorAll('.flip-card');
flipCards.forEach(card => {
// Add click/tap support on devices that don't hover
card.addEventListener('click', (e) => {
// If device supports hover, let hover handle it. Otherwise toggle class.
if (window.matchMedia && window.matchMedia('(hover: none)').matches) {
card.classList.toggle('is-flipped');
// update aria-pressed
const pressed = card.classList.contains('is-flipped');
card.setAttribute('aria-pressed', pressed ? 'true' : 'false');
}
});


// keyboard accessibility (Enter / Space toggles flip)
card.addEventListener('keydown', (e) => {
if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
e.preventDefault();
card.classList.toggle('is-flipped');
const pressed = card.classList.contains('is-flipped');
card.setAttribute('aria-pressed', pressed ? 'true' : 'false');
}
});
});
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll("#service-flip .flip-section-card");
  let current = 0;
  let isFlipping = false;

  function showCard(next) {
    if (isFlipping || next === current || next < 0 || next >= cards.length) return;
    isFlipping = true;

    // Flip current out
    cards[current].classList.remove("active");
    cards[current].classList.add("out");

    // Show next
    cards[next].classList.add("active");

    // Reset after animation
    setTimeout(() => {
      cards[current].classList.remove("out");
      current = next;
      isFlipping = false;
    }, 1000);
  }

  function nextCard() {
    if (current < cards.length - 1) {
      showCard(current + 1);
    }
  }

  function prevCard() {
    if (current > 0) {
      showCard(current - 1);
    }
  }

  // Scroll detection (only inside service-flip section)
  const section = document.getElementById("service-flip");
  window.addEventListener("wheel", (e) => {
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      if (e.deltaY > 0) {
        nextCard();
      } else {
        prevCard();
      }
    }
  });

  // Swipe on touch devices (only inside section)
  let startY = 0;
  section.addEventListener("touchstart", (e) => {
    startY = e.touches[0].clientY;
  });
  section.addEventListener("touchend", (e) => {
    let endY = e.changedTouches[0].clientY;
    if (startY - endY > 50) {
      nextCard();
    } else if (endY - startY > 50) {
      prevCard();
    }
  });

  // Init first card
  if (cards.length > 0) {
    cards[0].classList.add("active");
  }
});
const strategySection = document.getElementById("strategy-highlights");
const strategyCircles = strategySection.querySelectorAll(".emoji-circle");

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      // play animation with stagger
      strategyCircles.forEach(circle => {
        const delay = parseInt(circle.dataset.delay, 10) || 0;
        setTimeout(() => circle.classList.add("falling"), delay);
      });
    } else {
      // reset for replay on next visit
      strategyCircles.forEach(circle => circle.classList.remove("falling"));
    }
  });
}, { threshold: 0.4 });

observer.observe(strategySection);