/*==========================================================
        GIRIS TECH HUB
        QUESTION MANAGEMENT JS
==========================================================*/


/*==========================================================
        BASE URL
==========================================================*/

const BASE_URL = "http://localhost:8080";


/*==========================================================
        API
==========================================================*/

const QUESTION_API =
    `${BASE_URL}/api/question`;


const CATEGORY_API =
    `${BASE_URL}/api/category`;



/*==========================================================
        GLOBAL VARIABLES
==========================================================*/

let questions = [];

let subjects = [];

let deleteId = null;

let deleteType = "";



/*==========================================================
        PAGINATION SETTINGS
==========================================================*/

const QUESTION_PAGE_SIZE = 10;

const SUBJECT_PAGE_SIZE = 10;


let questionCurrentPage = 1;

let subjectCurrentPage = 1;



/*==========================================================
        DOM ELEMENTS
==========================================================*/

const questionTableBody =
    document.getElementById(
        "questionTableBody"
    );


const subjectTableBody =
    document.getElementById(
        "subjectTableBody"
    );


const noQuestionData =
    document.getElementById(
        "noQuestionData"
    );


const noSubjectData =
    document.getElementById(
        "noSubjectData"
    );


const questionSection =
    document.getElementById(
        "questionSection"
    );


const subjectSection =
    document.getElementById(
        "subjectSection"
    );



/*==========================================================
        MODAL ELEMENTS
==========================================================*/

const questionModal =
    document.getElementById(
        "questionModal"
    );


const subjectModal =
    document.getElementById(
        "subjectModal"
    );


const deleteModal =
    document.getElementById(
        "deleteModal"
    );


const cancelDelete =
    document.getElementById(
        "cancelDelete"
    );


const confirmDelete =
    document.getElementById(
        "confirmDelete"
    );



/*==========================================================
        PAGE INITIALIZATION
==========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadQuestions();

        loadSubjects();

        showQuestions();

    }
);



/*==========================================================
        PAGE LOAD
==========================================================*/

const showQuestionBtn =
    document.getElementById(
        "showQuestionBtn"
    );


const showSubjectBtn =
    document.getElementById(
        "showSubjectBtn"
    );



if (showQuestionBtn) {

    showQuestionBtn.onclick =
        function () {

            showQuestions();

        };

}


if (showSubjectBtn) {

    showSubjectBtn.onclick =
        function () {

            showSubjects();

        };

}



/*==========================================================
        SWITCH SECTION
==========================================================*/

function showQuestions() {

    const questionSection =
        document.getElementById(
            "questionSection"
        );


    const subjectSection =
        document.getElementById(
            "subjectSection"
        );


    if (questionSection) {

        questionSection.style.display =
            "block";

    }


    if (subjectSection) {

        subjectSection.style.display =
            "none";

    }



    if (showQuestionBtn) {

        showQuestionBtn.classList.add(
            "active"
        );

    }


    if (showSubjectBtn) {

        showSubjectBtn.classList.remove(
            "active"
        );

    }


    /*
     * Reset to first page whenever
     * Questions section is opened.
     */

    questionCurrentPage = 1;


    renderQuestions();

}



function showSubjects() {

    const questionSection =
        document.getElementById(
            "questionSection"
        );


    const subjectSection =
        document.getElementById(
            "subjectSection"
        );


    if (questionSection) {

        questionSection.style.display =
            "none";

    }


    if (subjectSection) {

        subjectSection.style.display =
            "block";

    }



    if (showSubjectBtn) {

        showSubjectBtn.classList.add(
            "active"
        );

    }


    if (showQuestionBtn) {

        showQuestionBtn.classList.remove(
            "active"
        );

    }


    /*
     * Reset to first page whenever
     * Subjects section is opened.
     */

    subjectCurrentPage = 1;


    renderSubjects();

}



/*==========================================================
        LOAD QUESTIONS
==========================================================*/

