/* ==========================================================
   GIRL'S TECH HUB
   STUDENT DASHBOARD JAVASCRIPT
   ----------------------------------------------------------
   UPDATED:
   - Uses Career Recommendation API for career match
   - Keeps Dashboard and Career page calculation consistent
   - Loads student results only once
   - Calculates overall career match dynamically
   - Displays strongest recommended career
   - Updates career match ring
   - Keeps existing dashboard functionality
========================================================== */


/* ==========================================================
   API CONFIGURATION
========================================================== */

const STUDENT_API =
    "/api/student";

const RESULT_API =
    "/api/student-result";

const CAREER_RECOMMENDATION_API =
    "/api/career-recommendation";


/* ==========================================================
   STUDENT DATA
========================================================== */

let studentId =
    localStorage.getItem("studentId");

let studentResults = [];

let allAssessments = [];

let pendingAssessments = [];

let careerRecommendationData = [];

let allCareerRecommendations = [];


/* ==========================================================
   PAGE LOAD
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        if (!studentId) {

            alert("Student not logged in");

            window.location.href =
                "student-login.html";

            return;

        }


        setupNavigation();

        loadStudentDashboard();

    }
);


/* ==========================================================
   MAIN DASHBOARD LOADER
========================================================== */

async function loadStudentDashboard() {

    try {

        /*
         * Load student information
         */
        await loadStudent();


        /*
         * Load assessments AND student results.
         *
         * This method now loads the result API only once.
         */
        await loadAvailableAssessments();


        /*
         * Display latest result from already loaded results.
         */
        loadLatestResult();


        /*
         * Load career recommendations.
         *
         * IMPORTANT:
         * This uses the same API used by
         * student-career.js.
         */
        await loadCareerRecommendations();

    }

    catch (error) {

        console.error(
            "Dashboard Error:",
            error
        );

    }

}


/* ==========================================================
   LOAD STUDENT
========================================================== */

async function loadStudent() {

    const response =
        await fetch(
            STUDENT_API +
            "/" +
            studentId
        );


    if (!response.ok) {

        throw new Error(
            "Student not found"
        );

    }


    const result =
        await response.json();


    console.log(
        "Student API:",
        result
    );


    if (
        result &&
        result.success === false
    ) {

        throw new Error(
            result.message ||
            "Unable to load student"
        );

    }


    displayStudent(
        result.data
    );

}


/* ==========================================================
   DISPLAY STUDENT
========================================================== */

function displayStudent(
    student
) {

    if (!student) {

        return;

    }


    const studentName =
        student.name ||
        "Student Name";


    const branch =
        student.branch ||
        "Branch";


    /* ======================================================
       SIDEBAR
    ====================================================== */

    setText(
        "studentName",
        studentName
    );


    setText(
        "studentBranch",
        branch
    );


    /* ======================================================
       AVATAR
    ====================================================== */

    const avatar =
        document.getElementById(
            "studentAvatar"
        );


    if (avatar) {

        avatar.textContent =
            getInitials(
                studentName
            );

    }


    /* ======================================================
       HERO
    ====================================================== */

    setText(
        "welcomeName",
        studentName
    );


    /* ======================================================
       PROFILE
    ====================================================== */

    setText(
        "college",
        student.college || "-"
    );


    setText(
        "semester",
        student.semester || "-"
    );


    setText(
        "status",
        formatText(
            student.currentStatus
        )
    );


    /* ======================================================
       CAREER GOAL
    ====================================================== */

    const goal =
        student.goal;


    const career =
        document.getElementById(
            "career"
        );


    const goalMessage =
        document.getElementById(
            "goalMessage"
        );


    if (
        career &&
        goalMessage
    ) {

        if (
            goal &&
            String(goal).trim() !== ""
        ) {

            career.textContent =
                formatGoal(
                    goal
                );


            goalMessage.textContent =
                "Your selected career goal.";

        }

        else {

            career.textContent =
                "Not Selected";


            goalMessage.textContent =
                "Choose a career direction and build your personalized path.";

        }

    }

}


