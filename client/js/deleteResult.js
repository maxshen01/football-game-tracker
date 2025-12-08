import { getTeams, getResults, deleteResultApi } from "./apiHelpers.js";
import {
    addTeams,
    renderResultCard,
    showToast,
    loadNavbar,
} from "./elementLoadingHelpers.js";

const deleteTeamList = document.querySelector("#deleteTeam");
const deleteTeamForm = document.querySelector(".deleteResultForm");
const resultsListHtml = document.querySelector(".delete_results_list");
const deleteModal = document.querySelector("#confirmDeleteModal");
const deleteModalBtn = document.querySelector("#confirmDeleteBtn");
const rejectModalBtn = document.querySelector("#rejectDeleteBtn");

document.addEventListener("DOMContentLoaded", initPage);
document.addEventListener("DOMContentLoaded", initNavbar);
deleteTeamForm.addEventListener("submit", loadResults);
resultsListHtml.addEventListener("click", confirmDeletion);
deleteModalBtn.addEventListener("click", deleteResult);
rejectModalBtn.addEventListener("click", resetResultId);
deleteModal.addEventListener("hidden.bs.modal", resetResultId);

let resultId = null;
let confirmDeleteModal = null;

async function initPage() {
    //load modal for future use
    confirmDeleteModal = new bootstrap.Modal(deleteModal);

    try {
        const teamsList = await getTeams();

        addTeams(teamsList, deleteTeamList);
    } catch (err) {
        console.log(err);
        showToast("Could not load teams", "Error");
    }
}

async function initNavbar() {
    try {
        await loadNavbar();
    } catch (err) {
        console.log(err);
        showToast("There was an error loading the page", "Error");
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
    try {
        const teamResults = await getResults(team_id);
        const teamsList = await getTeams();

        const teamNameMap = Object.fromEntries(
            teamsList.map((teamsList) => [
                teamsList.team_id,
                teamsList.team_name,
            ])
        );

        //iterate through each result
        for (let i = 0; i < teamResults.length; i++) {
            const result = teamResults[i];

            const resultCard = renderResultCard(result, teamNameMap, {
                addButton: true,
            });

            resultsListHtml.appendChild(resultCard);
        }
    } catch (err) {
        console.log(err);
        showToast(
            "There was a network error getting the results",
            "Network Error"
        );
    }
}

async function confirmDeletion(event) {
    const target = event.target;

    if (target.matches("button") && target.value) {
        resultId = target.value;

        confirmDeleteModal.show();
    }
}

async function deleteResult() {
    if (!resultId) {
        showToast("No item selected for deletion.", "Cannot Delete");
        return;
    }

    try {
        await deleteResultApi(resultId);
        resultId = null;

        showToast("The delete was successful!", "Delete Successful", "error");

        //mock input for results
        const mockEvent = {
            preventDefault() {},
            target: deleteTeamForm,
        };

        //timeout needed as get request will get old unupdated data if not
        setTimeout(function () {
            loadResults(mockEvent);
        }, 100);
    } catch (err) {
        console.log(err);
        showToast("Failed to delete item. Please try again.", "Error");
    } finally {
        confirmDeleteModal.hide();
    }
}

function resetResultId() {
    resultId = null;
}
