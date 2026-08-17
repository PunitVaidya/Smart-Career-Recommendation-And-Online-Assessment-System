/* =========================================================
   GIRIS TECH HUB
   STUDENT CAREER RECOMMENDATION
   FULLY DYNAMIC
========================================================= */


const STUDENT_API =
    "/api/student";

const RESULT_API =
    "/api/student-result/student";

const CAREER_RECOMMENDATION_API =
    "/api/career-recommendation";


let studentId =
    localStorage.getItem("studentId");

let studentData = null;

let resultList = [];

let assessmentCareerData = [];

let allCareerData = [];

let currentAssessment = null;


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function () {

        if (!studentId) {

            alert("Student not logged in.");

            window.location.href =
                "student-login.html";

            return;
        }


        initializeSearch();

        initializeLogout();

        initializeDetailControls();


        try {

            showLoader();

            await loadStudent();

            await loadCareerData();

        }
        catch (error) {

            console.error(
                "Career Page Error:",
                error
            );

            showGlobalError();

        }
        finally {

            hideLoader();

        }

    }
);


/* =========================================================
   LOAD STUDENT
========================================================= */

async function loadStudent() {

    const response =
        await fetch(
            `${STUDENT_API}/${studentId}`
        );


    if (!response.ok) {

        throw new Error(
            "Unable to load student."
        );

    }


    const result =
        await response.json();


    if (!result.success) {

        throw new Error(
            "Student data unavailable."
        );

    }


    studentData =
        result.data;


    setText(
        "studentName",
        studentData.name
    );


    setText(
        "studentBranch",
        studentData.branch
    );

}


/* =========================================================
   LOAD CAREER DATA
========================================================= */

async function loadCareerData() {

    const response =
        await fetch(
            `${RESULT_API}/${studentId}`
        );


    if (!response.ok) {

        throw new Error(
            "Unable to load assessment results."
        );

    }


    const result =
        await response.json();


    if (!result.success) {

        resultList = [];

        renderNoCareerData();

        return;

    }


    resultList =
        result.data || [];


    if (resultList.length === 0) {

        renderNoCareerData();

        return;

    }


    assessmentCareerData = [];

    allCareerData = [];


    for (
        const assessmentResult
        of resultList
    ) {

        try {

            const recommendationResponse =
                await fetch(
                    `${CAREER_RECOMMENDATION_API}/attempt/${assessmentResult.attemptId}`
                );


            if (!recommendationResponse.ok) {

                console.warn(
                    "Recommendation unavailable:",
                    assessmentResult.attemptId
                );

                continue;

            }


            const recommendationResult =
                await recommendationResponse.json();


            if (
                recommendationResult.success &&
                Array.isArray(
                    recommendationResult.data
                )
            ) {

                const recommendations =
                    recommendationResult.data
                    .map(
                        recommendation => ({

                            ...recommendation,

                            assessmentId:
                                assessmentResult.assessmentId,

                            assessmentName:
                                assessmentResult.assessmentName,

                            score:
                                assessmentResult.score,

                            totalMarks:
                                assessmentResult.totalMarks,

                            percentage:
                                assessmentResult.percentage,

                            resultStatus:
                                assessmentResult.resultStatus

                        })
                    );


                assessmentCareerData.push({

                    result:
                        assessmentResult,

                    recommendations:
                        recommendations

                });


                allCareerData.push(
                    ...recommendations
                );

            }

        }
        catch (error) {

            console.error(
                "Recommendation loading error:",
                error
            );

        }

    }


    if (
        assessmentCareerData.length === 0
    ) {

        renderNoCareerData();

        return;

    }


    updateAssessmentCount();

    calculateOverallMatch();

    renderTopCareers();

    renderAssessmentCards(
        assessmentCareerData
    );

}


/* =========================================================
   ASSESSMENT COUNT
========================================================= */

function updateAssessmentCount() {

    const count =
        assessmentCareerData.length;


    setText(
        "assessmentCount",
        `${count} ${
            count === 1
                ? "Assessment"
                : "Assessments"
        }`
    );

}


/* =========================================================
   OVERALL CAREER MATCH
========================================================= */

