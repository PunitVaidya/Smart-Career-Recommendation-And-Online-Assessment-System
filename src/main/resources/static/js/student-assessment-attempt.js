/* =========================================================
   STUDENT ASSESSMENT ATTEMPT JS
   GIRIS TECH HUB

   UPDATED VERSION

   FEATURES:
   - Current attempt tracking
   - Correct answer calculation
   - Incorrect answer calculation
   - Skipped answer calculation
   - Current attempt recommendation loading
   - Custom popup instead of alert/confirm
   - No AI wording
========================================================= */


/* =========================================================
   API
========================================================= */

const STUDENT_API =
    "/api/student";

const ASSESSMENT_API =
    "/api/assessment";

const QUESTION_API =
    "/api/question";

const ASSESSMENT_QUESTION_API =
    "/api/assessment-question";

const ANSWER_API =
    "/api/student-answer";

const ATTEMPT_API =
    "/api/student-attempt";

const RECOMMENDATION_API =
    "/api/career-recommendation";


/* =========================================================
   PAGE ROUTES
========================================================= */

const DASHBOARD_PAGE =
    "student-dashboard.html";

const RESULTS_PAGE =
    "student-results.html";

const CAREER_DETAILS_PAGE =
    "student-career-details.html";


/* =========================================================
   GLOBAL VARIABLES
========================================================= */

let studentId =
    localStorage.getItem("studentId");

let assessmentId = null;

let attemptId = null;

let questions = [];

let currentQuestion = 0;

let answers = {};

let timerInterval = null;

let remainingSeconds = 0;

let assessmentDurationMinutes = 0;

let isSubmitting = false;

let finalAttempt = null;

let currentRecommendations = [];


/* =========================================================
   RESUME / ANSWER / TAB-SWITCH STATE
========================================================= */

let answerIds = {};

let tabSwitchCount = 0;

let tabWarningShown = false;

const MAX_TAB_WARNINGS = 3;


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async function() {

        console.log(
            "Student Assessment Page Loaded"
        );


        if (!studentId) {

            showPopup(
                "Session Required",
                "Your student session was not found. Please login again.",
                "warning",
                [
                    {
                        text: "Go to Login",
                        className: "popup-primary",
                        action: function() {

                            window.location.href =
                                "student-login.html";

                        }
                    }
                ]
            );

            return;

        }


        getAssessmentId();
		
		restoreTabSwitchCount();

		
        /*
         * NEW:
         * Monitor tab switching.
         */
        initializeTabSwitchWarning();


        if (!assessmentId) {

            showPopup(
                "Assessment Error",
                "Assessment ID is missing. Please select an assessment again.",
                "error",
                [
                    {
                        text: "Go Back",
                        className: "popup-primary",
                        action: function() {

                            window.location.href =
                                "student-assessment.html";

                        }
                    }
                ]
            );

            return;

        }


        try {

            await loadStudent();

            await loadAssessment();

        }
        catch (error) {

            console.error(
                "Assessment initialization error:",
                error
            );


            showPopup(
                "Unable to Load Assessment",
                error.message ||
                "Something went wrong while loading the assessment.",
                "error",
                [
                    {
                        text: "Close",
                        className: "popup-secondary",
                        action: function() {

                            closePopup();

                        }
                    }
                ]
            );

        }

    }
);


/* =========================================================
		   RESTORE TAB SWITCH COUNT
		========================================================= */

		function restoreTabSwitchCount() {

		    const storedCount =
		        sessionStorage.getItem(
		            getAttemptStorageKey(
		                "tabSwitchCount"
		            )
		        );


		    if (
		        storedCount !== null
		    ) {

		        const count =
		            Number(
		                storedCount
		            );


		        if (
		            Number.isInteger(count) &&
		            count >= 0
		        ) {

		            tabSwitchCount =
		                count;

		        }

		    }


		    console.log(
		        "RESTORED TAB SWITCH COUNT:",
		        tabSwitchCount
		    );

		}

		

/* =========================================================
   GET ASSESSMENT ID
========================================================= */

function getAssessmentId() {

    const params =
        new URLSearchParams(
            window.location.search
        );


    assessmentId =
        params.get("assessmentId");


    if (!assessmentId) {

        assessmentId =
            localStorage.getItem(
                "currentAssessmentId"
            );

    }


    console.log(
        "Assessment ID:",
        assessmentId
    );

}


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


    console.log(
        "Student:",
        result
    );


    if (
        result.success &&
        result.data
    ) {

        setText(
            "studentName",
            result.data.name ||
            "Student"
        );

    }

}


/* =========================================================
   LOAD ASSESSMENT
========================================================= */

async function loadAssessment() {

    const response =
        await fetch(
            `${ASSESSMENT_API}/${assessmentId}`
        );


    if (!response.ok) {

        throw new Error(
            "Unable to load assessment."
        );

    }


    const result =
        await response.json();


    console.log(
        "Assessment:",
        result
    );


    if (
        !result.success ||
        !result.data
    ) {

        throw new Error(
            "Assessment not found."
        );

    }


    const assessment =
        result.data;


    setText(
        "assessmentName",
        assessment.assessmentName ||
        "Assessment"
    );


    /*
     * Keep compatibility with the existing
     * AssessmentResponse field names.
     */
    assessmentDurationMinutes =
        Number(
            assessment.duration ||
            assessment.durationMinutes ||
            assessment.timeLimit ||
            assessment.timeLimitMinutes ||
            0
        );


    /*
     * Continue existing flow.
     */
    await createAttempt();

}


/* =========================================================
   CREATE / RESUME ATTEMPT
========================================================= */

async function createAttempt() {

    /*
     * =====================================================
     * STEP 1
     * Try to restore the exact attempt from localStorage.
     * =====================================================
     */

    const storedAttemptId =
        localStorage.getItem(
            "currentAttemptId"
        );


    if (storedAttemptId) {

        try {

            const resumeResponse =
                await fetch(
                    `${ATTEMPT_API}/${storedAttemptId}`
                );


            if (
                resumeResponse.ok
            ) {

                const resumeResult =
                    await resumeResponse.json();


                if (
                    resumeResult.success &&
                    resumeResult.data
                ) {

                    const existingAttempt =
                        resumeResult.data;


                    const sameStudent =
                        Number(
                            existingAttempt.studentId
                        ) ===
                        Number(studentId);


                    const sameAssessment =
                        Number(
                            existingAttempt.assessmentId
                        ) ===
                        Number(assessmentId);


                    const isStarted =
                        String(
                            existingAttempt.attemptStatus ||
                            ""
                        ).toUpperCase() ===
                        "STARTED";


                    /*
                     * Resume only when this is the
                     * same student's same assessment
                     * and the attempt is still active.
                     */
                    if (
                        sameStudent &&
                        sameAssessment &&
                        isStarted
                    ) {

                        console.log(
                            "RESUMING EXISTING ATTEMPT:",
                            existingAttempt.attemptId
                        );


                        attemptId =
                            Number(
                                existingAttempt.attemptId
                            );


                        localStorage.setItem(
                            "currentAttemptId",
                            String(attemptId)
                        );


                        localStorage.setItem(
                            "lastAttemptId",
                            String(attemptId)
                        );


                        /*
                         * Restore original start time.
                         */
                        if (
                            existingAttempt.startTime
                        ) {

                            sessionStorage.setItem(
                                getAttemptStorageKey(
                                    "startTime"
                                ),
                                String(
                                    existingAttempt.startTime
                                )
                            );

                        }


                        await loadQuestions();

                        await loadSavedAnswers();

                        restoreQuestionPosition();

                        initializeRemainingTimer();

                        showQuestion();

                        return;

                    }

                }

            }

        }
        catch (error) {

            console.warn(
                "Stored attempt could not be restored:",
                error
            );

        }

    }


    /*
     * =====================================================
     * STEP 2
     * No valid active stored attempt.
     *
     * Ask backend to start/resume.
     * Backend itself also checks for an active attempt.
     * =====================================================
     */

    const response =
        await fetch(
            `${ATTEMPT_API}/start`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body:
                    JSON.stringify({

                        studentId:
                            Number(studentId),

                        assessmentId:
                            Number(assessmentId)

                    })
            }
        );


    if (
        !response.ok
    ) {

        throw new Error(
            "Unable to start assessment."
        );

    }


    const result =
        await response.json();


    console.log(
        "START / RESUME RESPONSE:",
        result
    );


    if (
        !result.success ||
        !result.data
    ) {

        throw new Error(
            result.message ||
            "Unable to start assessment."
        );

    }


    const attempt =
        result.data;


    /*
     * Store exact attempt ID.
     */
    attemptId =
        Number(
            attempt.attemptId
        );


    localStorage.setItem(
        "currentAttemptId",
        String(attemptId)
    );


    localStorage.setItem(
        "lastAttemptId",
        String(attemptId)
    );


    /*
     * Submitted attempt should never be continued.
     */
    if (
        String(
            attempt.attemptStatus ||
            ""
        ).toUpperCase() ===
        "SUBMITTED"
    ) {

        window.location.href =
            `${RESULTS_PAGE}?assessmentId=${assessmentId}`;

        return;

    }


    /*
     * Store original start time.
     */
    if (
        attempt.startTime
    ) {

        sessionStorage.setItem(
            getAttemptStorageKey(
                "startTime"
            ),
            String(
                attempt.startTime
            )
        );

    }


    /*
     * Continue normal assessment flow.
     */
    await loadQuestions();

    await loadSavedAnswers();

    restoreQuestionPosition();

    initializeRemainingTimer();

    showQuestion();

}
/* =========================================================
   LOAD QUESTIONS
========================================================= */

