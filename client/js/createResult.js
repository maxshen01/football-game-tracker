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

async function initPage() {
    const teamsList = await getTeams()

    addTeams(teamsList)
}

async function addTeams(teamsList) {
    
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