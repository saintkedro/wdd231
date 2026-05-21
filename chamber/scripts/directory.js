document.addEventListener("DOMContentLoaded", () => {
    // 1. Navigation Controller initialization
    const navButton = document.getElementById("nav-button");
    const navMenu = document.getElementById("navMenu");

    navButton.addEventListener("click", () => {
        navButton.classList.toggle("show");
        navMenu.classList.toggle("open");
    });

    // 2. Footer Metadata Injections
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;

    // 3. Asynchronous Data Management Layer & View Configurations
    const displayContainer = document.getElementById("directoryDisplay");
    const gridBtn = document.getElementById("viewGrid");
    const listBtn = document.getElementById("viewList");
    const dataUrl = "data/members.json";

    async function fetchChamberMembers() {
        try {
            const response = await fetch(dataUrl);
            if (!response.ok) throw new Error(`HTTP network anomaly error code: ${response.status}`);
            const dataSet = await response.json();
            renderDirectoryCards(dataSet);
        } catch (error) {
            console.error("Directory component pipeline fault:", error);
            displayContainer.innerHTML = `<p class="error-msg">Failed to load local directory catalog information data.</p>`;
        }
    }

    function renderDirectoryCards(members) {
        displayContainer.innerHTML = ""; // Purge DOM tree content

        members.forEach(member => {
            const card = document.createElement("section");
            card.classList.add("member-card", `tier-${member.level}`);
            
            card.innerHTML = `
                <img src="${member.image}" alt="${member.name} Corporate Logo" loading="lazy" width="80" height="80">
                <h2>${member.name}</h2>
                <p class="tagline"><em>"${member.tagline}"</em></p>
                <p class="address">${member.address}</p>
                <p class="phone">${member.phone}</p>
                <p class="web-link"><a href="${member.website}" target="_blank" rel="noopener">${member.website.replace("https://", "")}</a></p>
            `;
            displayContainer.appendChild(card);
        });
    }

    // Interactive View Class Switchers
    gridBtn.addEventListener("click", () => {
        displayContainer.classList.add("grid-mode");
        displayContainer.classList.remove("list-mode");
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    });

    listBtn.addEventListener("click", () => {
        displayContainer.classList.remove("grid-mode");
        displayContainer.classList.add("list-mode");
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });

    // Kickoff retrieval sequence run
    fetchChamberMembers();
});