async function loadQuestions() {

    try {

        let response =
            await fetch(
                `${QUESTION_API}/all`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load questions"
            );

        }


        let result =
            await response.json();


        questions =
            result.data || [];



        /*
         * Subjects are required to display
         * the subject name.
         */

        if (subjects.length === 0) {

            await loadSubjects();

        }


        questionCurrentPage = 1;


        renderQuestions();

    }


    catch (error) {

        console.log(
            "Question Loading Error",
            error
        );


        questions = [];


        questionCurrentPage = 1;


        renderQuestions();

    }

}



/*==========================================================
        RENDER QUESTION TABLE
==========================================================*/

function renderQuestions() {

    if (!questionTableBody) {

        return;

    }


    questionTableBody.innerHTML = "";



    /*
     * Search value
     */

    const searchInput =
        document.getElementById(
            "searchQuestion"
        );


    const searchValue =
        searchInput
            ?
            searchInput.value
                .trim()
                .toLowerCase()
            :
            "";



    /*
     * FILTER QUESTIONS
     *
     * Search by:
     * - Question title
     * - Subject
     * - Difficulty
     */

    const filteredQuestions =
        questions.filter(
            question => {

                const questionTitle =
                    (
                        question.questionTitle ||
                        ""
                    ).toLowerCase();


                const subjectName =
                    getSubjectName(
                        question.categoryId
                    ).toLowerCase();


                const difficulty =
                    (
                        question.difficulty ||
                        ""
                    ).toLowerCase();


                return (

                    questionTitle.includes(
                        searchValue
                    )

                    ||

                    subjectName.includes(
                        searchValue
                    )

                    ||

                    difficulty.includes(
                        searchValue
                    )

                );

            }
        );



    /*
     * TOTAL PAGES
     */

    const totalPages =
        Math.ceil(
            filteredQuestions.length /
            QUESTION_PAGE_SIZE
        );



    /*
     * Make sure current page is valid.
     */

    if (
        totalPages > 0 &&
        questionCurrentPage > totalPages
    ) {

        questionCurrentPage =
            totalPages;

    }


    if (totalPages === 0) {

        questionCurrentPage = 1;

    }



    /*
     * CURRENT PAGE DATA
     */

    const startIndex =
        (
            questionCurrentPage - 1
        ) *
        QUESTION_PAGE_SIZE;


    const endIndex =
        startIndex +
        QUESTION_PAGE_SIZE;


    const pageQuestions =
        filteredQuestions.slice(
            startIndex,
            endIndex
        );



    /*
     * NO DATA
     */

    if (
        pageQuestions.length === 0
    ) {

        if (noQuestionData) {

            noQuestionData.style.display =
                "block";

        }

    }

    else {

        if (noQuestionData) {

            noQuestionData.style.display =
                "none";

        }


        pageQuestions.forEach(
            question => {

                questionTableBody.innerHTML +=

                    `
                    <tr>


                        <td class="question-title">

                            ${escapeHtml(
                                question.questionTitle
                            )}

                        </td>


                        <td>

                            ${escapeHtml(
                                getSubjectName(
                                    question.categoryId
                                )
                            )}

                        </td>


                        <td>

                            ${escapeHtml(
                                question.difficulty
                            )}

                        </td>


                        <td>

                            ${question.marks}

                        </td>


                        <td>


                            <span class="status 
                            ${(
                                question.questionStatus ||
                                ""
                            ).toLowerCase()}">


                                ${escapeHtml(
                                    question.questionStatus
                                )}


                            </span>


                        </td>


                        <td>

                            ${formatDate(
                                question.createdAt
                            )}

                        </td>


                        <td>


                            <div class="action-buttons">


                                <button

                                    class="action-btn view-btn"

                                    onclick="viewQuestion(
                                        ${question.questionId}
                                    )">


                                    <i class="fa-solid fa-eye"></i>


                                </button>


                                <button

                                    class="action-btn edit-btn"

                                    onclick="editQuestion(
                                        ${question.questionId}
                                    )">


                                    <i class="fa-solid fa-pen"></i>


                                </button>


                                <button

                                    class="action-btn delete-btn"

                                    onclick="openDeleteQuestion(
                                        ${question.questionId}
                                    )">


                                    <i class="fa-solid fa-trash"></i>


                                </button>


                            </div>


                        </td>


                    </tr>

                    `;

            }
        );

    }



    /*
     * RENDER PAGINATION
     */

    renderQuestionPagination(
        filteredQuestions.length,
        totalPages
    );

}



