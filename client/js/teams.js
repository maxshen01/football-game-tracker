import { getTeamName, getTeams, getResults } from "./apiHelpers.js";
import {
    renderResultCard,
    showToast,
    loadNavbar,
} from "./elementLoadingHelpers.js";

const teamHeader = document.querySelector(".team-header");
const imgLocation = document.querySelector(".img-location");
const resultsListHtml = document.querySelector(".results_list");

document.addEventListener("DOMContentLoaded", initPage);
document.addEventListener("DOMContentLoaded", initNavbar);

//Initialise the page
function initPage() {
    // Get the query string from the current URL
    const queryString = window.location.search;

    // Parse the query string
    const urlParams = new URLSearchParams(queryString);

    // Get the value of the 'team' parameter
    const teamId = urlParams.get("team");

    //Load the required Elements
    addTitle(teamId);
    addImage(teamId);
    addResults(teamId);
}

async function initNavbar() {
    try {
        await loadNavbar();
    } catch (err) {
        console.log(err);
        showToast("There was an error loading the page", "Error");
    }
}

//Add the title
async function addTitle(team_id) {
    try {
        const title = document.createElement("h2");
        const teamName = await getTeamName(team_id);

        title.textContent = teamName.team_name;
        teamHeader.appendChild(title);
    } catch (err) {
        console.log(err);
        showToast("There was a network error", "Error");
    }
}

// Add the image
async function addImage(team_id) {
    try {
        const imageHtml = document.createElement("img");
        const teamName = await getTeamName(team_id);

        imageHtml.src = `../assets/team_images/${team_id}.jpg`;
        imageHtml.alt = teamName.team_name;

        imgLocation.appendChild(imageHtml);
    } catch (err) {
        console.log(err);
        showToast("There was a network error", "Error");
    }
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

            const resultCard = renderResultCard(result, teamNameMap);

            resultsListHtml.appendChild(resultCard);
        }
    } catch (err) {
        console.log(err);
        showToast("There was a network error", "Error");
    }
}
