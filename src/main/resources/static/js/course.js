/* =====================================================
        GIRIS TECH HUB
        COURSE MANAGEMENT JAVASCRIPT
===================================================== */


/* =====================================================
        API
===================================================== */

const API = "/api/course";


/* =====================================================
        GLOBAL VARIABLES
===================================================== */

let courses = [];

let filteredCourses = [];

let deleteCourseId = null;


/*
    Number of courses displayed
    on one page
*/

let currentPage = 1;

const COURSES_PER_PAGE = 10;



/* =====================================================
        PAGE LOAD
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {


        loadCourses();


        const searchBox =
            document.getElementById(
                "searchCourse"
            );


        if(searchBox){

            searchBox.addEventListener(
                "keyup",
                searchCourses
            );

        }


    }
);





/* =====================================================
        LOAD ALL COURSES
===================================================== */

function loadCourses(){


    fetch(
        API + "/all"
    )


    .then(
        response => {

            if(!response.ok){

                throw new Error(
                    "Unable to load courses"
                );

            }

            return response.json();

        }
    )


    .then(
        result => {


            courses =
                result.data || [];


            /*
                Initially all courses
                are available for display.
            */

            filteredCourses =
                [...courses];


            /*
                Always start from
                page 1 after loading.
            */

            currentPage = 1;


            displayCourses(
                filteredCourses
            );


            renderCoursePagination();


        }
    )


    .catch(
        error => {


            console.error(
                error
            );


            courses = [];

            filteredCourses = [];

            currentPage = 1;


            displayCourses(
                []
            );


            renderCoursePagination();


            alert(
                "Unable to load courses"
            );


        }
    );


}






/* =====================================================
        DISPLAY COURSES
===================================================== */

function displayCourses(data){


    const tbody =
        document.getElementById(
            "courseTableBody"
        );


    const emptyCourse =
        document.getElementById(
            "emptyCourse"
        );


    if(!tbody){

        return;

    }


    tbody.innerHTML = "";



    /* =================================================
            NO DATA
    ================================================= */

    if(
        !data ||
        data.length === 0
    ){


        if(emptyCourse){

            emptyCourse.style.display =
                "block";

        }


        updateCoursePaginationInfo();

        return;

    }



    if(emptyCourse){

        emptyCourse.style.display =
            "none";

    }



    /* =================================================
            CALCULATE CURRENT PAGE
    ================================================= */

    const startIndex =
        (
            currentPage - 1
        )
        *
        COURSES_PER_PAGE;


    const endIndex =
        startIndex +
        COURSES_PER_PAGE;



    /*
        Only display courses
        belonging to current page.
    */

    const pageCourses =
        data.slice(
            startIndex,
            endIndex
        );



    /* =================================================
            DISPLAY CURRENT PAGE
    ================================================= */

    pageCourses.forEach(
        course => {


            const statusClass =
                course.status === "ACTIVE"
                ?
                "active"
                :
                "inactive";


            const row = `

                <tr>


                    <td>

                        <b>
                            ${course.courseName || "-"}
                        </b>

                    </td>



                    <td>

                        ${course.description || "-"}

                    </td>



                    <td>

                        ${course.duration || "-"}

                    </td>



                    <td>

                        ${course.level || "-"}

                    </td>



                    <td>

                        <span
                            class="status ${statusClass}">

                            ${course.status || "-"}

                        </span>

                    </td>



                    <td>

                        ${formatDate(
                            course.createdAt
                        )}

                    </td>



                    <td>

                        <div
                            class="action-buttons">


                            <button
                                class="action-btn edit-btn"
                                onclick="editCourse(${course.courseId})"
                                title="Edit Course">

                                <i class="fa fa-pen"></i>

                            </button>



                            <button
                                class="action-btn delete-btn"
                                onclick="openDeleteModal(${course.courseId})"
                                title="Delete Course">

                                <i class="fa fa-trash"></i>

                            </button>


                        </div>

                    </td>


                </tr>

            `;


            tbody.innerHTML += row;


        });


    updateCoursePaginationInfo();

}






/* =====================================================
        SEARCH COURSES
===================================================== */