/* ==========================================================
   LOAD AVAILABLE ASSESSMENTS
   ----------------------------------------------------------
   Dashboard assessment count is based on:

   1. Student goal
   2. ACTIVE assessment
   3. Completed assessment

   Flow:

   Student Goal
        ↓
   Active Assessments
        ↓
   Goal Matching Assessments
        ↓
   Remove Completed
        ↓
   Pending Assessment Count
========================================================== */

async function loadAvailableAssessments() {

    try {

        /* ==================================================
           LOAD ALL ASSESSMENTS
        ================================================== */

        const assessmentResponse =
            await fetch(
                "/api/assessment/all"
            );


        if (!assessmentResponse.ok) {

            throw new Error(
                "Unable to load assessments"
            );

        }


        const assessmentData =
            await assessmentResponse.json();


        allAssessments =
            assessmentData.data || [];


        /* ==================================================
           LOAD STUDENT RESULTS
        ================================================== */

        const resultResponse =
            await fetch(
                RESULT_API +
                "/student/" +
                studentId
            );


        if (!resultResponse.ok) {

            throw new Error(
                "Unable to load student results"
            );

        }


        const resultData =
            await resultResponse.json();


        console.log(
            "Student Result API:",
            resultData
        );


        if (
            resultData &&
            resultData.success === false
        ) {

            studentResults = [];

        }

        else {

            studentResults =
                resultData.data || [];

        }


        /* ==================================================
           GET STUDENT GOAL
           --------------------------------------------------
           The student was already loaded by loadStudent().
           We get the goal from the student object stored
           globally.
        ================================================== */

        const studentResponse =
            await fetch(
                STUDENT_API +
                "/" +
                studentId
            );


        if (!studentResponse.ok) {

            throw new Error(
                "Unable to load student information"
            );

        }


        const studentData =
            await studentResponse.json();


        const studentGoal =
            studentData &&
            studentData.data
                ? studentData.data.goal
                : null;


        console.log(
            "Student Goal:",
            studentGoal
        );


        /* ==================================================
           FILTER ASSESSMENTS ACCORDING TO STUDENT GOAL
        ================================================== */

        const goalAssessments =
            getAssessmentsForGoal(
                allAssessments,
                studentGoal
            );


        console.log(
            "Goal Matching Assessments:",
            goalAssessments
        );


        /* ==================================================
           ATTEMPTED ASSESSMENT IDS
        ================================================== */

        const attemptedIds =
            studentResults
                .map(
                    result =>
                        Number(
                            result.assessmentId
                        )
                )
                .filter(
                    id =>
                        !Number.isNaN(id)
                );


        console.log(
            "Attempted Assessment IDs:",
            attemptedIds
        );


        /* ==================================================
           PENDING ASSESSMENTS
           --------------------------------------------------
           Only assessments belonging to the student's goal
           AND not already completed.
        ================================================== */

        pendingAssessments =
            goalAssessments.filter(
                assessment =>
                    !attemptedIds.includes(
                        Number(
                            assessment.assessmentId
                        )
                    )
            );


        console.log(
            "Pending Goal Assessments:",
            pendingAssessments
        );


        /* ==================================================
           AVAILABLE COUNT
        ================================================== */

        setText(
            "assessmentCount",
            pendingAssessments.length
        );


        setText(
            "assessmentCountLarge",
            pendingAssessments.length
        );


        /* ==================================================
           COMPLETED COUNT
           --------------------------------------------------
           Keep the existing behavior:
           number of unique attempts.
        ================================================== */

        const uniqueAttempts =
            new Set(
                studentResults
                    .map(
                        result =>
                            result.attemptId
                    )
                    .filter(
                        id =>
                            id !== null &&
                            id !== undefined
                    )
            );


        setText(
            "completedCount",
            uniqueAttempts.size
        );


        /* ==================================================
           ASSESSMENT BUTTON
        ================================================== */

        showAssessmentButton(
            pendingAssessments.length
        );

    }

    catch (error) {

        console.error(
            "Assessment Loading Error:",
            error
        );


        allAssessments = [];

        studentResults = [];

        pendingAssessments = [];


        setText(
            "assessmentCount",
            "0"
        );


        setText(
            "assessmentCountLarge",
            "0"
        );


        setText(
            "completedCount",
            "0"
        );


        showAssessmentButton(
            0
        );

    }

}