async function loadQuestions() {

    try {

        /*
         * IMPORTANT:
         *
         * DO NOT CHANGE THIS ENDPOINT.
         *
         * Your existing project loads questions through:
         *
         * /api/assessment-question/assessment/{assessmentId}
         *
         * Then it uses each questionId to call:
         *
         * /api/question/{questionId}
         *
         * This is the original working flow.
         */

        const response =
            await fetch(
                `${ASSESSMENT_QUESTION_API}/assessment/${assessmentId}`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load assessment questions."
            );

        }


        const result =
            await response.json();


        console.log(
            "Assessment Question Mapping:",
            result
        );


        const mappings =
            result.data || [];


        if (
            mappings.length === 0
        ) {

            showNoQuestions();

            return;

        }


        /*
         * Load actual question details.
         */
        const requests =
            mappings.map(
                mapping =>

                    fetch(
                        `${QUESTION_API}/${mapping.questionId}`
                    )
                        .then(
                            questionResponse => {

                                if (
                                    !questionResponse.ok
                                ) {

                                    throw new Error(
                                        "Question request failed."
                                    );

                                }


                                return questionResponse.json();

                            }
                        )
            );


        const responses =
            await Promise.all(
                requests
            );


        /*
         * Extract actual question objects.
         */
        questions =
            responses
                .map(
                    response =>
                        response.data
                )
                .filter(
                    question =>
                        question != null
                );


        console.log(
            "Total questions:",
            questions.length
        );


        /*
         * If there are no questions,
         * show existing empty state.
         */
        if (
            questions.length === 0
        ) {

            showNoQuestions();

            return;

        }


        /*
         * NEW:
         *
         * Keep a stable order for this
         * active browser assessment session.
         *
         * We are NOT changing your database
         * question mapping.
         */
        questions =
            getStableQuestionOrder(
                questions
            );


        /*
         * Existing question-number UI.
         */
        createQuestionNumbers();


        /*
         * Start at first question.
         *
         * restoreQuestionPosition()
         * will later replace this if a
         * previous position exists.
         */
        currentQuestion = 0;


    }
	catch (error) {

	    console.error(
	        "Question loading error:",
	        error
	    );


	    showError(
	        error.message ||
	        "Unable to load assessment questions. Please try again."
	    );

	}

}


/* =========================================================
   STABLE QUESTION ORDER
========================================================= */

function getStableQuestionOrder(
    questionList
) {

    const storageKey =
        getAttemptStorageKey(
            "questionOrder"
        );


    /*
     * Try to restore previously generated order.
     */
    const storedOrder =
        sessionStorage.getItem(
            storageKey
        );


    if (
        storedOrder
    ) {

        try {

            const questionIds =
                JSON.parse(
                    storedOrder
                );


            const questionMap =
                new Map();


            questionList.forEach(
                question => {

                    questionMap.set(
                        Number(
                            question.questionId
                        ),
                        question
                    );

                }
            );


            const restoredQuestions =
                questionIds
                    .map(
                        id =>
                            questionMap.get(
                                Number(id)
                            )
                    )
                    .filter(
                        question =>
                            question !== undefined
                    );


            /*
             * Restore only when every question
             * is present.
             */
            if (
                restoredQuestions.length ===
                questionList.length
            ) {

                return restoredQuestions;

            }

        }
        catch (error) {

            console.warn(
                "Stored question order is invalid. Creating a new order."
            );

        }

    }


    /*
     * Create a new shuffled order.
     *
     * Fisher-Yates shuffle.
     */
    const shuffled =
        [...questionList];


    for (
        let i =
            shuffled.length - 1;

        i > 0;

        i--
    ) {

        const j =
            Math.floor(
                Math.random() *
                (i + 1)
            );


        [
            shuffled[i],
            shuffled[j]
        ] =
            [
                shuffled[j],
                shuffled[i]
            ];

    }


    /*
     * Store only question IDs.
     */
    sessionStorage.setItem(
        storageKey,
        JSON.stringify(
            shuffled.map(
                question =>
                    question.questionId
            )
        )
    );


    return shuffled;

}


/* =========================================================
   STORAGE KEY
========================================================= */

function getAttemptStorageKey(
    key
) {

    return (
        "studentAssessment_" +
        String(studentId) +
        "_" +
        String(assessmentId) +
        "_" +
        key
    );

}

/* =========================================================
   LOAD SAVED ANSWERS
========================================================= */

async function loadSavedAnswers() {

    if (!attemptId) {

        return;

    }


    try {

        const response =
            await fetch(
                `${ANSWER_API}/attempt/${attemptId}`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to restore saved answers."
            );

        }


        const result =
            await response.json();


        console.log(
            "Saved Answers:",
            result
        );


        if (
            !result.success ||
            !Array.isArray(result.data)
        ) {

            return;

        }


        /*
         * Reset local answer state.
         */
        answers = {};

        answerIds = {};


        /*
         * Restore every saved answer.
         */
        result.data.forEach(
            answer => {

                const questionId =
                    Number(
                        answer.questionId
                    );


                /*
                 * Restore selected option.
                 */
                if (
                    answer.selectedAnswer !==
                    null &&

                    answer.selectedAnswer !==
                    undefined &&

                    String(
                        answer.selectedAnswer
                    ).trim() !== ""
                ) {

                    answers[questionId] =
                        answer.selectedAnswer;

                }


                /*
                 * Save answerId.
                 *
                 * This is required when the student
                 * presses Clear Answer.
                 */
                if (
                    answer.answerId !==
                    null &&

                    answer.answerId !==
                    undefined
                ) {

                    answerIds[questionId] =
                        Number(
                            answer.answerId
                        );

                }

            }
        );


        console.log(
            "RESTORED ANSWERS:",
            answers
        );


        console.log(
            "RESTORED ANSWER IDS:",
            answerIds
        );

    }
    catch (error) {

        console.error(
            "Saved answer restoration error:",
            error
        );


        /*
         * Do not stop the whole assessment if
         * saved answers cannot be loaded.
         *
         * Questions can still be displayed.
         */
        answers = {};

        answerIds = {};

    }

}


/* =========================================================
   RESTORE QUESTION POSITION
========================================================= */

function restoreQuestionPosition() {

    const storageKey =
        getAttemptStorageKey(
            "currentQuestion"
        );


    const stored =
        sessionStorage.getItem(
            storageKey
        );


    /*
     * No previous question position.
     */
    if (
        stored === null
    ) {

        currentQuestion = 0;

        return;

    }


    const index =
        Number(stored);


    /*
     * Make sure stored index is valid.
     */
    if (
        Number.isInteger(index) &&

        index >= 0 &&

        index < questions.length
    ) {

        currentQuestion =
            index;

    }
    else {

        currentQuestion = 0;

    }

}


/* =========================================================
   SAVE CURRENT QUESTION POSITION
========================================================= */

function saveCurrentQuestionPosition() {

    sessionStorage.setItem(
        getAttemptStorageKey(
            "currentQuestion"
        ),
        String(
            currentQuestion
        )
    );

}


/* =========================================================
   SHOW QUESTION
========================================================= */

