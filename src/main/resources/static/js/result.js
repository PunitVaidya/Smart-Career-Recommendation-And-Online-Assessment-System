/*==========================================================
        RESULT MANAGEMENT JAVASCRIPT
==========================================================*/


/*==========================================================
        API
==========================================================*/

const API_URL =
    "/api/student-result";



/*==========================================================
        GLOBAL VARIABLES
==========================================================*/

let resultList = [];

let filteredResults = [];

let selectedResultId = null;


/*
    Number of results displayed
    on one page
*/

let currentPage = 1;

const RESULTS_PER_PAGE = 10;



/*==========================================================
        PAGE LOAD
==========================================================*/

document.addEventListener(
    "DOMContentLoaded",
    () => {


        loadResults();


        const searchBox =
            document.getElementById(
                "searchResult"
            );


        if(searchBox){

            searchBox.addEventListener(
                "keyup",
                searchResults
            );

        }



        /*========================================
                EXPORT
        ========================================*/

        const exportButton =
            document.getElementById(
                "exportBtn"
            );


        if(exportButton){

            exportButton.addEventListener(
                "click",
                () => {

                    document
                        .getElementById(
                            "exportModal"
                        )
                        .style.display =
                        "flex";

                }
            );

        }


    }
);





/*==========================================================
        CLOSE EXPORT MODAL
==========================================================*/

function closeExportModal(){


    const modal =
        document.getElementById(
            "exportModal"
        );


    if(modal){

        modal.style.display =
            "none";

    }

}





/*==========================================================
        LOAD RESULTS
==========================================================*/

function loadResults(){


    fetch(
        API_URL + "/all"
    )


    .then(
        response => {


            if(!response.ok){

                throw new Error(
                    "Unable to load results"
                );

            }


            return response.json();


        }
    )


    .then(
        result => {


            resultList =
                result.data || [];


            filteredResults =
                [...resultList];


            /*
                Always start from
                first page after loading.
            */

            currentPage = 1;


            displayResults(
                filteredResults
            );


            renderResultPagination();


        }
    )


    .catch(
        error => {


            console.error(
                error
            );


            resultList = [];

            filteredResults = [];

            currentPage = 1;


            displayResults([]);


            renderResultPagination();


        }
    );


}





/*==========================================================
        DISPLAY TABLE
==========================================================*/

function displayResults(data){


    const tbody =
        document.getElementById(
            "resultTableBody"
        );


    const noData =
        document.getElementById(
            "noResultData"
        );


    if(!tbody){

        return;

    }


    tbody.innerHTML = "";



    /*======================================================
            NO DATA
    ======================================================*/

    if(
        !data ||
        data.length === 0
    ){


        if(noData){

            noData.style.display =
                "block";

        }


        updateResultPaginationInfo();

        return;

    }



    if(noData){

        noData.style.display =
            "none";

    }



    /*======================================================
            CURRENT PAGE DATA
    ======================================================*/

    const startIndex =
        (
            currentPage - 1
        )
        *
        RESULTS_PER_PAGE;


    const endIndex =
        startIndex +
        RESULTS_PER_PAGE;


    /*
        Only display results
        belonging to current page.
    */

    const pageResults =
        data.slice(
            startIndex,
            endIndex
        );



    /*======================================================
            CREATE TABLE ROWS
    ======================================================*/

    pageResults.forEach(
        result => {


            tbody.innerHTML += `

                <tr>


                    <td>

                        <div
                            class="student-info">

                            <h4>

                                ${result.studentName || "-"}

                            </h4>

                            <span>

                                ${result.studentEmail || "-"}

                            </span>

                        </div>

                    </td>



                    <td>

                        ${result.assessmentName || "-"}

                    </td>



                    <td>

                        <span class="score">

                            ${result.score || 0}
                            /
                            ${result.totalMarks || 0}

                        </span>

                    </td>



                    <td>

                        <span
                            class="percentage
                            ${percentageClass(
                                result.percentage
                            )}">

                            ${result.percentage || 0}%

                        </span>

                    </td>



                    <td>

                        ${result.careerReadiness || 0}%

                    </td>



                    <td>

                        ${result.recommendedCareer || "-"}

                    </td>



                    <td>

                        <span
                            class="status
                            ${statusClass(
                                result.resultStatus
                            )}">

                            ${result.resultStatus || "-"}

                        </span>

                    </td>



                    <td>

                        ${formatDate(
                            result.submittedAt
                        )}

                    </td>



                    <td>

                        <div
                            class="action-buttons">


                            <button
                                class="action-btn view-btn"
                                onclick="viewResult(${result.resultId})"
                                title="View Result">

                                <i
                                    class="fa-solid fa-eye">
                                </i>

                            </button>



                            <button
                                class="action-btn delete-btn"
                                onclick="openDeleteModal(${result.resultId})"
                                title="Delete Result">

                                <i
                                    class="fa-solid fa-trash">
                                </i>

                            </button>


                        </div>

                    </td>


                </tr>

            `;


        });


    updateResultPaginationInfo();

}