/* ==========================================================
   GET ASSESSMENTS FOR STUDENT GOAL
   ----------------------------------------------------------
   EXACT GOAL MAPPING:

   EXPLORE_IT_CAREERS
        → Career Discovery assessments

   LEARN_PROGRAMMING
        → Programming & Technical assessments

   PLACEMENT_PREPARATION
        → Placement Preparation assessments

   IMPORTANT:
   We use assessment NAME here instead of assessmentType.
   This prevents Placement from accidentally receiving
   Programming & Technical assessments.
========================================================== */

function getAssessmentsForGoal(
    assessments,
    goal
) {

    if (
        !Array.isArray(assessments)
    ) {

        return [];

    }


    if (
        !goal
    ) {

        return [];

    }


    /* ======================================================
       NORMALIZE STUDENT GOAL
    ====================================================== */

    const normalizedGoal =
        String(
            goal
        )
        .trim()
        .toUpperCase()
        .replace(
            /[\s-]+/g,
            "_"
        );


    console.log(
        "Student Goal:",
        normalizedGoal
    );


    /* ======================================================
       ONLY ACTIVE ASSESSMENTS
    ====================================================== */

    const activeAssessments =
        assessments.filter(
            assessment => {

                const status =
                    String(
                        assessment.status ||
                        ""
                    )
                    .trim()
                    .toUpperCase();


                return status === "ACTIVE";

            }
        );


    /* ======================================================
       DETERMINE ASSESSMENT NAME KEY
    ====================================================== */

    let requiredName = "";


    switch (
        normalizedGoal
    ) {

        /* ==================================================
           EXPLORE IT CAREERS
        ================================================== */

        case "EXPLORE_IT_CAREERS":

            requiredName =
                "CAREER DISCOVERY";

            break;


        /* ==================================================
           LEARN PROGRAMMING
        ================================================== */

        case "LEARN_PROGRAMMING":

            requiredName =
                "PROGRAMMING & TECHNICAL";

            break;


        /* ==================================================
           PLACEMENT PREPARATION
        ================================================== */

        case "PLACEMENT_PREPARATION":

            requiredName =
                "PLACEMENT PREPARATION";

            break;


        default:

            console.warn(
                "Unknown student goal:",
                normalizedGoal
            );

            return [];

    }


    /* ======================================================
       FILTER BY EXACT ASSESSMENT GROUP
    ====================================================== */

    const filteredAssessments =
        activeAssessments.filter(
            assessment => {

                const assessmentName =
                    String(
                        assessment.assessmentName ||
                        ""
                    )
                    .trim()
                    .toUpperCase();


                return assessmentName.includes(
                    requiredName
                );

            }
        );


    console.log(
        "Goal Matching Assessments:",
        filteredAssessments
    );


    return filteredAssessments;

}
/* ==========================================================
   ASSESSMENT BUTTON
========================================================== */

function showAssessmentButton(
    count
) {

    const button =
        document.getElementById(
            "assessmentBtn"
        );


    const emptyMessage =
        document.getElementById(
            "assessmentEmpty"
        );


    if (!button) {

        return;

    }


    if (count > 0) {

        button.style.display =
            "inline-flex";


        button.innerHTML =
            `
            <i class="fa-solid fa-play"></i>
            Start Assessment
            `;


        button.onclick =
            () => {

                window.location.href =
                    "student-assessment.html";

            };


        if (emptyMessage) {

            emptyMessage.style.display =
                "none";

        }

    }

    else {

        button.style.display =
            "none";


        if (emptyMessage) {

            emptyMessage.style.display =
                "flex";

        }

    }

}


/* ==========================================================
   LOAD LATEST RESULT
   ----------------------------------------------------------
   IMPORTANT:
   No second API request is made here.
   Results were already loaded by
   loadAvailableAssessments().
========================================================== */

function loadLatestResult() {

    try {

        if (
            !studentResults ||
            studentResults.length === 0
        ) {

            clearResult();

            return;

        }


        /* ==================================================
           SORT RESULTS BY DATE
        ================================================== */

        const sortedResults =
            [...studentResults].sort(
                (a, b) => {

                    const dateA =
                        getResultDate(
                            a
                        );


                    const dateB =
                        getResultDate(
                            b
                        );


                    return (
                        dateB -
                        dateA
                    );

                }
            );


        const latest =
            sortedResults[0];


        console.log(
            "Latest Result:",
            latest
        );


        displayResult(
            latest
        );

    }

    catch (error) {

        console.error(
            "Latest Result Error:",
            error
        );


        clearResult();

    }

}


