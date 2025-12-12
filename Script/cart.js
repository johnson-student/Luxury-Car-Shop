let qty = 1;
    const price = 120;

    const qtyDisplay = document.getElementById("qty");
    const subtotalDisplay = document.getElementById("subtotal");
    const taxDisplay = document.getElementById("tax");
    const totalDisplay = document.getElementById("total");

    document.querySelectorAll(".qty-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        const action = btn.getAttribute("data-action");

        if (action === "increase") qty++;
        if (action === "decrease" && qty > 1) qty--;

        updateCart();
      });
    });

    function updateCart() {
      qtyDisplay.textContent = qty;
      const subtotal = price * qty;
      const tax = subtotal * 0.10;
      const total = subtotal + tax;

      subtotalDisplay.textContent = subtotal.toFixed(2);
      taxDisplay.textContent = tax.toFixed(2);
      totalDisplay.textContent = total.toFixed(2);
    }


    // Checkout Button
    document.getElementById("checkoutBtn").onclick = () => {
      alert("Proceeding to checkout!");
    };