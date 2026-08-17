/*==========================================================
            GIRIS TECH HUB
        ASSESSMENT MANAGEMENT JS
==========================================================*/


const BASE_URL =
    "http://localhost:8080";



/*==========================================================
                    ASSESSMENT API
==========================================================*/


const GET_ALL_ASSESSMENTS =
    `${BASE_URL}/api/assessment/all`;


const GET_ASSESSMENT =
    `${BASE_URL}/api/assessment/`;


const SAVE_ASSESSMENT =
    `${BASE_URL}/api/assessment/save`;


const UPDATE_ASSESSMENT =
    `${BASE_URL}/api/assessment/update`;


const DELETE_ASSESSMENT =
    `${BASE_URL}/api/assessment/`;




/*==========================================================
            ASSESSMENT QUESTION API
==========================================================*/

const GET_SELECTED_QUESTIONS =
    `${BASE_URL}/api/assessment-question/assessment/`;

const SAVE_ASSESSMENT_QUESTIONS =
    `${BASE_URL}/api/assessment-question/save`;

const DELETE_ASSESSMENT_QUESTION =
    `${BASE_URL}/api/assessment-question/`;

/*==========================================================
                QUESTION API
==========================================================*/


const GET_CATEGORIES =
    `${BASE_URL}/api/category/all`;


	const GET_ALL_QUESTIONS =
	    `${BASE_URL}/api/question/all`;

	const GET_QUESTIONS_BY_CATEGORY =
	    `${BASE_URL}/api/question/category/`;

/*==========================================================
                GLOBAL VARIABLES
==========================================================*/


let assessments = [];

let filteredAssessments = [];

let currentPage = 1;

const ASSESSMENTS_PER_PAGE = 10;

let selectedQuestions = [];


let currentAssessmentId = null;


let questionLimit = 0;


let deleteId = null;





/*==========================================================
                PAGE LOAD
==========================================================*/


document.addEventListener(
    "DOMContentLoaded",
    () => {


        initializeEvents();


        loadAssessments();


        loadCategories();


    });

function initializeEvents() {


    const addBtn =
        document.getElementById(
            "addAssessmentBtn"
        );


    if (addBtn)

        addBtn.onclick =
            addAssessment;



    const refreshBtn =
        document.getElementById(
            "refreshBtn"
        );


    if (refreshBtn)

        refreshBtn.onclick =
            loadAssessments;




    const search =
        document.getElementById(
            "searchAssessment"
        );


    if (search)

        search.onkeyup =
            searchAssessment;




    const form =
        document.getElementById(
            "assessmentForm"
        );


    if (form)

        form.onsubmit =
            saveAssessmentData;




    document
        .getElementById(
            "closeAssessmentModal"
        )
        .onclick =
        closeAssessmentModal;



    document
        .getElementById(
            "cancelAssessment"
        )
        .onclick =
        closeAssessmentModal;





    document
        .getElementById(
            "manageQuestionsBtn"
        )
        .onclick =
        openQuestionModal;





    document
        .getElementById(
            "closeQuestionModal"
        )
        .onclick =
        closeQuestionModal;



    document
        .getElementById(
            "cancelQuestionSelection"
        )
        .onclick =
        closeQuestionModal;




    /*
    IMPORTANT
    
    Only close modal.
    Do not save separately.
    */

	document
	    .getElementById(
	        "saveQuestionBtn"
	    )
	    .onclick =
	    function () {

	        const required =
	            Number(
	                document.getElementById(
	                    "assessmentQuestions"
	                ).value
	            );


	        // Make sure required question count is valid
	        if (required <= 0) {

	            alert(
	                "Please enter the Total Questions first."
	            );

	            return;

	        }


	        // Make sure enough questions are selected
	        if (
	            selectedQuestions.length !==
	            required
	        ) {

	            alert(
	                `Please select exactly ${required} questions.`
	            );

	            return;

	        }


	        // Update count on main assessment form
	        document.getElementById(
	            "selectedQuestionCount"
	        ).innerText =
	            selectedQuestions.length;


	        document.getElementById(
	            "requiredQuestionCount"
	        ).innerText =
	            required;


	        // Update modal count
	        document.getElementById(
	            "selectedQuestionCountModal"
	        ).innerText =
	            selectedQuestions.length;


	        // Close question modal
	        closeQuestionModal();

	    };




    document
        .getElementById(
            "categoryFilter"
        )
        .onchange =
        function() {


            loadQuestions(
                this.value
            );


        };




    document
        .getElementById(
            "closeViewModal"
        )
        .onclick =
        closeViewModal;



    document
        .getElementById(
            "cancelDelete"
        )
        .onclick =
        closeDeleteModal;



    document
        .getElementById(
            "confirmDelete"
        )
        .onclick =
        deleteAssessment;


}

