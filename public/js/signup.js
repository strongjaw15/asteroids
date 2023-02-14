const signupFormSelector = document.getElementById("signup-form");

const signup = async (event) => {
  event.preventDefault();

  const username = document.querySelector("#username-signup");
  const password = document.querySelector("#password-signup");

  if (username && password) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  }
};

signupFormSelector.addEventListener("click", signup);
