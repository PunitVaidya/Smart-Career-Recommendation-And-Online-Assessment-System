/*=========================================================
                GIRIS TECH HUB
                ADMIN DASHBOARD JS
=========================================================*/


/*=========================================================
                    API URLS
=========================================================*/

const dashboardUrl =
    "http://localhost:8080/api/admin/dashboard";


const recentStudentUrl =
    "http://localhost:8080/api/admin/recentStudents";


/*=========================================================
                    PAGINATION
=========================================================*/

const STUDENTS_PER_PAGE = 5;


let allStudents = [];


let currentStudentPage = 1;


/*=========================================================
                    PAGE LOAD
=========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    function () {

        loadDashboard();

        loadRecentStudents();

        initializeViewAll();

        initializeLogout();

        initializeSidebar();

    }
);


/*=========================================================
                LOAD DASHBOARD CARDS
=========================================================*/

function loadDashboard() {

    fetch(dashboardUrl)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Dashboard API Failed"
                );

            }

            return response.json();

        })

        .then(result => {

            console.log(
                "Dashboard Response : ",
                result
            );


            const data =
                result.data || result;


            updateDashboardCards(data);

        })

        .catch(error => {

            console.error(
                "Dashboard Error : ",
                error
            );

        });

}


/*=========================================================
                UPDATE DASHBOARD CARDS
=========================================================*/

function updateDashboardCards(data) {

    setValue(
        "totalStudents",
        data.totalStudents
    );


    setValue(
        "totalAdmins",
        data.totalAdmins
    );


    setValue(
        "totalAssessments",
        data.totalAssessments
    );


    setValue(
        "totalQuestions",
        data.totalQuestions
    );


    setValue(
        "totalCareers",
        data.totalCareers
    );


    setValue(
        "totalCourses",
        data.totalCourses
    );


    setValue(
        "totalAttempts",
        data.totalAttempts
    );


    setValue(
        "totalRecommendations",
        data.totalRecommendations
    );

}


/*=========================================================
                    SET VALUE
=========================================================*/

function setValue(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.innerHTML =
            value ?? 0;

    }

}


/*=========================================================
                LOAD RECENT STUDENTS
=========================================================*/

function loadRecentStudents() {

    fetch(recentStudentUrl)

        .then(response => {

            if (!response.ok) {

                throw new Error(
                    "Student API Failed"
                );

            }

            return response.json();

        })

        .then(result => {

            console.log(
                "Recent Students : ",
                result
            );


            const students =
                result.data || result;


            /*=================================================
                    NO DATA
            =================================================*/

            if (
                !Array.isArray(students) ||
                students.length === 0
            ) {

                allStudents = [];

                currentStudentPage = 1;

                showNoData();

                renderPagination();

                return;

            }


            /*=================================================
                    STORE COMPLETE LIST
            =================================================*/

            allStudents =
                students;


            /*=================================================
                    KEEP PAGE VALID
            =================================================*/

            const totalPages =
                getTotalPages();


            if (
                currentStudentPage >
                totalPages
            ) {

                currentStudentPage = 1;

            }


            hideNoData();


            renderStudentTable();

            renderPagination();

        })

        .catch(error => {

            console.error(
                "Student Load Error : ",
                error
            );


            allStudents = [];

            currentStudentPage = 1;


            showNoData();

            renderPagination();

        });

}


/*=========================================================
                GET TOTAL PAGES
=========================================================*/

function getTotalPages() {

    if (
        !allStudents ||
        allStudents.length === 0
    ) {

        return 0;

    }


    return Math.ceil(
        allStudents.length /
        STUDENTS_PER_PAGE
    );

}


/*=========================================================
                RENDER STUDENT TABLE
=========================================================*/

function renderStudentTable() {

    const tbody =
        document.getElementById(
            "recentStudents"
        );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = "";


    /*=================================================
                NO STUDENTS
    =================================================*/

    if (
        !allStudents ||
        allStudents.length === 0
    ) {

        showNoData();

        updatePaginationInfo();

        return;

    }


    hideNoData();


    /*=================================================
                CALCULATE PAGE
    =================================================*/

    const startIndex =
        (
            currentStudentPage - 1
        )
        *
        STUDENTS_PER_PAGE;


    const endIndex =
        startIndex +
        STUDENTS_PER_PAGE;


    const pageStudents =
        allStudents.slice(
            startIndex,
            endIndex
        );


    /*=================================================
                CREATE TABLE ROWS
    =================================================*/

    let rows = "";


    pageStudents.forEach(
        student => {

            const status =
                student.currentStatus || "-";


            const statusClass =
                getStatusClass(status);


            rows += `

                <tr>

                    <td>

                        ${escapeHtml(
                            student.studentId
                        )}

                    </td>


                    <td>

                        ${escapeHtml(
                            student.name
                        )}

                    </td>


                    <td>

                        ${escapeHtml(
                            student.email
                        )}

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

                </tr>

            `;

        }
    );


    tbody.innerHTML =
        rows;


    updatePaginationInfo();

}


