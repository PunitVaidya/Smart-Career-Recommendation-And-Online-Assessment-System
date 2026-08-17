/*==========================================================
        GIRIS TECH HUB
        CAREER MANAGEMENT JS
==========================================================*/


const API_URL =
    "http://localhost:8080/api/career";



/*==========================================================
        GLOBAL VARIABLES
==========================================================*/


let careerList = [];

let filteredCareerList = [];

let deleteCareerId = null;


/*
    Number of careers displayed
    on one page
*/

let currentPage = 1;

const CAREERS_PER_PAGE = 10;



/*==========================================================
        PAGE LOAD
==========================================================*/


document.addEventListener(
    "DOMContentLoaded",
    () => {


        loadCareers();


        document
            .getElementById("addCareerBtn")
            .addEventListener(
                "click",
                openAddCareerModal
            );


        document
            .getElementById("refreshBtn")
            .addEventListener(
                "click",
                loadCareers
            );


        document
            .getElementById("careerForm")
            .addEventListener(
                "submit",
                saveCareer
            );


        document
            .getElementById("searchCareer")
            .addEventListener(
                "keyup",
                searchCareer
            );


        document
            .getElementById("cancelCareer")
            .addEventListener(
                "click",
                closeCareerModal
            );


        document
            .getElementById("closeCareerModal")
            .addEventListener(
                "click",
                closeCareerModal
            );


        document
            .getElementById("cancelDelete")
            .addEventListener(
                "click",
                closeDeleteModal
            );


        document
            .getElementById("confirmDelete")
            .addEventListener(
                "click",
                deleteCareer
            );


        document
            .getElementById("closeViewModal")
            .addEventListener(
                "click",
                closeViewModal
            );


    });




/*==========================================================
        LOAD ALL CAREERS
==========================================================*/


function loadCareers() {


    fetch(
        `${API_URL}/all`
    )


        .then(
            response => response.json()
        )


        .then(
            result => {


                if (result.success) {


                    careerList =
                        result.data || [];


                    /*
                        Initially show all careers
                    */

                    filteredCareerList =
                        [...careerList];


                    /*
                        Always start from page 1
                    */

                    currentPage = 1;


                    displayCareerTable(
                        filteredCareerList
                    );


                    renderCareerPagination();


                }

                else {


                    careerList = [];

                    filteredCareerList = [];

                    currentPage = 1;

                    displayCareerTable([]);

                    renderCareerPagination();


                }


            }

        )


        .catch(
            error => {


                console.log(
                    "Career Load Error:",
                    error
                );


                careerList = [];

                filteredCareerList = [];

                currentPage = 1;

                displayCareerTable([]);

                renderCareerPagination();


            }

        );


}






/*==========================================================
        DISPLAY TABLE
==========================================================*/


function displayCareerTable(data) {


    const tbody =
        document.getElementById(
            "careerTableBody"
        );


    const noData =
        document.getElementById(
            "noCareerData"
        );


    if (!tbody) {

        return;

    }


    tbody.innerHTML = "";



    /*
        NO DATA
    */

    if (
        !data ||
        data.length === 0
    ) {


        if (noData) {

            noData.style.display =
                "block";

        }


        updateCareerPaginationInfo();

        return;

    }


    if (noData) {

        noData.style.display =
            "none";

    }



    /*
        Calculate page indexes
    */

    const startIndex =
        (
            currentPage - 1
        )
        *
        CAREERS_PER_PAGE;


    const endIndex =
        startIndex +
        CAREERS_PER_PAGE;


    /*
        Get only current page careers
    */

    const pageCareers =
        data.slice(
            startIndex,
            endIndex
        );



    /*
        Display current page
    */

    pageCareers.forEach(
        career => {


            tbody.innerHTML += `

<tr>


<td>

<div class="career-name">

<h4>
${career.careerName ?? "-"}
</h4>


<span>
${career.description ?? ""}
</span>

</div>

</td>


<td>

${career.category ?? "-"}

</td>


<td>

${career.requiredSkillLevel ?? "-"}

</td>


<td>

${career.averageSalary ?? "-"}

</td>


<td>

<span class="demand-${(
    career.demandLevel || ""
).toLowerCase()}">

${career.demandLevel ?? "-"}

</span>

</td>


<td>

<span class="status ${(
    career.status || ""
).toLowerCase()}">

${career.status ?? "-"}

</span>

</td>


<td>

${formatDate(
    career.createdAt
)}

</td>


<td>

<div class="action-buttons">


<button
    class="action-btn view-btn"
    onclick="viewCareer(${career.careerId})"
    title="View Career">

    <i class="fa-solid fa-eye"></i>

</button>


<button
    class="action-btn edit-btn"
    onclick="editCareer(${career.careerId})"
    title="Edit Career">

    <i class="fa-solid fa-pen"></i>

</button>


<button
    class="action-btn delete-btn"
    onclick="openDeleteModal(${career.careerId})"
    title="Delete Career">

    <i class="fa-solid fa-trash"></i>

</button>


</div>

</td>


</tr>

`;

        });


    updateCareerPaginationInfo();

}






