export function login() {
  const form = document.querySelector("#login-form");
  const emailInput = document.querySelector("#login-email");
  const passwordInput = document.querySelector("#login-password");
  if (!form) return; // SPA safety
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const json = localStorage.getItem("user");

    if (!json) {
      alert("No account found. Please register first.");
      window.location.hash = "#register";
      return;
    }

    const user = JSON.parse(json);

    // Basic auth check
    if (user.email !== email || user.password !== password) {
      alert("Invalid email or password");
      return;
    }

    // Login success
    localStorage.setItem(
      "user",
      JSON.stringify({ ...user, isLogin: true })
    );

    window.location.hash = "#userAccount"; // or dashboard
  });
}
