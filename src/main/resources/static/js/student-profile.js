/* =========================================================
   STUDENT PROFILE PAGE JAVASCRIPT
   GIRIS TECH HUB
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    console.log("STUDENT PROFILE JS LOADED");


    /* =====================================================
       ELEMENT REFERENCES
    ===================================================== */

    const openEdit = document.getElementById("openEdit");

    const editModal = document.getElementById("editModal");

    const closeEdit = document.getElementById("closeEdit");

    const cancelEdit = document.getElementById("cancelEdit");

    const saveProfile = document.getElementById("saveProfile");


    /* =====================================================
       WARNING MODAL
    ===================================================== */

    const goalWarningModal =
        document.getElementById("goalWarningModal");

    const closeGoalWarning =
        document.getElementById("closeGoalWarning");


    /* =====================================================
       DISPLAY PROFILE FIELDS
    ===================================================== */

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const mobileField = document.getElementById("mobile");

    const collegeField = document.getElementById("college");
    const branchField = document.getElementById("branch");
    const semesterField = document.getElementById("semester");
    const statusField = document.getElementById("status");

    const goalField = document.getElementById("goal");


    /* =====================================================
       EDIT PROFILE FIELDS
    ===================================================== */

    const editName =
        document.getElementById("editName");

    const editEmail =
        document.getElementById("editEmail");

    const editMobile =
        document.getElementById("editMobile");

    const editCollege =
        document.getElementById("editCollege");

    const editBranch =
        document.getElementById("editBranch");

    const editSemester =
        document.getElementById("editSemester");

    const editStatus =
        document.getElementById("editStatus");

    const editGraduationYear =
        document.getElementById("editGraduationYear");

    const editGoal =
        document.getElementById("editGoal");


    /* =====================================================
       CHECK REQUIRED ELEMENTS
    ===================================================== */

    console.log("openEdit =", openEdit);
    console.log("editModal =", editModal);
    console.log("goal =", goalField);
    console.log("editGoal =", editGoal);


    if (!openEdit) {
        console.error("ERROR: #openEdit not found");
        return;
    }

    if (!editModal) {
        console.error("ERROR: #editModal not found");
        return;
    }


    /* =====================================================
       STUDENT ID
    ===================================================== */

    let studentId =
        localStorage.getItem("studentId");

    if (!studentId) {

        studentId =
            sessionStorage.getItem("studentId");

    }

    console.log("Student ID =", studentId);


    /* =====================================================
       API BASE URL
    ===================================================== */

    const API_BASE =
        "http://localhost:8080/api";


    /* =====================================================
       SAFE VALUE
    ===================================================== */

    function safeValue(value) {

        if (
            value === null ||
            value === undefined ||
            value === "null"
        ) {

            return "";

        }

        return value;

    }


    /* =====================================================
       LOAD STUDENT PROFILE
    ===================================================== */

    async function loadStudentProfile() {

        if (!studentId) {

            console.error(
                "Student ID not found in localStorage/sessionStorage"
            );

            return;

        }


        try {

            console.log(
                "Loading student profile for ID:",
                studentId
            );


            const response =
                await fetch(
                    `${API_BASE}/student/${studentId}`
                );


            if (!response.ok) {

                throw new Error(
                    "Failed to load student profile. Status: "
                    + response.status
                );

            }


            const apiResponse =
                await response.json();


            console.log(
                "Student API Response:",
                apiResponse
            );


            /*
             * Depending on your ApiResponse structure,
             * student data may be inside result/data.
             */

            let student =
                apiResponse.data ||
                apiResponse.result ||
                apiResponse;


            if (
                student &&
                student.data
            ) {

                student =
                    student.data;

            }


            console.log(
                "Student Data:",
                student
            );


            if (!student) {

                console.error(
                    "Student data is empty"
                );

                return;

            }


            /* =================================================
               DISPLAY PROFILE
            ================================================= */

            if (nameField)
                nameField.value =
                    safeValue(student.name);


            if (emailField)
                emailField.value =
                    safeValue(student.email);


            if (mobileField)
                mobileField.value =
                    safeValue(student.mobile);


            if (collegeField)
                collegeField.value =
                    safeValue(student.college);


            if (branchField)
                branchField.value =
                    safeValue(student.branch);


            if (semesterField)
                semesterField.value =
                    safeValue(student.semester);


            if (statusField)
                statusField.value =
                    safeValue(student.currentStatus);


            /* =================================================
               CAREER GOAL
            ================================================= */

            if (goalField) {

                goalField.value =
                    safeValue(student.goal);

            }


            /*
             * Store current student data so that the
             * Edit Profile popup can use the same data.
             */

            window.currentStudent =
                student;


        }
        catch (error) {

            console.error(
                "PROFILE LOAD ERROR:",
                error
            );

        }

    }


    /* =====================================================
       OPEN EDIT PROFILE MODAL
    ===================================================== */

    openEdit.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            console.log(
                "EDIT PROFILE BUTTON CLICKED"
            );


            /* =================================================
               GET CURRENT PROFILE DATA
            ================================================= */

            const student =
                window.currentStudent || {};


            /* =================================================
               FILL EDIT FORM
            ================================================= */

            if (editName) {

                editName.value =
                    safeValue(
                        student.name ||
                        nameField?.value
                    );

            }


            if (editEmail) {

                editEmail.value =
                    safeValue(
                        student.email ||
                        emailField?.value
                    );

            }


            if (editMobile) {

                editMobile.value =
                    safeValue(
                        student.mobile ||
                        mobileField?.value
                    );

            }


            if (editCollege) {

                editCollege.value =
                    safeValue(
                        student.college ||
                        collegeField?.value
                    );

            }


            if (editBranch) {

                editBranch.value =
                    safeValue(
                        student.branch ||
                        branchField?.value
                    );

            }


            if (editSemester) {

                editSemester.value =
                    safeValue(
                        student.semester ||
                        semesterField?.value
                    );

            }


            if (editStatus) {

                editStatus.value =
                    safeValue(
                        student.currentStatus ||
                        statusField?.value
                    );

            }


            if (editGraduationYear) {

                editGraduationYear.value =
                    safeValue(
                        student.graduationYear
                    );

            }


            /*
             * Career goal is displayed but MUST NOT
             * be editable.
             */

            if (editGoal) {

                editGoal.value =
                    safeValue(
                        student.goal ||
                        goalField?.value
                    );

                editGoal.readOnly = true;

            }


            /* =================================================
               OPEN MODAL
            ================================================= */

            editModal.classList.add("active");

            editModal.style.display = "flex";

            document.body.classList.add("modal-open");

            console.log(
                "EDIT PROFILE MODAL OPENED"
            );

        }
    );


    /* =====================================================
       CLOSE EDIT MODAL
    ===================================================== */

    function closeEditModal() {

        editModal.classList.remove("active");

        editModal.style.display = "none";

        document.body.classList.remove(
            "modal-open"
        );

        console.log(
            "EDIT PROFILE MODAL CLOSED"
        );

    }


    /* CLOSE X BUTTON */

    if (closeEdit) {

        closeEdit.addEventListener(
            "click",
            function () {

                closeEditModal();

            }
        );

    }


    /* CANCEL BUTTON */

    if (cancelEdit) {

        cancelEdit.addEventListener(
            "click",
            function () {

                closeEditModal();

            }
        );

    }


    /* =====================================================
       CLICK OUTSIDE EDIT MODAL
    ===================================================== */

    editModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target === editModal
            ) {

                closeEditModal();

            }

        }
    );


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape"
            ) {

                if (
                    editModal.classList.contains(
                        "active"
                    )
                ) {

                    closeEditModal();

                }


                if (
                    goalWarningModal &&
                    goalWarningModal.classList.contains(
                        "active"
                    )
                ) {

                    closeGoalWarningModal();

                }

            }

        }
    );


    /* =====================================================
       CAREER GOAL PROTECTION
    ===================================================== */

    if (editGoal) {

        editGoal.addEventListener(
            "click",
            function () {

                console.log(
                    "CAREER GOAL CLICKED"
                );

                openGoalWarning();

            }
        );


        editGoal.addEventListener(
            "focus",
            function () {

                /*
                 * Immediately remove focus so the student
                 * cannot type/edit the protected field.
                 */

                editGoal.blur();

            }
        );


        editGoal.addEventListener(
            "keydown",
            function (event) {

                event.preventDefault();

                openGoalWarning();

            }
        );

    }


    /* =====================================================
       OPEN GOAL WARNING
    ===================================================== */

    function openGoalWarning() {

        if (!goalWarningModal) {

            alert(
                "Career goal cannot be changed by student. Please contact administrator."
            );

            return;

        }


        goalWarningModal.classList.add(
            "active"
        );

        goalWarningModal.style.display =
            "flex";


        console.log(
            "CAREER GOAL WARNING OPENED"
        );

    }


    /* =====================================================
       CLOSE GOAL WARNING
    ===================================================== */

    function closeGoalWarningModal() {

        if (!goalWarningModal) {

            return;

        }


        goalWarningModal.classList.remove(
            "active"
        );

        goalWarningModal.style.display =
            "none";


        console.log(
            "CAREER GOAL WARNING CLOSED"
        );

    }


    if (closeGoalWarning) {

        closeGoalWarning.addEventListener(
            "click",
            function () {

                closeGoalWarningModal();

            }
        );

    }


    /* =====================================================
       CLICK OUTSIDE WARNING
    ===================================================== */

    if (goalWarningModal) {

        goalWarningModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === goalWarningModal
                ) {

                    closeGoalWarningModal();

                }

            }
        );

    }


    /* =====================================================
       SAVE PROFILE
    ===================================================== */

    if (saveProfile) {

        saveProfile.addEventListener(
            "click",
            async function () {

                console.log(
                    "SAVE PROFILE CLICKED"
                );


                if (!studentId) {

                    alert(
                        "Student session not found. Please login again."
                    );

                    return;

                }


                /* =================================================
                   COLLECT EDITABLE DATA
                ================================================= */

                const updatedStudent = {

                    studentId:
                        Number(studentId),

                    name:
                        editName
                            ? editName.value.trim()
                            : "",

                    email:
                        editEmail
                            ? editEmail.value.trim()
                            : "",

                    mobile:
                        editMobile
                            ? editMobile.value.trim()
                            : "",

                    college:
                        editCollege
                            ? editCollege.value.trim()
                            : "",

                    branch:
                        editBranch
                            ? editBranch.value.trim()
                            : "",

                    semester:
                        editSemester
                            ? Number(
                                editSemester.value
                              )
                            : null,

                    currentStatus:
                        editStatus
                            ? editStatus.value.trim()
                            : "",

                    graduationYear:
                        editGraduationYear &&
                        editGraduationYear.value
                            ? Number(
                                editGraduationYear.value
                              )
                            : null,

                    /*
                     * IMPORTANT:
                     * Never take career goal from
                     * student editable input.
                     *
                     * Preserve existing goal.
                     */

                    goal:
                        window.currentStudent
                            ? window.currentStudent.goal
                            : (
                                goalField
                                    ? goalField.value
                                    : null
                              )

                };


                console.log(
                    "PROFILE UPDATE REQUEST:",
                    updatedStudent
                );


                try {

                    const response =
                        await fetch(
                            `${API_BASE}/student/${studentId}`,
                            {
                                method: "PUT",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body:
                                    JSON.stringify(
                                        updatedStudent
                                    )

                            }
                        );


                    const result =
                        await response.json();


                    console.log(
                        "PROFILE UPDATE RESPONSE:",
                        result
                    );


                    if (!response.ok) {

                        throw new Error(
                            result.message ||
                            "Profile update failed"
                        );

                    }


                    alert(
                        "Profile updated successfully."
                    );


                    closeEditModal();


                    /*
                     * Reload latest data from server.
                     */

                    await loadStudentProfile();


                }
                catch (error) {

                    console.error(
                        "PROFILE UPDATE ERROR:",
                        error
                    );

                    alert(
                        error.message ||
                        "Unable to update profile."
                    );

                }

            }
        );

    }


    /* =====================================================
       LOAD PROFILE WHEN PAGE OPENS
    ===================================================== */

    loadStudentProfile();

});