/*==========================================================
        QUESTION PAGINATION
==========================================================*/

function renderQuestionPagination(
    totalItems,
    totalPages
) {

    const pagination =
        document.getElementById(
            "questionPagination"
        );


    const info =
        document.getElementById(
            "questionPaginationInfo"
        );


    const buttons =
        document.getElementById(
            "questionPaginationButtons"
        );


    /*
     * If pagination HTML has not yet
     * been added, simply skip.
     */

    if (
        !pagination ||
        !info ||
        !buttons
    ) {

        return;

    }



    /*
     * No records
     */

    if (totalItems === 0) {

        pagination.style.display =
            "none";

        return;

    }


    pagination.style.display =
        "flex";



    /*
     * SHOWING INFORMATION
     */

    const start =
        (
            (questionCurrentPage - 1)
            *
            QUESTION_PAGE_SIZE
        ) + 1;


    const end =
        Math.min(
            questionCurrentPage *
            QUESTION_PAGE_SIZE,
            totalItems
        );


    info.textContent =
        `Showing ${start} - ${end} of ${totalItems} questions`;



    /*
     * CLEAR BUTTONS
     */

    buttons.innerHTML = "";



    /*
     * PREVIOUS
     */

    const previousButton =
        createPaginationButton(
            "Previous",
            questionCurrentPage === 1,
            () => {

                if (
                    questionCurrentPage > 1
                ) {

                    questionCurrentPage--;

                    renderQuestions();

                }

            }
        );


    buttons.appendChild(
        previousButton
    );



    /*
     * PAGE NUMBERS
     */

    createPageNumbers(
        buttons,
        questionCurrentPage,
        totalPages,
        function (page) {

            questionCurrentPage =
                page;

            renderQuestions();

        }
    );



    /*
     * NEXT
     */

    const nextButton =
        createPaginationButton(
            "Next",
            questionCurrentPage === totalPages,
            () => {

                if (
                    questionCurrentPage <
                    totalPages
                ) {

                    questionCurrentPage++;

                    renderQuestions();

                }

            }
        );


    buttons.appendChild(
        nextButton
    );

}



/*==========================================================
        GET SUBJECT NAME
==========================================================*/

function getSubjectName(categoryId) {

    let subject =
        subjects.find(
            item =>
                item.categoryId == categoryId
        );


    if (subject) {

        return subject.categoryName;

    }


    return "-";

}



/*==========================================================
        DATE FORMAT
==========================================================*/

function formatDate(value) {

    if (!value) {

        return "-";

    }


    return new Date(value)
        .toLocaleDateString(
            "en-IN",
            {

                day: "2-digit",

                month: "short",

                year: "numeric"

            }
        );

}



/*==========================================================
        SEARCH QUESTIONS
==========================================================*/

function searchData() {

    /*
     * Whenever search changes,
     * start from page 1.
     */

    questionCurrentPage = 1;


    renderQuestions();

}



/*==========================================================
        SEARCH QUESTION EVENT
==========================================================*/

const searchQuestion =
    document.getElementById(
        "searchQuestion"
    );


if (searchQuestion) {

    searchQuestion.addEventListener(
        "input",
        searchData
    );

}



/*==========================================================
        LOAD SUBJECTS
==========================================================*/

async function loadSubjects() {

    try {

        let response =
            await fetch(
                `${CATEGORY_API}/all`
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load subjects"
            );

        }


        let result =
            await response.json();


        subjects =
            result.data || [];


        subjectCurrentPage = 1;


        renderSubjects();


        loadCategoryDropdown();

    }


    catch (error) {

        console.log(
            "Subject Loading Error",
            error
        );


        subjects = [];


        subjectCurrentPage = 1;


        renderSubjects([]);

    }

}



/*==========================================================
        RENDER SUBJECT TABLE
==========================================================*/

