/*==========================================================
            GIRIS TECH HUB
        STUDENT MANAGEMENT JS
==========================================================*/


/*==========================================================
                API
==========================================================*/

const BASE_URL =
    "http://localhost:8080";

const GET_ALL_STUDENTS =
    `${BASE_URL}/api/student/all`;

const GET_STUDENT =
    `${BASE_URL}/api/student/`;

const REGISTER_STUDENT =
    `${BASE_URL}/api/student/register`;

const UPDATE_STUDENT =
    `${BASE_URL}/api/student/update`;

const DELETE_STUDENT =
    `${BASE_URL}/api/student/`;


/*==========================================================
                PAGINATION
==========================================================*/

const STUDENTS_PER_PAGE = 10;

let currentPage = 1;

let students = [];

let filteredStudents = [];

let deleteStudentId = null;


/*==========================================================
                PAGE LOAD
==========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {

        initializeEvents();

        loadStudents();

    }
);


/*==========================================================
                EVENTS
==========================================================*/

function initializeEvents() {


    const addButton =
        document.getElementById(
            "addStudentBtn"
        );

    if (addButton) {

        addButton.addEventListener(
            "click",
            addStudent
        );

    }


    const refreshButton =
        document.getElementById(
            "refreshBtn"
        );

    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            loadStudents
        );

    }


    const searchBox =
        document.getElementById(
            "searchStudent"
        );

    if (searchBox) {

        searchBox.addEventListener(
            "input",
            searchStudents
        );

    }


    const closeStudent =
        document.getElementById(
            "closeStudentModal"
        );

    if (closeStudent) {

        closeStudent.addEventListener(
            "click",
            closeStudentModal
        );

    }


    const cancelStudent =
        document.getElementById(
            "cancelStudentBtn"
        );

    if (cancelStudent) {

        cancelStudent.addEventListener(
            "click",
            closeStudentModal
        );

    }


    const studentForm =
        document.getElementById(
            "studentForm"
        );

    if (studentForm) {

        studentForm.addEventListener(
            "submit",
            saveStudent
        );

    }


    const studentStatus =
        document.getElementById(
            "studentStatus"
        );

    if (studentStatus) {

        studentStatus.addEventListener(
            "change",
            toggleSemester
        );

    }


    const closeView =
        document.getElementById(
            "closeViewModal"
        );

    if (closeView) {

        closeView.addEventListener(
            "click",
            closeViewModal
        );

    }


    const cancelDelete =
        document.getElementById(
            "cancelDelete"
        );

    if (cancelDelete) {

        cancelDelete.addEventListener(
            "click",
            closeDeleteModal
        );

    }


    const confirmDelete =
        document.getElementById(
            "confirmDelete"
        );

    if (confirmDelete) {

        confirmDelete.addEventListener(
            "click",
            confirmDeleteStudent
        );

    }

}


/*==========================================================
                LOAD STUDENTS
==========================================================*/

async function loadStudents() {

    try {

        showLoading();


        const response =
            await fetch(
                GET_ALL_STUDENTS
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to load students."
            );

        }


        students =
            result.data || [];


        /*
            Copy all students into
            filteredStudents.
        */

        filteredStudents =
            [...students];


        /*
            Always start from
            page 1 after refresh.
        */

        currentPage = 1;


        renderStudents();


        renderPagination();


    }
    catch (error) {

        console.error(
            "Student Load Error:",
            error
        );


        students = [];

        filteredStudents = [];


        renderStudents();

        renderPagination();


        alert(
            error.message ||
            "Unable to load students."
        );

    }

}


/*==========================================================
                LOADING MESSAGE
==========================================================*/

function showLoading() {

    const tbody =
        document.getElementById(
            "studentTableBody"
        );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = `

        <tr>

            <td
                colspan="7"
                style="
                    text-align:center;
                    padding:30px;
                "
            >

                <i class="fa-solid fa-spinner fa-spin"></i>

                Loading Students...

            </td>

        </tr>

    `;

}


/*==========================================================
                DISPLAY STUDENTS
==========================================================*/

