let apiBeginning;
const isLocalHost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

if (isLocalHost) {
    apiBeginning = "http://localhost:8080";
} else {
    apiBeginning = "http://";
}

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

export async function getTeams() {
    return await apiFetch(`${apiBeginning}/teams`);
}

export async function getTeamName(team_id) {
    return await apiFetch(`${apiBeginning}/teams/${team_id}`);
}

export async function getResults(team_id) {
    return await apiFetch(`${apiBeginning}/teams/${team_id}/results`);
}

export async function getLeagueTable() {
    return await apiFetch(`${apiBeginning}/results/leaguetable`);
}

export async function createResult(resultData) {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resultData),
        };

        const response = await fetch(`${apiBeginning}/results`, options);

        if (!response) {
            throw "Something went wrong with the API request";
        }

        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
