/* =====================================================
   API
===================================================== */

const STUDENT_API = "/api/student";

/*
 * Student Result API
 *
 * Expected endpoint:
 *
 * GET /api/student-result/attempt/{attemptId}
 */

const STUDENT_RESULT_API = "/api/student-result";


/* =====================================================
   GLOBAL
===================================================== */

let attemptId = null;

let studentId =
    localStorage.getItem("studentId");


/* =====================================================
   PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        console.log(
            "Student Assessment Result Page Loaded"
        );


        getAttemptId();


        if (!attemptId) {

            showError(
                "Assessment attempt ID is missing."
            );

            return;
        }


        try {

            await loadStudent();

            await loadResult();

        }
        catch (error) {

            console.error(
                "Result page error:",
                error
            );


            showError(
                error.message ||
                "Unable to load assessment result."
            );

        }

    }
);


/* =====================================================
   GET ATTEMPT ID
===================================================== */

function getAttemptId() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    /*
     * First try URL:
     *
     * student-assessment-result.html?attemptId=12
     */

    attemptId =
        params.get("attemptId");


    /*
     * If URL doesn't contain it,
     * try localStorage.
     */

    if (!attemptId) {

        attemptId =
            localStorage.getItem(
                "lastAttemptId"
            );

    }


    console.log(
        "Attempt ID:",
        attemptId
    );

}


/* =====================================================
   LOAD STUDENT
===================================================== */

async function loadStudent() {

    if (!studentId) {

        console.warn(
            "Student ID not found in localStorage."
        );

        return;
    }


    const response =
        await fetch(
            `${STUDENT_API}/${studentId}`
        );


    if (!response.ok) {

        console.warn(
            "Unable to load student information."
        );

        return;
    }


    const result =
        await response.json();


    console.log(
        "Student Response:",
        result
    );


    if (
        result.success &&
        result.data
    ) {

        const studentName =
            result.data.name ||
            "Student";


        const sidebarStudentName =
            document.getElementById(
                "sidebarStudentName"
            );


        const topStudentName =
            document.getElementById(
                "topStudentName"
            );


        if (sidebarStudentName) {

            sidebarStudentName.textContent =
                studentName;

        }


        if (topStudentName) {

            topStudentName.textContent =
                studentName;

        }

    }

}


/* =====================================================
   LOAD RESULT
===================================================== */

async function loadResult() {

    /*
     * Hide error
     */

    document.getElementById(
        "errorSection"
    ).classList.add("hidden");


    /*
     * Show loading
     */

    document.getElementById(
        "loadingSection"
    ).classList.remove("hidden");


    /*
     * Hide result
     */

    document.getElementById(
        "resultSection"
    ).classList.add("hidden");


    console.log(
        "Loading result for attempt:",
        attemptId
    );


    try {

        const response =
            await fetch(
                `${STUDENT_RESULT_API}/attempt/${attemptId}`
            );


        console.log(
            "Result HTTP Status:",
            response.status
        );


        if (!response.ok) {

            throw new Error(
                "Unable to load assessment result."
            );

        }


        const result =
            await response.json();


        console.log(
            "Result API Response:",
            result
        );


        if (
            !result.success ||
            !result.data
        ) {

            throw new Error(
                result.message ||
                "Assessment result not found."
            );

        }


        displayResult(
            result.data
        );


    }
    catch (error) {

        console.error(
            "Load result error:",
            error
        );


        showError(
            error.message ||
            "Unable to load assessment result."
        );

    }

}


/* =====================================================
   DISPLAY RESULT
===================================================== */

