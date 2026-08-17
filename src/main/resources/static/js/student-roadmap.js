// ======================================================
// Giris Tech Hub
// Student Learning Roadmap
// ======================================================



// ==========================================
// API URL
// ==========================================

const ROADMAP_API =
    "http://localhost:8080/api/roadmap/";



// ==========================================
// Local Storage
// ==========================================

const recommendationId =
    localStorage.getItem("recommendationId");



// ==========================================
// Hero Section
// ==========================================

const careerName =
    document.getElementById("careerName");

const careerDescription =
    document.getElementById("careerDescription");



// ==========================================
// Progress Section
// ==========================================

const progressPercentage =
    document.getElementById("progressPercentage");

const progressFill =
    document.getElementById("progressFill");

const completedTopics =
    document.getElementById("completedTopics");

const totalTopics =
    document.getElementById("totalTopics");



// ==========================================
// Summary Cards
// ==========================================

const totalPhases =
    document.getElementById("totalPhases");

const totalLessons =
    document.getElementById("totalLessons");

const estimatedDuration =
    document.getElementById("estimatedDuration");

const difficultyLevel =
    document.getElementById("difficultyLevel");



// ==========================================
// Dynamic Containers
// ==========================================

const roadmapContainer =
    document.getElementById("roadmapContainer");

const skillsContainer =
    document.getElementById("skillsContainer");



// ==========================================
// Buttons
// ==========================================

const backButton =
    document.querySelector(".back-btn");

const premiumCourseButton =
    document.getElementById("premiumCourseButton");



// ==========================================
// Page Load
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    function() {

        // Backend

        // fetchRoadmap();

        // Frontend Dummy Data

        loadDummyRoadmap();

    }

);

// ==========================================
// Fetch Roadmap (Spring Boot)
// ==========================================

async function fetchRoadmap() {

    try {

        const response = await fetch(

            ROADMAP_API + recommendationId

        );

        if (!response.ok) {

            throw new Error(

                "Unable to fetch roadmap."

            );

        }

        const data = await response.json();

        populateRoadmap(data);

    }

    catch (error) {

        console.error(error);

        alert(

            "Unable to load roadmap."

        );

    }

}



// ==========================================
// Populate Roadmap
// ==========================================

function populateRoadmap(data) {

    // Hero Section

    careerName.textContent =
        data.careerName;

    careerDescription.textContent =
        data.description;



    // Progress

    progressPercentage.textContent =
        data.progress + "%";

    progressFill.style.width =
        data.progress + "%";

    completedTopics.textContent =
        data.completedTopics;

    totalTopics.textContent =
        data.totalTopics;



    // Summary

    totalPhases.textContent =
        data.totalPhases;

    totalLessons.textContent =
        data.totalLessons;

    estimatedDuration.textContent =
        data.duration;

    difficultyLevel.textContent =
        data.difficulty;



    // Clear Dynamic Sections

    clearContainers();



    // Dynamic Sections

    loadRoadmap(

        data.phases

    );



    loadSkills(

        data.skills

    );

}



// ==========================================
// Clear Dynamic Containers
// ==========================================

function clearContainers() {

    roadmapContainer.innerHTML = "";

    skillsContainer.innerHTML = "";

}

// ==========================================
// Load Learning Roadmap
// ==========================================

function loadRoadmap(phases) {

    roadmapContainer.innerHTML = "";

    if (!phases || phases.length === 0) {

        roadmapContainer.innerHTML = `

            <div class="roadmap-card">

                <h3>No Roadmap Available</h3>

                <p>No learning roadmap has been generated.</p>

            </div>

        `;

        return;

    }

    phases.forEach((phase, index) => {

        let topicsHTML = "";

        phase.topics.forEach(topic => {

            topicsHTML += `

                <li>

                    <i class="fa-solid fa-circle-check"></i>

                    ${topic}

                </li>

            `;

        });

        roadmapContainer.innerHTML += `

            <div class="roadmap-card">

                <div class="phase-header">

                    <div>

                        <span class="phase-number">

                            Phase ${index + 1}

                        </span>

                        <h3>

                            ${phase.title}

                        </h3>

                    </div>

                    <span class="status ${phase.status.toLowerCase()}">

                        ${phase.status}

                    </span>

                </div>

                <ul>

                    ${topicsHTML}

                </ul>

            </div>

        `;

    });

}



// ==========================================
// Load Skills
// ==========================================

function loadSkills(skills) {

    skillsContainer.innerHTML = "";

    if (!skills || skills.length === 0) {

        skillsContainer.innerHTML =

            "<p>No Skills Available.</p>";

        return;

    }

    skills.forEach(skill => {

        skillsContainer.innerHTML += `

            <span class="skill-tag">

                ${skill}

            </span>

        `;

    });

}

// ==========================================
// Back Button
// ==========================================

if (backButton) {

    backButton.addEventListener(

        "click",

        function() {

            window.location.href =
                "student-career-details.html";

        }

    );

}



// ==========================================
// Premium Course Button
// ==========================================

if (premiumCourseButton) {

    premiumCourseButton.addEventListener(

        "click",

        function() {

            localStorage.setItem(

                "recommendationId",

                recommendationId

            );

            window.location.href =
                "student-premium-course.html";

        }

    );

}