/*==========================================================
                    ADD ASSESSMENT
==========================================================*/


function addAssessment() {


    document
        .getElementById(
            "assessmentForm"
        )
        .reset();



    document
        .getElementById(
            "assessmentId"
        )
        .value = "";



    selectedQuestions = [];


    currentAssessmentId = null;


    questionLimit = 0;



    updateQuestionCounter();



    document
        .getElementById(
            "assessmentModalTitle"
        )
        .innerText =
        "Add Assessment";



    document
        .getElementById(
            "assessmentModal"
        )
        .style.display =
        "flex";



}









/*==========================================================
                SAVE / UPDATE ASSESSMENT
==========================================================*/


async function saveAssessmentData(event) {


    event.preventDefault();



    let id =
        document
            .getElementById(
                "assessmentId"
            )
            .value;





    let data = {


        assessmentName:
            document
                .getElementById(
                    "assessmentName"
                )
                .value,



        description:
            document
                .getElementById(
                    "assessmentDescription"
                )
                .value,



        assessmentType:
            document
                .getElementById(
                    "assessmentType"
                )
                .value,



        duration:
            Number(
                document
                    .getElementById(
                        "assessmentDuration"
                    )
                    .value
            ),



        totalQuestions:
            Number(
                document
                    .getElementById(
                        "assessmentQuestions"
                    )
                    .value
            ),



        totalMarks:
            Number(
                document
                    .getElementById(
                        "assessmentMarks"
                    )
                    .value
            ),



        status:
            document
                .getElementById(
                    "assessmentStatus"
                )
                .value



    };







    let url;


    let method;



    if (id) {


        url =
            UPDATE_ASSESSMENT;


        method =
            "PUT";


        data.assessmentId =
            Number(id);



    }

    else {


        url =
            SAVE_ASSESSMENT;


        method =
            "POST";


    }







    try {


        let response =
            await fetch(

                url,

                {


                    method: method,


                    headers: {


                        "Content-Type":
                            "application/json"

                    },


                    body:
                        JSON.stringify(data)


                }

            );





        let result =
            await response.json();





        if (!response.ok) {


            throw new Error(

                result.message ||

                "Unable to save assessment"

            );


        }






        /*
         IMPORTANT
        
         Get generated assessment id
        */


        currentAssessmentId =

            result.data.assessmentId

            ||

            result.data.id;






        /*
         Save selected questions
        */


        await saveQuestions();






        closeAssessmentModal();



        loadAssessments();



        alert(
            "Assessment saved successfully"
        );




    }

    catch (error) {


        console.error(error);



        alert(
            error.message
        );


    }



}









/*==========================================================
                    EDIT ASSESSMENT
==========================================================*/


