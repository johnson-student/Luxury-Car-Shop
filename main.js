// 1. DECLARE VARIABLES FIRST
const hamburger = document.querySelector('.hamburger');
const navLink = document.querySelector('.nav-link');
const closeBtn = document.querySelector('.close-btn');
// 2. LOAD PAGE FUNCTION
function loadPage() {
  const hash = location.hash.replace('#', '') || 'home';
  // Highlight active link
  document.querySelectorAll('nav li a').forEach((link) => {
    link.classList.toggle(
      'link-active',
      link.getAttribute('href') === '#' + hash
    );
  });

  fetch(`pages/${hash}.html`)
    .then((res) => res.text())
    .then((html) => {
      document.getElementById('content').innerHTML = html;

      // Safe check before removing class
      if (navLink) navLink.classList.remove('active');

      // Home page setup
      if (hash === 'home') {
        startCounterAnimation();
        animatePriceOnce('145,999', 1000);
        // Swiper for home
        if (document.querySelector('.mySwiper')) {
          new Swiper('.mySwiper', {
            loop: true,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            grabCursor: true,
          });
        }
      }

      // About page setup
      if (hash === 'about') {
        setTimeout(() => {
          AOS.refreshHard();
        }, 50);
      }

      // Cart page setup
      if (hash === 'cartList') {
        import('./Script/cart.js').then((mod) => mod.renderCarts());
      }

      // fav page setup
      if (hash === 'wistList') {
        import('./Script/fav.js').then((mod) => mod.renderfavs());
      }

      if (hash === 'userAccount') {
        import('./Script/userAccount.js').then((mod) =>
          mod.renderUserAccount()
        );
      }

      if (hash === 'register') {
        import('./Script/register.js').then((mod) => mod.register());
      }

      if (hash === 'login') {
        import('./Script/login.js').then((mod) => mod.login());
      }

      // Shop page setup
      if (hash === 'shop') {
        var SHopswiper = new Swiper('.shopSwiper', {
          autoplay: {
            delay: 2500,
            disableOnInteraction: false,
          },
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return (
                '<span class="' + className + '">' + (index + 1) + '</span>'
              );
            },
          },
        });
        import('./Script/renderShop.js').then((mod) => mod.renderShop());
      }
    }); // END .then(html => {})
} // END loadPage()

// 3. EVENTS
window.addEventListener('hashchange', loadPage);
loadPage();

window.addEventListener('load', () => {
  AOS.refresh();
});

if (hamburger) {
  hamburger.addEventListener('click', () => {
    navLink?.classList.add('active');
    closeBtn?.classList.add('active');
  });
}

if (closeBtn) {
  closeBtn.addEventListener('click', () => {
    navLink?.classList.remove('active');
    closeBtn?.classList.remove('active');
  });
}

window.addEventListener('resize', () => {
  if (window.innerWidth > 600 && navLink) {
    navLink.classList.remove('active');
  }
});

// 4. HOME COUNTER FUNCTION
function startCounterAnimation() {
  const counters = document.querySelectorAll('.counter');

  counters.forEach((counter) => {
    const target = +counter.getAttribute('data-target');
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

function animatePriceOnce(finalValue) {
  const priceEl = document.getElementById('price');
  if (!priceEl) return;

  priceEl.innerHTML = '';

  const digitHeight = 3.5; // em (MATCH CSS)

  finalValue.split('').forEach((char) => {
    // 👉 COMMA (static, no animation)
    if (char === ',') {
      const comma = document.createElement('span');
      comma.textContent = ',';
      comma.style.margin = '0 0.15em';
      priceEl.appendChild(comma);
      return;
    }

    // 👉 DIGIT (animated)
    const digit = Number(char);

    const container = document.createElement('div');
    container.className = 'digit-container';

    const inner = document.createElement('div');
    inner.className = 'digit-inner';

    for (let i = 0; i <= digit; i++) {
      const d = document.createElement('div');
      d.textContent = i;
      inner.appendChild(d);
    }

    container.appendChild(inner);
    priceEl.appendChild(container);

    requestAnimationFrame(() => {
      inner.style.transform = `translateY(-${digit * digitHeight}rem)`;
    });
  });
}
