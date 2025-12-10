/**
 * Populates a <select> element with team options from a provided list.
 * Clears existing content, adds a placeholder, then appends each team as an <option>.
 *
 * @param {Array<{ team_id: string|number, team_name: string }>} teamsList - Array of team objects with team_id and team_name
 * @param {HTMLDivElement} listInsertPoint - The <div> DOM element to populate
 *
 * @example
 * addTeams(
 *   [{ team_id: 1, team_name: "Lions" }, { team_id: 2, team_name: "Tigers" }],
 *   document.getElementById("teamSelect")
 * );
 */
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

/**
 * Renders a result card DOM element displaying match details between two teams.
 * Includes team names (resolved via teamNameMap), scores, formatted date, and an optional delete button.
 *
 * @param {{
 *   result_id: string|number,
 *   result_date: string|Date,
 *   home_team_id: string|number,
 *   away_team_id: string|number,
 *   home_team_goals: number,
 *   away_team_goals: number
 * }} result - The match result object containing all game details
 *
 * @param {Object.<string, string>} teamNameMap - Object mapping team IDs to team names (e.g., { '1': 'Lions', '2': 'Tigers' })
 *
 * @param {boolean} [addButton=false] - If true, includes a "Delete Result" button with the result_id as value
 *
 * @returns {HTMLDivElement} A fully constructed card element ready to be appended to the DOM
 *
 * @example
 * const teamNameMap = { '1': 'Lions', '2': 'Tigers' };
 * const card = renderResultCard(
 *   {
 *     result_id: 101,
 *     result_date: '2025-04-01',
 *     home_team_id: '1',
 *     away_team_id: '2',
 *     home_team_goals: 3,
 *     away_team_goals: 1
 *   },
 *   teamNameMap,
 *   true
 * );
 * document.getElementById('resultsContainer').appendChild(card);
 */
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
        <div class="results">
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

/**
 * Formats a date string into a human-readable, comma-free UK date format.
 * Converts the input to a Date object and formats it as: "Weekday Day Month Year"
 * (e.g., "Monday 1 April 2025").
 *
 * @param {string|Date} dateString - The date to format, in any format recognised by `new Date()`
 *
 * @returns {string} Formatted date string without commas (e.g., "Monday 1 April 2025")
 *
 * @example
 * formatDate("2025-04-01"); // Returns "Tuesday 1 April 2025"
 */
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

/**
 * Displays a toast notification at the bottom-right of the screen using Bootstrap 5.
 * Dynamically creates a toast container if one doesn't exist, and automatically removes
 * the toast from the DOM after it hides.
 *
 * @param {string} message - The main content text to display in the toast body
 * @param {string} title - The title/header text for the toast
 *
 * @example
 * showToast("Item saved successfully!", "Success");
 */
export function showToast(message, title) {
    // Create toast element
    const toastEl = document.createElement("div");
    toastEl.className = `toast align-items-center`;
    toastEl.role = "alert";
    toastEl.ariaLive = "assertive";
    toastEl.ariaAtomic = "true";

    toastEl.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">${title}</strong>
            <button
                type="button"
                class="btn-close"
                data-bs-dismiss="toast"
                aria-label="Close"
            ></button>
        </div>
        <div class="toast-body">
            ${message}
        </div>
    `;

    // Create toast wrapper if it doesn't exist
    let toastContainer = document.getElementById("toast-container");
    if (!toastContainer) {
        toastContainer = document.createElement("div");
        toastContainer.id = "toast-container";
        toastContainer.className =
            "toast-container position-fixed bottom-0 end-0 p-3";
        toastContainer.style.zIndex = "1100";
        document.body.appendChild(toastContainer);
    }

    // Add toast and show it
    toastContainer.appendChild(toastEl);

    // Initialise and show with Bootstrap
    const bootstrapToast = new bootstrap.Toast(toastEl, {
        autohide: true,
        delay: 3000,
    });

    bootstrapToast.show();

    // Optional: Remove from DOM after animation completes
    toastEl.addEventListener("hidden.bs.toast", () => {
        toastEl.remove();
    });
}

export async function loadNavbar() {
    const navbarContainer = document.querySelector(".navbar");

    if (!navbarContainer) return;

    try {
        const response = await fetch("/client/partials/navbar.html");

        if (!response.ok)
            throw new Error(
                `Failed to load: ${response.status} ${response.statusText}`
            );

        const data = await response.text();
        navbarContainer.innerHTML = data;

        //change active bar
        changeActiveTab();
    } catch (err) {
        console.error("Failed to load navbar:", err);
    }
}

function changeActiveTab() {
    //get the name of the script
    const path = window.location.pathname;
    const page = path.split("/").pop();

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
        // Remove 'active' class from all links
        link.classList.remove("active");

        // Remove aria-current from all
        link.removeAttribute("aria-current");

        // If the link's href matches the current page, make it active
        if (link.getAttribute("href").includes(page)) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });
}
