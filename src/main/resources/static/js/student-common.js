/* =========================================================
   GIRIS TECH HUB
   COMMON STUDENT SIDEBAR
   Used on ALL Student Pages
========================================================= */


/* =========================================================
   LOAD SIDEBAR WHEN PAGE LOADS
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    loadStudentSidebar();

});


/* =========================================================
   LOAD SIDEBAR
========================================================= */

function loadStudentSidebar() {

    const sidebarContainer =
        document.getElementById("studentSidebar");


    if (!sidebarContainer) {

        return;

    }


    sidebarContainer.innerHTML = `

        <!-- =================================================
             COMMON STUDENT SIDEBAR
        ================================================== -->

        <aside class="sidebar">


            <!-- =================================================
                 SIDEBAR TOP
            ================================================== -->

            <div class="sidebar-top">


                <!-- =================================================
                     LOGO
                ================================================== -->

                <div class="sidebar-header">

                    <img
                        src="../images/GthTransparent.png"
                        class="logo"
                        alt="Girl's Tech Hub"
                    >

                    <p>
                        Smart Career Recommendation
                        <br>
                        & Online Assessment System
                    </p>

                </div>


                <!-- =================================================
                     STUDENT MINI PROFILE
                ================================================== -->

                <div class="student-info">


                    <div
                        class="student-avatar"
                        id="sidebarStudentAvatar"
                    >
                        S
                    </div>


                    <div class="student-info-text">


                        <h2 id="sidebarStudentName">
                            Student Name
                        </h2>


                        <p id="sidebarStudentBranch">
                            Branch
                        </p>


                    </div>


                </div>


                <!-- =================================================
                     NAVIGATION
                ================================================== -->

                <ul class="sidebar-menu">


                    <!-- DASHBOARD -->

                    <li
                        data-page="student-dashboard.html"
                        onclick="goToStudentPage('student-dashboard.html')"
                    >

                        <i class="fa-solid fa-house"></i>

                        <span>
                            Dashboard
                        </span>

                    </li>


                    <!-- PROFILE -->

                    <li
                        data-page="student-profile.html"
                        onclick="goToStudentPage('student-profile.html')"
                    >

                        <i class="fa-solid fa-user"></i>

                        <span>
                            Profile
                        </span>

                    </li>


                    <!-- ASSESSMENTS -->

                    <li
                        data-page="student-assessment.html"
                        onclick="goToStudentPage('student-assessment.html')"
                    >

                        <i class="fa-solid fa-file-lines"></i>

                        <span>
                            Assessments
                        </span>

                    </li>


                    <!-- RESULTS -->

                    <li
                        data-page="student-results.html"
                        onclick="goToStudentPage('student-results.html')"
                    >

                        <i class="fa-solid fa-chart-column"></i>

                        <span>
                            Results
                        </span>

                    </li>


                    <!-- CAREER -->

                    <li
                        data-page="student-career.html"
                        onclick="goToStudentPage('student-career.html')"
                    >

                        <i class="fa-solid fa-briefcase"></i>

                        <span>
                            Career Recommendation
                        </span>

                    </li>


                    <!-- COURSES -->

                    <li
                        data-page="student-courses.html"
                        onclick="goToStudentPage('student-courses.html')"
                    >

                        <i class="fa-solid fa-book-open"></i>

                        <span>
                            Courses
                        </span>

                    </li>


                </ul>


            </div>


            <!-- =================================================
                 LOGOUT
            ================================================== -->

            <button
                type="button"
                class="logout-btn"
                onclick="openLogoutModal()"
            >

                <i class="fa-solid fa-right-from-bracket"></i>

                <span>
                    Logout
                </span>

            </button>


        </aside>



        <!-- =================================================
             LOGOUT MODAL
        ================================================== -->

        <div
            id="logoutModal"
            class="app-modal"
        >


            <div
                class="app-modal-overlay"
                onclick="closeLogoutModal()"
            ></div>


            <div class="app-modal-box">


                <!-- CLOSE -->

                <button
                    type="button"
                    class="app-modal-close"
                    onclick="closeLogoutModal()"
                >

                    <i class="fa-solid fa-xmark"></i>

                </button>


                <!-- ICON -->

                <div class="app-modal-icon">

                    <i class="fa-solid fa-right-from-bracket"></i>

                </div>


                <h2>
                    Logout Confirmation
                </h2>


                <p>
                    Are you sure you want to logout
                    from your student account?
                </p>


                <div class="app-modal-actions">


                    <button
                        type="button"
                        class="modal-cancel"
                        onclick="closeLogoutModal()"
                    >

                        Cancel

                    </button>


                    <button
                        type="button"
                        class="modal-confirm"
                        onclick="confirmStudentLogout()"
                    >

                        Logout

                    </button>


                </div>


            </div>

        </div>

    `;


    /* =====================================================
       INITIALIZE SIDEBAR
    ===================================================== */

    setActiveSidebarMenu();

    loadSidebarStudentInfo();

}