function showQuestion() {

    if (
        !questions ||
        questions.length === 0
    ) {

        return;

    }


    /*
     * Protect against invalid index.
     */
    if (
        currentQuestion < 0
    ) {

        currentQuestion = 0;

    }


    if (
        currentQuestion >=
        questions.length
    ) {

        currentQuestion =
            questions.length - 1;

    }


    const question =
        questions[currentQuestion];


    if (!question) {

        return;

    }


    /*
     * Save current position.
     */
    saveCurrentQuestionPosition();


    /* =====================================================
       QUESTION NUMBER
    ===================================================== */

    setText(
        "questionNumber",
        currentQuestion + 1
    );


    setText(
        "currentQuestionNumber",
        currentQuestion + 1
    );


    setText(
        "totalQuestions",
        questions.length
    );


    /* =====================================================
       QUESTION TEXT
    ===================================================== */

    setText(
        "questionText",
        question.questionTitle ||
        question.questionText ||
        question.question ||
        "Question not available"
    );


    setText(
        "questionTitle",
        question.questionTitle ||
        question.questionText ||
        question.question ||
        "Question not available"
    );


    /* =====================================================
       OPTIONS
    ===================================================== */

    const optionContainer =
        document.getElementById(
            "optionsContainer"
        );


    if (
        optionContainer
    ) {

        optionContainer.innerHTML = "";


        const options = [

            {
                key: "A",
                value: question.optionA
            },

            {
                key: "B",
                value: question.optionB
            },

            {
                key: "C",
                value: question.optionC
            },

            {
                key: "D",
                value: question.optionD
            }

        ];


        const questionId =
            Number(
                question.questionId
            );


        const selectedAnswer =
            answers[questionId];


        options.forEach(
            option => {

                /*
                 * Don't display empty options.
                 */
                if (
                    option.value ===
                    null ||

                    option.value ===
                    undefined ||

                    String(
                        option.value
                    ).trim() === ""
                ) {

                    return;

                }


                const label =
                    document.createElement(
                        "label"
                    );


                label.className =
                    "option";


                if (
                    String(
                        selectedAnswer
                    ) ===
                    String(
                        option.key
                    )
                ) {

                    label.classList.add(
                        "selected"
                    );

                }


                const input =
                    document.createElement(
                        "input"
                    );


                input.type =
                    "radio";


                input.name =
                    "answer";


                input.value =
                    option.key;


                input.checked =
                    String(
                        selectedAnswer
                    ) ===
                    String(
                        option.key
                    );


                input.addEventListener(
                    "change",
                    function() {

                        saveAnswer(
                            option.key
                        );

                    }
                );


                const text =
                    document.createElement(
                        "span"
                    );


                text.className =
                    "option-text";


                text.textContent =
                    option.key +
                    ". " +
                    option.value;


                label.appendChild(
                    input
                );


                label.appendChild(
                    text
                );


                optionContainer.appendChild(
                    label
                );

            }
        );

    }


    /*
     * Update question navigation.
     */
    updateButtons();


    highlightNumbers();

}


/* =========================================================
   SAVE ANSWER
========================================================= */

async function saveAnswer(
    answer
) {

    const question =
        questions[currentQuestion];


    if (!question) {

        return;

    }


    const questionId =
        Number(
            question.questionId
        );


    /*
     * Save locally immediately.
     *
     * This allows the UI to respond even if
     * the network takes a moment.
     */
    answers[questionId] =
        answer;


    /*
     * Save current position.
     */
    saveCurrentQuestionPosition();


    /*
     * Update question-number UI.
     */
    highlightNumbers();


    /*
     * Save to database.
     */
    try {

        const response =
            await fetch(
                `${ANSWER_API}/save`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            attemptId:
                                Number(
                                    attemptId
                                ),

                            questionId:
                                questionId,

                            selectedAnswer:
                                answer

                        })
                }
            );


        const result =
            await response.json();


        console.log(
            "Answer Save Response:",
            result
        );


        if (
            !response.ok ||
            !result.success
        ) {

            throw new Error(
                result.message ||
                "Unable to save answer."
            );

        }


        /*
         * The backend returns StudentAnswerResponse.
         *
         * Store answerId so that Clear Answer
         * can delete this exact database record.
         */
        if (
            result.data &&

            result.data.answerId !==
            null &&

            result.data.answerId !==
            undefined
        ) {

            answerIds[questionId] =
                Number(
                    result.data.answerId
                );

        }


        console.log(
            "Answer saved successfully."
        );

    }
    catch (error) {

        console.error(
            "Answer Save Error:",
            error
        );


        /*
         * Keep local selection.
         *
         * Do not immediately remove the student's
         * selected answer.
         */
        showPopup(
            "Answer Not Saved",
            "Your answer is selected on this page, but it could not be saved to the server. Please check your internet connection.",
            "warning",
            [
                {
                    text: "Close",
                    className:
                        "popup-secondary",

                    action:
                        function() {

                            closePopup();

                        }
                }
            ]
        );

    }

}


/* =========================================================
   CLEAR ANSWER
========================================================= */

async function clearAnswer() {

    const question =
        questions[currentQuestion];


    if (!question) {

        return;

    }


    const questionId =
        Number(
            question.questionId
        );


    const answerId =
        answerIds[questionId];


    /*
     * Remove local selection.
     */
    delete answers[questionId];


    /*
     * Update UI immediately.
     */
    showQuestion();


    highlightNumbers();


    /*
     * If the answer has already been saved
     * in database, delete it there too.
     */
	if (
	    answerId !== undefined &&
	    answerId !== null
	) {

        try {

            const response =
                await fetch(
                    `${ANSWER_API}/${answerId}`,
                    {
                        method:
                            "DELETE"
                    }
                );


            const result =
                await response.json();


            console.log(
                "Delete Answer Response:",
                result
            );


            if (
                !response.ok ||
                !result.success
            ) {

                throw new Error(
                    result.message ||
                    "Unable to clear saved answer."
                );

            }


            /*
             * Delete local answer ID.
             */
            delete answerIds[
                questionId
            ];


            console.log(
                "Answer cleared successfully."
            );

        }
        catch (error) {

            console.error(
                "Clear Answer Error:",
                error
            );


            /*
             * Restore actual database state
             * if deletion failed.
             */
            await loadSavedAnswers();


            showQuestion();


            showPopup(
                "Unable to Clear Answer",
                "The saved answer could not be removed. Please try again.",
                "warning",
                [
                    {
                        text: "Close",
                        className:
                            "popup-secondary",

                        action:
                            function() {

                                closePopup();

                            }
                    }
                ]
            );

        }

    }

}


/* =========================================================
   NEXT QUESTION
========================================================= */

function nextQuestion() {

    if (
        currentQuestion <
        questions.length - 1
    ) {

        currentQuestion++;

        saveCurrentQuestionPosition();

        showQuestion();

    }
    else {

        showPopup(
            "Last Question",
            "You are already on the last question.",
            "info",
            [
                {
                    text: "Close",
                    className:
                        "popup-secondary",

                    action:
                        function() {

                            closePopup();

                        }
                }
            ]
        );

    }

}


/* =========================================================
   PREVIOUS QUESTION
========================================================= */

function previousQuestion() {

    if (
        currentQuestion > 0
    ) {

        currentQuestion--;

        saveCurrentQuestionPosition();

        showQuestion();

    }

}


/* =========================================================
   GO TO QUESTION
========================================================= */

function goToQuestion(
    index
) {

    const questionIndex =
        Number(index);


    if (
        questionIndex < 0 ||

        questionIndex >=
        questions.length
    ) {

        return;

    }


    currentQuestion =
        questionIndex;


    saveCurrentQuestionPosition();


    showQuestion();

}


/* =========================================================
   QUESTION NUMBERS
========================================================= */

