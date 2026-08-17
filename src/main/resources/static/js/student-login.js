/*==========================================
        SHOW / HIDE PASSWORD
==========================================*/

const togglePassword =
    document.querySelector(".toggle-password");

const password =
    document.getElementById("password");


if (togglePassword && password) {

    togglePassword.addEventListener("click", () => {

        if (password.type === "password") {

            password.type = "text";

            togglePassword.classList.replace(
                "fa-eye",
                "fa-eye-slash"
            );

        } else {

            password.type = "password";

            togglePassword.classList.replace(
                "fa-eye-slash",
                "fa-eye"
            );

        }

    });

}


/*==========================================
                LOGIN
==========================================*/

const loginForm =
    document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            const student = {

                email:
                    document
                        .getElementById("email")
                        .value
                        .trim(),

                password:
                    document
                        .getElementById("password")
                        .value

            };


            try {

                const response =
                    await fetch(
                        "http://localhost:8080/api/student/login",
                        {
                            method: "POST",

                            headers: {
                                "Content-Type":
                                    "application/json"
                            },

                            body:
                                JSON.stringify(student)
                        }
                    );


                const result =
                    await response.json();


                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Invalid Credentials"
                    );

                }


                /*=====================================
                    STUDENT DATA
                =====================================*/

                const loggedStudent =
                    result.data;


                console.log(
                    "LOGIN STUDENT DATA:",
                    loggedStudent
                );


                /*=====================================
                    STORE STUDENT DETAILS
                =====================================*/

                localStorage.setItem(
                    "studentId",
                    loggedStudent.studentId
                );


                localStorage.setItem(
                    "studentName",
                    loggedStudent.name
                );


                localStorage.setItem(
                    "firstLogin",
                    loggedStudent.firstLogin
                );


                localStorage.setItem(
                    "profileCompleted",
                    loggedStudent.profileCompleted
                );


                /*=====================================
                    LOGIN SUCCESS
                =====================================*/

                alert("Login Successful");


                /*=====================================
                    FIRST TIME STUDENT
                =====================================*/

                if (
                    loggedStudent.firstLogin === true ||
                    loggedStudent.profileCompleted === false
                ) {

                    console.log(
                        "FIRST LOGIN → OPEN CAREER GOAL PAGE"
                    );


                    window.location.href =
                        "student-goal.html";

                    return;

                }


                /*=====================================
                    NORMAL STUDENT
                =====================================*/

                console.log(
                    "EXISTING STUDENT → OPEN DASHBOARD"
                );


                window.location.href =
                    "student-dashboard.html";


            }

            catch (error) {

                console.error(
                    "LOGIN ERROR:",
                    error
                );


                alert(
                    error.message ||
                    "Login failed"
                );

            }

        }
    );

}