async function editAssessment(id) {


    try {


        let response =
            await fetch(

                GET_ASSESSMENT + id

            );




        let result =
            await response.json();



        let assessment =
            result.data;







        document
            .getElementById(
                "assessmentId"
            )
            .value =
            assessment.assessmentId;





        document
            .getElementById(
                "assessmentName"
            )
            .value =
            assessment.assessmentName;





        document
            .getElementById(
                "assessmentDescription"
            )
            .value =
            assessment.description || "";





        document
            .getElementById(
                "assessmentType"
            )
            .value =
            assessment.assessmentType;





        document
            .getElementById(
                "assessmentDuration"
            )
            .value =
            assessment.duration;





        document
            .getElementById(
                "assessmentQuestions"
            )
            .value =
            assessment.totalQuestions;





        document
            .getElementById(
                "assessmentMarks"
            )
            .value =
            assessment.totalMarks;





        document
            .getElementById(
                "assessmentStatus"
            )
            .value =
            assessment.status;







        currentAssessmentId =
            id;



        questionLimit =
            assessment.totalQuestions;





        /*
         LOAD EXISTING QUESTIONS
        */


        let questionResponse =
            await fetch(

                GET_SELECTED_QUESTIONS + id

            );





        let questionResult =
            await questionResponse.json();





        selectedQuestions = [];





        if (questionResult.data) {



            questionResult.data.forEach(q => {


                selectedQuestions.push(

                    q.questionId

                );


            });


        }





        updateQuestionCounter();






        document
            .getElementById(
                "assessmentModalTitle"
            )
            .innerText =
            "Edit Assessment";





        document
            .getElementById(
                "assessmentModal"
            )
            .style.display =
            "flex";




    }

    catch (error) {


        console.error(error);



        alert(
            "Unable to edit assessment"
        );



    }



}









/*==========================================================
                QUESTION COUNTER
==========================================================*/


function updateQuestionCounter() {


    let count =
        selectedQuestions.length;




    let selected1 =
        document.getElementById(
            "selectedQuestionCount"
        );



    let selected2 =
        document.getElementById(
            "selectedQuestionCountModal"
        );




    if (selected1)

        selected1.innerText =
            count;




    if (selected2)

        selected2.innerText =
            count;







    let required1 =
        document.getElementById(
            "requiredQuestionCount"
        );



    let required2 =
        document.getElementById(
            "requiredQuestionCountModal"
        );





    if (required1)

        required1.innerText =
            questionLimit;



    if (required2)

        required2.innerText =
            questionLimit;



}

/*==========================================================
                OPEN QUESTION MODAL
==========================================================*/

async function openQuestionModal() {

    questionLimit =
        Number(
            document.getElementById(
                "assessmentQuestions"
            ).value
        );

    if (!questionLimit || questionLimit <= 0) {

        alert(
            "Please enter total questions first."
        );

        return;
    }

    document
        .getElementById("questionModal")
        .style.display = "flex";

    updateQuestionCounter();

    /*
     * Load ALL questions immediately.
     *
     * This means:
     * - Assigned questions are visible
     * - Unassigned questions are visible
     * - Questions assigned to another assessment are also visible
     */
    await loadQuestions("");

}
/*==========================================================
                CLOSE QUESTION MODAL
==========================================================*/


function closeQuestionModal() {


    document
        .getElementById(
            "questionModal"
        )
        .style.display =
        "none";


}








/*==========================================================
                LOAD CATEGORIES
==========================================================*/


async function loadCategories() {


    try {


        let response =
            await fetch(
                GET_CATEGORIES
            );



        let result =
            await response.json();





        let select =
            document
                .getElementById(
                    "categoryFilter"
                );





        select.innerHTML = `

<option value="">

Select Subject

</option>

`;






        if (result.data) {



            result.data.forEach(category => {


                select.innerHTML += `


<option value="${category.categoryId}">


${category.categoryName}


</option>


`;



            });



        }




    }

    catch (error) {


        console.error(
            "Category loading error",
            error
        );


    }



}









/*==========================================================
                LOAD QUESTIONS
==========================================================*/

async function loadQuestions(categoryId = "") {

    const container =
        document.getElementById("questionList");

    /*
     * Show loading message
     */
    container.innerHTML = `
        <p class="no-question">
            Loading questions...
        </p>
    `;

    try {

        let url;

        /*
         * If category is selected
         * → load questions of that category.
         *
         * If no category is selected
         * → load ALL questions.
         */
        if (categoryId) {

            url =
                GET_QUESTIONS_BY_CATEGORY
                + categoryId;

        } else {

            url =
                GET_ALL_QUESTIONS;

        }

        const response =
            await fetch(url);

        const result =
            await response.json();

        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to load questions."
            );

        }

        renderQuestions(
            result.data || []
        );

    }

    catch (error) {

        console.error(
            "Question loading error:",
            error
        );

        container.innerHTML = `
            <p class="no-question">
                Unable to load questions.
            </p>
        `;
    }
}
/*==========================================================
                DISPLAY QUESTIONS
==========================================================*/