function createQuestionNumbers() {

    const container =
        document.getElementById(
            "questionNumbers"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    questions.forEach(
        function(
            question,
            index
        ) {

            const button =
                document.createElement(
                    "button"
                );


            button.type =
                "button";


            button.textContent =
                index + 1;


            button.dataset.index =
                index;


            button.addEventListener(
                "click",
                function() {

                    goToQuestion(
                        index
                    );

                }
            );


            container.appendChild(
                button
            );

        }
    );


    highlightNumbers();

}


/* =========================================================
   HIGHLIGHT QUESTION NUMBERS
========================================================= */

function highlightNumbers() {

    const container =
        document.getElementById(
            "questionNumbers"
        );


    if (!container) {

        return;

    }


    const buttons =
        container.querySelectorAll(
            "button"
        );


    buttons.forEach(
        function(
            button,
            index
        ) {

            button.classList.remove(
                "active"
            );


            button.classList.remove(
                "completed"
            );


            /*
             * Current question.
             */
            if (
                index ===
                currentQuestion
            ) {

                button.classList.add(
                    "active"
                );

            }


            const question =
                questions[index];


            if (!question) {

                return;

            }


            const questionId =
                Number(
                    question.questionId
                );


            /*
             * Answered question.
             */
            if (
                answers[questionId] !==
                undefined &&

                answers[questionId] !==
                null &&

                String(
                    answers[questionId]
                ).trim() !== ""
            ) {

                button.classList.add(
                    "completed"
                );

            }

        }
    );

}


/* =========================================================
   UPDATE NAVIGATION BUTTONS
   ---------------------------------------------------------
   Previous:
   - Disabled on first question
   - Enabled from question 2 onward

   Next:
   - Enabled until last question
   - Disabled on last question

   Submit:
   - HIDDEN on every question
   - VISIBLE ONLY on the last question
========================================================= */

function updateButtons() {

    const previousButton =
        document.getElementById(
            "previousBtn"
        );


    const nextButton =
        document.getElementById(
            "nextBtn"
        );


    const submitButton =
        document.getElementById(
            "submitBtn"
        );


    /*
     * Safety check
     */
    if (
        !questions ||
        questions.length === 0
    ) {

        if (previousButton) {

            previousButton.style.display =
                "none";

        }


        if (nextButton) {

            nextButton.style.display =
                "none";

        }


        if (submitButton) {

            submitButton.style.display =
                "none";

        }


        return;

    }


    /*
     * =====================================================
     * FIRST QUESTION
     * =====================================================
     */

    if (previousButton) {

        previousButton.disabled =
            currentQuestion === 0;

    }


    /*
     * =====================================================
     * NEXT BUTTON
     * =====================================================
     */

    if (nextButton) {

        /*
         * Next should work until the last question.
         */
        nextButton.disabled =
            currentQuestion >=
            questions.length - 1;

    }


    /*
     * =====================================================
     * SUBMIT BUTTON
     * =====================================================
     *
     * Submit is visible ONLY on the last question.
     */

    if (submitButton) {

        const isLastQuestion =
            currentQuestion ===
            questions.length - 1;


        if (isLastQuestion) {

            /*
             * Show Submit Assessment
             */
            submitButton.style.display =
                "";


            submitButton.disabled =
                false;

        }
        else {

            /*
             * Hide Submit Assessment
             */
            submitButton.style.display =
                "none";

        }

    }

}
/* =========================================================
   ASSESSMENT QUESTION COUNTS
========================================================= */

function getAnsweredCount() {

    let count = 0;


    questions.forEach(
        question => {

            const questionId =
                Number(
                    question.questionId
                );


            if (
                answers[questionId] !==
                undefined &&

                answers[questionId] !==
                null &&

                String(
                    answers[questionId]
                ).trim() !== ""
            ) {

                count++;

            }

        }
    );


    return count;

}


function getSkippedCount() {

    return Math.max(
        questions.length -
        getAnsweredCount(),
        0
    );

}

/* =========================================================
   TIMER
========================================================= */

function startTimer(minutes) {

    /*
     * Clear any previous timer.
     */
    if (timerInterval) {

        clearInterval(
            timerInterval
        );

    }


    /*
     * Convert minutes to seconds.
     */
    remainingSeconds =
        Number(minutes) * 60;


    updateTimerDisplay();


    /*
     * Start countdown.
     */
    timerInterval =
        setInterval(
            function() {

                remainingSeconds--;


                updateTimerDisplay();


                /*
                 * Time finished.
                 */
                if (
                    remainingSeconds <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );


                    timerInterval =
                        null;


                    /*
                     * Automatically submit.
                     */
                    submitExam(true);

                }

            },
            1000
        );

}


/* =========================================================
   INITIALIZE REMAINING TIMER
========================================================= */

function initializeRemainingTimer() {

    /*
     * Get original server start time.
     */
    const startTimeString =
        sessionStorage.getItem(
            getAttemptStorageKey(
                "startTime"
            )
        );


    /*
     * If start time is unavailable,
     * use the full assessment duration.
     */
    if (
        !startTimeString
    ) {

        startTimer(
            assessmentDurationMinutes
        );

        return;

    }


    const startTime =
        new Date(
            startTimeString
        );


    /*
     * Invalid date fallback.
     */
    if (
        Number.isNaN(
            startTime.getTime()
        )
    ) {

        startTimer(
            assessmentDurationMinutes
        );

        return;

    }


    /*
     * Total allowed time.
     */
    const totalSeconds =
        Number(
            assessmentDurationMinutes
        ) * 60;


    /*
     * Time already used.
     */
    const elapsedSeconds =
        Math.floor(
            (
                Date.now() -
                startTime.getTime()
            ) / 1000
        );


    /*
     * Remaining time.
     */
    remainingSeconds =
        Math.max(
            totalSeconds -
            elapsedSeconds,
            0
        );


    console.log(
        "Assessment Duration:",
        totalSeconds,
        "seconds"
    );


    console.log(
        "Elapsed:",
        elapsedSeconds,
        "seconds"
    );


    console.log(
        "Remaining:",
        remainingSeconds,
        "seconds"
    );


    updateTimerDisplay();


    /*
     * Time already expired.
     */
    if (
        remainingSeconds <= 0
    ) {

        submitExam(true);

        return;

    }


    /*
     * Start timer using remaining time.
     */
    if (timerInterval) {

        clearInterval(
            timerInterval
        );

    }


    timerInterval =
        setInterval(
            function() {

                remainingSeconds--;


                updateTimerDisplay();


                if (
                    remainingSeconds <= 0
                ) {

                    clearInterval(
                        timerInterval
                    );


                    timerInterval =
                        null;


                    submitExam(true);

                }

            },
            1000
        );

}


/* =========================================================
   TIMER DISPLAY
========================================================= */

function updateTimerDisplay() {

    const minutes =
        Math.floor(
            remainingSeconds / 60
        );


    const seconds =
        remainingSeconds % 60;


    const formattedMinutes =
        String(
            minutes
        ).padStart(
            2,
            "0"
        );


    const formattedSeconds =
        String(
            seconds
        ).padStart(
            2,
            "0"
        );


    const time =
        formattedMinutes +
        ":" +
        formattedSeconds;


    /*
     * Existing timer element.
     */
    setText(
        "timer",
        time
    );


    /*
     * Compatibility with alternate
     * timer IDs.
     */
    setText(
        "timerDisplay",
        time
    );


    setText(
        "timeRemaining",
        time
    );


    /*
     * Optional timer class.
     */
    const timerElement =
        document.getElementById(
            "timer"
        );


    if (
        timerElement
    ) {

        /*
         * Last 60 seconds warning.
         */
        if (
            remainingSeconds <= 60
        ) {

            timerElement.classList.add(
                "timer-warning"
            );

        }
        else {

            timerElement.classList.remove(
                "timer-warning"
            );

        }

    }

}


/* =========================================================
   TAB SWITCH WARNING
========================================================= */

function initializeTabSwitchWarning() {

    document.addEventListener(
        "visibilitychange",
        function() {

            /*
             * Only detect when the student
             * leaves the page.
             */
            if (
                document.hidden &&
                !isSubmitting
            ) {

                handleTabSwitch();

            }

        }
    );

}


/* =========================================================
   HANDLE TAB SWITCH
========================================================= */

