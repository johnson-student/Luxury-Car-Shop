export function renderCart() {
    console.log("Cart page loaded");

    let qty = 1;
    const price = 120;

    // Get elements (after page HTML is injected)
    const qtyDisplay = document.getElementById("qty");
    const subtotalDisplay = document.getElementById("subtotal");
    const taxDisplay = document.getElementById("tax");
    const totalDisplay = document.getElementById("total");
    const checkoutBtn = document.getElementById("checkoutBtn");

    if (!qtyDisplay || !subtotalDisplay || !taxDisplay || !totalDisplay) {
        console.warn("Cart elements not found — check your cart.html IDs");
        return;
    }

    // Button Listeners (increase / decrease)
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

    // Initial calculate
    updateCart();

    // Checkout Button
    if (checkoutBtn) {
        checkoutBtn.onclick = () => {
            alert("Proceeding to checkout!");
        };
    }
}
