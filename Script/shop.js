import { products } from "./products.js";

//template

const grid= document.getElementById("carGrid1");
products.forEach((car, i) => {
  const num = i+1;

    grid.innerHTML += `
      <div data-id="c${num}" data-name="${car.name}" class=" card rounded-3xl shadow-[inset_0px_0px_15px] p-6 w-60 border border-neutral-800 text-white hover:shadow-[0px_0px_10px_1px] transition duration-1000 hover:scale-105 hover:backdrop-blur-[3px]">
        
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-sm font-bold tracking-wider">${car.name}</h3>
          <div class="flex gap-1 text-xl">
            <span class="addCart cursor-pointer">
              <svg class="addCart w-5 active:text-red-500 text-white dark:text-white focus:bg-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
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
          <button class=" bg-neutral-800 px-4 py-1 rounded-full rounded-br-[300px] text-lg font-semibold shadow-md hover:shadow-[0_0_10px_1px_white] transition duration-500">
            ${car.price}
          </button>
  
          <a href="#" class="text-[10px] underline-offset-4 hover:underline">
            View Detail ↗
          </a>
        </div>
      </div>`;
    
  });
  
  
  // search bar
  
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", () => {
    const value = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll(".card");
    cards.forEach(card => {
      const name = card.dataset.name.toLowerCase();
      card.style.display = name.includes(value) ? "block" : "none";
    });
  });


document.querySelectorAll(".addCart").forEach(btn => {
  btn.addEventListener("click", e => {
    const card = e.target.closest(".card");
    const id = card.dataset.id;
    const name = card.dataset.name;
    const price = card.querySelector("button").textContent;
    const image = card.querySelector("img").src;

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existing = cart.find(item => item.id === id);
    if (existing){
      existing.qty += 1;
    } 
    else{
      cart.push({ id, name, price, image, qty: 1 });
    } 

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  });
});

// Update cart count badge
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const cartCount = document.getElementById("cartCount");
  if (cartCount) cartCount.textContent = totalQty;
}

// Initial count
updateCartCount();