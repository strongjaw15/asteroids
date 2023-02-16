

const loginFormSelector = document.querySelector(".login-form");

const loginForm = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();
   // if a username and password is entered do a fetch request to the user API. If username and password match database send to home.
  if (username && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

loginFormSelector.addEventListener("submit", loginForm);