/* ==========================================================
   GET RESULT DATE
========================================================== */

function getResultDate(
    result
) {

    if (!result) {

        return 0;

    }


    const value =
        result.submittedAt ||
        result.createdAt ||
        result.attemptedAt ||
        result.date;


    if (!value) {

        return 0;

    }


    const date =
        new Date(
            value
        );


    return isNaN(
        date.getTime()
    )
        ? 0
        : date.getTime();

}


/* ==========================================================
   DISPLAY LATEST RESULT
   ----------------------------------------------------------
   Career match is NOT calculated here anymore.
   Career match is calculated by:
   loadCareerRecommendations()
========================================================== */

function displayResult(
    result
) {

    if (!result) {

        clearResult();

        return;

    }


    /* ======================================================
       ASSESSMENT PERCENTAGE
    ====================================================== */

    const percentage =
        getNumber(
            result.percentage
        );


    /* ======================================================
       RESULT INFORMATION
    ====================================================== */

    setText(
        "resultCareer",
        result.assessmentName ||
        "Assessment Completed"
    );


    setText(
        "resultScore",
        formatScore(
            result.score,
            result.totalMarks
        )
    );


    setText(
        "resultPercentage",
        formatPercentage(
            percentage
        )
    );


    setText(
        "resultStatus",
        result.resultStatus ||
        "-"
    );


    /* ======================================================
       LATEST SCORE STAT
    ====================================================== */

    setText(
        "dashboardPercentage",
        formatPercentage(
            percentage
        )
    );


    /* ======================================================
       RESULT PROGRESS
    ====================================================== */

    updateProgress(
        percentage
    );


    /* ======================================================
       RESULT STATUS
    ====================================================== */

    updateResultStatusStyle(
        result.resultStatus
    );

}


/* ==========================================================
   LOAD CAREER RECOMMENDATIONS
   ----------------------------------------------------------
   THIS IS THE IMPORTANT FIX.
   ----------------------------------------------------------
   The Career Recommendation page uses:

   /api/career-recommendation/attempt/{attemptId}

   We use the SAME API here.
========================================================== */

