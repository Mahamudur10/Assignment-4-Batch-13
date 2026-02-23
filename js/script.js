let interviewList = [];
let rejectedList = [];

let Total = document.getElementById("total");
let InterviewCount = document.getElementById("interviewCount");
let RejectedCount = document.getElementById("rejectedCount");

// when click button bg color change
const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');


// total number display
const allCardSection = document.getElementById("allCards");

// event deligation
const mainContainer = document.querySelector('main')
console.log(mainContainer);


function calculatorCount(){
    Total.innerText = allCardSection.children.length;
    InterviewCount.innerText = interviewList.length;
    RejectedCount.innerText = rejectedList.length;
}
calculatorCount()

// use toggleing system when click button change button bg-clr and text color
function toggleStyle(id){
    allFilterBtn.classList.remove('bg-[#3b82f6]','text-[#ffffff]')
    interviewFilterBtn.classList.remove('bg-[#3b82f6]','text-[#ffffff]')
    rejectedFilterBtn.classList.remove('bg-[#3b82f6]','text-[#ffffff]')

    
    allFilterBtn.classList.add('bg-[#ffffff]','text-[#64748b]')
    interviewFilterBtn.classList.add('bg-[#ffffff]','text-[#64748b]')
    rejectedFilterBtn.classList.add('bg-[#ffffff]','text-[#64748b]')

    const selected = document.getElementById(id)

    selected.classList.remove('bg-[#ffffff]','text-[#64748b]')
    selected.classList.add('bg-[#3b82f6]','text-[#ffffff]')
}