function renderQuestions(questionList) {



    let container =
        document
            .getElementById(
                "questionList"
            );



    container.innerHTML = "";





    if (!questionList ||
        questionList.length === 0) {


        container.innerHTML = `


<p class="no-question">

No questions available.

</p>


`;



        return;


    }





    questionList.forEach(question => {



        let checked =

            selectedQuestions.includes(
                question.questionId
            )

                ?

                "checked"

                :

                "";





        container.innerHTML += `



<div class="question-item">





<input

type="checkbox"

class="question-checkbox"


value="${question.questionId}"


${checked}


onchange="toggleQuestion(${question.questionId},this)"


>






<div class="question-content">



<h4>

${question.questionTitle}

</h4>




<div class="options">


<p>

A. ${question.optionA}

</p>


<p>

B. ${question.optionB}

</p>


<p>

C. ${question.optionC}

</p>


<p>

D. ${question.optionD}

</p>



</div>






<div class="question-info">


<span>

Difficulty:
${question.difficulty}

</span>


<span>

Marks:
${question.marks}

</span>



</div>



</div>




</div>



`;



    });




}









/*==========================================================
            SELECT / REMOVE QUESTIONS
==========================================================*/


function toggleQuestion(
    id,
    checkbox
) {



    if (checkbox.checked) {



        if (
            selectedQuestions.length >= questionLimit
        ) {



            checkbox.checked = false;



            alert(

                `Only ${questionLimit} questions can be selected`

            );



            return;


        }





        selectedQuestions.push(id);



    }

    else {


        selectedQuestions =

            selectedQuestions.filter(

                questionId =>

                    questionId !== id

            );


    }




    updateQuestionCounter();



}

/*==========================================================
            SAVE ASSESSMENT QUESTIONS
==========================================================*/


async function saveQuestions() {


    if (!currentAssessmentId) {


        return;


    }



    try {


        /*
            Delete old question mapping
        */


        let oldResponse =
            await fetch(

                GET_SELECTED_QUESTIONS
                +
                currentAssessmentId

            );



        let oldResult =
            await oldResponse.json();





        if (oldResult.data) {



            for (let question of oldResult.data) {



                await fetch(

                    DELETE_ASSESSMENT_QUESTION
                    +
                    question.id,

                    {

                        method: "DELETE"

                    }

                );



            }



        }






        /*
            Insert new selected questions
        */


        for (let questionId of selectedQuestions) {



            await fetch(

                SAVE_ASSESSMENT_QUESTIONS,

                {


                    method: "POST",


                    headers: {


                        "Content-Type": "application/json"

                    },


                    body: JSON.stringify({


                        assessmentId:
                            currentAssessmentId,


                        questionId:
                            questionId


                    })


                }

            );



        }





    }

    catch (error) {


        console.error(
            "Question mapping error",
            error
        );



        alert(
            "Unable to save questions"
        );


    }



}

/*==========================================================
                LOAD ASSESSMENTS
==========================================================*/

async function loadAssessments() {

    try {

        let response =
            await fetch(
                GET_ALL_ASSESSMENTS
            );


        let result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to load assessments."
            );

        }


        assessments =
            result.data || [];


        /*
         * Initially show all assessments
         */

        filteredAssessments =
            [...assessments];


        /*
         * Start from first page
         */

        currentPage = 1;


        renderAssessments();

        renderPagination();

    }

    catch (error) {

        console.error(
            "Assessment Load Error:",
            error
        );


        assessments = [];

        filteredAssessments = [];

        renderAssessments();

        renderPagination();

        showNoAssessment();

    }

}
/*==========================================================
            DISPLAY ASSESSMENTS
==========================================================*/