/*==========================================================
        CAREER PAGINATION
==========================================================*/


function renderCareerPagination() {


    const pagination =
        document.getElementById(
            "careerPagination"
        );


    const buttons =
        document.getElementById(
            "careerPaginationButtons"
        );


    if (
        !pagination ||
        !buttons
    ) {

        return;

    }


    buttons.innerHTML = "";


    const totalCareers =
        filteredCareerList.length;


    const totalPages =
        Math.ceil(
            totalCareers /
            CAREERS_PER_PAGE
        );



    /*
        NO DATA

        Hide pagination completely
    */

    if (
        totalCareers === 0
    ) {


        pagination.style.display =
            "none";


        updateCareerPaginationInfo();


        return;

    }



    /*
        IMPORTANT:

        Pagination remains visible
        even when only ONE page exists.

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
        createCareerPaginationButton(
            "Previous",
            currentPage === 1,
            function () {


                if (
                    currentPage > 1
                ) {


                    currentPage--;


                    displayCareerTable(
                        filteredCareerList
                    );


                    renderCareerPagination();


                    scrollToCareerTable();


                }


            }
        );


    buttons.appendChild(
        previousButton
    );



    /*======================================================
                    PAGE NUMBERS
    ======================================================*/

    createCareerPageNumbers(
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


            displayCareerTable(
                filteredCareerList
            );


            renderCareerPagination();


            scrollToCareerTable();


        }
    );



    /*======================================================
                    NEXT
    ======================================================*/

    const nextButton =
        createCareerPaginationButton(
            "Next",
            currentPage === totalPages,
            function () {


                if (
                    currentPage <
                    totalPages
                ) {


                    currentPage++;


                    displayCareerTable(
                        filteredCareerList
                    );


                    renderCareerPagination();


                    scrollToCareerTable();


                }


            }
        );


    buttons.appendChild(
        nextButton
    );


    updateCareerPaginationInfo();

}






/*==========================================================
        CREATE PAGINATION BUTTON
==========================================================*/


