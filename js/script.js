let interviewList = [];
let rejectedList = [];
let currentApply = 'all-filter-btn';

const Total = document.getElementById("total");
const InterviewCount = document.getElementById("interviewCount");
const RejectedCount = document.getElementById("rejectedCount");
const jobCounter = document.getElementById("job-counter");

const allFilterBtn = document.getElementById('all-filter-btn');
const interviewFilterBtn = document.getElementById('interview-filter-btn');
const rejectedFilterBtn = document.getElementById('rejected-filter-btn');

const allCardSection = document.getElementById("allCards");
const filterSection = document.getElementById("filtered-section");
const mainContainer = document.querySelector('main');


// Dashboard count update
function calculatorCount() {

    const totalCards = document.querySelectorAll('#allCards .card').length;

    Total.innerText = totalCards;
    InterviewCount.innerText = interviewList.length;
    RejectedCount.innerText = rejectedList.length;

    // Available Jobs Counter Logic
    if (currentApply === 'all-filter-btn') {
        jobCounter.innerText = `${totalCards} ${totalCards === 1 ? "job" : "jobs"}`;
    }
    else if (currentApply === 'interview-filter-btn') {
        jobCounter.innerText = `${interviewList.length} of ${totalCards} jobs`;
    }
    else if (currentApply === 'rejected-filter-btn') {
        jobCounter.innerText = `${rejectedList.length} of ${totalCards} jobs`;
    }
}

calculatorCount();


// Filter button style & logic
function toggleStyle(id) {

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
    else if (id === 'interview-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderList(interviewList);
    }
    else if (id === 'rejected-filter-btn') {
        allCardSection.classList.add('hidden');
        filterSection.classList.remove('hidden');
        renderList(rejectedList);
    }

    calculatorCount();
}


// Event delegation
mainContainer.addEventListener('click', function (event) {

    const card = event.target.closest('.card');
    if (!card) return;

    const jobName = card.querySelector('.job-name').innerText;
    const jobSkill = card.querySelector('.job-skill').innerText;
    const jobType = card.querySelector('.job-type').innerText;
    const description = card.querySelector('.description').innerText;

    // Delete button
    if (event.target.classList.contains('fa-trash-can')) {

        card.remove();

        interviewList = interviewList.filter(item => item.jobName !== jobName);
        rejectedList = rejectedList.filter(item => item.jobName !== jobName);

        if (currentApply === 'interview-filter-btn') renderList(interviewList);
        if (currentApply === 'rejected-filter-btn') renderList(rejectedList);

        calculatorCount();
        return;
    }

    // Interview button

    if (event.target.classList.contains('interview-btn')) {

        const applySpan = card.querySelector('.apply');

        applySpan.innerText = 'INTERVIEW';
        applySpan.className = 'apply font-medium px-3 py-2 rounded-sm bg-[#d1fae5] text-[#10b981]';

        card.style.borderLeft = '5px solid #10b981';

        const cardInfo = { jobName, jobSkill, jobType, apply: 'INTERVIEW', description };

        if (!interviewList.find(item => item.jobName === jobName)) {
            interviewList.push(cardInfo);
        }

        rejectedList = rejectedList.filter(item => item.jobName !== jobName);

        if (currentApply === 'interview-filter-btn') renderList(interviewList);
        if (currentApply === 'rejected-filter-btn') renderList(rejectedList);

        calculatorCount();
    }

    // Rejected button
    if (event.target.classList.contains('rejected-btn')) {

        const applySpan = card.querySelector('.apply');

        applySpan.innerText = 'REJECTED';
        applySpan.className = 'apply font-medium px-3 py-2 rounded-sm bg-red-100 text-[#ef4444]';

        card.style.borderLeft = '5px solid #ef4444';

        const cardInfo = { jobName, jobSkill, jobType, apply: 'REJECTED', description };

        if (!rejectedList.find(item => item.jobName === jobName)) {
            rejectedList.push(cardInfo);
        }

        interviewList = interviewList.filter(item => item.jobName !== jobName);

        if (currentApply === 'interview-filter-btn') renderList(interviewList);
        if (currentApply === 'rejected-filter-btn') renderList(rejectedList);

        calculatorCount();
    }

});


// Render filtered list

function renderList(list) {

    filterSection.innerHTML = '';

    if (list.length === 0) {
        renderEmptyMessage();
        return;
    }

    list.forEach(item => {

        const div = document.createElement('div');
        div.className = `card bg-white p-6 rounded-lg space-y-5 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`;

        div.style.borderLeft = item.apply === 'INTERVIEW'
            ? '5px solid #10b981'
            : '5px solid #ef4444';

        const spanBg = item.apply === 'INTERVIEW' ? 'bg-[#d1fae5]' : 'bg-red-100';
        const spanText = item.apply === 'INTERVIEW' ? 'text-[#10b981]' : 'text-[#ef4444]';

        div.innerHTML = `
            <div class="flex justify-between items-center">
                <div>
                    <h2 class="job-name font-semibold text-[#002c5c] text-[18px]">${item.jobName}</h2>
                    <p class="job-skill font-normal text-[#64748b]">${item.jobSkill}</p>
                </div>
                <div class="border border-[#f1f2f4] p-1 rounded-full text-[#64748b]">
                    <i class="fa-regular fa-trash-can cursor-pointer"></i>
                </div>
            </div>

            <div>
                <p class="job-type text-[#64748b] font-normal">${item.jobType}</p>
            </div>

            <div>
                <span class="apply ${spanBg} ${spanText} font-medium px-3 py-2 rounded-sm">${item.apply}</span>
                <p class="description text-[#313a49] pt-1">${item.description}</p>
            </div>

            <div class="flex gap-2">
                <button class="interview-btn text-[#10b981] border-2 border-[#10b981] rounded-lg font-semibold px-3 py-2">Interview</button>
                <button class="rejected-btn text-[#ef4444] border-2 border-[#ef4444] rounded-lg font-semibold px-3 py-2">Rejected</button>
            </div>
        `;

        filterSection.appendChild(div);
    });

    calculatorCount();
}


// Empty message
function renderEmptyMessage() {
    filterSection.innerHTML = `
        <div class="text-center py-10 text-gray-400">
            <img src="jobs.png" alt="No jobs" class="mx-auto mb-3 w-20 h-20">
            <p class="text-xl font-semibold">No jobs available</p>
            <p class="text-sm mt-1 text-gray-400">Check back soon for new job opportunities</p>
        </div>
    `;
}