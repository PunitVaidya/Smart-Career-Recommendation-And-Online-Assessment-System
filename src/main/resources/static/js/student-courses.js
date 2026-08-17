/* =========================================================
   GIRIS TECH HUB
   STUDENT COURSES
   DYNAMIC PERSONALIZED LEARNING
========================================================= */


/* =========================================================
   API CONFIGURATION
========================================================= */

const STUDENT_API =
    "/api/student";

const RESULT_API =
    "/api/student-result/student";

const CAREER_RECOMMENDATION_API =
    "/api/career-recommendation/attempt";


const OFFICIAL_WEBSITE =
    "https://www.techhubindia.org/";


/* =========================================================
   STUDENT STATE
========================================================= */

let studentId =
    localStorage.getItem("studentId");

let studentData =
    null;

let latestResult =
    null;

let careerRecommendations =
    [];

let recommendedCareerData =
    null;

let currentCourseType =
    null;


/* =========================================================
   PREMIUM COURSES
========================================================= */

const PREMIUM_COURSES = [

    /* =====================================================
       JAVA
    ===================================================== */

    {
        key: "java",

        name:
            "Java Full Stack Development",

        fullName:
            "Diploma in Java Full Stack Development with Generative AI and Agentic AI Specialization",

        description:
            "Core Java, DSA, SQL, Spring Boot, React, Microservices, APIs and modern development skills.",

        icon:
            "fa-brands fa-java",

        url:
            "https://www.techhubindia.org/course-details/1/Java-Full-Stack-Developer",

        keywords: [
            "java",
            "full stack",
            "software engineer",
            "software developer",
            "java developer"
        ],

        tags: [
            "Core Java",
            "DSA",
            "Spring Boot",
            "React",
            "SQL",
            "Projects"
        ]
    },


    /* =====================================================
       PYTHON
    ===================================================== */

    {
        key: "python",

        name:
            "Python Full Stack Development",

        fullName:
            "Diploma in Python Full Stack Development with Data Science and Agentic AI Specialization",

        description:
            "Build Python development skills with full-stack technologies and data-oriented learning.",

        icon:
            "fa-brands fa-python",

        url:
            "https://www.techhubindia.org/",

        keywords: [
            "python",
            "full stack",
            "python developer"
        ],

        tags: [
            "Python",
            "Django",
            "SQL",
            "Web Development",
            "Projects"
        ]
    },


    /* =====================================================
       DATA ANALYTICS
    ===================================================== */

    {
        key: "analytics",

        name:
            "Data Analytics with Generative AI",

        fullName:
            "Data Analytics with Generative AI",

        description:
            "Develop analytical thinking, data handling and practical data analytics skills.",

        icon:
            "fa-solid fa-chart-column",

        url:
            "https://www.techhubindia.org/course-details/8/Data-Analytics-with-Generative-AI",

        keywords: [
            "data analyst",
            "data analytics",
            "analytics",
            "business analyst"
        ],

        tags: [
            "Data Analysis",
            "SQL",
            "Visualization",
            "Analytics",
            "Projects"
        ]
    },


    /* =====================================================
       DATA SCIENCE
    ===================================================== */

    {
        key: "datascience",

        name:
            "Data Science with Generative AI",

        fullName:
            "Data Science with Generative AI",

        description:
            "Develop data science skills for analysis, modelling and modern data-driven applications.",

        icon:
            "fa-solid fa-chart-line",

        url:
            "https://www.techhubindia.org/course-details/7/Data%20Science%20with%20AI",

        keywords: [
            "data scientist",
            "data science",
            "machine learning",
            "machine learning engineer"
        ],

        tags: [
            "Python",
            "Data Science",
            "Machine Learning",
            "Projects"
        ]
    },


    /* =====================================================
       .NET
    ===================================================== */

    {
        key: "dotnet",

        name:
            ".NET Full Stack Development",

        fullName:
            ".NET Full Stack Development",

        description:
            "Build full-stack applications using C#, .NET, databases, APIs and modern frontend technologies.",

        icon:
            "fa-solid fa-code",

        url:
            "https://www.techhubindia.org/",

        keywords: [
            ".net",
            "dotnet",
            "c#",
            "full stack"
        ],

        tags: [
            "C#",
            ".NET",
            "SQL",
            "APIs",
            "Frontend",
            "Projects"
        ]
    },


    /* =====================================================
       MERN
    ===================================================== */

    {
        key: "mern",

        name:
            "MERN Stack Development",

        fullName:
            "MERN Stack Development",

        description:
            "Learn MongoDB, Express.js, React and Node.js to build modern full-stack web applications.",

        icon:
            "fa-brands fa-node-js",

        url:
            "https://www.techhubindia.org/",

        keywords: [
            "mern",
            "react",
            "node",
            "full stack"
        ],

        tags: [
            "MongoDB",
            "Express",
            "React",
            "Node.js",
            "APIs",
            "Projects"
        ]
    },


    /* =====================================================
       SOFTWARE TESTING
    ===================================================== */

    {
        key: "testing",

        name:
            "Software Testing",

        fullName:
            "Software Testing & Quality Assurance",

        description:
            "Develop software testing skills including manual testing, automation concepts, API testing and quality assurance.",

        icon:
            "fa-solid fa-bug",

        url:
            "https://www.techhubindia.org/",

        keywords: [
            "software test",
            "software testing",
            "qa",
            "quality assurance"
        ],

        tags: [
            "Manual Testing",
            "Automation",
            "API Testing",
            "SQL",
            "QA",
            "Projects"
        ]
    },


    /* =====================================================
       DEVOPS / CLOUD
    ===================================================== */

    {
        key: "devops",

        name:
            "DevOps & Cloud Engineering",

        fullName:
            "DevOps & Cloud Engineering",

        description:
            "Build skills in Linux, cloud platforms, CI/CD, containers, deployment and modern DevOps practices.",

        icon:
            "fa-solid fa-cloud",

        url:
            "https://www.techhubindia.org/",

        keywords: [
            "devops",
            "cloud",
            "cloud engineer"
        ],

        tags: [
            "Linux",
            "Cloud",
            "Docker",
            "CI/CD",
            "Deployment",
            "Projects"
        ]
    },


    /* =====================================================
       C / C++
    ===================================================== */

    {
        key: "cpp",

        name:
            "C/C++ Development",

        fullName:
            "C/C++ Programming & Software Development",

        description:
            "Strengthen C and C++ programming, problem solving, data structures and software development fundamentals.",

        icon:
            "fa-solid fa-laptop-code",

        url:
            "https://www.techhubindia.org/",

        keywords: [
            "c/c++",
            "c++",
            "c developer",
            "cpp"
        ],

        tags: [
            "C",
            "C++",
            "DSA",
            "Problem Solving",
            "OOP",
            "Projects"
        ]
    }

];


