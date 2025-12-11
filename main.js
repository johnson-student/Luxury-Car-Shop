// 1. DECLARE VARIABLES FIRST
const hamburger = document.querySelector(".hamburger");
const navLink = document.querySelector(".nav-link");
const closeBtn = document.querySelector(".close-btn");

// 2. LOAD PAGE FUNCTION
function loadPage() {
  const hash = location.hash.replace("#", "") || "shop";

  // Highlight active link
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

      // Safe check before removing class
      if (navLink) navLink.classList.remove("active");

      // Home page setup
      if (hash === "home") {
        startCounterAnimation();
        // Swiper for home
        if (document.querySelector(".mySwiper")) {
          new Swiper(".mySwiper", {
            loop: true,
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
            grabCursor: true,
          });
        }
      }

      // About page setup
      if (hash === "about") {
        setTimeout(() => {
          AOS.refreshHard();
        }, 50);
      }

      // Shop page setup
      if (hash === "shop") {

         var SHopswiper = new Swiper(".shopSwiper", {
          autoplay: {
          delay: 2500,   // 2.5 seconds per slide
          disableOnInteraction: false, // keeps autoplay running after user interactions
        },
        pagination: {
        el: ".swiper-pagination",
        clickable: true,
        renderBullet: function (index, className) {
          return '<span class="' + className + '">' + (index + 1) + "</span>";
        },
      },
    });

    // car list
        
const cars = [
  {
    name: "Lamborghini Urus",
    image: "./assets/images/lamborghini.png",
    price: "300,000$",
    speed: "361Km/h",
    fuel: "10L/5km",
    gear: "Automatic",
    desc: "High-performance SUV with sharp aerodynamic lines."
  },
  {

    name: "Ferrari SF90",
    image: "./assets/images/ferrari.png",
    price: "450,000$",
    speed: "350Km/h",
    fuel: "8L/5km",
    gear: "Automatic",
    desc: "Hybrid supercar delivering extreme power."
  },
  {
  
    name: "Bugatti Chiron",
    image: "./assets/images/Bugatti.png",
    price: "3,000,000$",
    speed: "420Km/h",
    fuel: "30L/5km",
    gear: "Automatic",
    desc: "Hypercar known for unmatched speed and luxury."
  },
  {
    
    name: "Porsche Turbo S",
    image: "./assets/images/porsche-2.png",
    price: "200,000$",
    speed: "330Km/h",
    fuel: "9L/5km",
    gear: "Automatic",
    desc: "Iconic sports car with incredible precision."
  },
  {
    
    name: "Nissan GTR",
    image: "./assets/images/Nissan-GTR.png",
    price: "300,000$",
    speed: "341Km/h",
    fuel: "7L/5km",
    gear: "Automatic",
    desc: "Lightweight supercar with futuristic design."
  },
  {
    name: "Audi R8",
    image: "./assets/images/audi.png",
    price: "160,000$",
    speed: "330Km/h",
    fuel: "11L/5km",
    gear: "Automatic",
    desc: "V10 powerhouse blending comfort and speed."
  }
];

const grid= document.getElementById("carGrid1");
cars.forEach((car, i) => {
  const num = i+1;

    grid.innerHTML += `
      <div id="c${num}" data-name="${car.name}" class=" card rounded-3xl shadow-[inset_0px_0px_15px] p-6 w-60 border border-neutral-800 text-white hover:shadow-[0px_0px_10px_1px] transition duration-1000 hover:scale-105 hover:backdrop-blur-[3px]">
        
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-bold tracking-wider">${car.name}</h3>
          <div class="flex gap-1 text-xl">
            <span class="cursor-pointer">
              <svg class="w-5 text-white dark:text-white focus:bg-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
              </svg>
            </span>
            <span class="cursor-pointer">
              <svg class="w-5 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
              <path d="m12.75 20.66 6.184-7.098c2.677-2.884 2.559-6.506.754-8.705-.898-1.095-2.206-1.816-3.72-1.855-1.293-.034-2.652.43-3.963 1.442-1.315-1.012-2.678-1.476-3.973-1.442-1.515.04-2.825.76-3.724 1.855-1.806 2.201-1.915 5.823.772 8.706l6.183 7.097c.19.216.46.34.743.34a.985.985 0 0 0 .743-.34Z"/>
              </svg>
            </span>
          </div>
        </div>
  
        <div class="hover: rounded-2xl overflow-hidden shadow-2xl mb-6 flex justify-center">
          <img src="${car.image}" class="w-[80%] hover:scale-110  transition duration-1000">
        </div>
  
        <div>
          <h2 class="text-neutral-400 text-sm">
            ${car.desc}
          </h2>
        </div>
  
        <div class="flex justify-between text-center mb-4 mt-6">
          <div>
            <img src="./assets/icons/speed.png" width="25" class="mb-2 mx-auto">
            <p class="text-[10px]">${car.speed}</p>
          </div>
          <div>
            <img src="./assets/icons/Gas.png" width="25" class="mb-2 mx-auto">
            <p class="text-[10px]">${car.fuel}</p>
          </div>
          <div>
            <img src="./assets/icons/gear.png" width="25" class="mb-2 mx-auto">
            <p class="text-[10px]">${car.gear}</p>
          </div>
        </div>
  
        <div class="flex items-center justify-around">
          <button class="bg-neutral-800 px-4 py-1 rounded-full rounded-br-[300px] text-lg font-semibold shadow-md hover:shadow-[0_0_10px_1px_white] transition duration-500">
            ${car.price}
          </button>
  
          <a href="#Shop_template" class="text-[10px] underline-offset-4 hover:underline">
            View Detail ↗
          </a>
        </div>
      </div>`;
    
  });
  // Search bar
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".card");

    cards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      card.style.display = name.includes(value) ? "block" : "none";
    });
  } );
}


    }); // END .then(html => {})
} // END loadPage()



// 3. EVENTS

window.addEventListener("hashchange", loadPage);
loadPage();

window.addEventListener('load', () => {
  AOS.refresh();
});

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navLink?.classList.add("active");
    closeBtn?.classList.add("active");
  });
}

if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    navLink?.classList.remove("active");
    closeBtn?.classList.remove("active");
  });
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 600 && navLink) {
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
