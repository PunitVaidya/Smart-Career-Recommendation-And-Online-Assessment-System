/* =========================================================
   STUDENT RESULTS JAVASCRIPT
   GIRIS TECH HUB
========================================================= */


/* =========================================================
   API
========================================================= */

const STUDENT_API =
    "/api/student";

const RESULT_API =
    "/api/student-result/student";

const RESULT_ATTEMPT_API =
    "/api/student-result/attempt";

const ATTEMPT_API =
    "/api/student-attempt";

const ANSWER_API =
    "/api/student-answer/attempt";

const QUESTION_API =
    "/api/question";


/* =========================================================
   STUDENT
========================================================= */

let studentId =
    localStorage.getItem("studentId");


let resultList = [];


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        if (!studentId) {

            alert(
                "Student not logged in."
            );

            window.location.href =
                "student-login.html";

            return;
        }


        loadStudent();

        loadResults();

        initializeSearch();

        initializeLogout();

    }
);


/* =========================================================
   LOAD STUDENT
========================================================= */

async function loadStudent() {

    try {

        const response =
            await fetch(
                STUDENT_API +
                "/" +
                studentId
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load student."
            );

        }


        const result =
            await response.json();


        if (
            result.success &&
            result.data
        ) {

            const student =
                result.data;


            setText(
                "studentName",
                student.name
            );


            setText(
                "studentBranch",
                student.branch
            );

        }

    }
    catch (error) {

        console.error(
            "Student Loading Error:",
            error
        );

    }

}


/* =========================================================
   LOAD RESULTS
========================================================= */

async function loadResults() {

    showLoader();

    try {

        const response =
            await fetch(
                RESULT_API +
                "/" +
                studentId
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load student results."
            );

        }


        const result =
            await response.json();


        if (
            result.success &&
            Array.isArray(result.data)
        ) {

            resultList =
                result.data;

        }
        else {

            resultList = [];

        }


        displayResults(
            resultList
        );

    }
    catch (error) {

        console.error(
            "Result Loading Error:",
            error
        );


        showEmptyResult(
            "Unable to load your assessment results."
        );

    }
    finally {

        hideLoader();

    }

}


/* =========================================================
   DISPLAY RESULTS
========================================================= */