/* =========================================================
   ROADMAPS
========================================================= */

const ROADMAPS = {


    /* =====================================================
       JAVA
    ===================================================== */

    java: [

        {
            title:
                "Programming Fundamentals",

            description:
                "Build strong programming fundamentals, variables, data types, conditions, loops and problem solving.",

            level:
                "Beginner"
        },

        {
            title:
                "Core Java & DSA",

            description:
                "Learn Java syntax, OOP concepts, collections, exception handling and data structures.",

            level:
                "Beginner"
        },

        {
            title:
                "SQL & Database",

            description:
                "Understand relational databases, SQL queries, joins, constraints and database design.",

            level:
                "Intermediate"
        },

        {
            title:
                "Spring & Spring Boot",

            description:
                "Learn enterprise Java development, dependency injection, REST APIs and Spring Boot.",

            level:
                "Intermediate"
        },

        {
            title:
                "Frontend & Full Stack",

            description:
                "Develop responsive applications using HTML, CSS, JavaScript and modern frontend technologies.",

            level:
                "Advanced"
        },

        {
            title:
                "Projects & Interview Preparation",

            description:
                "Build practical projects and prepare for technical, aptitude and HR interviews.",

            level:
                "Advanced"
        }

    ],


    /* =====================================================
       PYTHON
    ===================================================== */

    python: [

        {
            title:
                "Python Fundamentals",

            description:
                "Learn Python syntax, variables, data types, conditions, loops and functions.",

            level:
                "Beginner"
        },

        {
            title:
                "Object-Oriented Python",

            description:
                "Understand classes, objects, inheritance, modules, exceptions and reusable code.",

            level:
                "Beginner"
        },

        {
            title:
                "SQL & Database",

            description:
                "Learn SQL queries, relational databases, joins and data management.",

            level:
                "Intermediate"
        },

        {
            title:
                "Python Web Development",

            description:
                "Learn backend development concepts and build web applications using Python frameworks.",

            level:
                "Intermediate"
        },

        {
            title:
                "Frontend & Full Stack",

            description:
                "Build responsive web interfaces using HTML, CSS and JavaScript.",

            level:
                "Advanced"
        },

        {
            title:
                "Projects & Interview Preparation",

            description:
                "Create practical projects and prepare for technical and placement interviews.",

            level:
                "Advanced"
        }

    ],


    /* =====================================================
       DATA ANALYTICS
    ===================================================== */

    analytics: [

        {
            title:
                "Excel & Data Fundamentals",

            description:
                "Learn data organization, formulas, sorting, filtering and spreadsheet-based analysis.",

            level:
                "Beginner"
        },

        {
            title:
                "SQL & Database",

            description:
                "Learn SQL queries, joins, aggregation and extracting useful information from databases.",

            level:
                "Beginner"
        },

        {
            title:
                "Data Visualization",

            description:
                "Learn how to transform data into meaningful charts, dashboards and reports.",

            level:
                "Intermediate"
        },

        {
            title:
                "Python for Analytics",

            description:
                "Use Python libraries and programming techniques for practical data analysis.",

            level:
                "Intermediate"
        },

        {
            title:
                "Business Analysis",

            description:
                "Develop analytical thinking and convert data into useful business insights.",

            level:
                "Advanced"
        },

        {
            title:
                "Projects & Interview Preparation",

            description:
                "Build portfolio projects and prepare for data analyst interviews.",

            level:
                "Advanced"
        }

    ],


    /* =====================================================
       DATA SCIENCE
    ===================================================== */

    datascience: [

        {
            title:
                "Python Fundamentals",

            description:
                "Build programming fundamentals required for data science and machine learning.",

            level:
                "Beginner"
        },

        {
            title:
                "Statistics & Mathematics",

            description:
                "Learn statistics, probability and mathematical concepts used in data science.",

            level:
                "Beginner"
        },

        {
            title:
                "Data Analysis",

            description:
                "Work with datasets, cleaning, transformation and exploratory data analysis.",

            level:
                "Intermediate"
        },

        {
            title:
                "Machine Learning",

            description:
                "Understand supervised and unsupervised learning and practical model development.",

            level:
                "Intermediate"
        },

        {
            title:
                "Advanced Data Projects",

            description:
                "Build real-world data science projects and strengthen your portfolio.",

            level:
                "Advanced"
        },

        {
            title:
                "Interview Preparation",

            description:
                "Prepare for technical, analytical and HR interviews with practical problem solving.",

            level:
                "Advanced"
        }

    ],


    /* =====================================================
       .NET
    ===================================================== */

    dotnet: [

        {
            title:
                "C# & Programming Fundamentals",

            description:
                "Learn C# syntax, variables, conditions, loops, methods and problem solving.",

            level:
                "Beginner"
        },

        {
            title:
                "Object-Oriented C#",

            description:
                "Understand classes, objects, inheritance, interfaces, exceptions and reusable code.",

            level:
                "Beginner"
        },

        {
            title:
                "SQL & Database",

            description:
                "Learn relational databases, SQL queries, joins, constraints and database design.",

            level:
                "Intermediate"
        },

        {
            title:
                ".NET & Web APIs",

            description:
                "Build backend applications and REST APIs using the .NET ecosystem.",

            level:
                "Intermediate"
        },

        {
            title:
                "Frontend & Full Stack",

            description:
                "Develop responsive web interfaces and integrate them with .NET backend services.",

            level:
                "Advanced"
        },

        {
            title:
                "Projects & Interview Preparation",

            description:
                "Build practical .NET projects and prepare for technical interviews.",

            level:
                "Advanced"
        }

    ],


    /* =====================================================
       MERN
    ===================================================== */

    mern: [

        {
            title:
                "JavaScript Fundamentals",

            description:
                "Build strong JavaScript fundamentals including variables, functions, arrays, objects and ES6 concepts.",

            level:
                "Beginner"
        },

        {
            title:
                "React Development",

            description:
                "Learn components, props, state, hooks and modern React application development.",

            level:
                "Beginner"
        },

        {
            title:
                "Node.js & Express",

            description:
                "Build backend services and REST APIs using Node.js and Express.",

            level:
                "Intermediate"
        },

        {
            title:
                "MongoDB & Database",

            description:
                "Learn document databases, collections, queries and application data management.",

            level:
                "Intermediate"
        },

        {
            title:
                "MERN Full Stack Integration",

            description:
                "Connect React frontend with Node.js, Express and MongoDB to build complete applications.",

            level:
                "Advanced"
        },

        {
            title:
                "Projects & Interview Preparation",

            description:
                "Build full-stack projects and prepare for technical interviews.",

            level:
                "Advanced"
        }

    ],


    /* =====================================================
       SOFTWARE TESTING
    ===================================================== */

    testing: [

        {
            title:
                "Software Testing Fundamentals",

            description:
                "Understand software development lifecycle, testing principles, test cases and defect lifecycle.",

            level:
                "Beginner"
        },

        {
            title:
                "Manual Testing",

            description:
                "Learn functional testing, regression testing, integration testing and test documentation.",

            level:
                "Beginner"
        },

        {
            title:
                "SQL & Database Testing",

            description:
                "Understand database validation, queries and backend data verification.",

            level:
                "Intermediate"
        },

        {
            title:
                "API Testing",

            description:
                "Learn REST API testing, request validation, response verification and API workflows.",

            level:
                "Intermediate"
        },

        {
            title:
                "Automation Testing",

            description:
                "Understand automation concepts, frameworks and automated test execution.",

            level:
                "Advanced"
        },

        {
            title:
                "Projects & QA Interview Preparation",

            description:
                "Practice real testing scenarios and prepare for software testing interviews.",

            level:
                "Advanced"
        }

    ],


    /* =====================================================
       DEVOPS
    ===================================================== */

    devops: [

        {
            title:
                "Linux & Networking Fundamentals",

            description:
                "Learn Linux commands, processes, permissions, networking and server fundamentals.",

            level:
                "Beginner"
        },

        {
            title:
                "Git & Version Control",

            description:
                "Understand Git workflows, branches, merges and collaborative development.",

            level:
                "Beginner"
        },

        {
            title:
                "Docker & Containers",

            description:
                "Learn containerization, Docker images, containers and application deployment.",

            level:
                "Intermediate"
        },

        {
            title:
                "CI/CD Pipelines",

            description:
                "Understand continuous integration, deployment pipelines and automated delivery.",

            level:
                "Intermediate"
        },

        {
            title:
                "Cloud & Infrastructure",

            description:
                "Learn cloud concepts, infrastructure, deployment and scalable application environments.",

            level:
                "Advanced"
        },

        {
            title:
                "DevOps Projects & Interview Preparation",

            description:
                "Build deployment projects and prepare for DevOps and cloud interviews.",

            level:
                "Advanced"
        }

    ],


    /* =====================================================
       C / C++
    ===================================================== */

    cpp: [

        {
            title:
                "C Programming Fundamentals",

            description:
                "Learn variables, operators, conditions, loops, functions and basic problem solving in C.",

            level:
                "Beginner"
        },

        {
            title:
                "Pointers & Memory",

            description:
                "Understand pointers, arrays, memory management and low-level programming concepts.",

            level:
                "Beginner"
        },

        {
            title:
                "C++ & OOP",

            description:
                "Learn classes, objects, inheritance, polymorphism and modern C++ concepts.",

            level:
                "Intermediate"
        },

        {
            title:
                "Data Structures & Algorithms",

            description:
                "Develop problem-solving skills using arrays, linked lists, stacks, queues, trees and algorithms.",

            level:
                "Intermediate"
        },

        {
            title:
                "Advanced C++ Development",

            description:
                "Build stronger C++ programming skills and work with advanced development concepts.",

            level:
                "Advanced"
        },

        {
            title:
                "Projects & Interview Preparation",

            description:
                "Build practical programming projects and prepare for technical interviews.",

            level:
                "Advanced"
        }

    ]

};