function displayResult(result) {

    console.log(
        "Displaying Result:",
        result
    );


    /* =================================================
       SCORE
    ================================================= */

    const score =
        Number(
            result.score ?? 0
        );


    /* =================================================
       TOTAL MARKS
    ================================================= */

    const totalMarks =
        Number(
            result.totalMarks ?? 0
        );


    /* =================================================
       PERCENTAGE
    ================================================= */

    let percentage =
        Number(
            result.percentage ?? 0
        );


    /*
     * Protect percentage
     */

    if (
        !Number.isFinite(
            percentage
        )
    ) {

        percentage = 0;

    }


    /*
     * Keep percentage between 0 and 100
     */

    percentage =
        Math.max(
            0,
            Math.min(
                100,
                percentage
            )
        );


    /* =================================================
       CORRECT
    ================================================= */

    const correctCount =
        Number(
            result.correctCount ?? 0
        );


    /* =================================================
       INCORRECT
    ================================================= */

    const incorrectCount =
        Number(
            result.incorrectCount ?? 0
        );


    /* =================================================
       SKIPPED
    ================================================= */

    let skippedCount =
        Number(
            result.skippedCount ?? 0
        );


    /*
     * If backend doesn't provide skippedCount,
     * calculate it using total questions/attempted.
     *
     * This is only a frontend fallback.
     */

    if (
        !Number.isFinite(
            skippedCount
        )
    ) {

        skippedCount = 0;

    }


    /* =================================================
       ATTEMPT STATUS
    ================================================= */

    const status =
        result.attemptStatus ||
        result.status ||
        "SUBMITTED";


    /* =================================================
       ASSESSMENT NAME
    ================================================= */

    const assessmentName =
        result.assessmentName ||
        result.assessment?.assessmentName ||
        "Assessment Result";


    /* =================================================
       SET ASSESSMENT NAME
    ================================================= */

    const resultAssessmentName =
        document.getElementById(
            "resultAssessmentName"
        );


    if (resultAssessmentName) {

        resultAssessmentName.textContent =
            assessmentName;

    }


    /* =================================================
       SCORE
    ================================================= */

    document.getElementById(
        "scoreValue"
    ).textContent =
        score;


    /* =================================================
       TOTAL MARKS
    ================================================= */

    document.getElementById(
        "totalMarksValue"
    ).textContent =
        totalMarks;


    /* =================================================
       PERCENTAGE
    ================================================= */

    document.getElementById(
        "percentageValue"
    ).textContent =
        percentage.toFixed(2) + "%";


    /* =================================================
       CIRCLE PERCENTAGE
    ================================================= */

    const percentageCircleValue =
        document.getElementById(
            "percentageCircleValue"
        );


    if (percentageCircleValue) {

        percentageCircleValue.textContent =
            percentage.toFixed(2) + "%";

    }


    /* =================================================
       PERFORMANCE PERCENTAGE
    ================================================= */

    document.getElementById(
        "performancePercentage"
    ).textContent =
        percentage.toFixed(2) + "%";


    /* =================================================
       STATUS
    ================================================= */

    document.getElementById(
        "resultStatus"
    ).textContent =
        status;


    document.getElementById(
        "attemptStatusValue"
    ).textContent =
        status;


    /* =================================================
       CORRECT / INCORRECT / SKIPPED
    ================================================= */

    document.getElementById(
        "correctCountValue"
    ).textContent =
        correctCount;


    document.getElementById(
        "incorrectCountValue"
    ).textContent =
        incorrectCount;


    document.getElementById(
        "skippedCountValue"
    ).textContent =
        skippedCount;


    /* =================================================
       ATTEMPT INFORMATION
    ================================================= */

    document.getElementById(
        "attemptIdValue"
    ).textContent =
        result.attemptId ?? attemptId;


    document.getElementById(
        "studentIdValue"
    ).textContent =
        result.studentId ?? "-";


    document.getElementById(
        "assessmentIdValue"
    ).textContent =
        result.assessmentId ?? "-";


    document.getElementById(
        "attemptNumberValue"
    ).textContent =
        result.attemptNumber ?? 1;


    /* =================================================
       START TIME
    ================================================= */

    document.getElementById(
        "startTimeValue"
    ).textContent =
        formatDateTime(
            result.startTime
        );


    /* =================================================
       END TIME
    ================================================= */

    document.getElementById(
        "endTimeValue"
    ).textContent =
        formatDateTime(
            result.endTime
        );


    /* =================================================
       ATTEMPTED COUNT
    ================================================= */

    const attemptedCount =
        correctCount +
        incorrectCount;


    /*
     * Total questions:
     *
     * In your assessment system:
     *
     * totalMarks = 30
     * each question = 1 mark
     *
     * But we should not blindly assume
     * totalQuestions = totalMarks forever.
     *
     * Use backend value if available.
     */

    const totalQuestions =
        Number(
            result.totalQuestions ??
            result.assessment?.totalQuestions ??
            (attemptedCount + skippedCount)
        );


    document.getElementById(
        "attemptedCountValue"
    ).textContent =
        `${attemptedCount} / ${totalQuestions}`;


    /* =================================================
       PROGRESS BAR
    ================================================= */

    const progressFill =
        document.getElementById(
            "progressFill"
        );


    progressFill.style.width =
        percentage + "%";


    /* =================================================
       CIRCLE PROGRESS
    ================================================= */

    const percentageCircle =
        document.querySelector(
            ".percentage-circle"
        );


    if (percentageCircle) {

        const degree =
            percentage * 3.6;


        percentageCircle.style.background =
            `conic-gradient(
                #ffffff ${degree}deg,
                rgba(255,255,255,0.20) ${degree}deg
            )`;

    }


    /* =================================================
       PERFORMANCE MESSAGE
    ================================================= */

    updatePerformanceMessage(
        percentage
    );


    /* =================================================
       SHOW RESULT
    ================================================= */

    document.getElementById(
        "loadingSection"
    ).classList.add("hidden");


    document.getElementById(
        "errorSection"
    ).classList.add("hidden");


    document.getElementById(
        "resultSection"
    ).classList.remove("hidden");

}