function displayResults(data) {

    const container =
        document.getElementById(
            "resultContainer"
        );


    if (!container) {
        return;
    }


    container.innerHTML = "";


    if (
        !data ||
        data.length === 0
    ) {

        showEmptyResult(
            "You have not completed any assessment yet."
        );

        return;

    }


    data.forEach(
        result => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "result-card";


            const percentage =
                Number(
                    result.percentage || 0
                ).toFixed(2);


            const score =
                result.score ?? 0;


            const totalMarks =
                result.totalMarks ?? 0;


            const status =
                result.resultStatus ||
                "SUBMITTED";


            const statusClass =
                status === "PASS"
                    ? "pass"
                    : status === "FAIL"
                        ? "fail"
                        : "submitted";


            card.innerHTML = `

                <div class="result-card-header">

                    <div class="result-card-icon">

                        <i class="fa-solid fa-file-lines"></i>

                    </div>


                    <div class="result-card-title">

                        <h2>
                            ${escapeHtml(
                                result.assessmentName ||
                                "Assessment"
                            )}
                        </h2>

                        <p>
                            Assessment Performance
                        </p>

                    </div>

                </div>


                <div class="result-values">


                    <div class="result-value-box">

                        <span>
                            Score
                        </span>

                        <strong>
                            ${score} / ${totalMarks}
                        </strong>

                    </div>


                    <div class="result-value-box">

                        <span>
                            Percentage
                        </span>

                        <strong>
                            ${percentage}%
                        </strong>

                    </div>


                </div>


                <span class="result-status ${statusClass}">

                    ${escapeHtml(status)}

                </span>


                <div class="result-card-actions">

                    <button
                        class="view-full-result-btn"
                        onclick="viewFullResult(${result.attemptId})">

                        <i class="fa-solid fa-chart-column"></i>

                        View Full Result

                    </button>

                </div>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================================================
   VIEW FULL RESULT
========================================================= */

async function viewFullResult(
    attemptId
) {

    if (!attemptId) {

        alert(
            "Assessment attempt information is missing."
        );

        return;

    }


    showLoader();


    try {

        /*
         * Load all three pieces of information
         *
         * 1. Student result
         * 2. Attempt information
         * 3. Student answers
         */

        const [

            resultResponse,

            attemptResponse,

            answerResponse

        ] = await Promise.all([


            fetch(
                RESULT_ATTEMPT_API +
                "/" +
                attemptId
            ),


            fetch(
                ATTEMPT_API +
                "/" +
                attemptId
            ),


            fetch(
                ANSWER_API +
                "/" +
                attemptId
            )

        ]);


        if (
            !resultResponse.ok ||
            !attemptResponse.ok ||
            !answerResponse.ok
        ) {

            throw new Error(
                "Unable to load complete result."
            );

        }


        const resultData =
            await resultResponse.json();


        const attemptData =
            await attemptResponse.json();


        const answerData =
            await answerResponse.json();


        const result =
            resultData.data;


        const attempt =
            attemptData.data;


        const answers =
            answerData.data || [];


        if (!result) {

            throw new Error(
                "Result not found."
            );

        }


        await displayFullResult(
            result,
            attempt,
            answers
        );

    }
    catch (error) {

        console.error(
            "Full Result Error:",
            error
        );


        alert(
            "Unable to load complete assessment result."
        );

    }
    finally {

        hideLoader();

    }

}


/* =========================================================
   DISPLAY FULL RESULT
========================================================= */

async function displayFullResult(
    result,
    attempt,
    answers
) {

    /*
     * Hide result list
     */

    document.getElementById(
        "resultListSection"
    ).style.display = "none";


    /*
     * Show full result
     */

    document.getElementById(
        "fullResultSection"
    ).style.display = "block";


    /*
     * Basic result information
     */

    setText(
        "detailAssessmentName",
        result.assessmentName ||
        "Assessment Result"
    );


    setText(
        "detailAssessmentDescription",
        "Detailed assessment performance"
    );


    setText(
        "detailScore",
        `${result.score ?? 0} / ${result.totalMarks ?? 0}`
    );


    setText(
        "detailPercentage",
        `${Number(
            result.percentage || 0
        ).toFixed(2)}%`
    );


    /*
     * Correct / Incorrect / Skipped
     */

    const correct =
        answers.filter(
            answer =>
                answer.correct === true
        ).length;


    const answered =
        answers.filter(
            answer =>
                answer.selectedAnswer &&
                answer.selectedAnswer.trim() !== ""
        ).length;


    const incorrect =
        answered - correct;


    /*
     * Total questions
     *
     * Usually:
     *
     * total marks / question marks
     *
     * But the safest value is obtained
     * from the number of answer records.
     *
     * If your frontend creates an answer
     * only when the student selects something,
     * skipped questions are calculated using
     * total question count.
     *
     * We load question count separately below.
     */

    let totalQuestions =
        answers.length;


    /*
     * Time
     */

    const timeTaken =
        calculateTimeTaken(
            attempt
        );


    /*
     * Basic values
     */

    setText(
        "detailCorrect",
        correct
    );


    setText(
        "detailIncorrect",
        incorrect
    );


    setText(
        "detailTime",
        timeTaken
    );


    setText(
        "detailStatus",
        attempt?.attemptStatus ||
        result.resultStatus ||
        "SUBMITTED"
    );


    setText(
        "detailSubmitted",
        formatDate(
            result.submittedAt ||
            attempt?.endTime
        )
    );


    /*
     * Load questions to calculate
     * total and skipped correctly.
     */

    const questionDetails =
        await loadQuestionDetails(
            answers
        );


    if (
        questionDetails.length >
        totalQuestions
    ) {

        totalQuestions =
            questionDetails.length;

    }


    const skipped =
        Math.max(
            0,
            totalQuestions - answered
        );


    setText(
        "detailSkipped",
        skipped
    );


    setText(
        "detailTotalQuestions",
        totalQuestions
    );


    setText(
        "questionReviewCount",
        `${totalQuestions} Questions`
    );


    /*
     * Display question review
     */

    displayQuestionReview(
        questionDetails,
        answers
    );

}


/* =========================================================
   LOAD QUESTION DETAILS
========================================================= */

async function loadQuestionDetails(
    answers
) {

    const questions = [];


    /*
     * We already have questionId in
     * StudentAnswerResponse.
     *
     * Fetch question information so we
     * can show:
     *
     * Question
     * Correct Answer
     * Student Answer
     */

    for (
        const answer of answers
    ) {

        try {

            const response =
                await fetch(
                    QUESTION_API +
                    "/" +
                    answer.questionId
                );


            if (!response.ok) {
                continue;
            }


            const result =
                await response.json();


            if (
                result.success &&
                result.data
            ) {

                questions.push(
                    result.data
                );

            }

        }
        catch (error) {

            console.error(
                "Question Loading Error:",
                answer.questionId,
                error
            );

        }

    }


    return questions;

}


/* =========================================================
   QUESTION REVIEW
========================================================= */

function displayQuestionReview(
    questions,
    answers
) {

    const container =
        document.getElementById(
            "questionReviewContainer"
        );


    container.innerHTML = "";


    /*
     * Create map:
     *
     * questionId -> answer
     */

    const answerMap =
        new Map();


    answers.forEach(
        answer => {

            answerMap.set(
                Number(answer.questionId),
                answer
            );

        }
    );


    /*
     * If question API returned
     * no questions, still show answers.
     */

    if (
        !questions ||
        questions.length === 0
    ) {

        answers.forEach(
            (answer, index) => {

                const card =
                    createQuestionCard(
                        index + 1,
                        null,
                        answer
                    );


                container.appendChild(card);

            }
        );


        return;

    }


    questions.forEach(
        (question, index) => {

            const answer =
                answerMap.get(
                    Number(question.questionId)
                );


            const card =
                createQuestionCard(
                    index + 1,
                    question,
                    answer
                );


            container.appendChild(card);

        }
    );

}

/* =========================================================
   CREATE QUESTION CARD
========================================================= */

function createQuestionCard(
    number,
    question,
    answer
) {

    const card =
        document.createElement("div");


    card.className =
        "question-review-card";


    /* =====================================================
       QUESTION TITLE
    ===================================================== */

    const questionTitle =
        question?.questionTitle ||
        `Question ${number}`;


    /* =====================================================
       GET SELECTED ANSWER LETTER
    ===================================================== */

    const selectedLetter =
        answer?.selectedAnswer &&
        answer.selectedAnswer.trim() !== ""
            ? answer.selectedAnswer.trim().toUpperCase()
            : null;


    /* =====================================================
       GET ACTUAL SELECTED OPTION TEXT
    ===================================================== */

    let selectedAnswerText =
        "Not Answered";


    if (
        selectedLetter &&
        question
    ) {

        selectedAnswerText =
            getOptionText(
                question,
                selectedLetter
            ) || selectedLetter;

    }


    /* =====================================================
       GET CORRECT ANSWER
    ===================================================== */

    const correctLetter =
        question?.correctAnswer
            ? question.correctAnswer
                .trim()
                .toUpperCase()
            : null;


    /* =====================================================
       GET ACTUAL CORRECT OPTION TEXT
    ===================================================== */

    let correctAnswerText =
        "-";


    if (
        correctLetter &&
        question
    ) {

        correctAnswerText =
            getOptionText(
                question,
                correctLetter
            ) || correctLetter;

    }


    /* =====================================================
       STATUS
    ===================================================== */

    let status =
        "skipped";


    let statusText =
        "Skipped";


    let statusIcon =
        "fa-forward";


    if (
        answer &&
        selectedLetter
    ) {

        if (
            answer.correct === true
        ) {

            status =
                "correct";

            statusText =
                "Correct";

            statusIcon =
                "fa-circle-check";

        }
        else {

            status =
                "incorrect";

            statusText =
                "Incorrect";

            statusIcon =
                "fa-circle-xmark";

        }

    }


    /* =====================================================
       HTML
    ===================================================== */

    card.innerHTML = `

        <div class="question-number">

            QUESTION ${number}

        </div>


        <div class="question-title">

            ${escapeHtml(
                questionTitle
            )}

        </div>


        <div class="answer-information">


            <!-- =========================================
                 YOUR ANSWER
            ========================================== -->

            <div class="answer-box">

                <span>
                    Your Answer
                </span>

                <strong>
                    ${escapeHtml(
                        selectedAnswerText
                    )}
                </strong>

            </div>


            <!-- =========================================
                 CORRECT ANSWER
            ========================================== -->

            <div class="answer-box">

                <span>
                    Correct Answer
                </span>

                <strong>
                    ${escapeHtml(
                        correctAnswerText
                    )}
                </strong>

            </div>


        </div>


        <div class="question-result ${status}">

            <i class="fa-solid ${statusIcon}"></i>

            ${statusText}

        </div>

    `;


    return card;

}


/* =========================================================
   GET ACTUAL OPTION TEXT
========================================================= */

function getOptionText(
    question,
    answerLetter
) {

    if (
        !question ||
        !answerLetter
    ) {

        return "";

    }


    switch (
        answerLetter.toUpperCase()
    ) {

        case "A":

            return question.optionA || "";


        case "B":

            return question.optionB || "";


        case "C":

            return question.optionC || "";


        case "D":

            return question.optionD || "";


        default:

            return "";

    }

}

/* =========================================================
   CALCULATE TIME
========================================================= */

function calculateTimeTaken(
    attempt
) {

    if (
        !attempt ||
        !attempt.startTime ||
        !attempt.endTime
    ) {

        return "Not Available";

    }


    const start =
        new Date(
            attempt.startTime
        );


    const end =
        new Date(
            attempt.endTime
        );


    if (
        isNaN(start.getTime()) ||
        isNaN(end.getTime())
    ) {

        return "Not Available";

    }


    let seconds =
        Math.floor(
            (end - start) / 1000
        );


    if (seconds < 0) {

        seconds = 0;

    }


    const hours =
        Math.floor(
            seconds / 3600
        );


    seconds %= 3600;


    const minutes =
        Math.floor(
            seconds / 60
        );


    seconds %= 60;


    if (hours > 0) {

        return `${hours}h ${minutes}m ${seconds}s`;

    }


    if (minutes > 0) {

        return `${minutes}m ${seconds}s`;

    }


    return `${seconds}s`;

}


/* =========================================================
   BACK TO RESULT LIST
========================================================= */

function closeFullResult() {

    document.getElementById(
        "fullResultSection"
    ).style.display = "none";


    document.getElementById(
        "resultListSection"
    ).style.display = "block";


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   SEARCH
========================================================= */

function initializeSearch() {

    const search =
        document.getElementById(
            "searchResult"
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


            const filtered =
                resultList.filter(
                    result => {

                        const name =
                            (
                                result.assessmentName ||
                                ""
                            ).toLowerCase();


                        return name.includes(
                            value
                        );

                    }
                );


            displayResults(
                filtered
            );

        }
    );

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
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {
                return;
            }


            localStorage.removeItem(
                "studentId"
            );


            window.location.href =
                "student-login.html";

        };

}


/* =========================================================
   LOADER
========================================================= */

function showLoader() {

    const loader =
        document.getElementById(
            "pageLoader"
        );


    if (loader) {

        loader.style.display =
            "flex";

    }

}


function hideLoader() {

    const loader =
        document.getElementById(
            "pageLoader"
        );


    if (loader) {

        loader.style.display =
            "none";

    }

}


/* =========================================================
   EMPTY RESULT
========================================================= */

function showEmptyResult(
    message
) {

    const container =
        document.getElementById(
            "resultContainer"
        );


    if (!container) {
        return;
    }


    container.innerHTML = `

        <div class="empty-result">

            <i class="fa-solid fa-chart-column"></i>

            <h2>
                No Results Available
            </h2>

            <p>
                ${escapeHtml(message)}
            </p>

        </div>

    `;

}


/* =========================================================
   HELPER
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(id);


    if (element) {

        element.textContent =
            value !== null &&
            value !== undefined &&
            value !== ""
                ? value
                : "-";

    }

}


/* =========================================================
   DATE FORMAT
========================================================= */

function formatDate(
    value
) {

    if (!value) {

        return "-";

    }


    const date =
        new Date(value);


    if (
        isNaN(
            date.getTime()
        )
    ) {

        return "-";

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


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(
    value
) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)
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