/* =========================================================
   PAGE LOAD
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializePage
);


/* =========================================================
   INITIALIZE
========================================================= */

async function initializePage() {

    if (!studentId) {

        showPopup(
            "Login Required",
            "Your student session could not be found. Please login again.",
            "warning"
        );

        setTimeout(
            () => {

                window.location.href =
                    "student-login.html";

            },
            1800
        );

        return;
    }


    showLoader();

    initializeLogout();

    initializeOfficialWebsite();

    initializeHeroButtons();


    try {

        await loadStudent();

        await loadCareerData();

    }
    catch (error) {

        console.error(
            "Courses page error:",
            error
        );

        showDefaultCoursePage();

    }
    finally {

        hideLoader();

    }

}


/* =========================================================
   LOAD STUDENT
========================================================= */

async function loadStudent() {

    const response =
        await fetch(
            STUDENT_API +
            "/" +
            encodeURIComponent(studentId)
        );


    if (!response.ok) {

        throw new Error(
            "Unable to load student."
        );

    }


    const result =
        await response.json();


    if (
        result &&
        result.success &&
        result.data
    ) {

        studentData =
            result.data;


        setText(
            "studentName",
            studentData.name
        );


        setText(
            "studentBranch",
            studentData.branch
        );

    }

}


/* =========================================================
   LOAD CAREER DATA
========================================================= */