/* =====================================================
   PERFORMANCE MESSAGE
===================================================== */

function updatePerformanceMessage(
    percentage
) {

    const title =
        document.getElementById(
            "performanceTitle"
        );


    const message =
        document.getElementById(
            "performanceMessage"
        );


    const icon =
        document.getElementById(
            "performanceMessageIcon"
        );


    if (
        !title ||
        !message ||
        !icon
    ) {

        return;

    }


    /*
     * IMPORTANT:
     *
     * This is NOT a pass/fail system.
     *
     * Low percentage does NOT mean
     * the student is rejected.
     *
     * It is only an encouragement message.
     */


    if (percentage >= 80) {

        title.textContent =
            "Excellent Performance";


        message.textContent =
            "Excellent work! Your assessment performance shows strong understanding. Keep developing your skills and continue exploring advanced learning opportunities.";


        icon.className =
            "fa-solid fa-trophy";

    }


    else if (percentage >= 60) {

        title.textContent =
            "Good Performance";


        message.textContent =
            "Good work! You have demonstrated a solid understanding of the assessment topics. Continue practicing to strengthen your performance further.";


        icon.className =
            "fa-solid fa-thumbs-up";

    }


    else if (percentage >= 40) {

        title.textContent =
            "Good Start";


        message.textContent =
            "You have a good foundation. Focus on the topics where you need more practice and continue learning step by step.";


        icon.className =
            "fa-solid fa-seedling";

    }


    else if (percentage >= 20) {

        title.textContent =
            "Keep Improving";


        message.textContent =
            "This result is a starting point. Identify the areas where you need improvement and use the recommended learning resources to build your confidence.";


        icon.className =
            "fa-solid fa-arrow-trend-up";

    }


    else {

        title.textContent =
            "Your Learning Journey Starts Here";


        message.textContent =
            "Don't be discouraged by your current score. This assessment helps identify your current level. Use the recommended learning path to strengthen your skills and improve step by step.";


        icon.className =
            "fa-solid fa-lightbulb";

    }

}


/* =====================================================
   FORMAT DATE TIME
===================================================== */

function formatDateTime(
    value
) {

    if (!value) {

        return "-";

    }


    const date =
        new Date(value);


    if (
        Number.isNaN(
            date.getTime()
        )
    ) {

        return value;

    }


    return date.toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        }
    );

}


/* =====================================================
   ERROR
===================================================== */

function showError(
    message
) {

    document.getElementById(
        "loadingSection"
    ).classList.add("hidden");


    document.getElementById(
        "resultSection"
    ).classList.add("hidden");


    document.getElementById(
        "errorSection"
    ).classList.remove("hidden");


    document.getElementById(
        "errorMessage"
    ).textContent =
        message;

}


/* =====================================================
   DASHBOARD
===================================================== */

function goToDashboard() {

    window.location.href =
        "student-dashboard.html";

}


/* =====================================================
   RESULTS
===================================================== */

function goToResults() {

    window.location.href =
        "student-results.html";

}


/* =====================================================
   GO BACK
===================================================== */

function goBack() {

    window.history.back();

}


/* =====================================================
   LOGOUT
===================================================== */

function logoutStudent() {

    localStorage.removeItem(
        "studentId"
    );


    localStorage.removeItem(
        "lastAttemptId"
    );


    window.location.href =
        "student-login.html";

}