/* =========================================================
   ACTIVE SIDEBAR MENU
========================================================= */

function setActiveSidebarMenu() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop();


    const menuItems =
        document.querySelectorAll(
            ".sidebar-menu li[data-page]"
        );


    menuItems.forEach(function (item) {

        const page =
            item.getAttribute("data-page");


        if (page === currentPage) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function goToStudentPage(page) {

    if (!page) {

        return;

    }


    window.location.href = page;

}


/* =========================================================
   LOAD STUDENT INFORMATION
========================================================= */

async function loadSidebarStudentInfo() {


    /*
     * First try localStorage
     */

    let studentName =
        localStorage.getItem("studentName");


    let studentBranch =
        localStorage.getItem("studentBranch");


    const studentId =
        localStorage.getItem("studentId");


    /*
     * If studentId exists,
     * get the latest student data from backend.
     */

    if (studentId) {

        try {

            const response =
                await fetch(
                    "/api/student/" + studentId
                );


            if (response.ok) {

                const result =
                    await response.json();


                if (
                    result &&
                    result.success &&
                    result.data
                ) {


                    const student =
                        result.data;


                    studentName =
                        student.name ||
                        studentName ||
                        "Student Name";


                    studentBranch =
                        student.branch ||
                        studentBranch ||
                        "Branch";


                    /*
                     * Store values so next page
                     * can load them immediately.
                     */

                    if (student.name) {

                        localStorage.setItem(
                            "studentName",
                            student.name
                        );

                    }


                    if (student.branch) {

                        localStorage.setItem(
                            "studentBranch",
                            student.branch
                        );

                    }

                }

            }

        }
        catch (error) {

            console.error(
                "Sidebar Student API Error:",
                error
            );

        }

    }


    /*
     * If backend did not provide values,
     * check existing page elements.
     */

    const pageName =
        document.getElementById(
            "studentName"
        );


    const pageBranch =
        document.getElementById(
            "studentBranch"
        );


    if (
        !studentName &&
        pageName &&
        pageName.textContent.trim()
    ) {

        studentName =
            pageName.textContent.trim();

    }


    if (
        !studentBranch &&
        pageBranch &&
        pageBranch.textContent.trim()
    ) {

        studentBranch =
            pageBranch.textContent.trim();

    }


    /*
     * Final fallback
     */

    if (!studentName) {

        studentName =
            "Student Name";

    }


    if (!studentBranch) {

        studentBranch =
            "Branch";

    }


    /*
     * Update sidebar
     */

    updateStudentSidebar(
        studentName,
        studentBranch
    );

}


/* =========================================================
   UPDATE SIDEBAR STUDENT
========================================================= */

function updateStudentSidebar(
    studentName,
    studentBranch
) {


    const nameElement =
        document.getElementById(
            "sidebarStudentName"
        );


    const branchElement =
        document.getElementById(
            "sidebarStudentBranch"
        );


    const avatarElement =
        document.getElementById(
            "sidebarStudentAvatar"
        );


    /*
     * NAME
     */

    if (nameElement) {

        nameElement.textContent =
            studentName || "Student Name";

    }


    /*
     * BRANCH
     */

    if (branchElement) {

        branchElement.textContent =
            studentBranch || "Branch";

    }


    /*
     * AVATAR
     */

    if (
        avatarElement &&
        studentName
    ) {

        const firstLetter =
            studentName
                .trim()
                .charAt(0)
                .toUpperCase();


        avatarElement.textContent =
            firstLetter || "S";

    }

}


/* =========================================================
   OPEN LOGOUT MODAL
========================================================= */

function openLogoutModal() {

    const modal =
        document.getElementById(
            "logoutModal"
        );


    if (!modal) {

        return;

    }


    modal.classList.add("show");


    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================================
   CLOSE LOGOUT MODAL
========================================================= */

function closeLogoutModal() {

    const modal =
        document.getElementById(
            "logoutModal"
        );


    if (!modal) {

        return;

    }


    modal.classList.remove("show");


    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================================
   CONFIRM LOGOUT
========================================================= */

function confirmStudentLogout() {


    /*
     * Remove student session information
     */

    localStorage.removeItem(
        "studentName"
    );


    localStorage.removeItem(
        "studentBranch"
    );


    localStorage.removeItem(
        "studentId"
    );


    localStorage.removeItem(
        "studentEmail"
    );


    /*
     * Clear session storage
     */

    sessionStorage.clear();


    /*
     * Close modal
     */

    closeLogoutModal();


    /*
     * Redirect to login
     */

    window.location.href =
        "student-login.html";

}


/* =========================================================
   ESCAPE KEY
========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeLogoutModal();

        }

    }
);


/* =========================================================
   GLOBAL FUNCTION
========================================================= */

window.setStudentSidebarInfo =
    function (
        name,
        branch
    ) {

        updateStudentSidebar(
            name,
            branch
        );

    };