async function loadCareerData() {

    const response =
        await fetch(
            RESULT_API +
            "/" +
            encodeURIComponent(studentId)
        );


    if (!response.ok) {

        throw new Error(
            "Unable to load results."
        );

    }


    const result =
        await response.json();


    if (
        !result ||
        !result.success ||
        !Array.isArray(result.data) ||
        result.data.length === 0
    ) {

        showNoRecommendation();

        return;

    }


    const results =
        result.data;


    const completedResults =
        results.filter(
            item => {

                const status =
                    String(
                        item.status ||
                        item.attemptStatus ||
                        ""
                    )
                    .toUpperCase();


                return (
                    !status ||
                    status === "SUBMITTED"
                );

            }
        );


    const sourceResults =
        completedResults.length
            ? completedResults
            : results;


    latestResult =
        sourceResults
            .slice()
            .sort(compareResults)[0];


    if (
        !latestResult ||
        !latestResult.attemptId
    ) {

        showNoRecommendation();

        return;

    }


    await loadRecommendations(
        latestResult.attemptId
    );


    renderCareerInformation();

    renderRoadmap();

    renderPremiumCourses();

    renderLearningStatistics();

}


/* =========================================================
   COMPARE RESULTS
========================================================= */

function compareResults(a, b) {

    const dateA =
        new Date(
            a.createdAt ||
            a.endTime ||
            a.startTime ||
            0
        ).getTime();


    const dateB =
        new Date(
            b.createdAt ||
            b.endTime ||
            b.startTime ||
            0
        ).getTime();


    if (
        Number.isFinite(dateA) &&
        Number.isFinite(dateB) &&
        dateA !== dateB
    ) {

        return dateB - dateA;

    }


    return (
        Number(
            b.attemptId || 0
        )
        -
        Number(
            a.attemptId || 0
        )
    );

}