/*==========================================================
        SEARCH
==========================================================*/

function searchResults(){


    const value =
        document
            .getElementById(
                "searchResult"
            )
            .value
            .toLowerCase()
            .trim();



    filteredResults =
        resultList.filter(
            result => {


                return (


                    (
                        result.studentName ||
                        ""
                    )
                    .toLowerCase()
                    .includes(value)


                    ||


                    (
                        result.studentEmail ||
                        ""
                    )
                    .toLowerCase()
                    .includes(value)


                    ||


                    (
                        result.assessmentName ||
                        ""
                    )
                    .toLowerCase()
                    .includes(value)


                    ||


                    (
                        result.recommendedCareer ||
                        ""
                    )
                    .toLowerCase()
                    .includes(value)


                    ||


                    (
                        result.resultStatus ||
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


    displayResults(
        filteredResults
    );


    renderResultPagination();

}





/*==========================================================
        REFRESH
==========================================================*/

function refreshResults(){


    const searchBox =
        document.getElementById(
            "searchResult"
        );


    if(searchBox){

        searchBox.value = "";

    }


    loadResults();

}





/*==========================================================
        RESULT PAGINATION
==========================================================*/

function renderResultPagination(){


    const pagination =
        document.getElementById(
            "resultPagination"
        );


    const buttons =
        document.getElementById(
            "resultPaginationButtons"
        );


    if(
        !pagination ||
        !buttons
    ){

        return;

    }


    buttons.innerHTML = "";



    const totalResults =
        filteredResults.length;


    const totalPages =
        Math.ceil(
            totalResults /
            RESULTS_PER_PAGE
        );



    /*======================================================
            NO RESULTS

            Hide pagination.
    ======================================================*/

    if(
        totalResults === 0
    ){


        pagination.style.display =
            "none";


        updateResultPaginationInfo();


        return;

    }



    /*
        IMPORTANT:

        Even when there is only ONE page,
        pagination remains visible.

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
        createResultPaginationButton(
            "Previous",
            currentPage === 1,
            () => {


                if(
                    currentPage > 1
                ){


                    currentPage--;


                    displayResults(
                        filteredResults
                    );


                    renderResultPagination();


                    scrollToResultTable();


                }


            }
        );


    buttons.appendChild(
        previousButton
    );



    /*======================================================
            PAGE NUMBERS
    ======================================================*/

    createResultPageNumbers(
        buttons,
        currentPage,
        totalPages,
        page => {


            if(
                page === currentPage
            ){

                return;

            }


            currentPage =
                page;


            displayResults(
                filteredResults
            );


            renderResultPagination();


            scrollToResultTable();


        }
    );



    /*======================================================
            NEXT
    ======================================================*/

    const nextButton =
        createResultPaginationButton(
            "Next",
            currentPage === totalPages,
            () => {


                if(
                    currentPage <
                    totalPages
                ){


                    currentPage++;


                    displayResults(
                        filteredResults
                    );


                    renderResultPagination();


                    scrollToResultTable();


                }


            }
        );


    buttons.appendChild(
        nextButton
    );


    updateResultPaginationInfo();

}





/*==========================================================
        CREATE PAGINATION BUTTON
==========================================================*/

function createResultPaginationButton(
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



    /*======================================================
            PREVIOUS
    ======================================================*/

    if(
        text === "Previous"
    ){


        button.innerHTML = `

            <i class="fa-solid fa-chevron-left"></i>

            <span>Previous</span>

        `;

    }



    /*======================================================
            NEXT
    ======================================================*/

    else if(
        text === "Next"
    ){


        button.innerHTML = `

            <span>Next</span>

            <i class="fa-solid fa-chevron-right"></i>

        `;

    }



    /*======================================================
            PAGE NUMBER
    ======================================================*/

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





/*==========================================================
        CREATE PAGE NUMBERS
==========================================================*/

function createResultPageNumbers(
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



    /*======================================================
            7 OR FEWER PAGES
    ======================================================*/

    if(
        totalPages <= 7
    ){


        for(
            let page = 1;
            page <= totalPages;
            page++
        ){


            const pageButton =
                createResultPaginationButton(
                    page,
                    false,
                    () => {


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



    /*======================================================
            FIRST PAGE
    ======================================================*/

    container.appendChild(

        createResultPaginationButton(
            1,
            false,
            () => {

                callback(1);

            },
            currentPage === 1
        )

    );



    /*======================================================
            LEFT ELLIPSIS
    ======================================================*/

    if(
        currentPage > 4
    ){


        createResultPaginationEllipsis(
            container
        );


    }



    /*======================================================
            MIDDLE RANGE
    ======================================================*/

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



    /*======================================================
            NEAR BEGINNING
    ======================================================*/

    if(
        currentPage <= 3
    ){


        startPage = 2;

        endPage = 4;

    }



    /*======================================================
            NEAR END
    ======================================================*/

    if(
        currentPage >=
        totalPages - 2
    ){


        startPage =
            totalPages - 3;


        endPage =
            totalPages - 1;

    }



    /*======================================================
            MIDDLE BUTTONS
    ======================================================*/

    for(
        let page = startPage;
        page <= endPage;
        page++
    ){


        const pageButton =
            createResultPaginationButton(
                page,
                false,
                () => {


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



    /*======================================================
            RIGHT ELLIPSIS
    ======================================================*/

    if(
        currentPage <
        totalPages - 3
    ){


        createResultPaginationEllipsis(
            container
        );


    }



    /*======================================================
            LAST PAGE
    ======================================================*/

    container.appendChild(

        createResultPaginationButton(
            totalPages,
            false,
            () => {


                callback(
                    totalPages
                );


            },
            currentPage === totalPages
        )

    );

}





/*==========================================================
        PAGINATION ELLIPSIS
==========================================================*/

function createResultPaginationEllipsis(
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





/*==========================================================
        PAGINATION INFORMATION
==========================================================*/

function updateResultPaginationInfo(){


    const info =
        document.getElementById(
            "resultPaginationInfo"
        );


    if(!info){

        return;

    }


    const total =
        filteredResults.length;



    /*======================================================
            NO RESULTS
    ======================================================*/

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
        RESULTS_PER_PAGE
        + 1;


    const end =
        Math.min(
            currentPage *
            RESULTS_PER_PAGE,
            total
        );


    info.innerText =
        `Showing ${start} - ${end} of ${total} results`;

}





/*==========================================================
        SCROLL TO RESULT TABLE
==========================================================*/

function scrollToResultTable(){


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





/*==========================================================
        VIEW RESULT
==========================================================*/

function viewResult(id){


    const result =
        resultList.find(
            item =>
                item.resultId === id
        );


    if(!result){

        return;

    }



    document
        .getElementById(
            "viewStudentName"
        )
        .innerHTML =
        result.studentName || "-";


    document
        .getElementById(
            "viewStudentEmail"
        )
        .innerHTML =
        result.studentEmail || "-";


    document
        .getElementById(
            "viewAssessmentName"
        )
        .innerHTML =
        result.assessmentName || "-";


    document
        .getElementById(
            "viewScore"
        )
        .innerHTML =
        result.score || 0;


    document
        .getElementById(
            "viewTotalMarks"
        )
        .innerHTML =
        result.totalMarks || 0;


    document
        .getElementById(
            "viewPercentage"
        )
        .innerHTML =
        (result.percentage || 0) + "%";


    document
        .getElementById(
            "viewCareerReadiness"
        )
        .innerHTML =
        (result.careerReadiness || 0) + "%";


    document
        .getElementById(
            "viewRecommendedCareer"
        )
        .innerHTML =
        result.recommendedCareer || "-";


    document
        .getElementById(
            "viewResultStatus"
        )
        .innerHTML =
        result.resultStatus || "-";


    document
        .getElementById(
            "viewSubmittedAt"
        )
        .innerHTML =
        formatDate(
            result.submittedAt
        );



    document
        .getElementById(
            "viewResultModal"
        )
        .style.display =
        "flex";

}





/*==========================================================
        CLOSE VIEW MODAL
==========================================================*/

function closeViewModal(){


    document
        .getElementById(
            "viewResultModal"
        )
        .style.display =
        "none";

}





/*==========================================================
        DELETE MODAL
==========================================================*/

function openDeleteModal(id){


    selectedResultId =
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

function closeDeleteModal(){


    selectedResultId =
        null;


    document
        .getElementById(
            "deleteModal"
        )
        .style.display =
        "none";

}





/*==========================================================
        CONFIRM DELETE
==========================================================*/

const confirmDeleteButton =
    document.getElementById(
        "confirmDeleteBtn"
    );


if(confirmDeleteButton){


    confirmDeleteButton.addEventListener(
        "click",
        () => {


            if(!selectedResultId){

                return;

            }



            fetch(
                API_URL +
                "/" +
                selectedResultId,
                {

                    method:
                        "DELETE"

                }
            )


            .then(
                response =>
                    response.json()
            )


            .then(
                data => {


                    alert(
                        "Result deleted successfully."
                    );


                    closeDeleteModal();


                    loadResults();


                }
            )


            .catch(
                error => {


                    console.error(
                        error
                    );


                    alert(
                        "Delete failed"
                    );


                }
            );


        }
    );


}





/*==========================================================
        PERCENTAGE CLASS
==========================================================*/

function percentageClass(
    value
){


    if(value >= 80){

        return "excellent";

    }


    if(value >= 60){

        return "good";

    }


    if(value >= 40){

        return "average";

    }


    return "poor";

}





/*==========================================================
        STATUS CLASS
==========================================================*/

function statusClass(
    status
){


    if(!status){

        return "";

    }


    return status
        .toLowerCase();

}





/*==========================================================
        FORMAT DATE
==========================================================*/

function formatDate(
    date
){


    if(!date){

        return "-";

    }


    return new Date(
        date
    )
    .toLocaleDateString(
        "en-IN"
    );

}