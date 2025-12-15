export function renderfavs() {
  console.log(localStorage.getItem("fav"));

  const favContainer = document.getElementById('favItems');

  if (!favContainer) return;

  let fav = JSON.parse(localStorage.getItem("fav")) || [];

  function renderfav() {
    favContainer.innerHTML = "";

    fav.forEach((item) => {
  
      const div = document.createElement("div");
      div.className = "card mx-auto rounded-3xl shadow-[inset_0px_0px_15px] p-6 w-50 border border-neutral-800 text-white hover:shadow-[0px_0px_10px_1px] transition duration-1000 hover:scale-105 hover:backdrop-blur-[3px]";
      div.dataset.id = item.id;
      div.innerHTML = `
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-bold mb-2">${item.name}</h3>
            <div class="flex gap-1 text-xl">
                <span class="cursor-pointer">
                  <svg class="addCart  w-5 active:text-red-500 text-white dark:text-white focus:bg-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clip-rule="evenodd"/>
                  </svg>
                </span>
            </div>
        </div>
              
        <img src="${item.image}" class="w-[80%] hover:scale-110  transition duration-1000 mx-auto mb-4">

        <p class="text-neutral-400 text-sm mb-4">${item.descr || ""}</p>

        <div class="flex justify-between">
          <button class="bg-neutral-800 px-4 py-1 rounded-full">
            ${item.price}
          </button>

          <button class="removeFav text-xs hover:text-red-500 underline"><i class="fas fa-times"></i></button>
        </div>
      `;

      favContainer.appendChild(div);

      // remove favorite
      div.querySelector(".removeFav").addEventListener("click", () => {
        fav = fav.filter(f => f.id !== item.id);
        saveAndRender();
      });

      // clear favorite
      document.querySelector('.clearFav').addEventListener('click', () => {
          fav = [];
          saveAndRender();
          updateFavCount();
      })

    });
  
    // Allow add to card 
    document.querySelectorAll('.addCart').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.card');
        const id = card.dataset.id;
        const name = card.querySelector('h3').textContent;
        const price = card.querySelector('button').textContent;
        const image = card.querySelector('img').src;
  
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existing = cart.find((item) => item.id === id);
        if (existing) {
          existing.qty += 1;
        } else {
          cart.push({ id, name, price, image, qty: 1 });
        }
  
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(localStorage.getItem('cart'))
        updateCartCount();
      });
    });
  }


  // update cart count badge
    function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalQty = cart.reduce((sum, i) => sum + Number( i.qty || 0),0);
    const cartCount = document.getElementById('cartCount');
    if (cartCount) cartCount.textContent = totalQty;

  }

  //  save to local
  function saveAndRender() {
    localStorage.setItem("fav", JSON.stringify(fav));
    renderfav();
    updateFavCount();
  }

  // update fav count badge
  function updateFavCount() {
    const Count = document.getElementById("favCount");
    if (Count) Count.textContent = fav.length;
  }

  renderfav();
  updateFavCount();
  updateCartCount();
}
