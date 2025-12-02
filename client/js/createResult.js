let apiBeginning;
const isLocalHost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

if (isLocalHost) {
    apiBeginning = "http://localhost:8080";
} else {
    apiBeginning = "http://";
}

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

        addTeams(teamsList);
    } catch (err) {
        console.log(err);
        alert("Could not lead teams.");
    }
}

//add teams to the page, part of init page
async function addTeams(teamsList) {
    // Clear existing options
    homeTeamSelection.innerHTML = "";
    awayTeamSelection.innerHTML = "";

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

    homeTeamSelection.appendChild(placeholder("Select a team"));
    awayTeamSelection.appendChild(placeholder("Select a team"));

    //Add new teams
    for (let i = 0; i < teamsList.length; i++) {
        const teamObject = teamsList[i];

        const homeOption = document.createElement("option");
        homeOption.textContent = teamObject.team_name;
        homeOption.value = teamObject.team_id;

        homeTeamSelection.appendChild(homeOption);

        const awayOption = document.createElement("option");
        awayOption.textContent = teamObject.team_name;
        awayOption.value = teamObject.team_id;

        awayTeamSelection.appendChild(awayOption);
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

    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newResult),
    };

    try {
        const response = await fetch(`${apiBeginning}/results`, options);

        if (response.ok) {
            alert("Result Submitted Successfully");
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
            alert("There was an error with the api request");
        }
    } catch (err) {
        console.log(err);
        alert("There was a network error");
    }
    await fetch(`${apiBeginning}/results`, options);
}

//API Calls
async function apiFetch(url) {
    try {
        const respData = await fetch(url);
        let apiObject;

        if (respData.ok) {
            apiObject = await respData.json();
        } else {
            throw "Something went wrong with the API request";
        }

        return apiObject;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

async function getTeams() {
    return await apiFetch(`${apiBeginning}/teams`);
}
