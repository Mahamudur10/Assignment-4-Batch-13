let Total = document.getElementById("total");
let InterviewCount = document.getElementById("interviewCount");
let RejectedCount = document.getElementById("rejectedCount");

// total number display
const allCardSection = document.getElementById("allCards");
console.log(allCardSection.children.length);

function calculatorCount(){
    Total.innerText = allCardSection.children.length;
}
calculatorCount()