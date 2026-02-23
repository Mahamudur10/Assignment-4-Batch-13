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
const filterSection = document.getElementById('filtered-section')


function calculatorCount() {
    Total.innerText = allCardSection.children.length;
    InterviewCount.innerText = interviewList.length;
    RejectedCount.innerText = rejectedList.length;
}
calculatorCount()

// use toggleing system when click button change button bg-clr and text color
function toggleStyle(id) {
    allFilterBtn.classList.remove('bg-[#3b82f6]', 'text-[#ffffff]')
    interviewFilterBtn.classList.remove('bg-[#3b82f6]', 'text-[#ffffff]')
    rejectedFilterBtn.classList.remove('bg-[#3b82f6]', 'text-[#ffffff]')


    allFilterBtn.classList.add('bg-[#ffffff]', 'text-[#64748b]')
    interviewFilterBtn.classList.add('bg-[#ffffff]', 'text-[#64748b]')
    rejectedFilterBtn.classList.add('bg-[#ffffff]', 'text-[#64748b]')

    const selected = document.getElementById(id)

    selected.classList.remove('bg-[#ffffff]', 'text-[#64748b]')
    selected.classList.add('bg-[#3b82f6]', 'text-[#ffffff]')
}

// event deligation
mainContainer.addEventListener('click', function (event) {
    console.log(event.target.parentNode);

    console.log(event.target.classList.contains('interview-btn'));

    if (event.target.classList.contains('interview-btn')) {
        const parentNode = event.target.parentNode.parentNode;
        const jobName = parentNode.querySelector('.job-name').innerText;
        const jobSkill = parentNode.querySelector('.job-skill').innerText
        const jobType = parentNode.querySelector('.job-type').innerText
        const Applied = parentNode.querySelector('.apply').innerText
        const Describe = parentNode.querySelector('.description').innerText
        // console.log(Describe)
        const cardInfo = {
            jobName,
            jobSkill,
            jobType,
            Applied,
            Describe
        }

        const JobExist = interviewList.find(item => item.jobName == cardInfo.jobName)
        parentNode.querySelector('.apply').innerText = 'INTERVIEW'
        if (!JobExist) {
            interviewList.push(cardInfo)
        }
        renderInterview()
    }
})

function renderInterview() {
    filterSection.innerHTML = ''
    for (let interview of interviewList) {
        console.log(interview)
        let div = document.createElement('div');
        div.className = `card bg-[#ffffff] p-6 rounded-lg space-y-5`
        div.innerHTML = `
        <div class="flex justify-between items-center">
                    <div>
                        <h2 class="job-name font-semibold text-[#002c5c] text-[18px]">Mobile First Corp</h2>
                        <p class="job-skill font-normal text-[#64748b]">React Native Developer</p>
                    </div>
                    <div class="border border-[#f1f2f4] p-1 rounded-full text-[#64748b]"><i
                            class="fa-regular fa-trash-can"></i></div>
                </div>
                <div>
                    <p class="job-type text-[#64748b] font-normal">Remote
                        •
                        Full-time
                        •
                        $130,000 - $175,000</p>
                </div>
                <div>
                    <span class="apply text-[#002c5c] font-medium bg-[#eef4ff] px-3 py-2 rounded-sm">Not Applied</span>
                    <p class="description text-[#313a49] pt-1">Build cross-platform mobile applications using React Native. Work on
                        products used by millions of
                        users worldwide.</p>
                </div>
                <div class="flex gap-2">
                    <button id="interview-btn" class="text-[#10b981] border-2 border-[#10b981] rounded-lg font-semibold px-3 py-2">interview</button>
                    <button id="rejected-btn" class="text-[#ef4444] border-2 border-[#ef4444] rounded-lg font-semibold px-3 py-2">Rejected</button>
                </div>
        `
        filterSection.appendChild(div)
    }
} 