function createCareerPaginationButton(
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
        PREVIOUS
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
        NEXT
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
        PAGE NUMBER
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


function createCareerPageNumbers(
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
        Seven or fewer pages:

        Show all pages.

        Example:

        1 2 3 4 5 6 7
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
                createCareerPaginationButton(
                    page,
                    false,
                    function () {


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



    /*
        FIRST PAGE
    */

    container.appendChild(

        createCareerPaginationButton(
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


        createCareerPaginationEllipsis(
            container
        );


    }



    /*
        MIDDLE RANGE
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
            createCareerPaginationButton(
                page,
                false,
                function () {


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



    /*
        RIGHT ELLIPSIS
    */

    if (
        currentPage <
        totalPages - 3
    ) {


        createCareerPaginationEllipsis(
            container
        );


    }



    /*
        LAST PAGE
    */

    container.appendChild(

        createCareerPaginationButton(
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


function createCareerPaginationEllipsis(
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


function updateCareerPaginationInfo() {


    const info =
        document.getElementById(
            "careerPaginationInfo"
        );


    if (!info) {

        return;

    }


    const total =
        filteredCareerList.length;


    /*
        No careers
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
        CAREERS_PER_PAGE
        + 1;


    const end =
        Math.min(
            currentPage *
            CAREERS_PER_PAGE,
            total
        );


    info.innerText =
        `Showing ${start} - ${end} of ${total} careers`;

}






/*==========================================================
        SCROLL TO TABLE
==========================================================*/


function scrollToCareerTable() {


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
        FORMAT DATE
==========================================================*/


function formatDate(date) {


    if (!date)

        return "-";


    return new Date(date)
        .toLocaleDateString(
            "en-IN"
        );

}






/*==========================================================
        OPEN ADD CAREER MODAL
==========================================================*/


function openAddCareerModal() {


    document
        .getElementById("careerForm")
        .reset();


    document
        .getElementById("careerId")
        .value = "";


    document
        .getElementById("careerModalTitle")
        .innerText =
        "Add Career";


    document
        .getElementById("careerModal")
        .style.display =
        "flex";

}






/*==========================================================
        CLOSE CAREER MODAL
==========================================================*/


function closeCareerModal() {


    document
        .getElementById("careerModal")
        .style.display =
        "none";

}






/*==========================================================
        SAVE / UPDATE CAREER
==========================================================*/


function saveCareer(event) {


    event.preventDefault();


    let careerId =
        document
            .getElementById("careerId")
            .value;


    let careerData = {


        careerId:
            careerId
                ?
                Number(careerId)
                :
                null,


        careerName:
            document
                .getElementById("careerName")
                .value,


        description:
            document
                .getElementById("careerDescription")
                .value,


        category:
            document
                .getElementById("careerCategory")
                .value,


        requiredSkillLevel:
            document
                .getElementById("careerSkill")
                .value,


        averageSalary:
            document
                .getElementById("careerSalary")
                .value,


        demandLevel:
            document
                .getElementById("careerDemand")
                .value,


        status:
            document
                .getElementById("careerStatus")
                .value

    };


    let url =
        careerId
            ?
            `${API_URL}/update`
            :
            `${API_URL}/save`;


    let method =
        careerId
            ?
            "PUT"
            :
            "POST";


    fetch(
        url,
        {

            method: method,

            headers: {

                "Content-Type":
                    "application/json"

            },

            body:
                JSON.stringify(
                    careerData
                )

        }
    )

        .then(
            response =>
                response.json()
        )

        .then(
            result => {


                if (
                    result.success
                ) {


                    alert(
                        "Career saved successfully"
                    );


                    closeCareerModal();


                    loadCareers();


                }

                else {


                    alert(
                        result.message ||
                        "Unable to save career"
                    );


                }


            }

        )

        .catch(
            error => {


                console.log(error);


                alert(
                    "Server error"
                );


            }

        );

}






/*==========================================================
        EDIT CAREER
==========================================================*/


function editCareer(id) {


    fetch(
        `${API_URL}/${id}`
    )


        .then(
            response =>
                response.json()
        )


        .then(
            result => {


                let career =
                    result.data;


                document
                    .getElementById("careerId")
                    .value =
                    career.careerId;


                document
                    .getElementById("careerName")
                    .value =
                    career.careerName;


                document
                    .getElementById("careerDescription")
                    .value =
                    career.description || "";


                document
                    .getElementById("careerCategory")
                    .value =
                    career.category || "";


                document
                    .getElementById("careerSkill")
                    .value =
                    career.requiredSkillLevel || "";


                document
                    .getElementById("careerSalary")
                    .value =
                    career.averageSalary || "";


                document
                    .getElementById("careerDemand")
                    .value =
                    career.demandLevel || "";


                document
                    .getElementById("careerStatus")
                    .value =
                    career.status || "";


                document
                    .getElementById("careerModalTitle")
                    .innerText =
                    "Edit Career";


                document
                    .getElementById("careerModal")
                    .style.display =
                    "flex";


            }

        )


        .catch(
            error => {


                console.log(error);


            }

        );

}






/*==========================================================
        VIEW CAREER
==========================================================*/


function viewCareer(id) {


    fetch(
        `${API_URL}/${id}`
    )


        .then(
            response =>
                response.json()
        )


        .then(
            result => {


                let career =
                    result.data;


                document
                    .getElementById(
                        "viewCareerName"
                    )
                    .innerText =
                    career.careerName;


                document
                    .getElementById(
                        "viewCategory"
                    )
                    .innerText =
                    career.category || "-";


                document
                    .getElementById(
                        "viewSkill"
                    )
                    .innerText =
                    career.requiredSkillLevel || "-";


                document
                    .getElementById(
                        "viewSalary"
                    )
                    .innerText =
                    career.averageSalary || "-";


                document
                    .getElementById(
                        "viewDemand"
                    )
                    .innerText =
                    career.demandLevel || "-";


                document
                    .getElementById(
                        "viewStatus"
                    )
                    .innerText =
                    career.status || "-";


                document
                    .getElementById(
                        "viewDescription"
                    )
                    .innerText =
                    career.description || "-";


                document
                    .getElementById(
                        "viewCareerModal"
                    )
                    .style.display =
                    "flex";


            }

        )


        .catch(
            error => {


                console.log(error);


            }

        );

}






/*==========================================================
        CLOSE VIEW MODAL
==========================================================*/


function closeViewModal() {


    document
        .getElementById(
            "viewCareerModal"
        )
        .style.display =
        "none";

}






/*==========================================================
        OPEN DELETE MODAL
==========================================================*/


function openDeleteModal(id) {


    deleteCareerId =
        id;


    document
        .getElementById(
            "deleteModal"
        )
        .style.display =
        "flex";

}






/*==========================================================
        CLOSE DELETE MODAL
==========================================================*/


function closeDeleteModal() {


    deleteCareerId =
        null;


    document
        .getElementById(
            "deleteModal"
        )
        .style.display =
        "none";

}






/*==========================================================
        DELETE API
==========================================================*/


function deleteCareer() {


    if (
        !deleteCareerId
    )

        return;


    fetch(

        `${API_URL}/${deleteCareerId}`,

        {

            method: "DELETE"

        }

    )


        .then(
            response =>
                response.json()
        )


        .then(
            result => {


                if (
                    result.success
                ) {


                    alert(
                        "Career deleted successfully"
                    );


                    closeDeleteModal();


                    loadCareers();


                }

                else {


                    alert(
                        result.message ||
                        "Unable to delete career"
                    );


                }


            }

        )


        .catch(
            error => {


                console.log(error);


                alert(
                    "Server error"
                );


            }

        );

}






/*==========================================================
        SEARCH CAREER
==========================================================*/


function searchCareer() {


    let value =

        document
            .getElementById(
                "searchCareer"
            )
            .value
            .toLowerCase()
            .trim();



    filteredCareerList =

        careerList.filter(
            career => {


                return (

                    (
                        career.careerName ||
                        ""
                    )
                    .toLowerCase()
                    .includes(value)


                    ||


                    (
                        career.category ||
                        ""
                    )
                    .toLowerCase()
                    .includes(value)


                    ||


                    (
                        career.requiredSkillLevel ||
                        ""
                    )
                    .toLowerCase()
                    .includes(value)

                );

            }

        );



    /*
        Search always starts
        from page 1.
    */

    currentPage = 1;



    displayCareerTable(
        filteredCareerList
    );


    renderCareerPagination();

}






/*==========================================================
        OUTSIDE CLICK CLOSE
==========================================================*/


window.onclick =
    function(event) {


        let careerModal =
            document.getElementById(
                "careerModal"
            );


        let viewModal =
            document.getElementById(
                "viewCareerModal"
            );


        let deleteModal =
            document.getElementById(
                "deleteModal"
            );


        if (
            event.target ===
            careerModal
        ) {


            careerModal.style.display =
                "none";


        }


        if (
            event.target ===
            viewModal
        ) {


            viewModal.style.display =
                "none";


        }


        if (
            event.target ===
            deleteModal
        ) {


            deleteModal.style.display =
                "none";


        }


    };