function calculateOverallMatch() {

    if (
        allCareerData.length === 0
    ) {

        setOverallMatch(0);

        setText(
            "overallTitle",
            "Complete an assessment"
        );

        setText(
            "overallDescription",
            "Complete an assessment to receive personalized career recommendations."
        );

        return;

    }


    const bestMatches = [];


    assessmentCareerData.forEach(
        item => {

            if (
                item.recommendations &&
                item.recommendations.length
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


                bestMatches.push(best);

            }

        }
    );


    let overall = 0;


    if (bestMatches.length > 0) {

        overall =
            bestMatches.reduce(
                (sum, value) =>
                    sum + value,
                0
            )
            /
            bestMatches.length;

    }


    overall =
        Math.round(
            overall * 100
        ) / 100;


    setOverallMatch(
        overall
    );


    const careerMap =
        new Map();


    allCareerData.forEach(
        career => {

            const existing =
                careerMap.get(
                    career.careerId
                );


            if (
                !existing ||
                Number(
                    career.matchPercentage || 0
                )
                >
                Number(
                    existing.matchPercentage || 0
                )
            ) {

                careerMap.set(
                    career.careerId,
                    career
                );

            }

        }
    );


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


    if (strongest) {

        const careerName =
            strongest.careerName ||
            "Recommended Career";


        setText(
            "overallTitle",
            careerName
        );


        setText(
            "overallDescription",

            `Your strongest career alignment is ${careerName} with a ${formatPercentage(
                strongest.matchPercentage
            )} match based on your completed assessments.`
        );

    }

}


/* =========================================================
   OVERALL CIRCLE
========================================================= */

function setOverallMatch(
    percentage
) {

    percentage =
        Number(
            percentage || 0
        );


    percentage =
        Math.max(
            0,
            Math.min(
                100,
                percentage
            )
        );


    setText(
        "overallMatch",
        `${Math.round(percentage)}%`
    );


    const circle =
        document.getElementById(
            "overallCircle"
        );


    if (!circle) {
        return;
    }


    const degrees =
        percentage * 3.6;


    circle.style.background =
        `conic-gradient(
            #7142f4 0deg,
            #7142f4 ${degrees}deg,
            #e5e8f1 ${degrees}deg,
            #e5e8f1 360deg
        )`;

}


/* =========================================================
   TOP 5 CAREERS
========================================================= */