async function loadCareerRecommendations() {

    try {

        /* ==================================================
           RESET CAREER DATA
        ================================================== */

        careerRecommendationData = [];

        allCareerRecommendations = [];


        /* ==================================================
           NO RESULTS
        ================================================== */

        if (
            !studentResults ||
            studentResults.length === 0
        ) {

            setCareerEmpty();

            return;

        }


        /* ==================================================
           LOAD RECOMMENDATIONS FOR EACH ATTEMPT
        ================================================== */

        const recommendationRequests =
            studentResults.map(
                async result => {

                    /*
                     * Attempt ID is required because the
                     * recommendation API works by attempt.
                     */

                    const attemptId =
                        result.attemptId;


                    if (
                        attemptId === null ||
                        attemptId === undefined ||
                        attemptId === ""
                    ) {

                        console.warn(
                            "Missing attemptId:",
                            result
                        );

                        return null;

                    }


                    try {

                        const response =
                            await fetch(
                                CAREER_RECOMMENDATION_API +
                                "/attempt/" +
                                attemptId
                            );


                        if (!response.ok) {

                            console.warn(
                                "Recommendation unavailable for attempt:",
                                attemptId
                            );

                            return null;

                        }


                        const data =
                            await response.json();


                        console.log(
                            "Career Recommendation Response:",
                            attemptId,
                            data
                        );


                        if (
                            !data ||
                            data.success === false
                        ) {

                            return null;

                        }


                        if (
                            !Array.isArray(
                                data.data
                            )
                        ) {

                            return null;

                        }


                        /* ==================================
                           ADD RESULT INFORMATION
                           TO EACH CAREER RECOMMENDATION
                        ================================== */

                        const recommendations =
                            data.data.map(
                                recommendation => ({

                                    ...recommendation,

                                    attemptId:
                                        attemptId,

                                    assessmentId:
                                        result.assessmentId,

                                    assessmentName:
                                        result.assessmentName,

                                    score:
                                        result.score,

                                    totalMarks:
                                        result.totalMarks,

                                    percentage:
                                        result.percentage,

                                    resultStatus:
                                        result.resultStatus

                                })
                            );


                        return {

                            result:
                                result,

                            recommendations:
                                recommendations

                        };

                    }

                    catch (error) {

                        console.error(
                            "Career recommendation error for attempt:",
                            attemptId,
                            error
                        );


                        return null;

                    }

                }
            );


        /* ==================================================
           WAIT FOR ALL RECOMMENDATIONS
        ================================================== */

        const loadedRecommendations =
            await Promise.all(
                recommendationRequests
            );


        /* ==================================================
           REMOVE FAILED REQUESTS
        ================================================== */

        careerRecommendationData =
            loadedRecommendations.filter(
                item =>
                    item !== null &&
                    item.recommendations &&
                    item.recommendations.length > 0
            );


        /* ==================================================
           FLATTEN ALL CAREER DATA
        ================================================== */

        careerRecommendationData.forEach(
            item => {

                allCareerRecommendations.push(
                    ...item.recommendations
                );

            }
        );


        console.log(
            "Career Recommendation Data:",
            careerRecommendationData
        );


        console.log(
            "All Career Recommendations:",
            allCareerRecommendations
        );


        /* ==================================================
           NO CAREER DATA
        ================================================== */

        if (
            careerRecommendationData.length === 0 ||
            allCareerRecommendations.length === 0
        ) {

            setCareerEmpty();

            return;

        }


        /* ==================================================
           CALCULATE SAME OVERALL MATCH
           AS STUDENT CAREER PAGE
        ================================================== */

        calculateDashboardCareerMatch();

    }

    catch (error) {

        console.error(
            "Career Recommendation Loading Error:",
            error
        );


        /*
         * If the recommendation API fails,
         * do NOT show an incorrect 0%.
         *
         * We can optionally use the existing result
         * field as a fallback if it exists.
         */

        const fallback =
            findFallbackCareerMatch();


        if (
            fallback !== null
        ) {

            setCareerMatch(
                fallback.matchPercentage,
                fallback.careerName,
                fallback.summary
            );

        }

        else {

            setCareerEmpty();

        }

    }

}


/* ==========================================================
   CALCULATE DASHBOARD CAREER MATCH
   ----------------------------------------------------------
   This intentionally follows the same logic as
   student-career.js:

   1. Find BEST career match for each assessment.
   2. Average those best matches.
   3. Find strongest career overall.
========================================================== */

function calculateDashboardCareerMatch() {

    if (
        allCareerRecommendations.length === 0
    ) {

        setCareerEmpty();

        return;

    }


    /* ======================================================
       STEP 1:
       FIND BEST MATCH FROM EACH ASSESSMENT
    ====================================================== */

    const bestMatches = [];


    careerRecommendationData.forEach(
        item => {

            if (
                item.recommendations &&
                item.recommendations.length > 0
            ) {

                const best =
                    Math.max(
                        ...item.recommendations.map(
                            recommendation =>
                                Number(
                                    recommendation.matchPercentage || 0
                                )
                        )
                    );


                bestMatches.push(
                    best
                );

            }

        }
    );


    /* ======================================================
       STEP 2:
       CALCULATE OVERALL MATCH
    ====================================================== */

    let overall =
        0;


    if (
        bestMatches.length > 0
    ) {

        overall =
            bestMatches.reduce(
                (
                    sum,
                    value
                ) =>
                    sum + value,
                0
            )
            /
            bestMatches.length;

    }


    /*
     * Same rounding as Career Recommendation page.
     */

    overall =
        Math.round(
            overall * 100
        ) / 100;


    /* ======================================================
       STEP 3:
       FIND STRONGEST CAREER
       ------------------------------------------------------
       For the same career across multiple assessments,
       keep its highest match.
    ====================================================== */

    const careerMap =
        new Map();


    allCareerRecommendations.forEach(
        career => {

            const careerId =
                career.careerId;


            const currentMatch =
                Number(
                    career.matchPercentage || 0
                );


            const existing =
                careerMap.get(
                    careerId
                );


            if (
                !existing ||
                currentMatch >
                Number(
                    existing.matchPercentage || 0
                )
            ) {

                careerMap.set(
                    careerId,
                    career
                );

            }

        }
    );


    /* ======================================================
       SORT CAREERS BY STRONGEST MATCH
    ====================================================== */

    const strongest =
        Array.from(
            careerMap.values()
        )
        .sort(
            (a, b) =>
                Number(
                    b.matchPercentage || 0
                )
                -
                Number(
                    a.matchPercentage || 0
                )
        )[0];


    /* ======================================================
       DISPLAY CAREER
    ====================================================== */

    if (strongest) {

        const careerName =
            strongest.careerName ||
            "Recommended Career";


        const strongestMatch =
            Number(
                strongest.matchPercentage || 0
            );


        const summary =
            `
            Your strongest career alignment is
            ${careerName}
            with a
            ${formatPercentage(strongestMatch)}
            match based on your completed assessments.
            `;


        setCareerMatch(
            overall,
            careerName,
            summary
        );


        console.log(
            "Overall Career Match:",
            overall
        );


        console.log(
            "Strongest Career:",
            careerName
        );


        console.log(
            "Strongest Career Match:",
            strongestMatch
        );

    }

    else {

        setCareerMatch(
            overall,
            "Recommended Career",
            "Your personalized career recommendation is based on your completed assessments."
        );

    }

}