function renderSubjects() {

    if (!subjectTableBody) {

        return;

    }


    subjectTableBody.innerHTML = "";



    /*
     * SUBJECT SEARCH
     */

    const searchInput =
        document.getElementById(
            "searchSubject"
        );


    const searchValue =
        searchInput
            ?
            searchInput.value
                .trim()
                .toLowerCase()
            :
            "";



    /*
     * FILTER SUBJECTS
     */

    const filteredSubjects =
        subjects.filter(
            subject => {

                const name =
                    (
                        subject.categoryName ||
                        ""
                    ).toLowerCase();


                const type =
                    (
                        subject.categoryType ||
                        ""
                    ).toLowerCase();


                const description =
                    (
                        subject.description ||
                        ""
                    ).toLowerCase();


                const status =
                    (
                        subject.status ||
                        ""
                    ).toLowerCase();


                return (

                    name.includes(
                        searchValue
                    )

                    ||

                    type.includes(
                        searchValue
                    )

                    ||

                    description.includes(
                        searchValue
                    )

                    ||

                    status.includes(
                        searchValue
                    )

                );

            }
        );



    /*
     * TOTAL PAGES
     */

    const totalPages =
        Math.ceil(
            filteredSubjects.length /
            SUBJECT_PAGE_SIZE
        );



    /*
     * Make sure current page is valid.
     */

    if (
        totalPages > 0 &&
        subjectCurrentPage > totalPages
    ) {

        subjectCurrentPage =
            totalPages;

    }


    if (totalPages === 0) {

        subjectCurrentPage = 1;

    }



    /*
     * CURRENT PAGE
     */

    const startIndex =
        (
            subjectCurrentPage - 1
        ) *
        SUBJECT_PAGE_SIZE;


    const endIndex =
        startIndex +
        SUBJECT_PAGE_SIZE;


    const pageSubjects =
        filteredSubjects.slice(
            startIndex,
            endIndex
        );



    /*
     * NO DATA
     */

    if (
        pageSubjects.length === 0
    ) {

        if (noSubjectData) {

            noSubjectData.style.display =
                "block";

        }

    }

    else {

        if (noSubjectData) {

            noSubjectData.style.display =
                "none";

        }


        pageSubjects.forEach(
            subject => {

                subjectTableBody.innerHTML +=

                    `

                    <tr>


                        <td>

                            ${escapeHtml(
                                subject.categoryName
                            )}

                        </td>


                        <td>

                            ${escapeHtml(
                                subject.categoryType
                            )}

                        </td>


                        <td>

                            ${escapeHtml(
                                subject.description ||
                                "-"
                            )}

                        </td>


                        <td>


                            <span class="status 
                            ${(
                                subject.status ||
                                ""
                            ).toLowerCase()}">


                                ${escapeHtml(
                                    subject.status
                                )}


                            </span>


                        </td>


                        <td>


                            <div class="action-buttons">


                                <button

                                    class="action-btn edit-btn"

                                    onclick="editSubject(
                                        ${subject.categoryId}
                                    )">


                                    <i class="fa-solid fa-pen"></i>


                                </button>


                                <button

                                    class="action-btn delete-btn"

                                    onclick="openDeleteSubject(
                                        ${subject.categoryId}
                                    )">


                                    <i class="fa-solid fa-trash"></i>


                                </button>


                            </div>


                        </td>


                    </tr>

                    `;

            }
        );

    }



    /*
     * RENDER SUBJECT PAGINATION
     */

    renderSubjectPagination(
        filteredSubjects.length,
        totalPages
    );

}



/*==========================================================
        SUBJECT PAGINATION
==========================================================*/

