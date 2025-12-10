import { getLeagueTable } from "./apiHelpers.js";
import { loadNavbar, showToast } from "./elementLoadingHelpers.js";

const leagueTableHtml = document.querySelector(".league-table");

document.addEventListener("DOMContentLoaded", fillLeagueTable);
document.addEventListener("DOMContentLoaded", initNavbar);

async function initNavbar() {
    try {
        // console.log("function hit");
        await loadNavbar();
        // console.log("function hit");
    } catch (err) {
        console.log(err);
        showToast("There was an error loading the page", "Error");
    }
}

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

                    //create ranking
                    const rank = document.createElement("span");
                    rank.textContent = `${i + 1}.`;
                    rank.className = "num";
                    cell.appendChild(rank);

                    //add favicon
                    const faviconContainer = document.createElement("span");
                    faviconContainer.className = "favicon-container";

                    const favicon = document.createElement("img");
                    favicon.src = `./assets/team_favicons/${teamStats.team_id}.png`;
                    favicon.className = "club-logo";
                    favicon.alt = value;

                    faviconContainer.appendChild(favicon);
                    cell.appendChild(faviconContainer);

                    cell.appendChild(link);
                    cell.className = "text-start";
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