function handleTabSwitch() {

    /*
     * Once maximum warnings are reached,
     * do not show another warning.
     */
    if (
        tabSwitchCount >= MAX_TAB_WARNINGS
    ) {

        return;

    }


    /*
     * Prevent duplicate visibility events.
     */
    if (
        tabWarningShown
    ) {

        return;

    }


    tabWarningShown = true;


    /*
     * Increase tab switch count.
     */
    tabSwitchCount++;


    /*
     * Store count so refresh does not reset it.
     */
    sessionStorage.setItem(
        getAttemptStorageKey(
            "tabSwitchCount"
        ),
        String(
            tabSwitchCount
        )
    );


    console.log(
        "TAB SWITCH COUNT:",
        tabSwitchCount
    );


    /* =====================================================
       NORMAL WARNING - 1st / 2nd SWITCH
    ===================================================== */

    if (
        tabSwitchCount <
        MAX_TAB_WARNINGS
    ) {

        const message =
            "Please do not switch tabs or leave the assessment page.";


        setTimeout(
            function() {

                if (
                    isSubmitting
                ) {

                    return;

                }


                showPopup(
                    "Assessment Warning",
                    message +
                    "\n\nTab switches detected: " +
                    tabSwitchCount +
                    " / " +
                    MAX_TAB_WARNINGS,
                    "warning",
                    [
                        {
                            text:
                                "Continue Assessment",

                            className:
                                "popup-primary",

                            action:
                                function() {

                                    closePopup();

                                }
                        }
                    ]
                );

            },
            150
        );

    }


    /* =====================================================
       FINAL WARNING - 3rd SWITCH
    ===================================================== */

    else {

        const message =
            "This is your final warning. You have reached the maximum number of tab switches allowed.\n\nYou must submit the assessment now.";


        setTimeout(
            function() {

                if (
                    isSubmitting
                ) {

                    return;

                }


                showPopup(
                    "Maximum Tab Switches Reached",
                    message,
                    "error",
                    [
                        {
                            text:
                                "Submit Test",

                            className:
                                "popup-submit-btn",

                            action:
                                function() {

                                    /*
                                     * Submit immediately.
                                     *
                                     * true means automatic submission,
                                     * so the second confirmation popup
                                     * will NOT appear.
                                     */
                                    submitExam(true);

                                }
                        }
                    ]
                );

            },
            150
        );

    }


    /*
     * Allow another visibility event later,
     * but only if maximum has not been reached.
     */
    setTimeout(
        function() {

            tabWarningShown =
                false;

        },
        1000
    );

}
/* =========================================================
   SUBMIT EXAM
========================================================= */

async function submitExam(
    automaticSubmit = false
) {

    console.log(
        "SUBMIT BUTTON CLICKED"
    );


    /*
     * Prevent duplicate submissions.
     */
    if (
        isSubmitting
    ) {

        return;

    }


    /*
     * Make sure attempt exists.
     */
    if (
        !attemptId
    ) {

        showPopup(
            "Assessment Error",
            "Assessment attempt was not found.",
            "error",
            [
                {
                    text:
                        "Close",

                    className:
                        "popup-secondary",

                    action:
                        function() {

                            closePopup();

                        }
                }
            ]
        );


        return;

    }


    /*
     * Manual submission confirmation.
     */
    if (
        !automaticSubmit
    ) {

        const confirmed =
            await showPopupPromise(
                "Submit Assessment",
                "Are you sure you want to submit the assessment? You will not be able to change your answers after submission.",
                "warning",
                [
                    {
                        text:
                            "Cancel",

                        className:
                            "popup-secondary",

                        value:
                            false
                    },

                    {
                        text:
                            "Submit",

                        className:
                            "popup-primary",

                        value:
                            true
                    }
                ]
            );


        if (
            !confirmed
        ) {

            return;

        }

    }


    /*
     * Mark as submitting.
     */
    isSubmitting =
        true;


    /*
     * Stop timer.
     */
    if (
        timerInterval
    ) {

        clearInterval(
            timerInterval
        );


        timerInterval =
            null;

    }


    /*
     * Disable submit button.
     */
    const submitButton =
        document.getElementById(
            "submitBtn"
        );


    if (
        submitButton
    ) {

        submitButton.disabled =
            true;

        submitButton.innerHTML =
            `
            <i class="fa-solid fa-spinner fa-spin"></i>
            Submitting...
            `;

    }


    try {

        /*
         * Submit through existing backend.
         *
         * IMPORTANT:
         *
         * Backend evaluates all saved answers,
         * calculates marks,
         * updates attempt,
         * creates result,
         * and generates career recommendations.
         */
        const response =
            await fetch(
                `${ATTEMPT_API}/submit/${attemptId}`,
                {
                    method:
                        "PUT"
                }
            );


        if (
            !response.ok
        ) {

            throw new Error(
                "Unable to submit assessment."
            );

        }


        const result =
            await response.json();


        console.log(
            "SUBMIT RESPONSE:",
            result
        );


        if (
            !result.success ||
            !result.data
        ) {

            throw new Error(
                result.message ||
                "Assessment submission failed."
            );

        }


        /*
         * Store final attempt.
         */
        finalAttempt =
            result.data;


        /*
         * Keep the current attempt ID.
         */
        localStorage.setItem(
            "lastAttemptId",
            String(
                attemptId
            )
        );


        localStorage.setItem(
            "currentAttemptId",
            String(
                attemptId
            )
        );


        /*
         * Clear active browser state.
         *
         * Database result remains untouched.
         */
        clearAssessmentSessionState();


		/*
		 * Redirect student to result page
		 * after successful submission.
		 */
		window.location.href =
		    `${RESULTS_PAGE}?assessmentId=${assessmentId}`;

    }
    catch (error) {

        console.error(
            "SUBMIT ERROR:",
            error
        );


        isSubmitting =
            false;


        /*
         * Re-enable submit button.
         */
        if (
            submitButton
        ) {

            submitButton.disabled =
                false;


            submitButton.innerHTML =
                `
                <i class="fa-solid fa-check"></i>
                Submit Assessment
                `;

        }


        /*
         * Restart timer if there is
         * still time remaining.
         */
        if (
            remainingSeconds > 0 &&
            !timerInterval
        ) {

            initializeRemainingTimer();

        }


        showPopup(
            "Submission Failed",
            error.message ||
            "Unable to submit the assessment. Please try again.",
            "error",
            [
                {
                    text:
                        "Close",

                    className:
                        "popup-secondary",

                    action:
                        function() {

                            closePopup();

                        }
                }
            ]
        );

    }

}


/* =========================================================
   CLEAR ACTIVE ASSESSMENT SESSION
========================================================= */

function clearAssessmentSessionState() {

    const keys = [

        "startTime",

        "questionOrder",

        "currentQuestion",

        "tabSwitchCount"

    ];


    keys.forEach(
        function(key) {

            sessionStorage.removeItem(
                getAttemptStorageKey(
                    key
                )
            );

        }
    );


    /*
     * Do NOT remove:
     *
     * lastAttemptId
     * currentAttemptId
     *
     * because the result/recommendation
     * flow uses these values.
     */

}


/* =========================================================
   TIME FORMAT HELPER
========================================================= */

function formatTime(
    seconds
) {

    const minutes =
        Math.floor(
            seconds / 60
        );


    const remaining =
        seconds % 60;


    return (
        String(
            minutes
        ).padStart(
            2,
            "0"
        )
        +
        ":"
        +
        String(
            remaining
        ).padStart(
            2,
            "0"
        )
    );

}

/* =========================================================
   SHOW RESULT
========================================================= */