/* =========================================================
   LOAD RECOMMENDATIONS
========================================================= */

async function loadRecommendations(
    attemptId
) {

    const response =
        await fetch(
            CAREER_RECOMMENDATION_API +
            "/" +
            encodeURIComponent(attemptId)
        );


    if (!response.ok) {

        throw new Error(
            "Unable to load career recommendation."
        );

    }


    const result =
        await response.json();


    if (
        result &&
        result.success &&
        Array.isArray(result.data)
    ) {

        careerRecommendations =
            result.data;

    }
    else {

        careerRecommendations =
            [];

    }


    careerRecommendations.sort(
        (a, b) => {

            return (
                Number(a.rankNo || 999)
                -
                Number(b.rankNo || 999)
            );

        }
    );


    recommendedCareerData =
        careerRecommendations[0]
        ||
        null;

}


/* =========================================================
   CAREER INFORMATION
========================================================= */

function renderCareerInformation() {

    if (!recommendedCareerData) {

        showNoRecommendation();

        return;

    }


    const careerName =
        getCareerName(
            recommendedCareerData
        );


    const percentage =
        getPercentage(
            recommendedCareerData.matchPercentage
        );


    /*
     * IMPORTANT:
     *
     * careerId is now passed to getCourseType().
     *
     * This prevents MERN/.NET/Testing/DevOps/C++
     * recommendations from automatically becoming Java.
     */

    currentCourseType =
        getCourseType(
            careerName,
            recommendedCareerData.careerId
        );


    console.log(
        "Recommended Career:",
        careerName
    );

    console.log(
        "Recommended Career ID:",
        recommendedCareerData.careerId
    );

    console.log(
        "Selected Course Type:",
        currentCourseType
    );


    /*
     * Existing career banner
     */

    setText(
        "recommendedCareer",
        careerName
    );


    setText(
        "careerMatch",
        formatPercentage(percentage)
    );


    setText(
        "recommendedCareerMessage",
        `Your learning path is personalized from your latest assessment performance and your ${careerName} recommendation.`
    );


    /*
     * Hero
     */

    setText(
        "heroCareerName",
        careerName
    );


    setText(
        "heroScoreCareer",
        careerName
    );


    setText(
        "heroMatch",
        formatPercentage(percentage)
    );


    setText(
        "heroDescription",
        `Build the right skills for ${careerName} through a structured roadmap and career-focused learning options.`
    );


    const heroProgress =
        document.getElementById(
            "heroScoreProgress"
        );


    if (heroProgress) {

        heroProgress.style.width =
            `${percentage}%`;

    }

}


/* =========================================================
   LEARNING STATISTICS
========================================================= */

function renderLearningStatistics() {

    const roadmap =
        ROADMAPS[
            currentCourseType
        ];


    const validRoadmap =
        Array.isArray(roadmap)
            ? roadmap
            : [];


    setText(
        "roadmapCount",
        validRoadmap.length
    );


    /*
     * Course count now represents all available
     * course choices, exactly as the existing design.
     */

    setText(
        "courseCount",
        PREMIUM_COURSES.length
    );


    setText(
        "roadmapProgressText",
        `0 / ${validRoadmap.length} Steps`
    );


    setText(
        "roadmapProgressPercent",
        "0%"
    );


    const progressBar =
        document.getElementById(
            "roadmapProgressBar"
        );


    if (progressBar) {

        progressBar.style.width =
            "0%";

    }

}


/* =========================================================
   COURSE TYPE
========================================================= */

function getCourseType(
    careerName,
    careerId
) {

    const id =
        Number(
            careerId
        );


    /*
     * =====================================================
     * PRIMARY MAPPING
     * =====================================================
     *
     * These IDs correspond to the career records used
     * by the recommendation system.
     */

    switch (id) {

        case 3:
            return "java";


        case 4:
            return "python";


        case 5:
            return "dotnet";


        case 6:
            return "mern";


        case 7:
            return "testing";


        case 8:
            return "analytics";


        case 9:
            return "datascience";


        case 10:
            return "devops";


        case 11:
            return "cpp";

    }


    /*
     * =====================================================
     * FALLBACK BY CAREER NAME
     * =====================================================
     */

    const name =
        String(
            careerName || ""
        )
        .toLowerCase()
        .trim();


    if (
        name.includes("data analyst") ||
        name.includes("data analytics") ||
        name.includes("business analyst")
    ) {

        return "analytics";

    }


    if (
        name.includes("data scientist") ||
        name.includes("machine learning")
    ) {

        return "datascience";

    }


    if (
        name.includes("python")
    ) {

        return "python";

    }


    if (
        name.includes("java")
    ) {

        return "java";

    }


    if (
        name.includes(".net") ||
        name.includes("dotnet")
    ) {

        return "dotnet";

    }


    if (
        name.includes("mern")
    ) {

        return "mern";

    }


    if (
        name.includes("software test") ||
        name.includes("software testing") ||
        name.includes("testing") ||
        name.includes("qa engineer") ||
        name.includes("quality assurance")
    ) {

        return "testing";

    }


    if (
        name.includes("devops") ||
        name.includes("cloud")
    ) {

        return "devops";

    }


    if (
        name.includes("c/c++") ||
        name.includes("c++") ||
        name.includes("cpp") ||
        name.includes("c developer")
    ) {

        return "cpp";

    }


    /*
     * IMPORTANT:
     *
     * Do NOT return Java here.
     *
     * Unknown career = no roadmap rather than
     * displaying an incorrect Java roadmap.
     */

    return null;

}