function searchCourses(){


    const value =
        document
            .getElementById(
                "searchCourse"
            )
            .value
            .toLowerCase()
            .trim();



    filteredCourses =
        courses.filter(
            course => {


                return (

                    (
                        course.courseName ||
                        ""
                    )
                    .toLowerCase()
                    .includes(value)

                    ||

                    (
                        course.description ||
                        ""
                    )
                    .toLowerCase()
                    .includes(value)

                    ||

                    (
                        course.level ||
                        ""
                    )
                    .toLowerCase()
                    .includes(value)

                    ||

                    (
                        course.status ||
                        ""
                    )
                    .toLowerCase()
                    .includes(value)

                );


            }
        );



    /*
        Search always starts
        from first page.
    */

    currentPage = 1;


    displayCourses(
        filteredCourses
    );


    renderCoursePagination();

}






/* =====================================================
        COURSE PAGINATION
===================================================== */

function renderCoursePagination(){


    const pagination =
        document.getElementById(
            "coursePagination"
        );


    const buttons =
        document.getElementById(
            "coursePaginationButtons"
        );


    if(
        !pagination ||
        !buttons
    ){

        return;

    }


    buttons.innerHTML = "";



    const totalCourses =
        filteredCourses.length;


    const totalPages =
        Math.ceil(
            totalCourses /
            COURSES_PER_PAGE
        );



    /* =================================================
            NO DATA

            Hide pagination completely.
    ================================================= */

    if(
        totalCourses === 0
    ){


        pagination.style.display =
            "none";


        updateCoursePaginationInfo();


        return;

    }



    /*
        IMPORTANT:

        Even if there is ONLY ONE PAGE,
        pagination remains visible.

        Example:

        Previous   1   Next

        Previous = disabled
        1        = active
        Next     = disabled
    */

    pagination.style.display =
        "flex";



    /* =================================================
            PREVIOUS BUTTON
    ================================================= */

    const previousButton =
        createCoursePaginationButton(
            "Previous",
            currentPage === 1,
            function(){


                if(
                    currentPage > 1
                ){


                    currentPage--;


                    displayCourses(
                        filteredCourses
                    );


                    renderCoursePagination();


                    scrollToCourseTable();


                }

            }
        );


    buttons.appendChild(
        previousButton
    );



    /* =================================================
            PAGE NUMBERS
    ================================================= */

    createCoursePageNumbers(
        buttons,
        currentPage,
        totalPages,
        function(page){


            if(
                page === currentPage
            ){

                return;

            }


            currentPage =
                page;


            displayCourses(
                filteredCourses
            );


            renderCoursePagination();


            scrollToCourseTable();


        }
    );



    /* =================================================
            NEXT BUTTON
    ================================================= */

    const nextButton =
        createCoursePaginationButton(
            "Next",
            currentPage === totalPages,
            function(){


                if(
                    currentPage <
                    totalPages
                ){


                    currentPage++;


                    displayCourses(
                        filteredCourses
                    );


                    renderCoursePagination();


                    scrollToCourseTable();


                }


            }
        );


    buttons.appendChild(
        nextButton
    );


    updateCoursePaginationInfo();

}






/* =====================================================
        CREATE PAGINATION BUTTON
===================================================== */

