export function renderCarts() {
    // Get cart container and make sure script runs only on cart page
    const cartContainer = document.getElementById("cartItems");
    if (!cartContainer) return; // exit if not on cart page
  
    const summaryItems = document.getElementById("summaryItems");
    const summaryQty = document.getElementById("summaryQty");
    const summaryTotal = document.getElementById("summaryTotal");
    const checkoutBtn = document.getElementById("checkoutBtn");

    
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Render cart items
    function renderCart() {
      cartContainer.innerHTML = "";

      cart.forEach(item => {
        const div = document.createElement("div");
        div.className = " flex items-center justify-between gap-4 bg-trasparent shadow-[inset_0_0_8px_white] p-4 rounded-2xl hover:scale-[102%] hover:shadow-[inset_0_0_5px_white] transition duration-500";
        div.innerHTML = `
          <div class="flex items-center gap-4">
            <img src="${item.image}" class="w-20 rounded-xl">
            <div>
              <h3 class="font-bold">${item.name}</h3>
              <p>${item.price}</p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="decrease text-center shadow-[inset_0_0_5px_white] px-2 rounded">-</button>
            <span>${item.qty}</span>
            <button class="increase text-center shadow-[inset_0_0_5px_white] px-2 rounded">+</button>
            <button class="remove text-gray-300 hover:text-white ml-4"><i class="fas fa-times"></i></button>
          </div>
        `;
        cartContainer.appendChild(div);

        // Increase quantity
        div.querySelector(".increase").addEventListener("click", () => {
          item.qty += 1;
          saveAndRender();
          updateShopBadge();
        });

        // Decrease quantity
        div.querySelector(".decrease").addEventListener("click", () => {
          item.qty -= 1;
          if (item.qty < 0) {
            cart = cart.filter(i => i.id !== item.id);
          }
          saveAndRender();
          updateShopBadge();
        });

        // Remove item
        div.querySelector(".remove").addEventListener("click", () => {
          cart = cart.filter(i => i.id !== item.id);
          saveAndRender();
          updateShopBadge();
          });
        });

      updateSummary();
    }

    // Save cart and re-render
    function saveAndRender() {
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCart();
    }

    // Update order summary
    function updateSummary() {
      
      const items = cart.length;
      const totalQty = cart.reduce((sum, i) => sum + Number(i.qty || 0), 0);
      const totalPrice = cart.reduce((sum, i) => {
        const priceNum = parseFloat(i.price.replace(/[$,]/g,""));
        return sum + priceNum * i.qty;
      }, 0);

      summaryItems.textContent = items;
      summaryQty.textContent = totalQty;
      summaryTotal.textContent = `$${totalPrice.toLocaleString()}`;
    }

    // Checkout button
    checkoutBtn.addEventListener("click", () => {

      const json = localStorage.getItem('user');

       if (!json) {
        window.location.hash = "#login";
        return;
      }
      const user = JSON.parse(json);
        if (!user.isLogin) {
        window.location.hash = "#login";
        return;
      }

      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      alert("Order placed successfully!");
      cart = [];
      saveAndRender();
      updateShopBadge();
    });

    // Update badge on shop page
    function updateShopBadge() {
      // Access cart count badge on shop page if exists
      const cartCountBadge = window.parent?.document.getElementById("cartCount") || document.getElementById("cartCount");
      if (!cartCountBadge) return;
      const totalQty = cart.reduce((sum, i) => sum + Number(i.qty || 0), 0);
      cartCountBadge.textContent = totalQty;
    }

    // Initial render
    renderCart();
    updateShopBadge();

}