/* ==========================================================
   SET CAREER MATCH
   ----------------------------------------------------------
   overallPercentage:
       Value shown in dashboard match ring/stat.

   careerName:
       Strongest recommended career.

   summary:
       Career explanation.
========================================================== */

function setCareerMatch(
    overallPercentage,
    careerName,
    summary
) {

    const percentage =
        getNumber(
            overallPercentage
        );


    /* ======================================================
       TOP CAREER MATCH STAT
    ====================================================== */

    setText(
        "dashboardCareerMatch",
        percentage !== null
            ? formatPercentage(
                percentage
            )
            : "--"
    );


    /* ======================================================
       BEST CAREER NAME
    ====================================================== */

    setText(
        "recommendedCareer",
        careerName ||
        "Recommended Career"
    );


    /* ======================================================
       CAREER CARD MATCH
    ====================================================== */

    setText(
        "matchPercentage",
        percentage !== null
            ? formatPercentage(
                percentage
            )
            : "--"
    );


    /* ======================================================
       CAREER SUMMARY
    ====================================================== */

    setText(
        "careerSummary",
        summary ||
        "Your recommendation is generated from your assessment performance and helps identify career paths aligned with your strengths."
    );


    /* ======================================================
       UPDATE CIRCLE
    ====================================================== */

    updateCareerRing(
        percentage
    );

}


/* ==========================================================
   FALLBACK CAREER MATCH
   ----------------------------------------------------------
   This is only used if the recommendation API itself fails.
========================================================== */

function findFallbackCareerMatch() {

    if (
        !studentResults ||
        studentResults.length === 0
    ) {

        return null;

    }


    let bestResult =
        null;


    let bestMatch =
        null;


    studentResults.forEach(
        result => {

            const value =
                getNumber(
                    result.matchPercentage ??
                    result.match_percentage ??
                    result.careerReadiness
                );


            if (
                value !== null &&
                (
                    bestMatch === null ||
                    value > bestMatch
                )
            ) {

                bestMatch =
                    value;


                bestResult =
                    result;

            }

        }
    );


    if (
        bestResult &&
        bestMatch !== null
    ) {

        return {

            matchPercentage:
                bestMatch,

            careerName:
                bestResult.recommendedCareer ||
                "Recommended Career",

            summary:
                "Your career recommendation is generated from your assessment performance."

        };

    }


    return null;

}


/* ==========================================================
   UPDATE RESULT PROGRESS
========================================================== */

function updateProgress(
    percentage
) {

    const safePercentage =
        percentage === null
            ? 0
            : clamp(
                percentage,
                0,
                100
            );


    setText(
        "resultProgressPercent",
        formatPercentage(
            safePercentage
        )
    );


    const bar =
        document.getElementById(
            "resultProgressBar"
        );


    if (bar) {

        setTimeout(
            () => {

                bar.style.width =
                    safePercentage +
                    "%";

            },
            150
        );

    }

}


