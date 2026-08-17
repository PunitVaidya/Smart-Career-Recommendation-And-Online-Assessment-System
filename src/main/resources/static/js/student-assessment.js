/*=========================================================
 STUDENT ASSESSMENT JAVASCRIPT
 GIRIS TECH HUB
=========================================================*/


const STUDENT_API = "/api/student";

const ASSESSMENT_API = "/api/assessment";

const RESULT_API = "/api/student-result/student";



let studentId =
localStorage.getItem("studentId");


let assessmentList = [];

let studentGoal = "";





/*=========================================================
 PAGE LOAD
=========================================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


if(!studentId){


alert(
"Student not logged in"
);


window.location.href =
"student-login.html";


return;


}


loadStudent();

loadAssessments();

initializeSearch();

initializeLogout();


});





/*=========================================================
 LOAD STUDENT
=========================================================*/


async function loadStudent(){


try{


const response =
await fetch(
STUDENT_API +
"/" +
studentId
);


const result =
await response.json();



if(result.success){


let student =
result.data;



/*---------------------------------------------
 STUDENT BASIC INFORMATION
---------------------------------------------*/


setText(
"studentName",
student.name
);


setText(
"studentBranch",
student.branch
);




/*---------------------------------------------
 GET STUDENT GOAL

 Supports:
 goal
 careerGoal
 studentGoal

 The main project field is expected to be:
 student.goal
---------------------------------------------*/


studentGoal =
normalizeGoal(
student.goal ||
student.careerGoal ||
student.studentGoal ||
""
);



console.log(
"Student Goal:",
studentGoal
);



}


}

catch(error){


console.error(
"Student Loading Error",
error
);


}


}







/*=========================================================
 LOAD ASSESSMENTS
=========================================================*/


async function loadAssessments(){


showLoader();


try{



/*=====================================================
 GET ALL ASSESSMENTS

 We are KEEPING this API because your
 ACTIVE / INACTIVE functionality is already working.
=====================================================*/


const assessmentResponse =
await fetch(
ASSESSMENT_API +
"/all"
);


const assessmentResult =
await assessmentResponse.json();



if(!assessmentResult.success){


showEmpty(
"Unable to load assessments"
);


hideLoader();


return;


}





/*=====================================================
 GET STUDENT INFORMATION

 We fetch the student here as well so that this
 function always has the latest goal.

 This also avoids depending on the execution order
 of loadStudent() and loadAssessments().
=====================================================*/


const studentResponse =
await fetch(
STUDENT_API +
"/" +
studentId
);


const studentResult =
await studentResponse.json();




if(
studentResult.success &&
studentResult.data
){


const student =
studentResult.data;



studentGoal =
normalizeGoal(
student.goal ||
student.careerGoal ||
student.studentGoal ||
""
);



console.log(
"Current Student Goal:",
studentGoal
);


}






/*=====================================================
 GET STUDENT RESULTS
=====================================================*/


const resultResponse =
await fetch(

RESULT_API +
"/" +
studentId

);


const resultData =
await resultResponse.json();




let completedResults = [];



if(resultData.success){


completedResults =
resultData.data || [];


}






/*=====================================================
 FILTER ASSESSMENTS

 FINAL RULE:

 1. Assessment must be ACTIVE
 2. Assessment must match student's GOAL
 3. Completed status is calculated separately
=====================================================*/


assessmentList =

(assessmentResult.data || [])

.filter(
assessment => {

/*---------------------------------------------
 STEP 1
 Only ACTIVE assessments
---------------------------------------------*/


if(
normalizeStatus(
assessment.status
) !== "ACTIVE"
){

return false;

}


/*---------------------------------------------
 STEP 2
 Assessment must match student goal
---------------------------------------------*/


return assessmentMatchesStudentGoal(
assessment,
studentGoal
);

}

)


.map(
assessment=>{


let completed =

completedResults.some(

result =>

result.assessmentId
===
assessment.assessmentId

);



return {


...assessment,


completed: completed



};


}

);






/*=====================================================
 DISPLAY
=====================================================*/


displayAssessments(
assessmentList
);


updateStatistics(
assessmentList
);



hideLoader();


}


catch(error){


console.error(
"Assessment Error",
error
);


showEmpty(
"Unable to load assessments"
);


hideLoader();


}


}







/*=========================================================
 CHECK ASSESSMENT AGAINST STUDENT GOAL
=========================================================*/


function assessmentMatchesStudentGoal(
assessment,
goal
){


/*=====================================================
 IF STUDENT HAS NO GOAL

 Do not show random assessments.

 This is safer than showing every assessment.
=====================================================*/


if(!goal){


console.warn(
"Student goal is not available."
);


return false;


}



/*=====================================================
 GET ASSESSMENT INFORMATION
=====================================================*/


const assessmentType =
normalizeAssessmentType(
assessment.assessmentType
);


const assessmentName =
normalizeText(
assessment.assessmentName
);






/*=====================================================
 GOAL 1
 EXPLORE IT CAREERS
=====================================================*/


if(
goal === "EXPLORE_IT_CAREERS"
){


return (

assessmentType ===
"CAREER_DISCOVERY"

);


}






/*=====================================================
 GOAL 2
 LEARN PROGRAMMING
=====================================================*/


if(
goal === "LEARN_PROGRAMMING"
){


/*
 TECHNICAL assessments are shown.

 But Placement Preparation is also currently
 represented as TECHNICAL in the existing data.

 Therefore exclude Placement Preparation
 by its assessment name.
*/


const isPlacementAssessment =

assessmentName.includes(
"placement preparation"
);



return (

assessmentType ===
"TECHNICAL"

&&

!isPlacementAssessment

);


}






/*=====================================================
 GOAL 3
 PLACEMENT PREPARATION
=====================================================*/


if(
goal === "PLACEMENT_PREPARATION"
){


/*
 Your current Placement Preparation assessment
 has historically been stored with TECHNICAL type.

 Therefore we identify it by its assessment name.

 This keeps the existing database working without
 changing your current ACTIVE / INACTIVE logic.
*/


return (

assessmentName.includes(
"placement preparation"
)

);


}






/*=====================================================
 UNKNOWN GOAL
=====================================================*/


console.warn(
"Unknown student goal:",
goal
);


return false;


}