function createCoursePaginationButton(
    text,
    disabled,
    callback,
    active = false
){


    const button =
        document.createElement(
            "button"
        );


    button.type =
        "button";


    button.className =
        "pagination-btn";



    if(active){

        button.classList.add(
            "active"
        );

    }



    /* =================================================
            PREVIOUS
    ================================================= */

    if(
        text === "Previous"
    ){


        button.innerHTML = `

            <i class="fa-solid fa-chevron-left"></i>

            <span>Previous</span>

        `;

    }



    /* =================================================
            NEXT
    ================================================= */

    else if(
        text === "Next"
    ){


        button.innerHTML = `

            <span>Next</span>

            <i class="fa-solid fa-chevron-right"></i>

        `;

    }



    /* =================================================
            PAGE NUMBER
    ================================================= */

    else{


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






/* =====================================================
        CREATE PAGE NUMBERS
===================================================== */

function createCoursePageNumbers(
    container,
    currentPage,
    totalPages,
    callback
){


    if(
        totalPages <= 0
    ){

        return;

    }



    /* =================================================
            7 OR FEWER PAGES

            Show all pages.
    ================================================= */

    if(
        totalPages <= 7
    ){


        for(
            let page = 1;
            page <= totalPages;
            page++
        ){


            const pageButton =
                createCoursePaginationButton(
                    page,
                    false,
                    function(){


                        callback(
                            page
                        );


                    },
                    currentPage === page
                );


            container.appendChild(
                pageButton
            );


        }


        return;

    }



    /* =================================================
            FIRST PAGE
    ================================================= */

    container.appendChild(

        createCoursePaginationButton(
            1,
            false,
            function(){

                callback(1);

            },
            currentPage === 1
        )

    );



    /* =================================================
            LEFT ELLIPSIS
    ================================================= */

    if(
        currentPage > 4
    ){


        createCoursePaginationEllipsis(
            container
        );


    }



    /* =================================================
            MIDDLE PAGE RANGE
    ================================================= */

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



    /* =================================================
            NEAR BEGINNING
    ================================================= */

    if(
        currentPage <= 3
    ){


        startPage = 2;

        endPage = 4;

    }



    /* =================================================
            NEAR END
    ================================================= */

    if(
        currentPage >=
        totalPages - 2
    ){


        startPage =
            totalPages - 3;


        endPage =
            totalPages - 1;

    }



    /* =================================================
            MIDDLE BUTTONS
    ================================================= */

    for(
        let page = startPage;
        page <= endPage;
        page++
    ){


        const pageButton =
            createCoursePaginationButton(
                page,
                false,
                function(){


                    callback(
                        page
                    );


                },
                currentPage === page
            );


        container.appendChild(
            pageButton
        );


    }



    /* =================================================
            RIGHT ELLIPSIS
    ================================================= */

    if(
        currentPage <
        totalPages - 3
    ){


        createCoursePaginationEllipsis(
            container
        );


    }



    /* =================================================
            LAST PAGE
    ================================================= */

    container.appendChild(

        createCoursePaginationButton(
            totalPages,
            false,
            function(){

                callback(
                    totalPages
                );

            },
            currentPage === totalPages
        )

    );

}






/* =====================================================
        PAGINATION ELLIPSIS
===================================================== */

function createCoursePaginationEllipsis(
    container
){


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






/* =====================================================
        PAGINATION INFORMATION
===================================================== */

function updateCoursePaginationInfo(){


    const info =
        document.getElementById(
            "coursePaginationInfo"
        );


    if(!info){

        return;

    }


    const total =
        filteredCourses.length;



    /* =================================================
            NO COURSES
    ================================================= */

    if(
        total === 0
    ){


        info.innerText =
            "";


        return;

    }



    const start =
        (
            currentPage - 1
        )
        *
        COURSES_PER_PAGE
        + 1;


    const end =
        Math.min(
            currentPage *
            COURSES_PER_PAGE,
            total
        );


    info.innerText =
        `Showing ${start} - ${end} of ${total} courses`;

}






/* =====================================================
        SCROLL TO COURSE TABLE
===================================================== */

function scrollToCourseTable(){


    const tableSection =
        document.querySelector(
            ".table-section"
        );


    if(!tableSection){

        return;

    }


    tableSection.scrollIntoView({

        behavior:
            "smooth",

        block:
            "start"

    });

}






/* =====================================================
        ADD COURSE MODAL
===================================================== */

function openCourseModal(){


    document
        .getElementById(
            "courseModalTitle"
        )
        .innerHTML =
        "Add Course";


    clearForm();


    document
        .getElementById(
            "courseModal"
        )
        .style.display =
        "flex";

}






/* =====================================================
        CLOSE COURSE MODAL
===================================================== */

function closeCourseModal(){


    document
        .getElementById(
            "courseModal"
        )
        .style.display =
        "none";

}






/* =====================================================
        SAVE COURSE
===================================================== */

function saveCourse(){


    const id =
        document
            .getElementById(
                "courseId"
            )
            .value;



    const course = {


        courseId:
            id
                ?
                Number(id)
                :
                null,


        courseName:
            document
                .getElementById(
                    "courseName"
                )
                .value,


        description:
            document
                .getElementById(
                    "description"
                )
                .value,


        duration:
            document
                .getElementById(
                    "duration"
                )
                .value,


        level:
            document
                .getElementById(
                    "level"
                )
                .value,


        status:
            document
                .getElementById(
                    "status"
                )
                .value


    };



    const url =
        id
            ?
            API + "/update"
            :
            API + "/save";



    fetch(
        url,
        {

            method:
                id
                    ?
                    "PUT"
                    :
                    "POST",


            headers:{

                "Content-Type":
                    "application/json"

            },


            body:
                JSON.stringify(
                    course
                )


        }
    )


    .then(
        res =>
            res.json()
    )


    .then(
        data => {


            alert(
                id
                    ?
                    "Course Updated Successfully"
                    :
                    "Course Added Successfully"
            );


            closeCourseModal();


            loadCourses();


        }
    )


    .catch(
        error => {


            console.error(
                error
            );


            alert(
                "Operation Failed"
            );


        }
    );

}






/* =====================================================
        EDIT COURSE
===================================================== */

function editCourse(id){


    const course =
        courses.find(
            c =>
                c.courseId === id
        );


    if(!course){

        return;

    }



    document
        .getElementById(
            "courseModalTitle"
        )
        .innerHTML =
        "Edit Course";


    document
        .getElementById(
            "courseId"
        )
        .value =
        course.courseId;


    document
        .getElementById(
            "courseName"
        )
        .value =
        course.courseName;


    document
        .getElementById(
            "description"
        )
        .value =
        course.description || "";


    document
        .getElementById(
            "duration"
        )
        .value =
        course.duration || "";


    document
        .getElementById(
            "level"
        )
        .value =
        course.level;


    document
        .getElementById(
            "status"
        )
        .value =
        course.status;


    document
        .getElementById(
            "courseModal"
        )
        .style.display =
        "flex";

}






/* =====================================================
        DELETE MODAL
===================================================== */

function openDeleteModal(id){


    deleteCourseId =
        id;


    document
        .getElementById(
            "deleteModal"
        )
        .style.display =
        "flex";

}






function closeDeleteModal(){


    document
        .getElementById(
            "deleteModal"
        )
        .style.display =
        "none";


    deleteCourseId =
        null;

}






/* =====================================================
        DELETE COURSE
===================================================== */

function deleteCourse(){


    if(
        !deleteCourseId
    ){

        return;

    }



    fetch(
        API + "/" + deleteCourseId,
        {

            method:
                "DELETE"

        }
    )


    .then(
        res =>
            res.json()
    )


    .then(
        data => {


            alert(
                "Course Deleted Successfully"
            );


            closeDeleteModal();


            loadCourses();


        }
    )


    .catch(
        error => {


            console.error(
                error
            );


            alert(
                "Delete Failed"
            );


        }
    );

}






/* =====================================================
        VIEW COURSE
===================================================== */

function viewCourse(id){


    const course =
        courses.find(
            c =>
                c.courseId === id
        );


    if(!course){

        return;

    }



    document
        .getElementById(
            "viewCourseName"
        )
        .innerHTML =
        course.courseName || "-";


    document
        .getElementById(
            "viewDuration"
        )
        .innerHTML =
        course.duration || "-";


    document
        .getElementById(
            "viewLevel"
        )
        .innerHTML =
        course.level || "-";


    document
        .getElementById(
            "viewStatus"
        )
        .innerHTML =
        course.status || "-";


    document
        .getElementById(
            "viewDescription"
        )
        .innerHTML =
        course.description || "-";


    document
        .getElementById(
            "viewCourseModal"
        )
        .style.display =
        "flex";

}






/* =====================================================
        CLOSE VIEW MODAL
===================================================== */

function closeViewModal(){


    document
        .getElementById(
            "viewCourseModal"
        )
        .style.display =
        "none";

}






/* =====================================================
        CLEAR FORM
===================================================== */

function clearForm(){


    document
        .getElementById(
            "courseId"
        )
        .value =
        "";


    document
        .getElementById(
            "courseName"
        )
        .value =
        "";


    document
        .getElementById(
            "description"
        )
        .value =
        "";


    document
        .getElementById(
            "duration"
        )
        .value =
        "";


    document
        .getElementById(
            "level"
        )
        .value =
        "Beginner";


    document
        .getElementById(
            "status"
        )
        .value =
        "ACTIVE";

}






/* =====================================================
        FORMAT DATE
===================================================== */

function formatDate(date){


    if(!date){

        return "-";

    }


    const d =
        new Date(
            date
        );


    return d.toLocaleDateString(
        "en-IN"
    );

}