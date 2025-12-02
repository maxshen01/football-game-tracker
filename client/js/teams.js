import { getTeamName, getTeams, getResults } from "./apiHelpers.js";

const titleArea = document.querySelector(".titleArea");
const description = document.querySelector(".team_description");
const resultsListHtml = document.querySelector(".results_list");

document.addEventListener("DOMContentLoaded", initPage);

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

//Add the title
async function addTitle(team_id) {
    const title = document.createElement("h1");
    const teamName = await getTeamName(team_id);

    title.textContent = teamName.team_name;
    titleArea.appendChild(title);
}

// Add the image
async function addImage(team_id) {
    const imageHtml = document.createElement("img");
    const teamName = await getTeamName(team_id);

    imageHtml.src = `../assets/team_images/${team_id}.jpg`;
    imageHtml.alt = teamName.team_name;

    description.appendChild(imageHtml);
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
                        <h5 class="card-title ">${dateDisp}</h5>
                        <div class="container-fluid d-flex gap-5">
                        <p class="card-text">${
                            teamNameMap[result.home_team_id]
                        }</p>
                        <p class="card-text">${result.home_team_goals}</p>
                        <p class="card-text">${result.away_team_goals}</p>
                        <p class="card-text">${
                            teamNameMap[result.away_team_id]
                        }</p>
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
