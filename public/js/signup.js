const signupFormSelector = document.getElementById("signup-form");

let username = $("#username-signup");
let password = $("#password-signup");

const signup = async (event) => {
  event.preventDefault();

  // if a username and password is entered do a fetch request to the user API

  if (username.val() && password.val()) {
    const response = await fetch("/api/users/signup", {
      method: "POST",
      body: JSON.stringify({
        'username': username.val(),
        'password': password.val()
      }),
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
