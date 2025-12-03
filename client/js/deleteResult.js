import { getTeams, getResults, deleteResultApi } from "./apiHelpers.js";

const deleteTeamList = document.querySelector("#deleteTeam");
const deleteTeamForm = document.querySelector(".deleteResultForm");
const resultsListHtml = document.querySelector(".delete_results_list");
const deleteModal = document.querySelector("#confirmDeleteModal");
const deleteModalBtn = document.querySelector("#confirmDeleteBtn");
const rejectModalBtn = document.querySelector("#rejectDeleteBtn");
const deleteSuccessToast = document.querySelector("#deleteSuccessToast");

document.addEventListener("DOMContentLoaded", initPage);
deleteTeamForm.addEventListener("submit", loadResults);
resultsListHtml.addEventListener("click", confirmDeletion);
deleteModalBtn.addEventListener("click", deleteResult);
rejectModalBtn.addEventListener("click", resetResultId);

let resultId = null;

async function initPage() {
    try {
        const teamsList = await getTeams();

        addTeams(teamsList);
    } catch (err) {
        console.log(err);
        alert("Could not lead teams.");
    }
}

async function addTeams(teamsList) {
    // Clear existing options
    deleteTeamList.innerHTML = "";

    // Add placeholder to both
    const placeholder = (label) => {
        const opt = document.createElement("option");
        opt.value = "";
        opt.disabled = true;
        opt.selected = true;
        opt.className = "placeholder";
        opt.textContent = label;
        return opt;
    };

    deleteTeamList.appendChild(placeholder("Select a team"));

    //Add new teams
    for (let i = 0; i < teamsList.length; i++) {
        const teamObject = teamsList[i];

        const teamOption = document.createElement("option");
        teamOption.textContent = teamObject.team_name;
        teamOption.value = teamObject.team_id;

        deleteTeamList.appendChild(teamOption);
    }
}

async function loadResults(e) {
    e.preventDefault();
    resultsListHtml.innerHTML = "<h2>List of Results</h2>";

    const teamId = e.target[0].value;

    addResults(teamId);
}

//Add the results
async function addResults(team_id) {
    const teamResults = await getResults(team_id);
    const teamsList = await getTeams();

    const teamNameMap = Object.fromEntries(
        teamsList.map((teamsList) => [teamsList.team_id, teamsList.team_name])
    );

    //iterate through each result
    for (let i = 0; i < teamResults.length; i++) {
        const result = teamResults[i];

        const resultCard = renderResultCard(result, teamNameMap);

        resultsListHtml.appendChild(resultCard);
    }
}

//helper functions
function renderResultCard(result, teamNameMap) {
    const card = document.createElement("div");
    card.className = "card";

    const dateDisp = formatDate(result.result_date);

    card.innerHTML = `
    <div class="card-body">
        <div class="Results">
            <h5 class="card-title">${dateDisp}</h5>
            <div class="container-fluid d-flex gap-5">
                <p class="card-text">${teamNameMap[result.home_team_id]}</p>
                <p class="card-text">${result.home_team_goals}</p>
                <p class="card-text">${result.away_team_goals}</p>
                <p class="card-text">${teamNameMap[result.away_team_id]}</p>
            </div>
        </div>
            <button type="button" class="btn btn-danger btn-sm" value=${
                result.result_id
            }>
                Delete Result
            </button>
        </div>
    </div>
    `;
    return card;
}

function formatDate(dateString) {
    const date = new Date(dateString);

    const dateDisp = date
        .toLocaleDateString("en-GB", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        .replace(",", "");

    return dateDisp;
}

async function confirmDeletion(event) {
    const target = event.target;

    if (target.matches("button") && target.value) {
        resultId = target.value;

        const modal = new bootstrap.Modal(deleteModal);
        modal.show();
    }
}

async function deleteResult() {
    if (resultId) {
        deleteResultApi(resultId);
        resultId = null;

        const newToast = bootstrap.Toast.getOrCreateInstance(
            deleteSuccessToast,
            {
                delay: 3000, // Auto-dismiss after 3 seconds
            }
        );

        newToast.show();

        //mock input for results
        const mockEvent = {
            preventDefault() {},
            target: deleteTeamForm,
        };

        //timeout needed as get request will get old data if not
        setTimeout(function () {
            loadResults(mockEvent);
        }, 100);
    }

    bootstrap.Modal.getInstance(deleteModal).hide();
}

function resetResultId() {
    resultId = null;
}