function renderSubjectPagination(
    totalItems,
    totalPages
) {

    const pagination =
        document.getElementById(
            "subjectPagination"
        );


    const info =
        document.getElementById(
            "subjectPaginationInfo"
        );


    const buttons =
        document.getElementById(
            "subjectPaginationButtons"
        );


    if (
        !pagination ||
        !info ||
        !buttons
    ) {

        return;

    }



    /*
     * No records
     */

    if (totalItems === 0) {

        pagination.style.display =
            "none";

        return;

    }


    pagination.style.display =
        "flex";



    /*
     * SHOWING INFORMATION
     */

    const start =
        (
            (subjectCurrentPage - 1)
            *
            SUBJECT_PAGE_SIZE
        ) + 1;


    const end =
        Math.min(
            subjectCurrentPage *
            SUBJECT_PAGE_SIZE,
            totalItems
        );


    info.textContent =
        `Showing ${start} - ${end} of ${totalItems} subjects`;



    /*
     * CLEAR BUTTONS
     */

    buttons.innerHTML = "";



    /*
     * PREVIOUS
     */

    const previousButton =
        createPaginationButton(
            "Previous",
            subjectCurrentPage === 1,
            () => {

                if (
                    subjectCurrentPage > 1
                ) {

                    subjectCurrentPage--;

                    renderSubjects();

                }

            }
        );


    buttons.appendChild(
        previousButton
    );



    /*
     * PAGE NUMBERS
     */

    createPageNumbers(
        buttons,
        subjectCurrentPage,
        totalPages,
        function (page) {

            subjectCurrentPage =
                page;

            renderSubjects();

        }
    );



    /*
     * NEXT
     */

    const nextButton =
        createPaginationButton(
            "Next",
            subjectCurrentPage === totalPages,
            () => {

                if (
                    subjectCurrentPage <
                    totalPages
                ) {

                    subjectCurrentPage++;

                    renderSubjects();

                }

            }
        );


    buttons.appendChild(
        nextButton
    );

}



/*==========================================================
        CREATE PAGINATION BUTTON
==========================================================*/

function createPaginationButton(
    text,
    disabled,
    callback,
    active = false
) {

    const button =
        document.createElement(
            "button"
        );


    button.type = "button";


    button.className =
        "pagination-btn";


    if (active) {

        button.classList.add(
            "active"
        );

    }


    button.textContent =
        text;


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

function createPageNumbers(
    container,
    currentPage,
    totalPages,
    callback
) {


    /*
     * For small number of pages,
     * show every page.
     */

    if (totalPages <= 7) {

        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            container.appendChild(

                createPaginationButton(
                    page,
                    false,
                    () => callback(page),
                    currentPage === page
                )

            );

        }

        return;

    }



    /*
     * Always show first page.
     */

    container.appendChild(

        createPaginationButton(
            1,
            false,
            () => callback(1),
            currentPage === 1
        )

    );



    /*
     * LEFT ELLIPSIS
     */

    if (currentPage > 4) {

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



    /*
     * MIDDLE PAGE NUMBERS
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


    if (currentPage <= 3) {

        startPage = 2;

        endPage = 4;

    }


    if (
        currentPage >=
        totalPages - 2
    ) {

        startPage =
            totalPages - 3;

        endPage =
            totalPages - 1;

    }



    for (
        let page = startPage;
        page <= endPage;
        page++
    ) {

        container.appendChild(

            createPaginationButton(
                page,
                false,
                () => callback(page),
                currentPage === page
            )

        );

    }



    /*
     * RIGHT ELLIPSIS
     */

    if (
        currentPage <
        totalPages - 3
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



    /*
     * LAST PAGE
     */

    container.appendChild(

        createPaginationButton(
            totalPages,
            false,
            () => callback(totalPages),
            currentPage === totalPages
        )

    );

}



/*==========================================================
        CATEGORY DROPDOWN
==========================================================*/

function loadCategoryDropdown() {

    let dropdown =
        document.getElementById(
            "questionCategory"
        );


    if (!dropdown) {

        return;

    }



    dropdown.innerHTML =

        `

        <option value="">

            Select Subject

        </option>

        `;



    subjects.forEach(
        subject => {

            dropdown.innerHTML +=

                `

                <option value="${subject.categoryId}">

                    ${escapeHtml(
                        subject.categoryName
                    )}

                </option>

                `;

        }
    );

}



/*==========================================================
        SUBJECT MODAL
==========================================================*/

const addSubjectBtn =
    document.getElementById(
        "addSubjectBtn"
    );


const closeSubjectModal =
    document.getElementById(
        "closeSubjectModal"
    );


const cancelSubject =
    document.getElementById(
        "cancelSubject"
    );



if (addSubjectBtn) {

    addSubjectBtn.onclick = () => {


        document
            .getElementById(
                "subjectForm"
            )
            .reset();


        document
            .getElementById(
                "subjectId"
            )
            .value = "";


        document
            .getElementById(
                "subjectModalTitle"
            )
            .innerText =
            "Add Subject";


        if (subjectModal) {

            subjectModal.style.display =
                "flex";

        }

    };

}



if (closeSubjectModal) {

    closeSubjectModal.onclick =
        () => {

            subjectModal.style.display =
                "none";

        };

}



if (cancelSubject) {

    cancelSubject.onclick =
        () => {

            subjectModal.style.display =
                "none";

        };

}



/*==========================================================
        SAVE SUBJECT
==========================================================*/

const subjectForm =
    document.getElementById(
        "subjectForm"
    );


if (subjectForm) {

    subjectForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            let id =
                document
                    .getElementById(
                        "subjectId"
                    )
                    .value;


            let data = {


                categoryId:
                    id
                        ?
                        Number(id)
                        :
                        null,


                categoryName:
                    document
                        .getElementById(
                            "subjectName"
                        )
                        .value,


                categoryType:
                    document
                        .getElementById(
                            "subjectType"
                        )
                        .value,


                description:
                    document
                        .getElementById(
                            "subjectDescription"
                        )
                        .value,


                status:
                    document
                        .getElementById(
                            "subjectStatus"
                        )
                        .value

            };



            let url =
                id
                    ?
                    `${CATEGORY_API}/update`
                    :
                    `${CATEGORY_API}/save`;


            let method =
                id
                    ?
                    "PUT"
                    :
                    "POST";



            try {

                let response =
                    await fetch(
                        url,
                        {

                            method,

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    data
                                )

                        }
                    );



                let result =
                    await response.json();



                if (result.success) {


                    alert(
                        "Subject saved successfully"
                    );


                    subjectModal.style.display =
                        "none";


                    subjectCurrentPage = 1;


                    await loadSubjects();


                    await loadQuestions();


                }

                else {


                    alert(
                        result.message ||
                        "Unable to save subject"
                    );

                }


            }


            catch (error) {


                console.log(error);


                alert(
                    "Server Error"
                );


            }

        }
    );

}



