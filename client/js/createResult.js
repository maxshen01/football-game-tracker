let onLocalHost = true;
let apiBeginning;

if (onLocalHost) {
    apiBeginning = "http://localhost:8080"
} else {
    apiBeginning = "http://"
}

const homeTeamSelection = document.querySelector("#homeTeamName")
const awayTeamSelection = document.querySelector("#awayTeamName")

document.addEventListener("DOMContentLoaded", initPage)
document.addEventListener("submit", getNewResult)

async function initPage() {
    const teamsList = await getTeams()

    addTeams(teamsList)
}

async function addTeams(teamsList) {

    // Clear existing options
    homeTeamSelection.innerHTML = '';
    awayTeamSelection.innerHTML = '';

    // Add placeholder to both
    const placeholder = (label) => {
        const opt = document.createElement("option");
        opt.value = "";
        opt.disabled = true;
        opt.selected = true;
        opt.textContent = label;
        return opt;
    };

    homeTeamSelection.appendChild(placeholder("Select a team"));
    awayTeamSelection.appendChild(placeholder("Select a team"));

    //Add new teams
    for (let i=0; i< teamsList.length; i++) {
        const teamObject = teamsList[i]

        const homeOption = document.createElement("option")
        homeOption.textContent = teamObject.team_name
        homeOption.value = teamObject.team_id

        homeTeamSelection.appendChild(homeOption)

        const awayOption = document.createElement("option")
        awayOption.textContent = teamObject.team_name
        awayOption.value = teamObject.team_id

        awayTeamSelection.appendChild(awayOption)
    }
}

async function getNewResult(e) {
    e.preventDefault();
    const clientObject = e.target
    
    const newResult = {
        result_date: clientObject[0].value,
        home_team_id: parseInt(clientObject[1].value),
        home_team_goals: parseInt(clientObject[2].value),
        away_team_id: parseInt(clientObject[3].value),
        away_team_goals: parseInt(clientObject[4].value)
    }

    const options = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newResult)
    }

    await fetch(`${apiBeginning}/results`, options)
}

//API Calls
async function apiFetch(url) {
  try {
        const respData = await fetch(url);
        let apiObject
        
        if (respData.ok) {
            apiObject = await respData.json()
        } else {
            throw "Something went wrong with the API request"
        }

        return apiObject

    } catch (err) {
        console.log(err);
    }
}

async function getTeams() {
    return await apiFetch(`${apiBeginning}/teams`);
}