function renderAssessments() {

    const tbody =
        document.getElementById(
            "assessmentTableBody"
        );


    const noData =
        document.getElementById(
            "noAssessmentData"
        );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = "";


    /*
     * NO DATA
     */

    if (
        !filteredAssessments ||
        filteredAssessments.length === 0
    ) {

        if (noData) {

            noData.style.display =
                "block";

        }


        updatePaginationInfo();

        return;

    }


    if (noData) {

        noData.style.display =
            "none";

    }


    /*
     * Calculate current page
     */

    const startIndex =
        (
            currentPage - 1
        ) *
        ASSESSMENTS_PER_PAGE;


    const endIndex =
        startIndex +
        ASSESSMENTS_PER_PAGE;


    /*
     * Get only current page
     */

    const pageAssessments =
        filteredAssessments.slice(
            startIndex,
            endIndex
        );


    /*
     * Render current page
     */

    pageAssessments.forEach(
        a => {

            tbody.innerHTML += `

                <tr>

                    <td>

                        ${a.assessmentName ?? "-"}

                    </td>


                    <td>

                        ${a.assessmentType ?? "-"}

                    </td>


                    <td>

                        ${a.duration ?? "-"} Min

                    </td>


                    <td>

                        ${a.totalQuestions ?? "-"}

                    </td>


                    <td>

                        ${a.totalMarks ?? "-"}

                    </td>


                    <td>

                        <span
                            class="status ${(
                                a.status || ""
                            ).toLowerCase()}"
                        >

                            ${a.status ?? "-"}

                        </span>

                    </td>


                    <td>

                        ${formatDate(
                            a.createdAt
                        )}

                    </td>


                    <td>

                        <div class="action-buttons">


                            <button
                                type="button"
                                class="action-btn view-btn"
                                onclick="viewAssessment(${a.assessmentId})"
                                title="View Assessment"
                            >

                                <i class="fa-solid fa-eye"></i>

                            </button>


                            <button
                                type="button"
                                class="action-btn edit-btn"
                                onclick="editAssessment(${a.assessmentId})"
                                title="Edit Assessment"
                            >

                                <i class="fa-solid fa-pen"></i>

                            </button>


                            <button
                                type="button"
                                class="action-btn delete-btn"
                                onclick="openDeleteModal(${a.assessmentId})"
                                title="Delete Assessment"
                            >

                                <i class="fa-solid fa-trash"></i>

                            </button>


                        </div>

                    </td>

                </tr>

            `;

        }
    );


    updatePaginationInfo();

}

/*==========================================================
                PAGINATION
==========================================================*/

function renderPagination() {

    const pagination =
        document.getElementById(
            "assessmentPagination"
        );


    const buttons =
        document.getElementById(
            "assessmentPaginationButtons"
        );


    if (
        !pagination ||
        !buttons
    ) {

        return;

    }


    /*
        Clear old buttons
    */

    buttons.innerHTML = "";


    const totalAssessments =
        filteredAssessments.length;


    const totalPages =
        Math.ceil(
            totalAssessments /
            ASSESSMENTS_PER_PAGE
        );


    /*
        NO DATA
    */

    if (
        totalAssessments === 0
    ) {

        pagination.style.display =
            "none";

        updatePaginationInfo();

        return;

    }


    /*
        IMPORTANT:

        Pagination remains visible even
        when there is only ONE page.

        Example:

        Previous   1   Next

        Previous = disabled
        1        = active
        Next     = disabled
    */

    pagination.style.display =
        "flex";


    /*======================================================
                    PREVIOUS
    ======================================================*/

    const previousButton =
        createAssessmentPaginationButton(
            "Previous",
            currentPage === 1,
            function () {

                if (
                    currentPage > 1
                ) {

                    currentPage--;

                    renderAssessments();

                    renderPagination();

                    scrollToAssessmentTable();

                }

            }
        );


    buttons.appendChild(
        previousButton
    );


    /*======================================================
                    PAGE NUMBERS
    ======================================================*/

    createAssessmentPageNumbers(
        buttons,
        currentPage,
        totalPages,
        function (page) {

            if (
                page === currentPage
            ) {

                return;

            }


            currentPage =
                page;


            renderAssessments();

            renderPagination();

            scrollToAssessmentTable();

        }
    );


    /*======================================================
                    NEXT
    ======================================================*/

    const nextButton =
        createAssessmentPaginationButton(
            "Next",
            currentPage === totalPages,
            function () {

                if (
                    currentPage <
                    totalPages
                ) {

                    currentPage++;

                    renderAssessments();

                    renderPagination();

                    scrollToAssessmentTable();

                }

            }
        );


    buttons.appendChild(
        nextButton
    );


    updatePaginationInfo();

}


