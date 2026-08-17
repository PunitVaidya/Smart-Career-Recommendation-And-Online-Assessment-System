/*=========================================
        TOGGLE PASSWORD
=========================================*/

const togglePassword = document.querySelector(".toggle-password");
const password = document.getElementById("password");

togglePassword.addEventListener("click", () => {

    const type = password.getAttribute("type") === "password"
        ? "text"
        : "password";

    password.setAttribute("type", type);

    togglePassword.classList.toggle("fa-eye");
    togglePassword.classList.toggle("fa-eye-slash");

});


/*=========================================
        ADMIN LOGIN
=========================================*/

const loginForm = document.getElementById("adminLoginForm");

loginForm.addEventListener("submit", function(e) {

    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username === "") {

        alert("Please enter your username.");
        return;

    }

    if (password === "") {

        alert("Please enter your password.");
        return;

    }

    const admin = {

        username: username,
        password: password

    };

    fetch("http://localhost:8080/api/admin/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(admin)

    })

        .then(response => {

            if (!response.ok) {
                throw new Error("Invalid Username or Password");
            }

            return response.json();

        })

        .then(data => {

            alert("Login Successful!");

            // Store admin information
            localStorage.setItem("admin", JSON.stringify(data));

            // Redirect
            window.location.href = "admin-dashboard.html";

        })

        .catch(error => {

            alert(error.message);

        });

});