import { getLeagueTable } from "./apiHelpers.js";
import { showToast } from "./elementLoadingHelpers.js";

const leagueTableHtml = document.querySelector(".league-table");

document.addEventListener("DOMContentLoaded", fillLeagueTable);

//fills the league table
async function fillLeagueTable(e) {
    try {
        const leagueTableList = await getLeagueTable();

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
    } catch (err) {
        console.log(err);
        showToast("There was a network error", "Error");
    }
}