/*==========================================================
        CREATE PAGINATION BUTTON
==========================================================*/

function createAssessmentPaginationButton(
    text,
    disabled,
    callback,
    active = false
) {

    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


    button.className =
        "pagination-btn";


    if (active) {

        button.classList.add(
            "active"
        );

    }


    /*
        Previous
    */

    if (
        text === "Previous"
    ) {

        button.innerHTML = `

            <i class="fa-solid fa-chevron-left"></i>

            <span>Previous</span>

        `;

    }


    /*
        Next
    */

    else if (
        text === "Next"
    ) {

        button.innerHTML = `

            <span>Next</span>

            <i class="fa-solid fa-chevron-right"></i>

        `;

    }


    /*
        Page number
    */

    else {

        button.textContent =
            text;

    }


    button.disabled =
        disabled;


    button.addEventListener(
        "click",
        callback
    );


    return button;

}


/*==========================================================
        CREATE PAGE NUMBERS
==========================================================*/

function createAssessmentPageNumbers(
    container,
    currentPage,
    totalPages,
    callback
) {

    /*
        No pages
    */

    if (
        totalPages <= 0
    ) {

        return;

    }


    /*
        If there are 7 or fewer pages,
        show all pages.
    */

    if (
        totalPages <= 7
    ) {

        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            const pageButton =
                createAssessmentPaginationButton(
                    page,
                    false,
                    function () {

                        callback(page);

                    },
                    currentPage === page
                );


            container.appendChild(
                pageButton
            );

        }


        return;

    }


    /*
        FIRST PAGE
    */

    container.appendChild(

        createAssessmentPaginationButton(
            1,
            false,
            function () {

                callback(1);

            },
            currentPage === 1
        )

    );


    /*
        LEFT ELLIPSIS
    */

    if (
        currentPage > 4
    ) {

        createAssessmentPaginationEllipsis(
            container
        );

    }


    /*
        MIDDLE PAGE RANGE
    */

    let startPage =
        Math.max(
            2,
            currentPage - 1
        );


    let endPage =
        Math.min(
            totalPages - 1,
            currentPage + 1
        );


    /*
        Near beginning
    */

    if (
        currentPage <= 3
    ) {

        startPage = 2;

        endPage = 4;

    }


    /*
        Near end
    */

    if (
        currentPage >=
        totalPages - 2
    ) {

        startPage =
            totalPages - 3;


        endPage =
            totalPages - 1;

    }


    /*
        Render middle pages
    */

    for (
        let page = startPage;
        page <= endPage;
        page++
    ) {

        const pageButton =
            createAssessmentPaginationButton(
                page,
                false,
                function () {

                    callback(page);

                },
                currentPage === page
            );


        container.appendChild(
            pageButton
        );

    }


    /*
        RIGHT ELLIPSIS
    */

    if (
        currentPage <
        totalPages - 3
    ) {

        createAssessmentPaginationEllipsis(
            container
        );

    }


    /*
        LAST PAGE
    */

    container.appendChild(

        createAssessmentPaginationButton(
            totalPages,
            false,
            function () {

                callback(
                    totalPages
                );

            },
            currentPage === totalPages
        )

    );

}


/*==========================================================
                ELLIPSIS
==========================================================*/

function createAssessmentPaginationEllipsis(
    container
) {

    const ellipsis =
        document.createElement(
            "span"
        );


    ellipsis.className =
        "pagination-ellipsis";


    ellipsis.textContent =
        "...";


    container.appendChild(
        ellipsis
    );

}


/*==========================================================
                PAGINATION INFORMATION
==========================================================*/

function updatePaginationInfo() {

    const info =
        document.getElementById(
            "paginationInfo"
        );


    if (!info) {

        return;

    }


    const total =
        filteredAssessments.length;


    /*
        No assessments
    */

    if (
        total === 0
    ) {

        info.innerText =
            "";

        return;

    }


    const start =
        (
            currentPage - 1
        )
        *
        ASSESSMENTS_PER_PAGE
        + 1;


    const end =
        Math.min(
            currentPage *
            ASSESSMENTS_PER_PAGE,
            total
        );


    info.innerText =
        `Showing ${start} - ${end} of ${total} assessments`;

}
/*==========================================================
                PAGINATION INFORMATION
==========================================================*/