async function showAssessmentResult(
    attempt
) {

    const examMain =
        document.querySelector(
            ".exam-main"
        );


    if (examMain) {

        examMain.style.display =
            "none";

    }


    setText(
        "timerLabel",
        "Assessment"
    );


    setText(
        "timer",
        "DONE"
    );


    const score =
        Number(
            attempt.score || 0
        );


    const totalMarks =
        Number(
            attempt.totalMarks || 0
        );


    let percentage =
        Number(
            attempt.percentage || 0
        );


    /*
     * Calculate percentage if required.
     */
    if (
        totalMarks > 0 &&
        (
            !Number.isFinite(
                percentage
            ) ||
            (
                percentage === 0 &&
                score > 0
            )
        )
    ) {

        percentage =
            (
                score /
                totalMarks
            ) * 100;

    }


    /* =====================================================
       ANSWER STATISTICS
    ===================================================== */

    const statistics =
        await calculateAnswerStatistics(
            Number(
                attempt.attemptId
            )
        );


    let correct = 0;

    let incorrect = 0;

    let skipped = 0;


    if (statistics) {

        correct =
            Number(
                statistics.correct || 0
            );


        incorrect =
            Number(
                statistics.incorrect || 0
            );


        skipped =
            Number(
                statistics.skipped || 0
            );

    }
    else {

        /*
         * Backend fallback.
         */

        correct =
            Number(
                attempt.correctCount || 0
            );


        incorrect =
            Number(
                attempt.incorrectCount || 0
            );


        skipped =
            Number(
                attempt.skippedCount || 0
            );

    }


    /*
     * Final safety check.
     */
    const totalQuestions =
        questions.length ||
        Number(
            attempt.totalQuestions || 0
        );


    const calculatedTotal =
        correct +
        incorrect +
        skipped;


    if (
        totalQuestions > 0 &&
        calculatedTotal !==
        totalQuestions
    ) {

        skipped =
            Math.max(
                0,
                totalQuestions -
                correct -
                incorrect
            );

    }


    console.log(
        "FINAL DISPLAY STATISTICS:",
        {
            attemptId:
                attempt.attemptId,

            score:
                score,

            totalMarks:
                totalMarks,

            percentage:
                percentage,

            correct:
                correct,

            incorrect:
                incorrect,

            skipped:
                skipped
        }
    );


    /* =====================================================
       RESULT INFORMATION
    ===================================================== */

    setText(
        "resultStatus",
        attempt.attemptStatus ||
        "SUBMITTED"
    );


    setText(
        "resultScore",
        score
    );


    setText(
        "resultTotalMarks",
        totalMarks
    );


    setText(
        "circlePercentage",
        percentage.toFixed(2) +
        "%"
    );


    setText(
        "correctCount",
        correct
    );


    setText(
        "incorrectCount",
        incorrect
    );


    setText(
        "skippedCount",
        skipped
    );


    setText(
        "performancePercentage",
        percentage.toFixed(2) +
        "%"
    );


    setText(
        "timeTaken",
        calculateTimeTaken(
            attempt.startTime,
            attempt.endTime
        )
    );


    /* =====================================================
       PERFORMANCE PROGRESS
    ===================================================== */

    const progress =
        Math.max(
            0,
            Math.min(
                100,
                percentage
            )
        );


    const progressElement =
        document.getElementById(
            "performanceProgress"
        );


    if (progressElement) {

        progressElement.style.width =
            progress + "%";

    }


    /* =====================================================
       SCORE CIRCLE
    ===================================================== */

    const scoreCircle =
        document.getElementById(
            "scoreCircle"
        );


    if (scoreCircle) {

        const degrees =
            progress * 3.6;


        scoreCircle.style.background =
            `conic-gradient(
                #7c3aed ${degrees}deg,
                #ddd2ff ${degrees}deg
            )`;

    }


    /* =====================================================
       PERFORMANCE MESSAGE
    ===================================================== */

    setPerformanceMessage(
        percentage
    );


    /* =====================================================
       SHOW RESULT CONTAINER
    ===================================================== */

    const resultContainer =
        document.getElementById(
            "assessmentResult"
        );


    if (resultContainer) {

        resultContainer.classList.remove(
            "hidden"
        );

    }


    /*
     * Load recommendation for THIS attempt.
     */
    await loadCareerRecommendation(
        attempt
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   CALCULATE ANSWER STATISTICS
   CURRENT ATTEMPT ONLY
========================================================= */

async function calculateAnswerStatistics(
    currentAttemptId
) {

    if (!currentAttemptId) {

        console.error(
            "No attempt ID for statistics."
        );

        return null;

    }


    const url =
        `${ANSWER_API}/attempt/${currentAttemptId}`;


    try {

        console.log(
            "Loading answers for attempt:",
            currentAttemptId
        );


        const response =
            await fetch(
                url,
                {
                    method: "GET",

                    headers: {
                        "Accept":
                            "application/json"
                    }
                }
            );


        console.log(
            "Answer statistics HTTP status:",
            response.status
        );


        if (!response.ok) {

            console.error(
                "Unable to load attempt answers."
            );

            return null;

        }


        const result =
            await response.json();


        console.log(
            "Answer statistics response:",
            result
        );


        if (!result.success) {

            console.error(
                "Answer API returned failure:",
                result.message
            );

            return null;

        }


        let answerList =
            result.data;


        /*
         * Handle different response structures.
         */
        if (
            !Array.isArray(
                answerList
            )
        ) {

            answerList =
                answerList?.answers ||
                answerList?.data ||
                [];

        }


        if (
            !Array.isArray(
                answerList
            )
        ) {

            console.error(
                "Answer list is not an array."
            );

            return null;

        }


        let correct = 0;

        let incorrect = 0;


        answerList.forEach(
            function(answer) {

                /*
                 * Backend response normally contains:
                 *
                 * correct: true / false
                 */
                const value =
                    answer.correct ??
                    answer.isCorrect ??
                    answer.is_correct;


                const isCorrect =
                    value === true ||
                    value === 1 ||
                    value === "1" ||
                    value === "true" ||
                    value === "TRUE";


                if (isCorrect) {

                    correct++;

                }
                else {

                    incorrect++;

                }

            }
        );


        /*
         * Total questions.
         */
        const totalQuestions =
            questions.length;


        /*
         * Number of saved answer records.
         */
        const answered =
            answerList.length;


        /*
         * Questions without an answer record.
         */
        const skipped =
            Math.max(
                0,
                totalQuestions -
                answered
            );


        const statistics = {

            correct:
                correct,

            incorrect:
                incorrect,

            skipped:
                skipped,

            answered:
                answered,

            totalQuestions:
                totalQuestions

        };


        console.log(
            "CALCULATED CURRENT ATTEMPT STATISTICS:",
            statistics
        );


        return statistics;

    }
    catch (error) {

        console.error(
            "Error loading answer statistics:",
            error
        );


        return null;

    }

}


/* =========================================================
   LOAD CAREER RECOMMENDATIONS
========================================================= */
async function loadCareerRecommendation(
    attempt
) {

    const currentAttemptId =
        Number(
            attempt.attemptId
        );


    if (
        !currentAttemptId
    ) {

        return;

    }


    try {

        console.log(
            "Loading career recommendation for attempt:",
            currentAttemptId
        );


        const response =
            await fetch(
                `${RECOMMENDATION_API}/attempt/${currentAttemptId}`
            );


        if (
            !response.ok
        ) {

            throw new Error(
                "Career recommendation could not be loaded."
            );

        }


        const result =
            await response.json();


        console.log(
            "CAREER RECOMMENDATION:",
            result
        );


        if (
            !result.success ||
            !Array.isArray(
                result.data
            ) ||
            result.data.length === 0
        ) {

            /*
             * Give backend a moment and retry.
             */
            await retryCareerRecommendation(
                currentAttemptId
            );

            return;

        }


        currentRecommendations =
            result.data;


        /*
         * Sort by rank.
         */
        currentRecommendations.sort(
            function (
                a,
                b
            ) {

                return (
                    Number(
                        a.rankNo ||
                        999
                    )
                    -
                    Number(
                        b.rankNo ||
                        999
                    )
                );

            }
        );


        const first =
            currentRecommendations[0];


        if (
            first &&
            first.recommendationId
        ) {

            localStorage.setItem(
                "recommendationId",
                String(
                    first.recommendationId
                )
            );

        }


        displayCareerRecommendations(
            currentRecommendations
        );

    }
    catch (error) {

        console.error(
            "Career recommendation error:",
            error
        );


        showRecommendationPending(
            attempt
        );

    }

}
/* =========================================================
   DISPLAY CAREER RECOMMENDATIONS
========================================================= */

function displayCareerRecommendations(
    recommendations
) {

    const container =
        document.getElementById(
            "careerRecommendations"
        );


    if (!container) {

        console.warn(
            "careerRecommendations container not found."
        );

        return;

    }


    container.innerHTML =
        "";


    recommendations.forEach(
        function(
            recommendation,
            index
        ) {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "career-recommendation-card";


            const careerName =
                recommendation.careerName ||
                recommendation.careerTitle ||
                recommendation.title ||
                "Career Recommendation";


            const score =
                recommendation.matchPercentage ||
                recommendation.matchScore ||
                recommendation.score ||
                0;


            const description =
                recommendation.description ||
                recommendation.reason ||
                "Career recommendation based on your assessment performance.";


            card.innerHTML =
                `
                <div class="career-recommendation-header">

                    <div>

                        <h3>
                            ${careerName}
                        </h3>

                    </div>

                    <span class="career-match-score">
                        ${Number(score).toFixed(1)}%
                    </span>

                </div>

                <p class="career-recommendation-description">
                    ${description}
                </p>

                <div class="career-recommendation-actions">

                    <button
                        type="button"
                        class="career-view-btn"
                        onclick="openRecommendation(${index})">

                        <i class="fa-solid fa-eye"></i>

                        View Recommendation

                    </button>

                </div>
                `;


            container.appendChild(
                card
            );

        }
    );


    /*
     * Add additional reason information.
     */
    addReasonTags(
        recommendations
    );


    addMiniReasons(
        recommendations
    );

}


/* =========================================================
   RETRY CAREER RECOMMENDATION
========================================================= */

async function retryCareerRecommendation(
    currentAttemptId
) {

    const maxAttempts = 5;


    for (
        let i = 0;
        i < maxAttempts;
        i++
    ) {

        await new Promise(
            resolve =>
                setTimeout(
                    resolve,
                    500
                )
        );


        try {

            const response =
                await fetch(
                    `${RECOMMENDATION_API}/attempt/${currentAttemptId}`
                );


            if (
                !response.ok
            ) {

                continue;

            }


            const result =
                await response.json();


            if (
                result.success &&
                Array.isArray(
                    result.data
                ) &&
                result.data.length > 0
            ) {

                currentRecommendations =
                    result.data;


                currentRecommendations.sort(
                    function (
                        a,
                        b
                    ) {

                        return (
                            Number(
                                a.rankNo ||
                                999
                            )
                            -
                            Number(
                                b.rankNo ||
                                999
                            )
                        );

                    }
                );


                const first =
                    currentRecommendations[0];


                if (
                    first &&
                    first.recommendationId
                ) {

                    localStorage.setItem(
                        "recommendationId",
                        String(
                            first.recommendationId
                        )
                    );

                }


                displayCareerRecommendations(
                    currentRecommendations
                );


                return;

            }

        }
        catch (error) {

            console.warn(
                "Career recommendation retry:",
                i + 1,
                error
            );

        }

    }


    console.warn(
        "Career recommendation was not available after retries."
    );

}

/* =========================================================
   ADD REASON TAGS
========================================================= */

function addReasonTags(
    recommendations
) {

    recommendations.forEach(
        function(
            recommendation,
            index
        ) {

            const reasons =
                recommendation.reasons ||
                recommendation.reasonTags ||
                [];


            if (
                !Array.isArray(
                    reasons
                )
            ) {

                return;

            }


            const card =
                document.querySelectorAll(
                    ".career-recommendation-card"
                )[index];


            if (!card) {

                return;

            }


            if (
                reasons.length === 0
            ) {

                return;

            }


            const tagsContainer =
                document.createElement(
                    "div"
                );


            tagsContainer.className =
                "career-reason-tags";


            reasons.forEach(
                function(reason) {

                    const tag =
                        document.createElement(
                            "span"
                        );


                    tag.className =
                        "career-reason-tag";


                    tag.textContent =
                        reason;


                    tagsContainer.appendChild(
                        tag
                    );

                }
            );


            card.appendChild(
                tagsContainer
            );

        }
    );

}


/* =========================================================
   ADD MINI REASONS
========================================================= */

function addMiniReasons(
    recommendations
) {

    recommendations.forEach(
        function(
            recommendation,
            index
        ) {

            const miniReason =
                recommendation.shortReason ||
                recommendation.reason ||
                recommendation.explanation;


            if (
                !miniReason
            ) {

                return;

            }


            const cards =
                document.querySelectorAll(
                    ".career-recommendation-card"
                );


            const card =
                cards[index];


            if (!card) {

                return;

            }


            const existing =
                card.querySelector(
                    ".career-mini-reason"
                );


            if (existing) {

                return;

            }


            const element =
                document.createElement(
                    "p"
                );


            element.className =
                "career-mini-reason";


            element.textContent =
                miniReason;


            card.appendChild(
                element
            );

        }
    );

}


/* =========================================================
   RECOMMENDATION PENDING
========================================================= */

function showRecommendationPending(
    attempt
) {

    const container =
        document.getElementById(
            "careerRecommendations"
        );


    if (!container) {

        return;

    }


    container.innerHTML =
        `
        <div class="recommendation-pending">

            <i class="fa-solid fa-spinner"></i>

            <h3>
                Career Recommendation
            </h3>

            <p>
                Your career recommendations are being prepared.
            </p>

        </div>
        `;

}


/* =========================================================
   DEFAULT REASONS
========================================================= */

function createDefaultReasons(
    recommendation
) {

    const reasons = [];


    if (
        recommendation.matchPercentage >=
        80
    ) {

        reasons.push(
            "Strong assessment match"
        );

    }


    if (
        recommendation.matchPercentage >=
        60
    ) {

        reasons.push(
            "Good skill alignment"
        );

    }


    if (
        recommendation.description
    ) {

        reasons.push(
            "Based on your assessment performance"
        );

    }


    if (
        reasons.length === 0
    ) {

        reasons.push(
            "Recommended based on assessment performance"
        );

    }


    return reasons;

}


/* =========================================================
   CAREER ICON
========================================================= */

function getCareerIcon(
    careerName
) {

    const name =
        String(
            careerName || ""
        ).toLowerCase();


    if (
        name.includes(
            "software"
        ) ||
        name.includes(
            "developer"
        ) ||
        name.includes(
            "program"
        )
    ) {

        return "fa-code";


    }


    if (
        name.includes(
            "data"
        )
    ) {

        return "fa-chart-column";


    }


    if (
        name.includes(
            "cyber"
        ) ||
        name.includes(
            "security"
        )
    ) {

        return "fa-shield-halved";


    }


    if (
        name.includes(
            "design"
        )
    ) {

        return "fa-palette";


    }


    if (
        name.includes(
            "manager"
        )
    ) {

        return "fa-users";


    }


    return "fa-briefcase";

}


/* =========================================================
   OPEN RECOMMENDATION
========================================================= */

function openRecommendation(
    index
) {

    if (
        !currentRecommendations ||
        !currentRecommendations[index]
    ) {

        showPopup(
            "Recommendation Unavailable",
            "Career recommendation details are not available.",
            "warning"
        );

        return;

    }


    const recommendation =
        currentRecommendations[index];


    const recommendationId =
        recommendation.recommendationId;


    if (
        !recommendationId
    ) {

        showPopup(
            "Recommendation Unavailable",
            "Recommendation ID was not found.",
            "warning"
        );

        return;

    }


    localStorage.setItem(
        "recommendationId",
        String(
            recommendationId
        )
    );


    viewCareerDetails(
        recommendationId
    );

}


/* =========================================================
   VIEW CAREER FROM ASSESSMENT RESULT
========================================================= */

function viewCareerDetails() {

    if (
        currentRecommendations &&
        currentRecommendations.length > 0
    ) {

        const recommendation =
            currentRecommendations[0];


        if (
            recommendation &&
            recommendation.recommendationId
        ) {

            localStorage.setItem(
                "recommendationId",
                String(
                    recommendation.recommendationId
                )
            );

        }

    }


    if (attemptId) {

        localStorage.setItem(
            "lastAttemptId",
            String(attemptId)
        );

    }


    window.location.href =
        "student-dashboard.html#careerSection";

}
/* =========================================================
   RESULTS
========================================================= */

function goToStudentResults() {

    window.location.href =
        RESULTS_PAGE;

}


/* =========================================================
   DASHBOARD
========================================================= */

function goToStudentDashboard() {

    window.location.href =
        DASHBOARD_PAGE;

}


/* =========================================================
   PERFORMANCE MESSAGE
========================================================= */

function setPerformanceMessage(
    percentage
) {

    const element =
        document.getElementById(
            "performanceMessage"
        );


    if (!element) {

        return;

    }


    if (
        percentage >= 80
    ) {

        element.textContent =
            "Excellent performance! Keep up the great work.";

    }
    else if (
        percentage >= 60
    ) {

        element.textContent =
            "Good performance! Continue improving your skills.";

    }
    else if (
        percentage >= 40
    ) {

        element.textContent =
            "Fair performance. Focus on improving your weaker areas.";

    }
    else {

        element.textContent =
            "Don't be discouraged. Keep learning and improving your skills.";

    }

}


/* =========================================================
   TIME TAKEN
========================================================= */

function calculateTimeTaken(
    startTime,
    endTime
) {

    if (
        !startTime ||
        !endTime
    ) {

        return "—";

    }


    const start =
        new Date(
            startTime
        );


    const end =
        new Date(
            endTime
        );


    if (
        Number.isNaN(
            start.getTime()
        ) ||

        Number.isNaN(
            end.getTime()
        )
    ) {

        return "—";

    }


    let totalSeconds =
        Math.floor(
            (
                end.getTime() -
                start.getTime()
            ) / 1000
        );


    if (
        totalSeconds < 0
    ) {

        totalSeconds = 0;

    }


    const minutes =
        Math.floor(
            totalSeconds / 60
        );


    const seconds =
        totalSeconds % 60;


    return (
        `${minutes} min ${seconds} sec`
    );

}


/* =========================================================
   SET TEXT
========================================================= */

function setText(
    elementId,
    value
) {

    const element =
        document.getElementById(
            elementId
        );


    if (element) {

        element.textContent =
            value ?? "-";

    }

}


/* =========================================================
   NO QUESTIONS
========================================================= */

function showNoQuestions() {

    const questionNumber =
        document.getElementById(
            "questionNumber"
        );


    const questionText =
        document.getElementById(
            "questionText"
        );


    const options =
        document.getElementById(
            "optionsContainer"
        );


    const questionNumbers =
        document.getElementById(
            "questionNumbers"
        );


    const previous =
        document.getElementById(
            "previousBtn"
        );


    const next =
        document.getElementById(
            "nextBtn"
        );


    const submit =
        document.getElementById(
            "submitBtn"
        );


    if (questionNumber) {

        questionNumber.textContent =
            "-";

    }


    if (questionText) {

        questionText.textContent =
            "No questions have been assigned to this assessment.";

    }


    if (options) {

        options.innerHTML =
            "";

    }


    if (questionNumbers) {

        questionNumbers.innerHTML =
            "";

    }


    if (previous) {

        previous.style.display =
            "none";

    }


    if (next) {

        next.style.display =
            "none";

    }


    if (submit) {

        submit.style.display =
            "none";

    }

}


/* =========================================================
   ERROR
========================================================= */

function showError(
    message
) {

    const questionText =
        document.getElementById(
            "questionText"
        );


    const options =
        document.getElementById(
            "optionsContainer"
        );


    const questionNumbers =
        document.getElementById(
            "questionNumbers"
        );


    if (questionText) {

        questionText.textContent =
            message;

    }


    if (options) {

        options.innerHTML =
            "";

    }


    if (questionNumbers) {

        questionNumbers.innerHTML =
            "";

    }

}


/* =========================================================
   CLOSE POPUP
========================================================= */

function closePopup() {

    const overlay =
        document.getElementById(
            "customPopup"
        );


    if (overlay) {

        overlay.classList.remove(
            "show"
        );


        setTimeout(
            function() {

                if (
                    overlay &&
                    overlay.parentNode
                ) {

                    overlay.remove();

                }

            },
            200
        );

    }


    document.body.classList.remove(
        "popup-open"
    );

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            event.key !== "Escape"
        ) {

            return;

        }


        const overlay =
            document.getElementById(
                "customPopup"
            );


        if (
            overlay &&
            overlay.classList.contains(
                "show"
            )
        ) {

            /*
             * Close only normal informational
             * popups.
             *
             * Assessment confirmation should
             * still use its own popup.
             */
            closePopup();

        }

    }
);
/* =========================================================
   POPUP
========================================================= */

