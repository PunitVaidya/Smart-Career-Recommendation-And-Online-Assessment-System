/*=========================================================
 STUDENT ASSESSMENT INSTRUCTION JS
 GIRIS TECH HUB
=========================================================*/


const STUDENT_API =
"/api/student";


const ASSESSMENT_API =
"/api/assessment";


let studentId =
localStorage.getItem("studentId");


let assessmentId = null;


let assessmentData = null;





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



getAssessmentId();


loadStudent();


loadAssessment();


initializeEvents();


initializeLogout();



});






/*=========================================================
 GET ASSESSMENT ID
=========================================================*/


function getAssessmentId(){



let params =
new URLSearchParams(
window.location.search
);



assessmentId =
params.get(
"assessmentId"
);



if(!assessmentId){


alert(
"Invalid Assessment"
);



window.location.href =
"student-assessment.html";



}



}








/*=========================================================
 LOAD STUDENT
=========================================================*/


async function loadStudent(){


try{


let response =
await fetch(
STUDENT_API+
"/"+
studentId
);



let result =
await response.json();




if(result.success){


let student =
result.data;



setText(
"studentName",
student.name
);



setText(
"studentBranch",
student.branch
);



}



}

catch(error){


console.log(error);


}



}








/*=========================================================
 LOAD ASSESSMENT
=========================================================*/


async function loadAssessment(){


try{



showLoader();



let response =
await fetch(

ASSESSMENT_API+
"/"+
assessmentId

);



let result =
await response.json();



if(result.success){



assessmentData =
result.data;



displayAssessment(
assessmentData
);



localStorage.setItem(

"currentAssessment",

JSON.stringify(
assessmentData
)

);



}

else{


alert(
"Assessment not found"
);



}



hideLoader();



}


catch(error){



console.error(
error
);



alert(
"Unable to load assessment"
);



hideLoader();



}



}









/*=========================================================
 DISPLAY DATA
=========================================================*/


function displayAssessment(
assessment
){



setText(
"assessmentName",
assessment.assessmentName
);



setText(
"assessmentType",
assessment.assessmentType
);



setText(
"duration",
assessment.duration+
" Minutes"
);



setText(
"totalQuestions",
assessment.totalQuestions
);



setText(
"totalMarks",
assessment.totalMarks
);



}









/*=========================================================
 EVENTS
=========================================================*/


function initializeEvents(){



const checkbox =
document.getElementById(
"agree"
);



const button =
document.getElementById(
"startExam"
);





button.disabled = true;





checkbox.addEventListener(
"change",
()=>{


button.disabled =
!checkbox.checked;



});







button.addEventListener(
"click",
()=>{



if(!checkbox.checked){


return;


}



window.location.href =

"student-assessment-attempt.html?assessmentId="
+
assessmentId;



});





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



logout.onclick=()=>{


if(confirm(
"Are you sure you want to logout?"
)){


localStorage.removeItem(
"studentId"
);



localStorage.removeItem(
"currentAssessment"
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
"loader"
);


if(loader)

loader.style.display="flex";


}




function hideLoader(){


let loader =
document.getElementById(
"loader"
);


if(loader)

loader.style.display="none";


}








/*=========================================================
 HELPER
=========================================================*/


function setText(
id,
value
){


let element =
document.getElementById(id);



if(element)

element.innerHTML =
value || "-";


}