export function register() {
  const name = document.querySelector("#name");
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const confirmPassword = document.querySelector("#confirm-password");
  const form = document.querySelector("#register-form");

  if (!form) return; // safety for SPA routing

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // ❗ stop page reload

    const nameValue = name.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value;
    const confirmValue = confirmPassword.value;

    // Basic validation
    if (!nameValue || !emailValue || !passwordValue || !confirmValue) {
      alert("Please fill in all fields");
      return;
    }

    if (passwordValue !== confirmValue) {
      alert("Passwords do not match");
      return;
    }

    // Example: store user (localStorage for now)
    const user = {
      name: nameValue,
      email: emailValue,
      password: passwordValue, 
      isLogin:true,
    };

    localStorage.setItem("user", JSON.stringify(user));

    window.location.href = "#userAccount"
    form.reset();
  });
}