// ==========================================
// Show Error
// ==========================================

function showError(message) {

    console.error(message);

    alert(message);

}



// ==========================================
// Reset Roadmap Page
// ==========================================

function resetRoadmap() {

    careerName.textContent = "-";

    careerDescription.textContent = "-";

    progressPercentage.textContent = "0%";

    progressFill.style.width = "0%";

    completedTopics.textContent = "0";

    totalTopics.textContent = "0";

    totalPhases.textContent = "0";

    totalLessons.textContent = "0";

    estimatedDuration.textContent = "-";

    difficultyLevel.textContent = "-";

    clearContainers();

}

// ==========================================
// Dummy Roadmap Data
// ==========================================

function loadDummyRoadmap() {

    const roadmap = {

        careerName: "Java Backend Developer",

        description:
            "Master Java, Spring Boot, Hibernate, REST APIs and MySQL by following this structured learning roadmap.",

        progress: 40,

        completedTopics: 12,

        totalTopics: 30,

        totalPhases: 6,

        totalLessons: 30,

        duration: "3 Months",

        difficulty: "Intermediate",

        phases: [

            {

                title: "Java Fundamentals",

                status: "Completed",

                topics: [

                    "Introduction to Java",

                    "Variables & Data Types",

                    "Operators",

                    "Conditional Statements",

                    "Loops",

                    "Arrays",

                    "Methods",

                    "Object Oriented Programming"

                ]

            },

            {

                title: "Advanced Java",

                status: "Progress",

                topics: [

                    "Collections",

                    "Exception Handling",

                    "File Handling",

                    "Multithreading",

                    "JDBC"

                ]

            },

            {

                title: "Database",

                status: "Locked",

                topics: [

                    "SQL",

                    "MySQL",

                    "Joins",

                    "Normalization",

                    "Stored Procedures"

                ]

            },

            {

                title: "Spring Boot",

                status: "Locked",

                topics: [

                    "Spring Core",

                    "Spring MVC",

                    "Spring Boot",

                    "REST API",

                    "Hibernate",

                    "Spring Security"

                ]

            },

            {

                title: "Development Tools",

                status: "Locked",

                topics: [

                    "Git",

                    "GitHub",

                    "Maven",

                    "Docker",

                    "Postman"

                ]

            },

            {

                title: "Projects",

                status: "Locked",

                topics: [

                    "Student Management System",

                    "Employee Management System",

                    "Online Examination System",

                    "E-Commerce Backend"

                ]

            }

        ],

        skills: [

            "Java",

            "Spring Boot",

            "Hibernate",

            "REST API",

            "MySQL",

            "Git",

            "Docker",

            "Maven",

            "Spring Security",

            "Microservices"

        ]

    };

    populateRoadmap(roadmap);

}

// ==========================================
// Backend Integration
// ==========================================

// Uncomment this when Spring Boot backend is ready

/*
async function loadRoadmapFromBackend() {

    try {

        const response = await fetch(

            ROADMAP_API + recommendationId

        );

        if (!response.ok) {

            throw new Error(

                "Roadmap not found."

            );

        }

        const roadmap = await response.json();

        populateRoadmap(roadmap);

    }

    catch (error) {

        console.error(error);

        showError(

            "Unable to load learning roadmap."

        );

        resetRoadmap();

    }

}
*/


// ==========================================
// Page Initialization
// ==========================================

document.addEventListener(

    "DOMContentLoaded",

    function () {

        // Development Mode

        loadDummyRoadmap();

        // Production Mode

        // if (!recommendationId) {

        //     alert("Recommendation not found.");

        //     window.location.href =

        //         "student-ai-career-recommendation.html";

        //     return;

        // }

        // loadRoadmapFromBackend();

    }

);



// ==========================================
// Expected Spring Boot JSON
// ==========================================

/*

GET

/api/roadmap/{recommendationId}


{

    "careerName":"Java Backend Developer",

    "description":"Roadmap Description",

    "progress":40,

    "completedTopics":12,

    "totalTopics":30,

    "totalPhases":6,

    "totalLessons":30,

    "duration":"3 Months",

    "difficulty":"Intermediate",


    "phases":[

        {

            "title":"Java Fundamentals",

            "status":"Completed",

            "topics":[

                "Introduction to Java",

                "Variables",

                "Loops",

                "Arrays",

                "OOP"

            ]

        },

        {

            "title":"Advanced Java",

            "status":"Progress",

            "topics":[

                "Collections",

                "JDBC",

                "Exception Handling"

            ]

        },

        {

            "title":"Spring Boot",

            "status":"Locked",

            "topics":[

                "Spring Core",

                "Spring Boot",

                "REST API"

            ]

        }

    ],

    "skills":[

        "Java",

        "Spring Boot",

        "Hibernate",

        "REST API",

        "MySQL",

        "Git",

        "Docker"

    ]

}

*/


// ==========================================
// Future Navigation
// ==========================================

/*

Career Details
        │
        ▼
Learning Roadmap
        │
        ▼
Premium Course
        │
        ▼
Course Details
        │
        ▼
Course Enrollment
        │
        ▼
Learning Dashboard

*/