function renderStudents() {

    const tbody =
        document.getElementById(
            "studentTableBody"
        );


    const noData =
        document.getElementById(
            "noStudentData"
        );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = "";


    /*
        NO DATA
    */

    if (
        !filteredStudents ||
        filteredStudents.length === 0
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
        Calculate page data
    */

    const startIndex =
        (
            currentPage - 1
        )
        * STUDENTS_PER_PAGE;


    const endIndex =
        startIndex +
        STUDENTS_PER_PAGE;


    const pageStudents =
        filteredStudents.slice(
            startIndex,
            endIndex
        );


    /*
        Render current page
    */

    pageStudents.forEach(
        student => {

            const status =
                student.currentStatus ||
                "-";


            const statusClass =
                getStatusClass(
                    status
                );


            tbody.innerHTML += `

                <tr>

                    <td>

                        <div class="student-name">

                            <h4>
                                ${escapeHtml(
                                    student.name ??
                                    "-"
                                )}
                            </h4>

                            <span>
                                ${escapeHtml(
                                    student.email ??
                                    "-"
                                )}
                            </span>

                        </div>

                    </td>


                    <td>
                        ${escapeHtml(
                            student.college ??
                            "-"
                        )}
                    </td>


                    <td>
                        ${escapeHtml(
                            student.branch ??
                            "-"
                        )}
                    </td>


                    <td>
                        ${student.semester ?? "-"}
                    </td>


                    <td>

                        <span
                            class="status ${statusClass}"
                        >

                            ${escapeHtml(
                                status
                            )}

                        </span>

                    </td>


                    <td>

                        ${formatDate(
                            student.createdAt
                        )}

                    </td>


                    <td>

                        <div class="action-buttons">


                            <button
                                type="button"
                                class="action-btn view-btn"
                                onclick="viewStudent(${student.studentId})"
                                title="View Student"
                            >

                                <i class="fa fa-eye"></i>

                            </button>


                            <button
                                type="button"
                                class="action-btn edit-btn"
                                onclick="editStudent(${student.studentId})"
                                title="Edit Student"
                            >

                                <i class="fa fa-pen"></i>

                            </button>


                            <button
                                type="button"
                                class="action-btn delete-btn"
                                onclick="openDeleteModal(${student.studentId})"
                                title="Delete Student"
                            >

                                <i class="fa fa-trash"></i>

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
                STATUS CLASS
==========================================================*/

function getStatusClass(status) {

    if (!status) {

        return "";

    }


    const value =
        status
            .toString()
            .toLowerCase()
            .trim();


    if (
        value === "student" ||
        value === "final_year_student"
    ) {

        return "student";

    }


    if (
        value === "working" ||
        value === "working_professional"
    ) {

        return "working";

    }


    if (
        value === "graduate"
    ) {

        return "graduate";

    }


    if (
        value === "freelancer"
    ) {

        return "freelancer";

    }


    return "";

}


/*==========================================================
                PAGINATION
==========================================================*/

function renderPagination() {

    const pagination =
        document.getElementById(
            "studentPagination"
        );


    const buttons =
        document.getElementById(
            "studentPaginationButtons"
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


    const totalStudents =
        filteredStudents.length;


    const totalPages =
        Math.ceil(
            totalStudents /
            STUDENTS_PER_PAGE
        );


    /*
        NO DATA
    */

    if (totalStudents === 0) {

        pagination.style.display =
            "none";

        updatePaginationInfo();

        return;

    }


    /*
        IMPORTANT

        Even if there is only ONE page,
        pagination remains visible.

        Example:

        Previous   1   Next

        Previous = disabled
        1 = active
        Next = disabled
    */

    pagination.style.display =
        "flex";


    /*======================================================
                    PREVIOUS
    ======================================================*/

    const previousButton =
        createPaginationButton(
            "Previous",
            currentPage === 1,
            function () {

                if (
                    currentPage > 1
                ) {

                    currentPage--;

                    renderStudents();

                    renderPagination();

                    scrollTableToTop();

                }

            }
        );


    buttons.appendChild(
        previousButton
    );


    /*======================================================
                    PAGE NUMBERS
    ======================================================*/

    createPageNumbers(
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


            renderStudents();

            renderPagination();

            scrollTableToTop();

        }
    );


    /*======================================================
                    NEXT
    ======================================================*/

    const nextButton =
        createPaginationButton(
            "Next",
            currentPage === totalPages,
            function () {

                if (
                    currentPage <
                    totalPages
                ) {

                    currentPage++;

                    renderStudents();

                    renderPagination();

                    scrollTableToTop();

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

function createPageNumbers(
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
        Up to 7 pages

        Example:

        Previous
        1 2 3 4 5
        Next
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
                createPaginationButton(
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
        First page
    */

    container.appendChild(

        createPaginationButton(
            1,
            false,
            function () {

                callback(1);

            },
            currentPage === 1
        )

    );


    /*
        Left ellipsis
    */

    if (
        currentPage > 4
    ) {

        createPaginationEllipsis(
            container
        );

    }


    /*
        Middle pages
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
            createPaginationButton(
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
        Right ellipsis
    */

    if (
        currentPage <
        totalPages - 3
    ) {

        createPaginationEllipsis(
            container
        );

    }


    /*
        Last page
    */

    container.appendChild(

        createPaginationButton(
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

function createPaginationEllipsis(
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
        filteredStudents.length;


    /*
        No data
    */

    if (
        total === 0
    ) {

        info.innerText =
            "";

        return;

    }


    /*
        Start record
    */

    const start =
        (
            currentPage - 1
        )
        *
        STUDENTS_PER_PAGE
        + 1;


    /*
        End record
    */

    const end =
        Math.min(
            currentPage *
            STUDENTS_PER_PAGE,
            total
        );


    info.innerText =
        `Showing ${start} - ${end} of ${total} students`;

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
        filteredStudents.length;


    if (total === 0) {

        info.innerText = "";

        return;

    }


    const start =
        (
            currentPage - 1
        )
        * STUDENTS_PER_PAGE
        + 1;


    const end =
        Math.min(
            currentPage *
            STUDENTS_PER_PAGE,
            total
        );


    info.innerText =
        `Showing ${start}–${end} of ${total} students`;

}


/*==========================================================
                SCROLL TO TABLE
==========================================================*/

function scrollTableToTop() {

    const table =
        document.querySelector(
            ".table-section"
        );


    if (!table) {

        return;

    }


    table.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/*==========================================================
                ADD STUDENT
==========================================================*/

function addStudent() {

    document
        .getElementById(
            "studentForm"
        )
        .reset();


    document
        .getElementById(
            "studentId"
        )
        .value = "";


    document
        .getElementById(
            "modalTitle"
        )
        .innerText =
        "Add Student";


    document
        .getElementById(
            "studentModal"
        )
        .style.display =
        "flex";


    toggleSemester();

}


/*==========================================================
                EDIT STUDENT
==========================================================*/

async function editStudent(id) {

    try {

        const response =
            await fetch(
                GET_STUDENT + id
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to load student."
            );

        }


        const s =
            result.data;


        document
            .getElementById(
                "modalTitle"
            )
            .innerText =
            "Edit Student";


        document
            .getElementById(
                "studentId"
            )
            .value =
            s.studentId;


        document
            .getElementById(
                "studentName"
            )
            .value =
            s.name ?? "";


        document
            .getElementById(
                "studentEmail"
            )
            .value =
            s.email ?? "";


        document
            .getElementById(
                "studentMobile"
            )
            .value =
            s.mobile ?? "";


        document
            .getElementById(
                "studentCollege"
            )
            .value =
            s.college ?? "";


        document
            .getElementById(
                "studentBranch"
            )
            .value =
            s.branch ?? "";


        document
            .getElementById(
                "studentStatus"
            )
            .value =
            s.currentStatus ?? "";


        document
            .getElementById(
                "studentSemester"
            )
            .value =
            s.semester ?? "";


        document
            .getElementById(
                "studentYear"
            )
            .value =
            s.graduationYear ?? "";


        document
            .getElementById(
                "studentGoal"
            )
            .value =
            s.goal ?? "";


        document
            .getElementById(
                "studentPassword"
            )
            .value = "";


        document
            .getElementById(
                "studentModal"
            )
            .style.display =
            "flex";


        toggleSemester();

    }
    catch (error) {

        console.error(error);

        alert(
            error.message
        );

    }

}


/*==========================================================
                VIEW STUDENT
==========================================================*/

async function viewStudent(id) {

    try {

        const response =
            await fetch(
                GET_STUDENT + id
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to load student."
            );

        }


        const student =
            result.data;


        document
            .getElementById(
                "viewStudentId"
            )
            .innerText =
            student.studentId ?? "-";


        document
            .getElementById(
                "viewName"
            )
            .innerText =
            student.name ?? "-";


        document
            .getElementById(
                "viewEmail"
            )
            .innerText =
            student.email ?? "-";


        document
            .getElementById(
                "viewMobile"
            )
            .innerText =
            student.mobile ?? "-";


        document
            .getElementById(
                "viewCollege"
            )
            .innerText =
            student.college ?? "-";


        document
            .getElementById(
                "viewBranch"
            )
            .innerText =
            student.branch ?? "-";


        document
            .getElementById(
                "viewSemester"
            )
            .innerText =
            student.semester ?? "-";


        document
            .getElementById(
                "viewStatus"
            )
            .innerText =
            student.currentStatus ?? "-";


        document
            .getElementById(
                "viewGraduationYear"
            )
            .innerText =
            student.graduationYear ?? "-";


        document
            .getElementById(
                "viewGoal"
            )
            .innerText =
            student.goal ?? "-";


        document
            .getElementById(
                "viewCreatedAt"
            )
            .innerText =
            formatDate(
                student.createdAt
            );


        document
            .getElementById(
                "viewStudentModal"
            )
            .style.display =
            "flex";

    }
    catch (error) {

        console.error(error);

        alert(
            error.message
        );

    }

}


/*==========================================================
                SAVE STUDENT
==========================================================*/

async function saveStudent(e) {

    e.preventDefault();


    const id =
        document
            .getElementById(
                "studentId"
            )
            .value;


    const student = {

        name:
            document
                .getElementById(
                    "studentName"
                )
                .value
                .trim(),

        email:
            document
                .getElementById(
                    "studentEmail"
                )
                .value
                .trim(),

        mobile:
            document
                .getElementById(
                    "studentMobile"
                )
                .value
                .trim(),

        college:
            document
                .getElementById(
                    "studentCollege"
                )
                .value
                .trim(),

        branch:
            document
                .getElementById(
                    "studentBranch"
                )
                .value,

        semester:
            document
                .getElementById(
                    "studentSemester"
                )
                .value ||
            null,

        currentStatus:
            document
                .getElementById(
                    "studentStatus"
                )
                .value,

        graduationYear:
            document
                .getElementById(
                    "studentYear"
                )
                .value ||
            null,

        goal:
            document
                .getElementById(
                    "studentGoal"
                )
                .value

    };


    let url;

    let method;


    if (id) {

        url =
            UPDATE_STUDENT;

        method =
            "PUT";

        student.studentId =
            Number(id);

    }
    else {

        url =
            REGISTER_STUDENT;

        method =
            "POST";


        student.password =
            document
                .getElementById(
                    "studentPassword"
                )
                .value;

    }


    try {

        const response =
            await fetch(
                url,
                {

                    method: method,

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body:
                        JSON.stringify(
                            student
                        )

                }
            );


        const result =
            await response.json();


        if (!response.ok) {

            throw new Error(
                result.message ||
                "Unable to save student."
            );

        }


        alert(
            id
                ? "Student updated successfully."
                : "Student registered successfully."
        );


        closeStudentModal();


        await loadStudents();

    }
    catch (error) {

        console.error(error);

        alert(
            error.message
        );

    }

}


/*==========================================================
                SEMESTER
==========================================================*/

function toggleSemester() {

    const status =
        document
            .getElementById(
                "studentStatus"
            )
            .value;


    const group =
        document
            .getElementById(
                "semesterGroup"
            );


    if (!group) {

        return;

    }


    if (
        status === "STUDENT" ||
        status === "FINAL_YEAR_STUDENT"
    ) {

        group.style.display =
            "flex";

    }
    else {

        group.style.display =
            "none";


        document
            .getElementById(
                "studentSemester"
            )
            .value = "";

    }

}


/*==========================================================
                DELETE
==========================================================*/

function openDeleteModal(id) {

    deleteStudentId =
        id;


    document
        .getElementById(
            "deleteModal"
        )
        .style.display =
        "flex";

}


function closeDeleteModal() {

    document
        .getElementById(
            "deleteModal"
        )
        .style.display =
        "none";


    deleteStudentId =
        null;

}


async function confirmDeleteStudent() {

    if (!deleteStudentId) {

        return;

    }


    try {

        const response =
            await fetch(
                DELETE_STUDENT +
                deleteStudentId,
                {

                    method:
                        "DELETE"

                }
            );


        const result =
            await response.json()
                .catch(
                    () => null
                );


        if (!response.ok) {

            throw new Error(
                result?.message ||
                "Unable to delete student."
            );

        }


        closeDeleteModal();


        alert(
            "Student deleted successfully."
        );


        await loadStudents();

    }
    catch (error) {

        console.error(error);

        alert(
            error.message
        );

    }

}


/*==========================================================
                CLOSE MODALS
==========================================================*/

function closeStudentModal() {

    document
        .getElementById(
            "studentModal"
        )
        .style.display =
        "none";

}


function closeViewModal() {

    document
        .getElementById(
            "viewStudentModal"
        )
        .style.display =
        "none";

}


/*==========================================================
                SEARCH
==========================================================*/

function searchStudents() {

    const searchBox =
        document.getElementById(
            "searchStudent"
        );


    const value =
        searchBox
            .value
            .toLowerCase()
            .trim();


    filteredStudents =
        students.filter(
            student => {

                const name =
                    (
                        student.name ||
                        ""
                    )
                    .toLowerCase();


                const email =
                    (
                        student.email ||
                        ""
                    )
                    .toLowerCase();


                const college =
                    (
                        student.college ||
                        ""
                    )
                    .toLowerCase();


                const branch =
                    (
                        student.branch ||
                        ""
                    )
                    .toLowerCase();


                return (
                    name.includes(value) ||
                    email.includes(value) ||
                    college.includes(value) ||
                    branch.includes(value)
                );

            }
        );


    /*
        Search always starts
        from page 1.
    */

    currentPage = 1;


    renderStudents();

    renderPagination();

}


/*==========================================================
                DATE FORMAT
==========================================================*/

function formatDate(date) {

    if (!date) {

        return "-";

    }


    const parsedDate =
        new Date(date);


    if (
        isNaN(
            parsedDate.getTime()
        )
    ) {

        return "-";

    }


    return parsedDate.toLocaleDateString(
        "en-IN",
        {

            day:
                "2-digit",

            month:
                "short",

            year:
                "numeric"

        }
    );

}


/*==========================================================
                HTML SAFETY
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


/*==========================================================
                MODAL OUTSIDE CLICK
==========================================================*/

window.addEventListener(
    "click",
    function (e) {

        const view =
            document.getElementById(
                "viewStudentModal"
            );


        const add =
            document.getElementById(
                "studentModal"
            );


        const deleteModal =
            document.getElementById(
                "deleteModal"
            );


        if (
            e.target === view
        ) {

            closeViewModal();

        }


        if (
            e.target === add
        ) {

            closeStudentModal();

        }


        if (
            e.target === deleteModal
        ) {

            closeDeleteModal();

        }

    }
);


/*==========================================================
                MAKE FUNCTIONS GLOBAL
==========================================================*/

window.viewStudent =
    viewStudent;

window.editStudent =
    editStudent;

window.openDeleteModal =
    openDeleteModal;