/* ==========================================================
   CAREER RING
========================================================== */

function updateCareerRing(
    percentage
) {

    const ring =
        document.getElementById(
            "dashboardMatchRing"
        );


    if (!ring) {

        return;

    }


    const value =
        percentage === null
            ? 0
            : clamp(
                percentage,
                0,
                100
            );


    const degree =
        value *
        3.6;


    ring.style.background =
        `
        conic-gradient(
            #FF7A00 0deg,
            #FF7A00 ${degree}deg,
            #E7EBF3 ${degree}deg,
            #E7EBF3 360deg
        )
        `;

}


/* ==========================================================
   RESULT STATUS STYLE
========================================================== */

function updateResultStatusStyle(
    status
) {

    const element =
        document.getElementById(
            "resultStatus"
        );


    if (!element) {

        return;

    }


    element.classList.remove(
        "status-pass",
        "status-fail"
    );


    const value =
        String(
            status || ""
        ).toUpperCase();


    if (
        value.includes("PASS")
    ) {

        element.classList.add(
            "status-pass"
        );

    }

    else if (
        value.includes("FAIL")
    ) {

        element.classList.add(
            "status-fail"
        );

    }

}


/* ==========================================================
   CLEAR RESULT
========================================================== */

function clearResult() {

    setText(
        "resultCareer",
        "No Result Available"
    );


    setText(
        "resultScore",
        "-"
    );


    setText(
        "resultPercentage",
        "-"
    );


    setText(
        "resultStatus",
        "-"
    );


    setText(
        "dashboardPercentage",
        "--"
    );


    setText(
        "resultProgressPercent",
        "0%"
    );


    const bar =
        document.getElementById(
            "resultProgressBar"
        );


    if (bar) {

        bar.style.width =
            "0%";

    }


    setCareerEmpty();

}


/* ==========================================================
   EMPTY CAREER
========================================================== */

function setCareerEmpty() {

    setText(
        "recommendedCareer",
        "Not Generated"
    );


    setText(
        "matchPercentage",
        "--"
    );


    setText(
        "dashboardCareerMatch",
        "--"
    );


    setText(
        "careerSummary",

        "Complete an assessment to receive your personalized career recommendation."
    );


    updateCareerRing(
        null
    );

}


/* ==========================================================
   FORMAT SCORE
========================================================== */

function formatScore(
    score,
    totalMarks
) {

    if (
        score === undefined ||
        score === null
    ) {

        return "-";

    }


    if (
        totalMarks !== undefined &&
        totalMarks !== null
    ) {

        return (
            score +
            " / " +
            totalMarks
        );

    }


    return String(
        score
    );

}


/* ==========================================================
   FORMAT PERCENTAGE
========================================================== */

function formatPercentage(
    value
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return "--";

    }


    const number =
        Number(
            value
        );


    if (
        Number.isNaN(
            number
        )
    ) {

        return "--";

    }


    return (
        number.toFixed(2) +
        "%"
    );

}


/* ==========================================================
   NUMBER HELPER
========================================================== */

function getNumber(
    value
) {

    if (
        value === null ||
        value === undefined ||
        value === ""
    ) {

        return null;

    }


    const number =
        Number(
            value
        );


    return Number.isNaN(
        number
    )
        ? null
        : number;

}


/* ==========================================================
   CLAMP
========================================================== */

function clamp(
    value,
    min,
    max
) {

    return Math.min(
        Math.max(
            Number(value) || 0,
            min
        ),
        max
    );

}


/* ==========================================================
   FORMAT GOAL
========================================================== */

function formatGoal(
    goal
) {

    if (!goal) {

        return "Not Selected";

    }


    return String(
        goal
    )
    .replaceAll(
        "_",
        " "
    )
    .replace(
        /\s+/g,
        " "
    )
    .trim()
    .replace(
        /\b\w/g,
        char =>
            char.toUpperCase()
    );

}


/* ==========================================================
   FORMAT TEXT
========================================================== */

