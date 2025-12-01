let onLocalHost = true;
let apiBeginning;

if (onLocalHost) {
    apiBeginning = "http://localhost:8080";
} else {
    apiBeginning = "http://";
}

const leagueTableHtml = document.querySelector(".league-table");

document.addEventListener("DOMContentLoaded", fillLeagueTable);

//fills the league table
async function fillLeagueTable(e) {
    //get the right object

    leagueTableList = await getLeagueTable();

    //iterate through league table to get items
    for (let i = 0; i < leagueTableList.length; i++) {
        const teamStats = leagueTableList[i];

        const row = document.createElement("tr");

        for (const [key, value] of Object.entries(teamStats)) {
            if (key === "team_id") {
                continue;
            }

            const cell = document.createElement("td");

            if (key === "team_name") {
                //add link
                const link = document.createElement("a");
                link.textContent = value;
                link.href = `pages/team.html?team=${teamStats.team_id}`;

                cell.appendChild(link);
            } else {
                cell.textContent = value;
            }

            //cell.textContent = value;
            row.appendChild(cell);
        }

        leagueTableHtml.appendChild(row);
    }
}

//get the league table object from the backend
async function getLeagueTable() {
    try {
        const respData = await fetch(`${apiBeginning}/results/leaguetable`);
        let leagueTableList;

        if (respData.ok) {
            leagueTableList = await respData.json();
        } else {
            throw "Something went wrong with the API request";
        }

        return leagueTableList;
    } catch (err) {
        console.log(err);
    }
}
