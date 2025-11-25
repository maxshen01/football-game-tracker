const description = document.querySelector(".team_description")
const resultsListHtml = document.querySelector(".results_list")

document.addEventListener("DOMContentLoaded", getTeamId)
//document.addEventListener("DOMContentLoaded", addImage)
//document.addEventListener("DOMContentLoaded", addResults)

//Get Team Id
function getTeamId() {
    // Get the query string from the current URL
    const queryString = window.location.search;

    // Parse the query string
    const urlParams = new URLSearchParams(queryString);

    // Get the value of the 'team' parameter
    const teamId = urlParams.get('team');

    //Load the required Elements
    addTitle(teamId)
    addImage(teamId)
    addResults(teamId)
}

//Add the title
async function addTitle(team_id) {
    console.log(team_id);
}

// Add the image 
function addImage(team_id) {
    const imageHtml = document.createElement("img")
    imageHtml.src = `../assets/team_images/${team_id}.jpg`
    imageHtml.alt = "Arsenal"

    description.appendChild(imageHtml)
}

//Add the results
function addResults(team_id) {
    console.log(team_id);
}