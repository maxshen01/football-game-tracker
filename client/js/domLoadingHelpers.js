export function addTeams(teamsList, listInsertPoint) {
    // Clear existing options
    listInsertPoint.innerHTML = "";

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

    listInsertPoint.appendChild(placeholder("Select a team"));

    //Add new teams
    for (let i = 0; i < teamsList.length; i++) {
        const teamObject = teamsList[i];

        const teamOption = document.createElement("option");
        teamOption.textContent = teamObject.team_name;
        teamOption.value = teamObject.team_id;

        listInsertPoint.appendChild(teamOption);
    }
}

export function renderResultCard(result, teamNameMap, addButton = false) {
    const card = document.createElement("div");
    card.className = "card";

    const dateDisp = formatDate(result.result_date);
    let delete_button = ``;

    if (addButton) {
        delete_button = `<button type="button" class="btn btn-danger btn-sm" value=${result.result_id}>
                Delete Result
            </button>`;
    }

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
            ${delete_button}
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