/*=========================================================
                STATUS CLASS
=========================================================*/

function getStatusClass(status) {

    if (!status) {

        return "";

    }


    const value =
        status
            .toString()
            .toLowerCase()
            .trim();


    if (value === "student") {

        return "student";

    }


    if (value === "graduate") {

        return "graduate";

    }


    if (value === "working") {

        return "working";

    }


    return "";

}


/*=========================================================
                RENDER PAGINATION
=========================================================*/

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


    /*=================================================
                CLEAR OLD BUTTONS
    =================================================*/

    buttons.innerHTML = "";


    /*=================================================
                NO DATA
    =================================================*/

    if (
        !allStudents ||
        allStudents.length === 0
    ) {

        pagination.style.display =
            "none";

        updatePaginationInfo();

        return;

    }


    /*=================================================
                SHOW PAGINATION
    =================================================*/

    pagination.style.display =
        "flex";


    const totalPages =
        getTotalPages();


    /*=================================================
                PREVIOUS BUTTON

                IMPORTANT:
                Even with ONE page,
                Previous remains visible
                and disabled.
    =================================================*/

    const previousButton =
        createPaginationButton(
            "Previous",
            currentStudentPage === 1,
            function () {

                if (
                    currentStudentPage > 1
                ) {

                    currentStudentPage--;

                    renderStudentTable();

                    renderPagination();

                }

            }
        );


    buttons.appendChild(
        previousButton
    );


    /*=================================================
                PAGE NUMBERS
    =================================================*/

    createPageNumbers(
        buttons,
        currentStudentPage,
        totalPages,
        function (page) {

            if (
                page === currentStudentPage
            ) {

                return;

            }


            currentStudentPage =
                page;


            renderStudentTable();

            renderPagination();

        }
    );


    /*=================================================
                NEXT BUTTON

                IMPORTANT:
                Even with ONE page,
                Next remains visible
                and disabled.
    =================================================*/

    const nextButton =
        createPaginationButton(
            "Next",
            currentStudentPage === totalPages,
            function () {

                if (
                    currentStudentPage <
                    totalPages
                ) {

                    currentStudentPage++;

                    renderStudentTable();

                    renderPagination();

                }

            }
        );


    buttons.appendChild(
        nextButton
    );


    updatePaginationInfo();

}


/*=========================================================
                CREATE PAGINATION BUTTON
=========================================================*/

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


    /*=================================================
                ICONS
    =================================================*/

    if (
        text === "Previous"
    ) {

        button.innerHTML = `

            <i class="fa-solid fa-chevron-left"></i>

            <span>Previous</span>

        `;

    }

    else if (
        text === "Next"
    ) {

        button.innerHTML = `

            <span>Next</span>

            <i class="fa-solid fa-chevron-right"></i>

        `;

    }

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


/*=========================================================
                CREATE PAGE NUMBERS
=========================================================*/

