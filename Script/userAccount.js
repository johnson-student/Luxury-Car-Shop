export function renderUserAccount() {
  const logoutBtn = document.querySelector("#logout");
  const name = document.querySelector(".name")
  const json = localStorage.getItem("user");
  console.log(json)
  // If no user data → redirect to login
  if (!json) {
    window.location.hash = "#login";
    return;
  }

  const user = JSON.parse(json);

  // Check login status
  if (!user.isLogin) {
    window.location.hash = "#login";
    return;
  }
  
  name.innerHTML = `${user.name}`
  // Logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.setItem(
        "user",
        JSON.stringify({ ...user, isLogin: false })
      );
      window.location.hash = "";
    });
  }
}
