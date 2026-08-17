// ======================================================
// Giris Tech Hub
// Assessment Submitted
// ======================================================


// ===========================================
// DOM
// ===========================================

const submitTitle =
document.getElementById("submitTitle");

const submitMessage =
document.getElementById("submitMessage");

const assessmentName =
document.getElementById("assessmentName");

const totalQuestions =
document.getElementById("totalQuestions");

const answeredQuestions =
document.getElementById("answeredQuestions");

const notAnsweredQuestions =
document.getElementById("notAnsweredQuestions");

const timeTaken =
document.getElementById("timeTaken");

const viewResultButton =
document.getElementById("viewResultButton");

const dashboardButton =
document.getElementById("dashboardButton");


// ===========================================
// Page Load
// ===========================================

document.addEventListener("DOMContentLoaded", () => {

    loadSubmissionDetails();

});


// ===========================================
// Load Submission Details
// ===========================================

function loadSubmissionDetails(){

    const assessment = JSON.parse(

        localStorage.getItem("selectedAssessment")

    );

    const answers = JSON.parse(

        localStorage.getItem("studentAnswers")

    ) || {};

    const autoSubmitted =

        localStorage.getItem("autoSubmitted");

    const time =

        localStorage.getItem("timeTaken");


    // ==========================
    // Assessment Details
    // ==========================

    if(assessment){

        assessmentName.innerHTML =
        assessment.assessmentName;

        totalQuestions.innerHTML =
        assessment.totalQuestions;

        answeredQuestions.innerHTML =
        Object.keys(answers).length;

        notAnsweredQuestions.innerHTML =
        assessment.totalQuestions -
        Object.keys(answers).length;

    }

    else{

        assessmentName.innerHTML =
        "Assessment";

        totalQuestions.innerHTML = "0";

        answeredQuestions.innerHTML = "0";

        notAnsweredQuestions.innerHTML = "0";

    }


    // ==========================
    // Time
    // ==========================

    if(time){

        timeTaken.innerHTML = time;

    }

    else{

        timeTaken.innerHTML = "--:--:--";

    }


    // ==========================
    // Auto Submit Message
    // ==========================

    if(autoSubmitted === "true"){

        submitTitle.innerHTML =
        "Assessment Auto Submitted";

        submitMessage.innerHTML =
        "The assessment was automatically submitted because you switched browser tabs or the timer expired.";

    }

}


// ===========================================
// View Result
// ===========================================

viewResultButton.addEventListener(

    "click",

    function(){

        window.location.href =
        "student-result-details.html";

    }

);


// ===========================================
// Back To Dashboard
// ===========================================

dashboardButton.addEventListener(

    "click",

    function(){

        window.location.href =
        "student-dashboard.html";

    }

);