function createPageNumbers(
    container,
    currentPage,
    totalPages,
    callback
) {

    /*=================================================
            NO PAGES
    =================================================*/

    if (
        totalPages <= 0
    ) {

        return;

    }


    /*=================================================
            SMALL NUMBER OF PAGES

            Example:

            Previous 1 Next

            Previous 1 2 3 Next
    =================================================*/

    if (
        totalPages <= 7
    ) {

        for (
            let page = 1;
            page <= totalPages;
            page++
        ) {

            container.appendChild(

                createPaginationButton(
                    page,
                    false,
                    function () {

                        callback(page);

                    },
                    currentPage === page
                )

            );

        }

        return;

    }


    /*=================================================
            LARGE NUMBER OF PAGES

            Example:

            Previous
            1 ... 4 5 6 ... 10
            Next
    =================================================*/

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


    /*=================================================
            LEFT ELLIPSIS
    =================================================*/

    if (
        currentPage > 4
    ) {

        createEllipsis(
            container
        );

    }


    /*=================================================
            MIDDLE PAGES
    =================================================*/

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


    /*=================================================
            NEAR BEGINNING
    =================================================*/

    if (
        currentPage <= 3
    ) {

        startPage = 2;

        endPage = 4;

    }


    /*=================================================
            NEAR END
    =================================================*/

    if (
        currentPage >=
        totalPages - 2
    ) {

        startPage =
            totalPages - 3;


        endPage =
            totalPages - 1;

    }


    /*=================================================
            CREATE MIDDLE PAGES
    =================================================*/

    for (
        let page = startPage;
        page <= endPage;
        page++
    ) {

        container.appendChild(

            createPaginationButton(
                page,
                false,
                function () {

                    callback(page);

                },
                currentPage === page
            )

        );

    }


    /*=================================================
            RIGHT ELLIPSIS
    =================================================*/

    if (
        currentPage <
        totalPages - 3
    ) {

        createEllipsis(
            container
        );

    }


    /*=================================================
            LAST PAGE
    =================================================*/

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


/*=========================================================
                ELLIPSIS
=========================================================*/

function createEllipsis(
    container
) {

    const span =
        document.createElement(
            "span"
        );


    span.className =
        "pagination-ellipsis";


    span.textContent =
        "...";


    container.appendChild(
        span
    );

}


/*=========================================================
                PAGINATION INFORMATION
=========================================================*/

function updatePaginationInfo() {

    const info =
        document.getElementById(
            "paginationInfo"
        );


    if (!info) {

        return;

    }


    /*=================================================
                NO DATA
    =================================================*/

    if (
        !allStudents ||
        allStudents.length === 0
    ) {

        info.textContent =
            "";


        return;

    }


    /*=================================================
                START
    =================================================*/

    const start =
        (
            currentStudentPage - 1
        )
        *
        STUDENTS_PER_PAGE
        + 1;


    /*=================================================
                END
    =================================================*/

    const end =
        Math.min(
            currentStudentPage *
            STUDENTS_PER_PAGE,
            allStudents.length
        );


    info.textContent =
        `Showing ${start} - ${end} of ${allStudents.length} students`;

}


/*=========================================================
                DATE FORMAT
=========================================================*/

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
        "en-GB"
    );

}


/*=========================================================
                NO DATA MESSAGE
=========================================================*/

function showNoData() {

    const message =
        document.getElementById(
            "noDataMessage"
        );


    if (message) {

        message.style.display =
            "block";

    }


    const tbody =
        document.getElementById(
            "recentStudents"
        );


    if (tbody) {

        tbody.innerHTML =
            "";

    }

}


function hideNoData() {

    const message =
        document.getElementById(
            "noDataMessage"
        );


    if (message) {

        message.style.display =
            "none";

    }

}


/*=========================================================
                VIEW ALL STUDENTS
=========================================================*/

function initializeViewAll() {

    const viewButton =
        document.querySelector(
            ".view-all-btn"
        );


    if (!viewButton) {

        return;

    }


    viewButton.addEventListener(
        "click",
        function () {

            window.location.href =
                "student.html";

        }
    );

}


/*=========================================================
                    LOGOUT
=========================================================*/

function initializeLogout() {

    const logoutButton =
        document.querySelector(
            ".logout-btn"
        );


    if (!logoutButton) {

        return;

    }


    logoutButton.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (confirmLogout) {

                window.location.href =
                    "admin-login.html";

            }

        }
    );

}


/*=========================================================
                SIDEBAR ACTIVE
=========================================================*/

function initializeSidebar() {

    const menuItems =
        document.querySelectorAll(
            ".sidebar-menu li"
        );


    menuItems.forEach(
        item => {

            item.addEventListener(
                "click",
                function () {

                    menuItems.forEach(
                        menu => {

                            menu.classList.remove(
                                "active"
                            );

                        }
                    );


                    this.classList.add(
                        "active"
                    );

                }
            );

        }
    );


    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    menuItems.forEach(
        menu => {

            const link =
                menu.getAttribute(
                    "onclick"
                );


            if (
                link &&
                link.includes(
                    currentPage
                )
            ) {

                menu.classList.add(
                    "active"
                );

            }

        }
    );

}


/*=========================================================
                    HTML SAFETY
=========================================================*/

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


/*=========================================================
                AUTO REFRESH
=========================================================*/

setInterval(
    function () {

        loadDashboard();

        loadRecentStudents();

    },
    30000
);