function showPopup(
    title,
    message,
    type = "success",
    buttons = null
) {

    return new Promise(
        function(resolve) {

            let overlay =
                document.getElementById(
                    "customPopup"
                );


            if (!overlay) {

                overlay =
                    document.createElement(
                        "div"
                    );


                overlay.id =
                    "customPopup";


                overlay.className =
                    "custom-popup-overlay";


                document.body.appendChild(
                    overlay
                );

            }


            let icon =
                "fa-circle-check";


            if (
                type === "error"
            ) {

                icon =
                    "fa-circle-xmark";

            }


            if (
                type === "warning"
            ) {

                icon =
                    "fa-triangle-exclamation";

            }


            if (
                type === "info"
            ) {

                icon =
                    "fa-circle-info";

            }


            /*
             * Default button.
             */
            const popupButtons =
                Array.isArray(buttons) &&
                buttons.length > 0

                    ? buttons

                    : [
                        {
                            text: "OK",
                            className:
                                "popup-ok-btn",
                            action:
                                function() {}
                        }
                    ];


            overlay.innerHTML =
                `
                <div class="custom-popup">

                    <div class="custom-popup-icon ${type}">

                        <i class="fa-solid ${icon}"></i>

                    </div>


                    <h2>
                        ${title}
                    </h2>


					<p style="white-space: pre-line;">
					    ${message}
					</p>


                    <div
                        class="popup-actions"
                        id="popupActions">
                    </div>

                </div>
                `;


            overlay.classList.add(
                "show"
            );


            document.body.classList.add(
                "popup-open"
            );


            const actionsContainer =
                document.getElementById(
                    "popupActions"
                );


            popupButtons.forEach(
                function(
                    popupButton
                ) {

                    const button =
                        document.createElement(
                            "button"
                        );


                    button.type =
                        "button";


                    button.textContent =
                        popupButton.text ||
                        "OK";


                    button.className =
                        popupButton.className ||
                        "popup-ok-btn";


                    button.addEventListener(
                        "click",
                        function() {

                            /*
                             * Execute custom action
                             * if provided.
                             */
                            if (
                                typeof popupButton.action ===
                                "function"
                            ) {

                                popupButton.action();

                            }


                            /*
                             * Close popup.
                             */
                            overlay.classList.remove(
                                "show"
                            );


                            document.body.classList.remove(
                                "popup-open"
                            );


                            setTimeout(
                                function() {

                                    if (
                                        overlay &&
                                        overlay.parentNode
                                    ) {

                                        overlay.remove();

                                    }


                                    resolve(
                                        popupButton.value
                                    );

                                },
                                200
                            );

                        }
                    );


                    if (
                        actionsContainer
                    ) {

                        actionsContainer.appendChild(
                            button
                        );

                    }

                }
            );

        }
    );

}
/* =========================================================
   CONFIRM POPUP
========================================================= */