/*==========================================================
        SEARCH SUBJECT
==========================================================*/

const searchSubject =
    document.getElementById(
        "searchSubject"
    );


if (searchSubject) {

    searchSubject.addEventListener(
        "input",
        function () {

            subjectCurrentPage = 1;

            renderSubjects();

        }
    );

}



/*==========================================================
        EDIT SUBJECT
==========================================================*/

async function editSubject(id) {

    try {

        let response =
            await fetch(
                `${CATEGORY_API}/${id}`
            );


        let result =
            await response.json();


        let subject =
            result.data;



        document
            .getElementById(
                "subjectModalTitle"
            )
            .innerText =
            "Edit Subject";



        document
            .getElementById(
                "subjectId"
            )
            .value =
            subject.categoryId;



        document
            .getElementById(
                "subjectName"
            )
            .value =
            subject.categoryName;



        document
            .getElementById(
                "subjectType"
            )
            .value =
            subject.categoryType;



        document
            .getElementById(
                "subjectDescription"
            )
            .value =
            subject.description;



        document
            .getElementById(
                "subjectStatus"
            )
            .value =
            subject.status;



        subjectModal.style.display =
            "flex";

    }


    catch (error) {

        console.log(error);

    }

}



/*==========================================================
        QUESTION MODAL
==========================================================*/

const addQuestionBtn =
    document.getElementById(
        "addQuestionBtn"
    );


const closeQuestionModal =
    document.getElementById(
        "closeQuestionModal"
    );


const cancelQuestion =
    document.getElementById(
        "cancelQuestion"
    );



if (addQuestionBtn) {

    addQuestionBtn.onclick = () => {


        document
            .getElementById(
                "questionForm"
            )
            .reset();


        document
            .getElementById(
                "questionId"
            )
            .value = "";


        document
            .getElementById(
                "questionModalTitle"
            )
            .innerText =
            "Add Question";


        questionModal.style.display =
            "flex";

    };

}