function formatText(
    value
) {

    if (!value) {

        return "-";

    }


    return String(
        value
    )
    .replaceAll(
        "_",
        " "
    )
    .replace(
        /\b\w/g,
        char =>
            char.toUpperCase()
    );

}


/* ==========================================================
   INITIALS
========================================================== */

function getInitials(
    name
) {

    if (!name) {

        return "S";

    }


    const words =
        String(
            name
        )
        .trim()
        .split(
            /\s+/
        );


    if (
        words.length === 1
    ) {

        return words[0]
            .substring(
                0,
                1
            )
            .toUpperCase();

    }


    return (
        words[0].charAt(0) +
        words[
            words.length - 1
        ].charAt(0)
    ).toUpperCase();

}


/* ==========================================================
   SAFE TEXT SETTER
========================================================== */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {

        return;

    }


    element.textContent =
        value === null ||
        value === undefined ||
        value === ""
            ? "-"
            : value;

}


/* ==========================================================
   NAVIGATION
========================================================== */

function goTo(
    page
) {

    window.location.href =
        page;

}


/* ==========================================================
   BUTTONS + LOGOUT
========================================================== */

function setupNavigation() {

    /* ======================================================
       RESULT BUTTON
    ====================================================== */

    const resultBtn =
        document.getElementById(
            "viewResultBtn"
        );


    if (resultBtn) {

        resultBtn.addEventListener(
            "click",
            () => {

                goTo(
                    "student-results.html"
                );

            }
        );

    }


    /* ======================================================
       CAREER BUTTON
    ====================================================== */

    const careerBtn =
        document.getElementById(
            "viewCareerBtn"
        );


    if (careerBtn) {

        careerBtn.addEventListener(
            "click",
            () => {

                goTo(
                    "student-career.html"
                );

            }
        );

    }


    /* ======================================================
       LOGOUT BUTTON
    ====================================================== */

    const logoutBtn =
        document.getElementById(
            "logoutBtn"
        );


    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            logoutStudent
        );

    }

}


/* ==========================================================
   CUSTOM LOGOUT MODAL
========================================================== */

function logoutStudent() {

    openLogoutModal();

}


/* ==========================================================
   OPEN LOGOUT MODAL
========================================================== */

function openLogoutModal() {

    const modal =
        document.getElementById(
            "appModal"
        );


    if (!modal) {

        return;

    }


    modal.classList.add(
        "show"
    );


    document.body.style.overflow =
        "hidden";

}


/* ==========================================================
   CLOSE LOGOUT MODAL
========================================================== */

function closeLogoutModal() {

    const modal =
        document.getElementById(
            "appModal"
        );


    if (!modal) {

        return;

    }


    modal.classList.remove(
        "show"
    );


    document.body.style.overflow =
        "";

}


/* ==========================================================
   CONFIRM LOGOUT
========================================================== */

function confirmLogout() {

    localStorage.removeItem(
        "studentId"
    );


    window.location.href =
        "student-login.html";

}


/* ==========================================================
   MODAL EVENTS
========================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        const closeBtn =
            document.getElementById(
                "modalCloseBtn"
            );


        const cancelBtn =
            document.getElementById(
                "modalCancelBtn"
            );


        const confirmBtn =
            document.getElementById(
                "modalConfirmBtn"
            );


        const overlay =
            document.querySelector(
                ".app-modal-overlay"
            );


        /* ==================================================
           CLOSE BUTTON
        ================================================== */

        if (closeBtn) {

            closeBtn.addEventListener(
                "click",
                closeLogoutModal
            );

        }


        /* ==================================================
           CANCEL BUTTON
        ================================================== */

        if (cancelBtn) {

            cancelBtn.addEventListener(
                "click",
                closeLogoutModal
            );

        }


        /* ==================================================
           CONFIRM BUTTON
        ================================================== */

        if (confirmBtn) {

            confirmBtn.addEventListener(
                "click",
                confirmLogout
            );

        }


        /* ==================================================
           OVERLAY
        ================================================== */

        if (overlay) {

            overlay.addEventListener(
                "click",
                closeLogoutModal
            );

        }


        /* ==================================================
           ESCAPE KEY
        ================================================== */

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape"
                ) {

                    closeLogoutModal();

                }

            }
        );

    }
);