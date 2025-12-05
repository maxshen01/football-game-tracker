//code to determine if the api is hosted locally or on the cloud
let apiBeginning;
const isLocalHost =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1";

if (isLocalHost) {
    apiBeginning = "http://localhost:8080";
} else {
    apiBeginning = "http://";
}

/**
 * Performs a fetch request to the specified URL and parses the response as JSON.
 * Throws an error if the response is not OK (e.g., 4xx/5xx status) or if parsing fails.
 *
 * @param {string} url - The endpoint URL to fetch data from
 *
 * @returns {Promise<any>} A promise that resolves to the parsed JSON response
 *
 * @throws {Error|string} Rejects with an error message if the fetch fails or response is not OK
 *
 * @example
 * try {
 *   const data = await apiFetch('/api/results');
 *   console.log(data);
 * } catch (error) {
 *   console.error('Fetch failed:', error);
 * }
 */
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

/**
 * Fetches the list of teams from the API.
 * Utilizes the `apiFetch` helper to perform the request and handle response parsing.
 *
 * @returns {Promise<any>} A promise that resolves to the parsed JSON response containing team data
 *
 * @throws {Error|string} Propagates any error thrown by `apiFetch`, including network issues
 * or non-OK API responses
 *
 * @example
 * const teams = await getTeams()
 *
 * //where teams is a list of objects containing the team name and the team id
 */
export async function getTeams() {
    return await apiFetch(`${apiBeginning}/teams`);
}

/**
 * Fetches the team name of a given teamId
 * Utilizes the `apiFetch` helper to perform the request and handle response parsing.
 *
 * @param {number} team_id - team_id as an integer
 *
 * @returns {Promise<any>} A promise that resolves to the parsed JSON response containing team data
 *
 * @throws {Error|string} Propagates any error thrown by `apiFetch`, including network issues
 * or non-OK API responses
 *
 * @example
 * const teamName = await getTeamName(1)
 *
 * //where teamName is the name of the team with an id of 1
 */
export async function getTeamName(team_id) {
    return await apiFetch(`${apiBeginning}/teams/${team_id}`);
}

/**
 * Fetches the results for a specific team based on its ID.
 * Utilizes the `apiFetch` helper to perform the request and handle response parsing.
 *
 * @param {number} team_id - The ID of the team whose results should be retrieved
 *
 * @returns {Promise<any>} A promise that resolves to the parsed JSON response containing the team's results
 *
 * @throws {Error|string} Propagates any error thrown by `apiFetch`, including network issues
 * or non-OK API responses
 *
 * @example
 * const results = await getResults(3);
 *
 * //results is a list of objects, with each object representing one result
 */
export async function getResults(team_id) {
    return await apiFetch(`${apiBeginning}/teams/${team_id}/results`);
}

/**
 * Fetches the league table data from the API.
 * Utilizes the `apiFetch` helper to perform the request and handle response parsing.
 *
 * @returns {Promise<any>} A promise that resolves to the parsed JSON response containing league table data
 *
 * @throws {Error|string} Propagates any error thrown by `apiFetch`, including network issues
 * or non-OK API responses
 *
 * @example
 * const table = await getLeagueTable();
 *
 * //table is now an ordered list of objects, where each object represents the data in the table row
 */
export async function getLeagueTable() {
    return await apiFetch(`${apiBeginning}/results/leaguetable`);
}

/**
 * Creates a new match result in the API.
 * Sends a POST request with JSON-encoded match result data to the results endpoint.
 *
 * @param {Object} resultData - The match result data to create
 * @param {string} resultData.result_date - The date of the result (ISO date string)
 * @param {number} resultData.home_team_id - The ID of the home team
 * @param {number} resultData.home_team_goals - Goals scored by the home team
 * @param {number} resultData.away_team_id - The ID of the away team
 * @param {number} resultData.away_team_goals - Goals scored by the away team
 *
 * @returns {Promise<Response>} A promise that resolves to the raw fetch Response object
 *
 * @throws {Error|string} Throws if the request fails or if the API returns an invalid response
 *
 * @example
 * const newResult = {
 *   result_date: "2025-02-14",
 *   home_team_id: 1,
 *   home_team_goals: 2,
 *   away_team_id: 3,
 *   away_team_goals: 1
 * };
 *
 * try {
 *   const response = await createResult(newResult);
 *   console.log("Result created:", response.status);
 * } catch (error) {
 *   console.error("Failed to create result:", error);
 * }
 */
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

/**
 * Deletes a result from the API based on its ID.
 * Sends a DELETE request to the results endpoint.
 *
 * @param {number} resultId - The ID of the result to delete
 *
 * @returns {Promise<Response>} A promise that resolves to the raw fetch Response object
 *
 * @throws {Error|string} Throws if the request fails or returns an invalid response
 *
 * @example
 * try {
 *   const response = await deleteResultApi(12);
 *   console.log("Delete status:", response.status); // e.g. 204
 * } catch (error) {
 *   console.error("Failed to delete result:", error);
 * }
 */
export async function deleteResultApi(resultId) {
    try {
        const options = {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        };

        const response = await fetch(
            `${apiBeginning}/results/${resultId}`,
            options
        );

        if (!response) {
            throw "Something went wrong with the API request";
        }

        return response;
    } catch (err) {
        console.log(err);
        throw err;
    }
}