if (closeQuestionModal) {

    closeQuestionModal.onclick =
        () => {

            questionModal.style.display =
                "none";

        };

}



if (cancelQuestion) {

    cancelQuestion.onclick =
        () => {

            questionModal.style.display =
                "none";

        };

}



/*==========================================================
        SAVE QUESTION
==========================================================*/

const questionForm =
    document.getElementById(
        "questionForm"
    );


if (questionForm) {

    questionForm.addEventListener(
        "submit",
        async function (e) {

            e.preventDefault();


            let id =
                document
                    .getElementById(
                        "questionId"
                    )
                    .value;



            let questionData = {


                questionId:
                    id
                        ?
                        Number(id)
                        :
                        null,


                questionTitle:
                    document
                        .getElementById(
                            "questionTitle"
                        )
                        .value,


                optionA:
                    document
                        .getElementById(
                            "optionA"
                        )
                        .value,


                optionB:
                    document
                        .getElementById(
                            "optionB"
                        )
                        .value,


                optionC:
                    document
                        .getElementById(
                            "optionC"
                        )
                        .value,


                optionD:
                    document
                        .getElementById(
                            "optionD"
                        )
                        .value,


                correctAnswer:
                    document
                        .getElementById(
                            "correctAnswer"
                        )
                        .value,


                categoryId:
                    Number(
                        document
                            .getElementById(
                                "questionCategory"
                            )
                            .value
                    ),


                difficulty:
                    document
                        .getElementById(
                            "difficulty"
                        )
                        .value,


                marks:
                    Number(
                        document
                            .getElementById(
                                "questionMarks"
                            )
                            .value
                    ),


                questionStatus:
                    document
                        .getElementById(
                            "questionStatus"
                        )
                        .value

            };



            let url =
                id
                    ?
                    `${QUESTION_API}/update`
                    :
                    `${QUESTION_API}/save`;



            let method =
                id
                    ?
                    "PUT"
                    :
                    "POST";



            try {

                let response =
                    await fetch(
                        url,
                        {

                            method,

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body:
                                JSON.stringify(
                                    questionData
                                )

                        }
                    );



                let result =
                    await response.json();



                if (result.success) {


                    alert(
                        "Question saved successfully"
                    );


                    questionModal.style.display =
                        "none";


                    questionCurrentPage = 1;


                    await loadQuestions();

                }

                else {


                    alert(
                        result.message ||
                        "Unable to save question"
                    );

                }

            }


            catch (error) {

                console.log(error);


                alert(
                    "Server error"
                );

            }

        }
    );

}



/*==========================================================
        EDIT QUESTION
==========================================================*/

async function editQuestion(id) {

    try {

        let response =
            await fetch(
                `${QUESTION_API}/${id}`
            );


        let result =
            await response.json();


        let q =
            result.data;



        document
            .getElementById(
                "questionModalTitle"
            )
            .innerText =
            "Edit Question";



        document
            .getElementById(
                "questionId"
            )
            .value =
            q.questionId;



        document
            .getElementById(
                "questionTitle"
            )
            .value =
            q.questionTitle;



        document
            .getElementById(
                "optionA"
            )
            .value =
            q.optionA;



        document
            .getElementById(
                "optionB"
            )
            .value =
            q.optionB;



        document
            .getElementById(
                "optionC"
            )
            .value =
            q.optionC;



        document
            .getElementById(
                "optionD"
            )
            .value =
            q.optionD;



        document
            .getElementById(
                "correctAnswer"
            )
            .value =
            q.correctAnswer;



        document
            .getElementById(
                "questionCategory"
            )
            .value =
            q.categoryId;



        document
            .getElementById(
                "difficulty"
            )
            .value =
            q.difficulty;



        document
            .getElementById(
                "questionMarks"
            )
            .value =
            q.marks;



        document
            .getElementById(
                "questionStatus"
            )
            .value =
            q.questionStatus;



        questionModal.style.display =
            "flex";

    }


    catch (error) {

        console.log(error);

    }

}



/*==========================================================
        VIEW QUESTION
==========================================================*/

