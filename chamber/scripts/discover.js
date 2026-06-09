import { discoverItems } from '../data/items.mjs';

// Target DOM nodes immediately 
const targetGridContainer = document.getElementById("discoverGridContainer");
const messageContainer = document.getElementById("visitor-message-box");

function buildDiscoverCards(items) {
    if (!targetGridContainer) return;
    targetGridContainer.innerHTML = ""; 

    items.forEach(item => {
        const card = document.createElement("div");
        card.classList.add("discover-card");
        card.id = `card-${item.id}`; // Structural ties back to specific CSS overrides if needed

        card.innerHTML = `
            <h2>${item.name}</h2>
            <img src="${item.image}" alt="Visual presentation of ${item.name}" loading="lazy" width="300" height="200">
            <address>📍 ${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-btn">Learn More</button>
        `;

        targetGridContainer.appendChild(card);
    });
}

/**
 * 2. Visitor Storage Tracking Engine
 */
function trackVisitorMetrics() {
    if (!messageContainer) return;

    const currentTimestamp = Date.now();
    const lastVisitValue = localStorage.getItem("chamberLastVisitTimestamp");

    if (!lastVisitValue) {
        messageContainer.innerHTML = `<p class="welcome-msg">Welcome! Let us know if you have any questions. 👋</p>`;
    } else {
        const previousTimestamp = parseInt(lastVisitValue, 10);
        const timeDifferenceMs = currentTimestamp - previousTimestamp;
        const singleDayMs = 24 * 60 * 60 * 1000; 

        if (timeDifferenceMs < singleDayMs) {
            messageContainer.innerHTML = `<p class="welcome-msg font-accent">Back so soon! Awesome! ⚡</p>`;
        } else {
            const fullDaysElapsed = Math.floor(timeDifferenceMs / singleDayMs);
            const dayNounText = fullDaysElapsed === 1 ? "day" : "days";
            messageContainer.innerHTML = `<p class="welcome-msg">You last visited ${fullDaysElapsed} ${dayNounText} ago.</p>`;
        }
    }

    localStorage.setItem("chamberLastVisitTimestamp", currentTimestamp);
}

// Straight module execution sequence
buildDiscoverCards(discoverItems);
trackVisitorMetrics();