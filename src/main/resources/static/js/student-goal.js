/*==========================================================
                GIRIS TECH HUB
                STUDENT GOAL
==========================================================*/

const BASE_URL =
    "http://localhost:8080";


const GET_STUDENT =
    BASE_URL + "/api/student/";


const UPDATE_STUDENT =
    BASE_URL + "/api/student/update";


let selectedGoal = null;

let student = null;


const studentId =
    localStorage.getItem("studentId");


/*==========================================================
                PAGE LOAD
==========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (!studentId) {

            window.location.href =
                "student-login.html";

            return;

        }


        loadStudent();

        initializeEvents();

    }
);


/*==========================================================
                INITIALIZE EVENTS
==========================================================*/

function initializeEvents() {


    const goalCards =
        document.querySelectorAll(".goal-card");


    goalCards.forEach(card => {

        card.addEventListener(
            "click",
            selectGoal
        );

    });


    const continueBtn =
        document.getElementById(
            "continueBtn"
        );


    if (continueBtn) {

        continueBtn.addEventListener(
            "click",
            saveGoal
        );

    }

}


/*==========================================================
                LOAD STUDENT
==========================================================*/

async function loadStudent() {

    try {

        const response =
            await fetch(
                GET_STUDENT + studentId
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to load student"
            );

        }


        student =
            result.data;


        console.log(
            "STUDENT GOAL PAGE DATA:",
            student
        );


        /*========================================
                DISPLAY STUDENT NAME
        ========================================*/

        const nameElement =
            document.getElementById(
                "studentName"
            );


        if (nameElement) {

            nameElement.innerText =
                student.name;

        }


        /*========================================
          STUDENT ALREADY COMPLETED PROFILE
        ========================================*/

        if (
            student.firstLogin === false &&
            student.profileCompleted === true
        ) {

            console.log(
                "PROFILE ALREADY COMPLETED → DASHBOARD"
            );


            window.location.href =
                "student-dashboard.html";

            return;

        }

    }

    catch (error) {

        console.error(
            "LOAD STUDENT ERROR:",
            error
        );


        alert(
            error.message ||
            "Unable to load student"
        );


        window.location.href =
            "student-login.html";

    }

}


/*==========================================================
                SELECT GOAL
==========================================================*/

function selectGoal(event) {


    document
        .querySelectorAll(".goal-card")
        .forEach(card => {

            card.classList.remove(
                "selected"
            );

        });


    const selectedCard =
        event.currentTarget;


    selectedCard.classList.add(
        "selected"
    );


    selectedGoal =
        selectedCard.dataset.goal;


    console.log(
        "SELECTED GOAL:",
        selectedGoal
    );


    const button =
        document.getElementById(
            "continueBtn"
        );


    if (button) {

        button.disabled = false;

    }

}


/*==========================================================
                SAVE GOAL
==========================================================*/

async function saveGoal() {


    if (!selectedGoal) {

        alert(
            "Please select your career goal"
        );

        return;

    }


    if (!student) {

        alert(
            "Student information is still loading"
        );

        return;

    }


    const request = {

        studentId:
            student.studentId,

        name:
            student.name,

        mobile:
            student.mobile,

        college:
            student.college,

        branch:
            student.branch,

        semester:
            student.semester,

        currentStatus:
            student.currentStatus,

        graduationYear:
            student.graduationYear,

        goal:
            selectedGoal

    };


    console.log(
        "UPDATE STUDENT REQUEST:",
        request
    );


    const button =
        document.getElementById(
            "continueBtn"
        );


    if (button) {

        button.disabled = true;

        button.innerHTML =
            "Saving...";

    }


    try {

        const response =
            await fetch(
                UPDATE_STUDENT,
                {

                    method: "PUT",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(request)

                }
            );


        const result =
            await response.json();


        console.log(
            "UPDATE STUDENT RESPONSE:",
            result
        );


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to save career goal"
            );

        }


        /*========================================
            IMPORTANT
            BACKEND MUST RETURN UPDATED STUDENT
        ========================================*/

        const updatedStudent =
            result.data;


        /*========================================
            UPDATE LOCAL STORAGE
        ========================================*/

        localStorage.setItem(
            "firstLogin",
            "false"
        );


        localStorage.setItem(
            "profileCompleted",
            "true"
        );


        if (updatedStudent) {

            localStorage.setItem(
                "studentName",
                updatedStudent.name
            );

        }


        console.log(
            "PROFILE COMPLETED"
        );


        alert(
            "Career goal saved successfully"
        );


        /*========================================
                GO TO DASHBOARD
        ========================================*/

        window.location.href =
            "student-dashboard.html";

    }

    catch (error) {

        console.error(
            "SAVE GOAL ERROR:",
            error
        );


        alert(
            error.message ||
            "Unable to save career goal"
        );


        if (button) {

            button.disabled = false;

            button.innerHTML =
                '<i class="fa-solid fa-arrow-right"></i> Continue';

        }

    }

}