const viewQuestionModal =
    document.getElementById(
        "viewQuestionModal"
    );


const closeViewQuestion =
    document.getElementById(
        "closeViewQuestion"
    );



async function viewQuestion(id) {

    try {

        let response =
            await fetch(
                `${QUESTION_API}/${id}`
            );


        let result =
            await response.json();


        let q =
            result.data;



        document
            .getElementById(
                "viewQuestionTitle"
            )
            .innerText =
            q.questionTitle;



        document
            .getElementById(
                "viewOptionA"
            )
            .innerText =
            q.optionA;



        document
            .getElementById(
                "viewOptionB"
            )
            .innerText =
            q.optionB;



        document
            .getElementById(
                "viewOptionC"
            )
            .innerText =
            q.optionC;



        document
            .getElementById(
                "viewOptionD"
            )
            .innerText =
            q.optionD;



        document
            .getElementById(
                "viewCorrectAnswer"
            )
            .innerText =
            q.correctAnswer;



        document
            .getElementById(
                "viewDifficulty"
            )
            .innerText =
            q.difficulty;



        document
            .getElementById(
                "viewQuestionMarks"
            )
            .innerText =
            q.marks;



        viewQuestionModal.style.display =
            "flex";

    }


    catch (error) {

        console.log(error);

    }

}



if (closeViewQuestion) {

    closeViewQuestion.onclick =
        () => {

            viewQuestionModal.style.display =
                "none";

        };

}



/*==========================================================
        DELETE QUESTION
==========================================================*/

function openDeleteQuestion(id) {

    deleteId = id;

    deleteType = "question";


    deleteModal.style.display =
        "flex";

}



/*==========================================================
        DELETE SUBJECT
==========================================================*/

function openDeleteSubject(id) {

    deleteId = id;

    deleteType = "subject";


    deleteModal.style.display =
        "flex";

}



/*==========================================================
        CANCEL DELETE
==========================================================*/

if (cancelDelete) {

    cancelDelete.onclick = () => {


        deleteModal.style.display =
            "none";


        deleteId = null;

        deleteType = "";

    };

}



/*==========================================================
        CONFIRM DELETE
==========================================================*/

if (confirmDelete) {

    confirmDelete.onclick =
        async function () {


            if (!deleteId) {

                alert(
                    "No record selected"
                );

                return;

            }



            let url = "";



            if (
                deleteType ===
                "question"
            ) {

                url =
                    `${QUESTION_API}/${deleteId}`;

            }


            else if (
                deleteType ===
                "subject"
            ) {

                url =
                    `${CATEGORY_API}/${deleteId}`;

            }


            else {

                alert(
                    "Invalid delete type"
                );

                return;

            }



            try {

                let response =
                    await fetch(
                        url,
                        {

                            method:
                                "DELETE"

                        }
                    );



                let result =
                    await response.json();



                if (result.success) {


                    alert(
                        "Deleted successfully"
                    );


                    deleteModal.style.display =
                        "none";


                    deleteId = null;

                    deleteType = "";



                    /*
                     * Reload both lists.
                     * Pagination will automatically
                     * adjust if the last item on
                     * the current page was deleted.
                     */

                    await loadQuestions();

                    await loadSubjects();

                }


                else {

                    alert(
                        result.message ||
                        "Delete failed"
                    );

                }

            }


            catch (error) {

                console.log(error);


                alert(
                    "Server error while deleting"
                );

            }

        };

}



/*==========================================================
        OUTSIDE CLICK CLOSE
==========================================================*/

window.onclick =
    function (event) {


        if (
            event.target ===
            questionModal
        ) {

            questionModal.style.display =
                "none";

        }



        if (
            event.target ===
            subjectModal
        ) {

            subjectModal.style.display =
                "none";

        }



        if (
            event.target ===
            deleteModal
        ) {

            deleteModal.style.display =
                "none";

        }



        if (
            event.target ===
            viewQuestionModal
        ) {

            viewQuestionModal.style.display =
                "none";

        }

    };



/*==========================================================
        ESCAPE HTML
==========================================================*/

function escapeHtml(value) {

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