/* =========================================================
   ROADMAP
========================================================= */

function renderRoadmap() {

    const container =
        document.getElementById(
            "roadmapContainer"
        );


    if (!container) {

        return;

    }


    const roadmap =
        ROADMAPS[
            currentCourseType
        ];


    /*
     * No automatic Java fallback.
     */

    if (
        !roadmap ||
        !roadmap.length
    ) {

        container.innerHTML =
            createEmptyState(
                "A personalized roadmap for this career is currently being prepared."
            );

        return;

    }


    container.innerHTML =
        roadmap
            .map(
                (step, index) => {

                    return `

                        <div class="roadmap-step">

                            <div class="step-number">

                                ${index + 1}

                            </div>


                            <div class="step-content">

                                <h3>
                                    ${escapeHtml(
                                        step.title
                                    )}
                                </h3>

                                <p>
                                    ${escapeHtml(
                                        step.description
                                    )}
                                </p>

                            </div>


                            <div class="step-level">

                                ${escapeHtml(
                                    step.level
                                )}

                            </div>

                        </div>

                    `;

                }
            )
            .join("");

}


/* =========================================================
   PREMIUM COURSES
========================================================= */

function renderPremiumCourses() {

    const featuredContainer =
        document.getElementById(
            "featuredCourse"
        );


    const listContainer =
        document.getElementById(
            "premiumCourseList"
        );


    if (
        !featuredContainer ||
        !listContainer
    ) {

        return;

    }


    const courses =
        getOrderedCourses(
            currentCourseType
        );


    const featured =
        courses[0];


    if (!featured) {

        renderDefaultPremiumCourses();

        return;

    }


    /*
     * FEATURED COURSE
     */

    featuredContainer.innerHTML = `

        <div class="featured-top">

            <div class="featured-course-icon">

                <i class="${featured.icon}"></i>

            </div>


            <div class="featured-content">

                <span class="featured-label">

                    RECOMMENDED FOR YOUR CAREER

                </span>


                <h3>

                    ${escapeHtml(
                        featured.fullName
                    )}

                </h3>


                <p>

                    ${escapeHtml(
                        featured.description
                    )}

                </p>

            </div>

        </div>


        <div class="featured-tags">

            ${featured.tags
                .map(
                    tag => `

                        <span class="course-tag">

                            ${escapeHtml(
                                tag
                            )}

                        </span>

                    `
                )
                .join("")}

        </div>


        <button
            type="button"
            class="explore-btn"
            data-course-key="${escapeHtml(
                featured.key
            )}">

            Explore Recommended Course

            <i class="fa-solid fa-arrow-right"></i>

        </button>

    `;


    /*
     * OTHER COURSES
     */

    listContainer.innerHTML =
        courses
            .slice(1)
            .map(
                course => {

                    return `

                        <div
                            class="premium-course-item"
                            data-course-key="${escapeHtml(
                                course.key
                            )}">

                            <div class="course-item-icon">

                                <i class="${course.icon}"></i>

                            </div>


                            <div class="course-item-content">

                                <h4>

                                    ${escapeHtml(
                                        course.name
                                    )}

                                </h4>


                                <p>

                                    ${escapeHtml(
                                        course.description
                                    )}

                                </p>

                            </div>


                            <button
                                type="button"
                                class="course-item-btn"
                                data-course-key="${escapeHtml(
                                    course.key
                                )}">

                                Explore

                                <i class="fa-solid fa-arrow-right"></i>

                            </button>

                        </div>

                    `;

                }
            )
            .join("");


    initializeCourseButtons();

}


/* =========================================================
   ORDER COURSES
========================================================= */

function getOrderedCourses(
    courseType
) {

    const recommended =
        PREMIUM_COURSES.find(
            course =>
                course.key ===
                courseType
        );


    const others =
        PREMIUM_COURSES.filter(
            course =>
                course.key !==
                courseType
        );


    if (recommended) {

        return [
            recommended,
            ...others
        ];

    }


    return [
        ...PREMIUM_COURSES
    ];

}


/* =========================================================
   COURSE BUTTONS
========================================================= */

function initializeCourseButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-course-key]"
        );


    buttons.forEach(
        button => {

            button.addEventListener(
                "click",
                function (event) {

                    event.stopPropagation();


                    const key =
                        button.dataset.courseKey;


                    const course =
                        PREMIUM_COURSES.find(
                            item =>
                                item.key === key
                        );


                    if (course) {

                        openCourse(
                            course.url
                        );

                    }

                }
            );

        }
    );

}


/* =========================================================
   HERO BUTTONS
========================================================= */

function initializeHeroButtons() {

    const exploreButton =
        document.getElementById(
            "heroExploreBtn"
        );


    const roadmapButton =
        document.getElementById(
            "heroRoadmapBtn"
        );


    if (exploreButton) {

        exploreButton.addEventListener(
            "click",
            function () {

                const course =
                    PREMIUM_COURSES.find(
                        item =>
                            item.key ===
                            currentCourseType
                    );


                if (course) {

                    openCourse(
                        course.url
                    );

                }

            }
        );

    }


    if (roadmapButton) {

        roadmapButton.addEventListener(
            "click",
            function () {

                const section =
                    document.getElementById(
                        "roadmapSection"
                    );


                if (section) {

                    section.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                }

            }
        );

    }

}


/* =========================================================
   OPEN COURSE
========================================================= */

function openCourse(
    url
) {

    if (!url) {

        showPopup(
            "Course Unavailable",
            "The course link is currently unavailable. Please visit Giri's Tech Hub.",
            "warning"
        );

        return;

    }


    window.open(
        url,
        "_blank",
        "noopener,noreferrer"
    );

}


/* =========================================================
   OFFICIAL WEBSITE
========================================================= */

function initializeOfficialWebsite() {

    const button =
        document.getElementById(
            "officialWebsiteBtn"
        );


    if (!button) {

        return;

    }


    button.addEventListener(
        "click",
        function () {

            openCourse(
                OFFICIAL_WEBSITE
            );

        }
    );

}


/* =========================================================
   NO RECOMMENDATION
========================================================= */

function showNoRecommendation() {

    currentCourseType =
        null;


    setText(
        "recommendedCareer",
        "Complete an Assessment"
    );


    setText(
        "careerMatch",
        "-"
    );


    setText(
        "heroCareerName",
        "Career Goal"
    );


    setText(
        "heroScoreCareer",
        "Complete an assessment"
    );


    setText(
        "heroMatch",
        "-"
    );


    setText(
        "recommendedCareerMessage",
        "Complete an assessment to receive a personalized career roadmap."
    );


    setText(
        "heroDescription",
        "Complete your assessment and we will personalize the learning journey around your recommended career."
    );


    renderRoadmap();

    renderDefaultPremiumCourses();

    renderLearningStatistics();

}


/* =========================================================
   DEFAULT PREMIUM
========================================================= */

function renderDefaultPremiumCourses() {

    const featuredContainer =
        document.getElementById(
            "featuredCourse"
        );


    const listContainer =
        document.getElementById(
            "premiumCourseList"
        );


    if (
        !featuredContainer ||
        !listContainer
    ) {

        return;

    }


    const courses =
        PREMIUM_COURSES;


    const featured =
        courses[0];


    featuredContainer.innerHTML = `

        <div class="featured-top">

            <div class="featured-course-icon">

                <i class="${featured.icon}"></i>

            </div>


            <div class="featured-content">

                <span class="featured-label">

                    FLAGSHIP LEARNING PATH

                </span>


                <h3>

                    ${escapeHtml(
                        featured.fullName
                    )}

                </h3>


                <p>

                    ${escapeHtml(
                        featured.description
                    )}

                </p>

            </div>

        </div>


        <div class="featured-tags">

            ${featured.tags
                .map(
                    tag => `

                        <span class="course-tag">

                            ${escapeHtml(
                                tag
                            )}

                        </span>

                    `
                )
                .join("")}

        </div>


        <button
            type="button"
            class="explore-btn"
            data-course-key="${featured.key}">

            Explore Course

            <i class="fa-solid fa-arrow-right"></i>

        </button>

    `;


    listContainer.innerHTML =
        courses
            .slice(1)
            .map(
                course => `

                    <div
                        class="premium-course-item"
                        data-course-key="${course.key}">

                        <div class="course-item-icon">

                            <i class="${course.icon}"></i>

                        </div>


                        <div class="course-item-content">

                            <h4>

                                ${escapeHtml(
                                    course.name
                                )}

                            </h4>


                            <p>

                                ${escapeHtml(
                                    course.description
                                )}

                            </p>

                        </div>


                        <button
                            type="button"
                            class="course-item-btn"
                            data-course-key="${course.key}">

                            Explore

                            <i class="fa-solid fa-arrow-right"></i>

                        </button>

                    </div>

                `
            )
            .join("");


    initializeCourseButtons();

}


/* =========================================================
   DEFAULT COURSE PAGE
========================================================= */

function showDefaultCoursePage() {

    currentCourseType =
        null;

    showNoRecommendation();

}


/* =========================================================
   LOGOUT
========================================================= */