function showConfirmPopup(
    title,
    message
) {

    return new Promise(
        function(resolve) {

            let overlay =
                document.getElementById(
                    "confirmPopup"
                );


            if (!overlay) {

                overlay =
                    document.createElement(
                        "div"
                    );


                overlay.id =
                    "confirmPopup";


                overlay.className =
                    "custom-popup-overlay";


                document.body.appendChild(
                    overlay
                );

            }


            overlay.innerHTML =
                `
                <div class="custom-popup">

                    <div class="custom-popup-icon warning">

                        <i class="fa-solid fa-circle-question"></i>

                    </div>


                    <h2>
                        ${title}
                    </h2>


					<p style="white-space: pre-line;">
					    ${message}
					</p>


                    <div class="popup-actions">

                        <button
                            type="button"
                            id="popupCancelBtn"
                            class="popup-cancel-btn">

                            Cancel

                        </button>


                        <button
                            type="button"
                            id="popupSubmitBtn"
                            class="popup-submit-btn">

                            Submit Assessment

                        </button>

                    </div>

                </div>
                `;


            overlay.classList.add(
                "show"
            );


            document
                .getElementById(
                    "popupCancelBtn"
                )
                .onclick =
                function() {

                    overlay.classList.remove(
                        "show"
                    );


                    setTimeout(
                        function() {

                            overlay.remove();


                            resolve(
                                false
                            );

                        },
                        200
                    );

                };


            document
                .getElementById(
                    "popupSubmitBtn"
                )
                .onclick =
                function() {

                    overlay.classList.remove(
                        "show"
                    );


                    setTimeout(
                        function() {

                            overlay.remove();


                            resolve(
                                true
                            );

                        },
                        200
                    );

                };

        }
    );

}


/* =========================================================
   CONFIRM POPUP COMPATIBILITY
========================================================= */

function showPopupPromise(
    title,
    message,
    type,
    buttons
) {

    /*
     * Use the existing confirmation popup
     * for Submit Test.
     */
    return showConfirmPopup(
        title,
        message
    );

}


/* =========================================================
   BACKWARD COMPATIBILITY
========================================================= */

window.nextQuestion =
    nextQuestion;


window.previousQuestion =
    previousQuestion;


window.clearAnswer =
    clearAnswer;


window.submitExam =
    submitExam;


window.goToQuestion =
    goToQuestion;


window.openRecommendation =
    openRecommendation;


window.viewCareerDetails =
    viewCareerDetails;


window.goToStudentResults =
    goToStudentResults;


window.goToStudentDashboard =
    goToStudentDashboard;
	
	window.closePopup =
	    closePopup;