const BASE_URL = "http://localhost:8080/api/student";

const registerForm = document.getElementById("registerForm");
const registerBtn = document.getElementById("registerBtn");
const btnText = document.getElementById("btnText");

const currentStatus = document.getElementById("currentStatus");
const semesterBox = document.getElementById("semesterBox");
const semester = document.getElementById("semester");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.querySelector(".toggle-password");
const toggleConfirm = document.querySelector(".toggle-confirm");


/*========================================================
    SHOW / HIDE PASSWORD
========================================================*/

if (togglePassword) {

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


/*========================================================
    SHOW / HIDE CONFIRM PASSWORD
========================================================*/

if (toggleConfirm) {

    toggleConfirm.addEventListener("click", () => {

        if (confirmPassword.type === "password") {

            confirmPassword.type = "text";

            toggleConfirm.classList.replace(
                "fa-eye",
                "fa-eye-slash"
            );

        } else {

            confirmPassword.type = "password";

            toggleConfirm.classList.replace(
                "fa-eye-slash",
                "fa-eye"
            );

        }

    });

}


/*========================================================
    CHECK WHETHER CURRENT STATUS IS STUDENT
========================================================*/

function isStudentStatus() {

    return currentStatus.value.toUpperCase() === "STUDENT";

}


/*========================================================
    CURRENT STATUS - SEMESTER HANDLING
========================================================*/

currentStatus.addEventListener("change", function () {

    /*
     * STUDENT
     * ------------------------------
     * Show semester
     * Make semester required
     */

    if (isStudentStatus()) {

        semesterBox.style.display = "block";

        semester.required = true;

    }

    /*
     * OTHER STATUS
     * ------------------------------
     * Hide semester
     * Remove required validation
     * Clear semester value
     */

    else {

        semesterBox.style.display = "none";

        semester.required = false;

        semester.value = "";

    }

});


/*========================================================
    INITIAL SEMESTER STATE
========================================================*/

if (isStudentStatus()) {

    semesterBox.style.display = "block";

    semester.required = true;

} else {

    semesterBox.style.display = "none";

    semester.required = false;

    semester.value = "";

}


/*========================================================
    TOAST MESSAGE
========================================================*/

function showToast(message, type) {

    const toast = document.createElement("div");

    toast.className = "toast " + type;

    toast.innerHTML = message;

    document.body.appendChild(toast);

    setTimeout(() => {

        toast.remove();

    }, 3000);

}


/*========================================================
    REGISTER FORM SUBMISSION
========================================================*/

registerForm.addEventListener("submit", async function (e) {

    e.preventDefault();


    /*====================================================
        PASSWORD VALIDATION
    ====================================================*/

    if (password.value !== confirmPassword.value) {

        showToast(
            "Passwords do not match",
            "error"
        );

        return;

    }


    /*====================================================
        CURRENT STATUS VALIDATION
    ====================================================*/

    if (currentStatus.value === "") {

        showToast(
            "Please select current status",
            "error"
        );

        currentStatus.focus();

        return;

    }


    /*====================================================
        SEMESTER VALIDATION
        ONLY FOR STUDENT
    ====================================================*/

    if (isStudentStatus()) {

        if (semester.value === "") {

            showToast(
                "Please select semester",
                "error"
            );

            semester.focus();

            return;

        }

    }


    /*====================================================
        BUTTON LOADING
    ====================================================*/

    registerBtn.classList.add("loading");

    btnText.innerHTML = "Creating Account...";


    /*====================================================
        SEMESTER VALUE
    ====================================================*/

    let semesterValue = null;

    /*
     * If Student:
     *     selected semester is sent
     *
     * If Graduate / Working Professional:
     *     null is sent
     */

    if (
        isStudentStatus() &&
        semester.value !== ""
    ) {

        semesterValue = parseInt(
            semester.value,
            10
        );

    }


    /*====================================================
        GRADUATION YEAR
    ====================================================*/

    const graduationYearInput =
        document.getElementById("graduationYear");

    let graduationYearValue = null;

    if (
        graduationYearInput &&
        graduationYearInput.value !== ""
    ) {

        graduationYearValue = parseInt(
            graduationYearInput.value,
            10
        );

    }


    /*====================================================
        STUDENT DATA
    ====================================================*/

    const student = {

        name:
            document
                .getElementById("name")
                .value
                .trim(),

        email:
            document
                .getElementById("email")
                .value
                .trim(),

        password:
            password.value,

        mobile:
            document
                .getElementById("mobile")
                .value
                .trim(),

        college:
            document
                .getElementById("college")
                .value
                .trim(),

        branch:
            document
                .getElementById("branch")
                .value,

        semester:
            semesterValue,

        currentStatus:
            currentStatus.value,

        graduationYear:
            graduationYearValue,

        /*
         * GOAL IS OPTIONAL
         *
         * No validation.
         * No compulsory input.
         * NULL is sent to backend.
         */

        goal: null

    };


    /*====================================================
        DEBUG - CHECK REQUEST DATA
    ====================================================*/

    console.log(
        "Registration Request:",
        student
    );


    /*====================================================
        SEND REQUEST TO BACKEND
    ====================================================*/

    try {

        const response = await fetch(

            BASE_URL + "/register",

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


        /*================================================
            READ RESPONSE
        =================================================*/

        let result = {};

        try {

            result = await response.json();

        } catch (jsonError) {

            console.error(
                "Unable to read server response:",
                jsonError
            );

        }


        /*================================================
            REGISTRATION SUCCESS
        =================================================*/

        if (response.ok) {

            showToast(

                result.message ||
                "Registration Successful",

                "success"

            );


            /*
             * Reset complete form
             */

            registerForm.reset();


            /*
             * Reset semester
             */

            semesterBox.style.display = "none";

            semester.required = false;

            semester.value = "";


            /*
             * Redirect to login
             */

            setTimeout(() => {

                window.location.href =
                    "student-login.html";

            }, 1800);

        }


        /*================================================
            REGISTRATION FAILED
        =================================================*/

        else {

            showToast(

                result.message ||
                "Registration Failed",

                "error"

            );

        }

    }


    /*====================================================
        SERVER CONNECTION ERROR
    ====================================================*/

    catch (error) {

        console.error(
            "Registration Error:",
            error
        );

        showToast(
            "Unable to connect to server",
            "error"
        );

    }


    /*====================================================
        REMOVE LOADING
    ====================================================*/

    finally {

        registerBtn.classList.remove("loading");

        btnText.innerHTML =
            "Create Account";

    }

});