function initializeLogout() {

    const logout =
        document.getElementById(
            "logoutBtn"
        );


    if (!logout) {

        return;

    }


    logout.addEventListener(
        "click",
        function () {

            showPopup(
                "Logout",
                "Are you sure you want to logout?",
                "warning",
                true
            );

        }
    );

}


/* =========================================================
   CONFIRM LOGOUT
========================================================= */

function confirmLogout() {

    localStorage.removeItem(
        "studentId"
    );


    localStorage.removeItem(
        "currentAssessment"
    );


    localStorage.removeItem(
        "currentAttemptId"
    );


    window.location.href =
        "student-login.html";

}


/* =========================================================
   LOADER
========================================================= */

function showLoader() {

    const loader =
        document.getElementById(
            "pageLoader"
        );


    if (loader) {

        loader.style.display =
            "flex";

    }

}


function hideLoader() {

    const loader =
        document.getElementById(
            "pageLoader"
        );


    if (loader) {

        loader.style.display =
            "none";

    }

}


/* =========================================================
   POPUP
========================================================= */

let popupLogoutMode =
    false;


function showPopup(
    title,
    message,
    type = "info",
    logoutMode = false
) {

    const overlay =
        document.getElementById(
            "popupOverlay"
        );


    const popupTitle =
        document.getElementById(
            "popupTitle"
        );


    const popupMessage =
        document.getElementById(
            "popupMessage"
        );


    const popupIcon =
        document.getElementById(
            "popupIcon"
        );


    const closeButton =
        document.getElementById(
            "popupClose"
        );


    if (
        !overlay ||
        !popupTitle ||
        !popupMessage ||
        !popupIcon ||
        !closeButton
    ) {

        return;

    }


    popupLogoutMode =
        logoutMode;


    popupTitle.textContent =
        title;


    popupMessage.textContent =
        message;


    closeButton.textContent =
        logoutMode
            ? "Logout"
            : "Continue";


    if (type === "warning") {

        popupIcon.innerHTML =
            '<i class="fa-solid fa-triangle-exclamation"></i>';

        popupIcon.style.background =
            "#fff4df";

        popupIcon.style.color =
            "#e79500";

    }
    else if (type === "error") {

        popupIcon.innerHTML =
            '<i class="fa-solid fa-circle-xmark"></i>';

        popupIcon.style.background =
            "#fff0f0";

        popupIcon.style.color =
            "#e22b2b";

    }
    else {

        popupIcon.innerHTML =
            '<i class="fa-solid fa-circle-info"></i>';

        popupIcon.style.background =
            "#eef3ff";

        popupIcon.style.color =
            "#233b8f";

    }


    overlay.classList.add(
        "show"
    );

}


/* =========================================================
   POPUP EVENTS
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const closeButton =
            document.getElementById(
                "popupClose"
            );


        const overlay =
            document.getElementById(
                "popupOverlay"
            );


        if (closeButton) {

            closeButton.addEventListener(
                "click",
                function () {

                    if (
                        popupLogoutMode
                    ) {

                        confirmLogout();

                    }
                    else {

                        closePopup();

                    }

                }
            );

        }


        if (overlay) {

            overlay.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target === overlay
                    ) {

                        closePopup();

                    }

                }
            );

        }

    }
);


/* =========================================================
   CLOSE POPUP
========================================================= */

function closePopup() {

    const overlay =
        document.getElementById(
            "popupOverlay"
        );


    popupLogoutMode =
        false;


    if (overlay) {

        overlay.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   EMPTY STATE
========================================================= */

function createEmptyState(
    message
) {

    return `

        <div class="empty-course">

            <i class="fa-solid fa-route"></i>

            <p>

                ${escapeHtml(
                    message
                )}

            </p>

        </div>

    `;

}


/* =========================================================
   GET CAREER NAME
========================================================= */

function getCareerName(
    career
) {

    return (
        career?.careerName
        ||
        career?.career_name
        ||
        "Career Recommendation"
    );

}


/* =========================================================
   GET PERCENTAGE
========================================================= */

function getPercentage(
    value
) {

    const number =
        Number(value);


    if (
        !Number.isFinite(number)
    ) {

        return 0;

    }


    return Math.max(
        0,
        Math.min(
            100,
            number
        )
    );

}


/* =========================================================
   FORMAT PERCENTAGE
========================================================= */

function formatPercentage(
    value
) {

    return (
        getPercentage(value)
            .toFixed(2)
            .replace(
                /\.00$/,
                ""
            )
        +
        "%"
    );

}


/* =========================================================
   SET TEXT
========================================================= */

function setText(
    id,
    value
) {

    const element =
        document.getElementById(
            id
        );


    if (!element) {

        return;

    }


    element.textContent =
        value === null ||
        value === undefined ||
        value === ""
            ? "-"
            : value;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeHtml(
    value
) {

    return String(
        value ?? ""
    )
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


/* =========================================================
   GLOBAL
========================================================= */

window.openCourse =
    openCourse;

window.confirmLogout =
    confirmLogout;