function renderTopCareers() {

    const container =
        document.getElementById(
            "topCareerList"
        );


    if (!container) {
        return;
    }


    const careerMap =
        new Map();


    allCareerData.forEach(
        recommendation => {

            const careerId =
                recommendation.careerId;


            if (!careerMap.has(careerId)) {

                careerMap.set(
                    careerId,
                    {
                        ...recommendation,

                        scores: [

                            Number(
                                recommendation.matchPercentage || 0
                            )

                        ]

                    }
                );

            }
            else {

                careerMap
                    .get(careerId)
                    .scores
                    .push(
                        Number(
                            recommendation.matchPercentage || 0
                        )
                    );

            }

        }
    );


    const careers =
        Array.from(
            careerMap.values()
        )
        .map(
            career => {

                const scores =
                    career.scores;


                const average =
                    scores.reduce(
                        (sum, value) =>
                            sum + value,
                        0
                    )
                    /
                    scores.length;


                return {

                    ...career,

                    overallMatch:
                        average

                };

            }
        )
        .sort(
            (a, b) =>
                b.overallMatch
                -
                a.overallMatch
        )
        .slice(0, 5);


    if (careers.length === 0) {

        container.innerHTML = `

            <div class="career-loading">

                No career recommendations yet.

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    careers.forEach(
        (career, index) => {

            const percentage =
                Number(
                    career.overallMatch || 0
                );


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "top-career-item";


            item.addEventListener(
                "click",
                function () {

                    showCareerDetail(
                        career
                    );

                }
            );


            item.innerHTML = `

                <div class="rank">
                    ${index + 1}
                </div>

                <div class="top-career-name">

                    ${escapeHtml(
                        career.careerName ||
                        "Career Recommendation"
                    )}

                </div>

                <div class="top-progress">

                    <span
                        style="width:${Math.min(
                            100,
                            percentage
                        )}%">
                    </span>

                </div>

                <div class="top-career-score">

                    ${formatPercentage(
                        percentage
                    )}

                </div>

            `;


            container.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   ASSESSMENT CARDS
========================================================= */

function renderAssessmentCards(
    data
) {

    const container =
        document.getElementById(
            "assessmentCareerContainer"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        !data ||
        data.length === 0
    ) {

        container.innerHTML = `

            <div class="career-message">

                <i class="fa-solid fa-magnifying-glass"></i>

                <h3>
                    No matching assessment found
                </h3>

                <p>
                    Try another assessment or career name.
                </p>

            </div>

        `;

        return;

    }


    data.forEach(
        item => {

            const result =
                item.result;


            const status =
                String(
                    result.resultStatus ||
                    "FAIL"
                )
                .toUpperCase();


            const statusClass =
                status === "PASS"
                    ? "result-pass"
                    : "result-fail";


            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "assessment-career-card";


            card.innerHTML = `

                <div class="assessment-title">

                    <div class="assessment-icon">

                        <i class="fa-solid fa-file-lines"></i>

                    </div>

                    <div>

                        <h3>

                            ${escapeHtml(
                                result.assessmentName ||
                                "Assessment"
                            )}

                        </h3>

                        <div class="assessment-subtitle">

                            Assessment Performance

                        </div>

                    </div>

                </div>


                <div class="assessment-score">

                    <div class="score-box">

                        <span>
                            Score
                        </span>

                        <strong>

                            ${result.score || 0}
                            /
                            ${result.totalMarks || 0}

                        </strong>

                    </div>


                    <div class="score-box">

                        <span>
                            Percentage
                        </span>

                        <strong>

                            ${formatPercentage(
                                result.percentage
                            )}

                        </strong>

                    </div>

                </div>


                <span class="result-badge ${statusClass}">

                    <i class="fa-solid ${
                        status === "PASS"
                            ? "fa-circle-check"
                            : "fa-circle-xmark"
                    }"></i>

                    ${status}

                </span>


                <button
                    type="button"
                    class="assessment-detail-button">

                    <i class="fa-solid fa-chart-column"></i>

                    View Full Detail

                    <i class="fa-solid fa-arrow-right"></i>

                </button>

            `;


            const button =
                card.querySelector(
                    ".assessment-detail-button"
                );


            button.addEventListener(
                "click",
                function () {

                    showAssessmentDetail(
                        item
                    );

                }
            );


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================================
   SHOW ASSESSMENT DETAIL
========================================================= */

function showAssessmentDetail(
    item
) {

    if (!item) {
        return;
    }


    currentAssessment =
        item;


    const overlay =
        document.getElementById(
            "careerDetailOverlay"
        );


    if (!overlay) {
        return;
    }


    const result =
        item.result;


    const recommendations =
        [...(
            item.recommendations ||
            []
        )]
        .sort(
            (a, b) =>
                Number(
                    a.rankNo || 999
                )
                -
                Number(
                    b.rankNo || 999
                )
        );


    /*
     * Header
     */

    setText(
        "detailAssessmentName",
        result.assessmentName ||
        "Assessment"
    );


    setText(
        "detailAssessmentSubtitle",
        "Detailed assessment performance and career analysis"
    );


    /*
     * Summary
     */

    setText(
        "detailScore",
        `${result.score || 0} / ${result.totalMarks || 0}`
    );


    setText(
        "detailPercentage",
        formatPercentage(
            result.percentage
        )
    );


    setText(
        "detailStatus",
        String(
            result.resultStatus ||
            "FAIL"
        ).toUpperCase()
    );


    /*
     * Career list
     */

    renderDetailCareerMatches(
        recommendations
    );


    /*
     * Hide career insight
     */

    hideSelectedCareerExplanation();


    /*
     * Open modal
     */

    overlay.classList.add(
        "show"
    );


    document.body.classList.add(
        "career-detail-open"
    );

}


/* =========================================================
   RENDER DETAIL CAREERS
========================================================= */

function renderDetailCareerMatches(
    recommendations
) {

    const container =
        document.getElementById(
            "detailCareerMatches"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        !recommendations ||
        recommendations.length === 0
    ) {

        container.innerHTML = `

            <div class="career-loading">

                <i class="fa-solid fa-circle-info"></i>

                Career recommendations are not available yet.

            </div>

        `;

        return;

    }


    recommendations.forEach(
        (career, index) => {

            const percentage =
                Number(
                    career.matchPercentage || 0
                );


            const row =
                document.createElement(
                    "div"
                );


            row.className =
                "detail-career-row";


            row.innerHTML = `

                <div class="detail-career-rank">

                    ${
                        career.rankNo ||
                        index + 1
                    }

                </div>


                <div class="detail-career-name">

                    ${escapeHtml(
                        career.careerName ||
                        "Career Recommendation"
                    )}

                </div>


                <div class="detail-career-progress">

                    <span
                        style="width:${Math.min(
                            100,
                            percentage
                        )}%">
                    </span>

                </div>


                <div class="detail-career-value">

                    ${formatPercentage(
                        percentage
                    )}

                </div>

            `;


            row.addEventListener(
                "click",
                function () {

                    showSelectedCareer(
                        career
                    );

                }
            );


            container.appendChild(
                row
            );

        }
    );

}


/* =========================================================
   SHOW SELECTED CAREER
========================================================= */

function showSelectedCareer(
    career
) {

    if (!career) {
        return;
    }


    const explanation =
        document.getElementById(
            "selectedCareerExplanation"
        );


    if (!explanation) {
        return;
    }


    const percentage =
        Number(
            career.matchPercentage || 0
        );


    setText(
        "selectedCareerName",
        career.careerName ||
        "Career Recommendation"
    );


    setText(
        "selectedCareerPercentage",
        formatPercentage(
            percentage
        )
    );


    setText(
        "selectedCareerWhy",

        `This career has a ${formatPercentage(
            percentage
        )} match based on this assessment. The recommendation is generated from your assessment performance and career alignment.`
    );


    setText(
        "selectedCareerStrengths",

        career.strengths ||
        "Your assessment performance shows alignment with this career."
    );


    setText(
        "selectedCareerWeaknesses",

        career.weaknesses ||
        "Continue developing the skills related to this career to improve your alignment."
    );


    explanation.classList.add(
        "show"
    );


    /*
     * Keep the insight inside the modal.
     */

    explanation.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
    });

}


/* =========================================================
   TOP CAREER -> DETAIL
========================================================= */

function showCareerDetail(
    career
) {

    if (!career) {
        return;
    }


    const matchingAssessments =
        allCareerData.filter(
            item =>
                item.careerId ===
                career.careerId
        );


    if (
        matchingAssessments.length === 0
    ) {

        return;

    }


    const strongest =
        [...matchingAssessments]
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


    const assessment =
        assessmentCareerData.find(
            item =>
                item.result.attemptId ===
                strongest.attemptId
        );


    if (!assessment) {

        return;

    }


    showAssessmentDetail(
        assessment
    );


    setTimeout(
        function () {

            showSelectedCareer(
                strongest
            );

        },
        120
    );

}


/* =========================================================
   DETAIL CONTROLS
========================================================= */

function initializeDetailControls() {

    const backButton =
        document.getElementById(
            "detailBackButton"
        );


    const cancelButton =
        document.getElementById(
            "detailCancelButton"
        );


    const overlay =
        document.getElementById(
            "careerDetailOverlay"
        );


    if (backButton) {

        backButton.addEventListener(
            "click",
            closeCareerDetail
        );

    }


    if (cancelButton) {

        cancelButton.addEventListener(
            "click",
            closeCareerDetail
        );

    }


    /*
     * Clicking dark background closes modal.
     * Clicking inside modal does not.
     */

    if (overlay) {

        overlay.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === overlay
                ) {

                    closeCareerDetail();

                }

            }
        );

    }


    /*
     * Escape key closes detail.
     */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                closeCareerDetail();

            }

        }
    );

}


/* =========================================================
   CLOSE CAREER DETAIL
========================================================= */

function closeCareerDetail() {

    const overlay =
        document.getElementById(
            "careerDetailOverlay"
        );


    if (overlay) {

        overlay.classList.remove(
            "show"
        );

    }


    document.body.classList.remove(
        "career-detail-open"
    );


    hideSelectedCareerExplanation();


    currentAssessment =
        null;

}


/* =========================================================
   HIDE SELECTED CAREER
========================================================= */

function hideSelectedCareerExplanation() {

    const explanation =
        document.getElementById(
            "selectedCareerExplanation"
        );


    if (explanation) {

        explanation.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   SEARCH
========================================================= */

function initializeSearch() {

    const search =
        document.getElementById(
            "careerSearch"
        );


    if (!search) {
        return;
    }


    search.addEventListener(
        "input",
        function () {

            const value =
                search.value
                    .trim()
                    .toLowerCase();


            if (!value) {

                renderAssessmentCards(
                    assessmentCareerData
                );

                renderTopCareers();

                return;

            }


            const filtered =
                assessmentCareerData.filter(
                    item => {

                        const assessmentName =
                            String(
                                item.result.assessmentName ||
                                ""
                            )
                            .toLowerCase();


                        const careerNames =
                            item.recommendations
                                .map(
                                    career =>
                                        String(
                                            career.careerName ||
                                            ""
                                        )
                                        .toLowerCase()
                                )
                                .join(" ");


                        return (

                            assessmentName
                                .includes(value)

                            ||

                            careerNames
                                .includes(value)

                        );

                    }
                );


            renderAssessmentCards(
                filtered
            );

        }
    );

}


/* =========================================================
   NO DATA
========================================================= */

function renderNoCareerData() {

    setOverallMatch(0);


    setText(
        "overallTitle",
        "No career match yet"
    );


    setText(
        "overallDescription",
        "Complete at least one assessment to receive personalized career recommendations."
    );


    setText(
        "assessmentCount",
        "0 Assessments"
    );


    const top =
        document.getElementById(
            "topCareerList"
        );


    if (top) {

        top.innerHTML = `

            <div class="career-loading">

                <i class="fa-solid fa-briefcase"></i>

                No recommendations yet.

            </div>

        `;

    }


    const container =
        document.getElementById(
            "assessmentCareerContainer"
        );


    if (container) {

        container.innerHTML = `

            <div class="career-message">

                <i class="fa-solid fa-file-circle-question"></i>

                <h3>
                    No completed assessments
                </h3>

                <p>
                    Complete an assessment to unlock
                    your personalized career recommendations.
                </p>

            </div>

        `;

    }

}


/* =========================================================
   GLOBAL ERROR
========================================================= */

function showGlobalError() {

    const container =
        document.getElementById(
            "assessmentCareerContainer"
        );


    if (container) {

        container.innerHTML = `

            <div class="career-message">

                <i class="fa-solid fa-triangle-exclamation"></i>

                <h3>
                    Unable to load career recommendations
                </h3>

                <p>
                    Please refresh the page and try again.
                </p>

            </div>

        `;

    }

}


/* =========================================================
   LOADER
========================================================= */

function showLoader() {

    const loader =
        document.getElementById(
            "careerLoader"
        );


    if (loader) {

        loader.style.display =
            "flex";

    }

}


function hideLoader() {

    const loader =
        document.getElementById(
            "careerLoader"
        );


    if (loader) {

        loader.style.display =
            "none";

    }

}


/* =========================================================
   NAVIGATION
========================================================= */

function goTo(
    page
) {

    window.location.href =
        page;

}


/* =========================================================
   LOGOUT
========================================================= */

function initializeLogout() {

    const logout =
        document.querySelector(
            ".logout-btn"
        );


    if (!logout) {
        return;
    }


    logout.onclick =
        logoutStudent;

}


function logoutStudent() {

    if (
        !confirm(
            "Are you sure you want to logout?"
        )
    ) {

        return;

    }


    localStorage.removeItem(
        "studentId"
    );


    window.location.href =
        "student-login.html";

}


/* =========================================================
   HELPERS
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (element) {

        element.textContent =
            value ?? "-";

    }

}


function formatPercentage(
    value
) {

    const number =
        Number(
            value || 0
        );


    return `${number.toFixed(2)}%`;

}


function escapeHtml(
    value
) {

    return String(
        value ?? ""
    )
    .replace(
        /&/g,
        "&amp;"
    )
    .replace(
        /</g,
        "&lt;"
    )
    .replace(
        />/g,
        "&gt;"
    )
    .replace(
        /"/g,
        "&quot;"
    )
    .replace(
        /'/g,
        "&#039;"
    );

}