import { getTeams, createResult } from "./apiHelpers.js";
import { addTeams, showToast } from "./elementLoadingHelpers.js";

const homeTeamSelection = document.querySelector("#homeTeamName");
const awayTeamSelection = document.querySelector("#awayTeamName");
const createResultForm = document.querySelector(".createResultForm");

//event listeners
document.addEventListener("DOMContentLoaded", initPage);
createResultForm.addEventListener("submit", getNewResult);
homeTeamSelection.addEventListener("change", disableSameTeam);
awayTeamSelection.addEventListener("change", disableSameTeam);

//initialise page
async function initPage() {
    try {
        const teamsList = await getTeams();

        addTeams(teamsList, homeTeamSelection);
        addTeams(teamsList, awayTeamSelection);
    } catch (err) {
        console.log(err);
        showToast("Could not load the teams", "Error");
    }
}

//disable a team when selected for home or away
function disableSameTeam() {
    const homeTeamId = homeTeamSelection.value;
    const awayTeamId = awayTeamSelection.value;

    function disableTeams(teamSelection, disabledValue) {
        Object.values(teamSelection).forEach((team) => {
            const teamId = team.value;

            if (disabledValue === teamId) {
                team.disabled = true;
            } else {
                team.disabled = false;
            }
        });
    }

    disableTeams(awayTeamSelection, homeTeamId);
    disableTeams(homeTeamSelection, awayTeamId);
}

//Create API call
async function getNewResult(e) {
    e.preventDefault();
    const form = e.target;

    const resultDate = form[0].value;
    const homeTeamId = parseInt(form[1].value);
    const homeGoals = parseInt(form[2].value);
    const awayTeamId = parseInt(form[3].value);
    const awayGoals = parseInt(form[4].value);

    // Validate required fields
    if (!resultDate || isNaN(homeTeamId) || isNaN(awayTeamId)) {
        alert("Please select both teams and a date.");
        return;
    }

    if (isNaN(homeGoals) || homeGoals < 0) {
        alert("Home team goals must be a valid non-negative number.");
        return;
    }

    if (isNaN(awayGoals) || awayGoals < 0) {
        alert("Away team goals must be a valid non-negative number.");
        return;
    }

    if (homeTeamId === awayTeamId) {
        alert("Home and away teams must be different.");
        return;
    }

    const newResult = {
        result_date: resultDate,
        home_team_id: homeTeamId,
        home_team_goals: homeGoals,
        away_team_id: awayTeamId,
        away_team_goals: awayGoals,
    };

    try {
        const response = await createResult(newResult);

        if (response.ok) {
            showToast(
                "The result was successfully added to the database!",
                "Result Added"
            );
            createResultForm.reset();

            // Re-enable all options in both dropdowns
            Array.from(homeTeamSelection.options).forEach((option) => {
                option.disabled = false;
            });
            Array.from(awayTeamSelection.options).forEach((option) => {
                option.disabled = false;
            });
        } else {
            const errorText = await response.text();
            console.error("Error:", errorText);
            showToast("There was a network error", "Error");
        }
    } catch (err) {
        console.log(err);
        showToast("There was a network error", "Error");
    }
}
