// 1. DECLARE VARIABLES FIRST \
const hamburger = document.querySelector(".hamburger");
const navLink = document.querySelector(".nav-link");
const closeBtn = document.querySelector(".close-btn");



// 2. LOAD PAGE FUNCTION
function loadPage() {
  const hash = location.hash.replace("#", "") || "home";

  document.querySelectorAll("nav li a").forEach(link => {
    link.classList.toggle(
      "link-active",
      link.getAttribute("href") === "#" + hash
    );
  });

  fetch(`pages/${hash}.html`)
    .then(res => res.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;

      // close nav menu after loading page
      navLink.classList.remove("active");

      // Home page setup
      if (hash === "home") {
        startCounterAnimation();
        new Swiper(".mySwiper", {
          loop: true,
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          },
          grabCursor: true,
        });
      }
      //About page setup
      // AOS must refresh AFTER new HTML is inserted
      if (hash === "about") {
        setTimeout(() => {
          AOS.refreshHard();
        }, 50);
      }
    });
}

// 3. EVENTS

window.addEventListener("hashchange", loadPage);
loadPage();

window.addEventListener('load', () => {
  AOS.refresh();
});

hamburger.addEventListener("click", () => {
  navLink.classList.add("active");
  closeBtn.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  navLink.classList.remove("active");
  closeBtn.classList.remove("active");
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 600) {
    navLink.classList.remove("active");
  }
});

// 4. HOME COUNTER FUNCTION
function startCounterAnimation() {
  const counters = document.querySelectorAll(".counter");

  counters.forEach(counter => {
    const target = +counter.getAttribute("data-target");
    let count = 0;

    const speed = 100;

    const update = () => {
      if (count < target) {
        count += Math.ceil(target / speed);
        counter.textContent = count;
        requestAnimationFrame(update);
      } else {
        counter.textContent = target;
      }
    };

    update();
  });
}
