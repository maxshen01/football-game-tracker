import { getTeams, getResults, deleteResultApi } from "./apiHelpers.js";
import { addTeams, renderResultCard } from "./domLoadingHelpers.js";

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

        addTeams(teamsList, deleteTeamList);
    } catch (err) {
        console.log(err);
        alert("Could not lead teams.");
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

        const resultCard = renderResultCard(result, teamNameMap, {
            addButton: true,
        });

        resultsListHtml.appendChild(resultCard);
    }
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
