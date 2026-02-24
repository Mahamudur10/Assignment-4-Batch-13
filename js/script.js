let interviewList = [];
let rejectedList = [];
let currentApply = 'all';

const Total = document.getElementById("total");
const InterviewCount = document.getElementById("interviewCount");
const RejectedCount = document.getElementById("rejectedCount");


const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');


const allCardSection = document.getElementById("allCards");
const filterSection = document.getElementById("filtered-section");
const mainContainer = document.querySelector('main');


// count function  
function calculatorCount() {
    Total.innerText = allCardSection.children.length;
    InterviewCount.innerText = interviewList.length;
    RejectedCount.innerText = rejectedList.length;
}

calculatorCount();

// filter button style
function toggleStyle(id) {

    // reset all buttons
    [allFilterBtn, interviewFilterBtn, rejectedFilterBtn].forEach(btn => {
        btn.classList.remove('bg-[#3b82f6]', 'text-white');
        btn.classList.add('bg-white', 'text-[#64748b]');
    });

    const selected = document.getElementById(id);
    selected.classList.remove('bg-white', 'text-[#64748b]');
    selected.classList.add('bg-[#3b82f6]', 'text-white');

    currentApply = id;

    if (id === 'all-filter-btn') {
        allCardSection.classList.remove('hidden');
        filterSection.classList.add('hidden');
    }

    if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderList(interviewList);
    }

    if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderList(rejectedList);
    }
}

// event delegation
mainContainer.addEventListener('click', function (event) {
    // interview button
    if (event.target.classList.contains('interview-btn')) {

        const card = event.target.closest('.card');

        const jobName = card.querySelector('.job-name').innerText;
        const jobSkill = card.querySelector('.job-skill').innerText;
        const jobType = card.querySelector('.job-type').innerText;
        const description = card.querySelector('.description').innerText;

        card.querySelector('.apply').innerText = 'INTERVIEW';

        const cardInfo = {
            jobName,
            jobSkill,
            jobType,
            apply: 'INTERVIEW',
            description
        };

        
        if (!interviewList.find(item => item.jobName === jobName)) {
            interviewList.push(cardInfo);
        }

       
        rejectedList = rejectedList.filter(item => item.jobName !== jobName);

        calculatorCount();

        if (currentApply === 'interview-filter-btn') {
            renderList(interviewList);
        }
    }

    // rejected button 
    if (event.target.classList.contains('rejected-btn')) {

        const card = event.target.closest('.card');

        const jobName = card.querySelector('.job-name').innerText;
        const jobSkill = card.querySelector('.job-skill').innerText;
        const jobType = card.querySelector('.job-type').innerText;
        const description = card.querySelector('.description').innerText;

        card.querySelector('.apply').innerText = 'REJECTED';

        const cardInfo = {
            jobName,
            jobSkill,
            jobType,
            apply: 'REJECTED',
            description
        };

        if (!rejectedList.find(item => item.jobName === jobName)) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.jobName !== jobName);

        calculatorCount();

        if (currentApply === 'rejected-filter-btn') {
            renderList(rejectedList);
        }
    }

});

// common render function
function renderList(list) {

    filterSection.innerHTML = '';

    list.forEach(item => {

        const div = document.createElement('div');
        div.className = `card bg-white p-6 rounded-lg space-y-5`;

        div.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="job-name font-semibold text-[#002c5c] text-[18px]">${item.jobName}</h2>
                    <p class="job-skill font-normal text-[#64748b]">${item.jobSkill}</p>
                </div>
                <div class="border border-[#f1f2f4] p-1 rounded-full text-[#64748b]">
                    <i class="fa-regular fa-trash-can"></i>
                </div>
            </div>

            <div>
                <p class="job-type text-[#64748b] font-normal">${item.jobType}</p>
            </div>

            <div>
                <span class="apply text-[#002c5c] font-medium bg-[#eef4ff] px-3 py-2 rounded-sm">
                    ${item.apply}
                </span>
                <p class="description text-[#313a49] pt-1">
                    ${item.description}
                </p>
            </div>

            <div class="flex gap-2">
                <button class="interview-btn text-[#10b981] border-2 border-[#10b981] rounded-lg font-semibold px-3 py-2">
                    Interview
                </button>
                <button class="rejected-btn text-[#ef4444] border-2 border-[#ef4444] rounded-lg font-semibold px-3 py-2">
                    Rejected
                </button>
            </div>
        `;

        filterSection.appendChild(div);
    });
}