function updatePaginationInfo() {

    const info =
        document.getElementById(
            "paginationInfo"
        );


    if (!info) {

        return;

    }


    const total =
        filteredAssessments.length;


    if (total === 0) {

        info.innerText = "";

        return;

    }


    const start =
        (
            currentPage - 1
        ) *
        ASSESSMENTS_PER_PAGE
        + 1;


    const end =
        Math.min(
            currentPage *
            ASSESSMENTS_PER_PAGE,
            total
        );


    info.innerText =
        `Showing ${start}–${end} of ${total} assessments`;

}


/*==========================================================
                SCROLL TO TABLE
==========================================================*/

function scrollToAssessmentTable() {

    const tableSection =
        document.querySelector(
            ".table-section"
        );


    if (!tableSection) {

        return;

    }


    tableSection.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}
/*==========================================================
                SEARCH
==========================================================*/

/*==========================================================
                SEARCH
==========================================================*/

function searchAssessment() {

    const value =
        document
            .getElementById(
                "searchAssessment"
            )
            .value
            .toLowerCase()
            .trim();


    filteredAssessments =
        assessments.filter(
            a => {

                const name =
                    (
                        a.assessmentName ||
                        ""
                    )
                    .toLowerCase();


                const type =
                    (
                        a.assessmentType ||
                        ""
                    )
                    .toLowerCase();


                return (
                    name.includes(value) ||
                    type.includes(value)
                );

            }
        );


    /*
     * Search always starts
     * from page 1.
     */

    currentPage = 1;


    renderAssessments();

    renderPagination();

}
/*==========================================================
                VIEW ASSESSMENT
==========================================================*/


async function viewAssessment(id) {



    try {


        let response =
            await fetch(

                GET_ASSESSMENT + id

            );



        let result =
            await response.json();



        let a =
            result.data;




        document
            .getElementById(
                "viewName"
            )
            .innerText =
            a.assessmentName;



        document
            .getElementById(
                "viewType"
            )
            .innerText =
            a.assessmentType;




        document
            .getElementById(
                "viewDuration"
            )
            .innerText =
            a.duration + " Minutes";




        document
            .getElementById(
                "viewQuestions"
            )
            .innerText =
            a.totalQuestions;




        document
            .getElementById(
                "viewMarks"
            )
            .innerText =
            a.totalMarks;




        document
            .getElementById(
                "viewStatus"
            )
            .innerText =
            a.status;




        document
            .getElementById(
                "viewDescription"
            )
            .innerText =
            a.description || "-";





        document
            .getElementById(
                "viewAssessmentModal"
            )
            .style.display = "flex";



    }

    catch (error) {


        console.error(error);


    }



}





function closeViewModal() {


    document
        .getElementById(
            "viewAssessmentModal"
        )
        .style.display = "none";


}

/*==========================================================
                DELETE ASSESSMENT
==========================================================*/


function openDeleteModal(id) {


    deleteId = id;


    document
        .getElementById(
            "deleteModal"
        )
        .style.display = "flex";


}





function closeDeleteModal() {


    document
        .getElementById(
            "deleteModal"
        )
        .style.display = "none";


}





async function deleteAssessment() {


    try {


        await fetch(

            DELETE_ASSESSMENT
            +
            deleteId,

            {

                method: "DELETE"

            }

        );



        closeDeleteModal();



        loadAssessments();



        alert(
            "Assessment deleted successfully"
        );



    }

    catch (error) {


        console.error(error);



    }



}

/*==========================================================
            CLOSE ASSESSMENT MODAL
==========================================================*/


function closeAssessmentModal() {


    document
        .getElementById(
            "assessmentModal"
        )
        .style.display = "none";


}





function formatDate(date) {


    if (!date)

        return "-";



    return new Date(date)
        .toLocaleDateString(
            "en-IN"
        );


}