/*=========================================================
 NORMALIZE STUDENT GOAL
=========================================================*/


function normalizeGoal(
goal
){


if(!goal){

return "";

}


return String(
goal
)

.trim()

.toUpperCase()

.replace(
/[\s-]+/g,
"_"
);


}







/*=========================================================
 NORMALIZE ASSESSMENT TYPE
=========================================================*/


function normalizeAssessmentType(
type
){


if(!type){

return "";

}


return String(
type
)

.trim()

.toUpperCase()

.replace(
/[\s-]+/g,
"_"
);


}







/*=========================================================
 NORMALIZE TEXT
=========================================================*/


function normalizeText(
value
){


if(!value){

return "";

}


return String(
value
)

.trim()

.toLowerCase();


}







/*=========================================================
 NORMALIZE STATUS
=========================================================*/


function normalizeStatus(
status
){


if(!status){

return "";

}


return String(
status
)

.trim()

.toUpperCase();


}







/*=========================================================
 DISPLAY ASSESSMENTS
=========================================================*/


function displayAssessments(
data
){



const container =
document.getElementById(
"assessmentContainer"
);



container.innerHTML = "";






if(data.length === 0){


showEmpty(
getEmptyAssessmentMessage()
);


return;


}






data.forEach(
assessment=>{



let card =
document.createElement(
"div"
);



card.className =
"assessment-card";





card.innerHTML = `


<h2>

${assessment.assessmentName}

</h2>



<p class="assessment-description">

${assessment.description ||
"No Description Available"}

</p>




<span class="status-badge

${
assessment.completed

?

"status-completed"

:

"status-pending"

}

">


${
assessment.completed

?

"Completed"

:

"Pending"

}


</span>





<div class="assessment-actions">


${
assessment.completed


?


`

<button

class="view-btn"

onclick="viewResult(${assessment.assessmentId})">


<i class="fa-solid fa-chart-column"></i>

View Result


</button>


`



:


`

<button

class="start-btn"

onclick="startAssessment(${assessment.assessmentId})">


<i class="fa-solid fa-play"></i>

Start Assessment


</button>



`

}





</div>



`;



container.appendChild(card);



});


}







/*=========================================================
 EMPTY MESSAGE BASED ON STUDENT GOAL
=========================================================*/


function getEmptyAssessmentMessage(){


if(
studentGoal ===
"EXPLORE_IT_CAREERS"
){


return (
"No active assessments are currently available for your career exploration goal."
);


}



if(
studentGoal ===
"LEARN_PROGRAMMING"
){


return (
"No active programming assessments are currently available for your goal."
);


}



if(
studentGoal ===
"PLACEMENT_PREPARATION"
){


return (
"No active placement preparation assessments are currently available for your goal."
);


}



return (
"No active assessments are currently available for your selected goal."
);


}







/*=========================================================
 STATISTICS
=========================================================*/


function updateStatistics(
data
){



let total =
data.length;



let completed =

data.filter(

item =>
item.completed

).length;



let pending =
total - completed;





setText(
"availableCount",
total
);



setText(
"pendingCount",
pending
);



setText(
"completedCount",
completed
);



}







/*=========================================================
 START ASSESSMENT
=========================================================*/


function startAssessment(
id
){



console.log(
"Assessment ID:",
id
);



window.location.href =

"student-assessment-instruction.html?assessmentId="
+
id;



}







/*=========================================================
 VIEW RESULT
=========================================================*/


function viewResult(
id
){



window.location.href =

"student-results.html?assessmentId="
+
id;



}







/*=========================================================
 SEARCH
=========================================================*/


function initializeSearch(){



const search =

document.getElementById(
"searchAssessment"
);





if(search){



search.addEventListener(

"input",

()=>{


let value =

search.value
.toLowerCase();





let filtered =


assessmentList.filter(

item =>



item.assessmentName

.toLowerCase()

.includes(value)



);





displayAssessments(
filtered
);



}


);



}



}







/*=========================================================
 LOGOUT
=========================================================*/


function initializeLogout(){



const logout =

document.querySelector(
".logout-btn"
);





if(logout){



logout.onclick = ()=>{



if(confirm(
"Are you sure you want to logout?"
)){



localStorage.removeItem(
"studentId"
);



window.location.href =
"student-login.html";



}



};



}



}







/*=========================================================
 LOADER
=========================================================*/


function showLoader(){



let loader =

document.getElementById(
"pageLoader"
);



if(loader){


loader.style.display =
"flex";


}



}





function hideLoader(){



let loader =

document.getElementById(
"pageLoader"
);



if(loader){


loader.style.display =
"none";


}



}







/*=========================================================
 HELPERS
=========================================================*/


function setText(
id,
value
){



let element =

document.getElementById(id);



if(element){


element.innerHTML =
value || "-";


}



}







function showEmpty(
message
){



const container =

document.getElementById(
"assessmentContainer"
);





if(container){



container.innerHTML = `


<div class="empty-message">

${message}

</div>


`;



}



}